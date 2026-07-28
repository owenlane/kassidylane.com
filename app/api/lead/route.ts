import { NextResponse } from "next/server";

export const runtime = "nodejs";

// ---------------------------------------------------------------------------
// Centralized lead pipeline. Every website form (Home Value, Contact, Spanish
// Contact) submits here. On each valid lead: email via Resend + SMS via
// Twilio, each attempted independently. Optional Supabase storage retained.
// All providers are env-gated and the route degrades gracefully when unset.
// ---------------------------------------------------------------------------

type LeadPayload = Record<string, unknown>;

const SOURCES: Record<string, string> = {
  "home-value": "New Home Value Lead",
  contact: "New Contact Lead",
  "contact-es": "New Spanish Contact Lead",
};

// Field-level length limits (defense against abuse; generous for real use)
const LIMITS: Record<string, number> = {
  name: 120,
  email: 254,
  phone: 40,
  address: 300,
  timeline: 60,
  type: 60,
  notes: 2000,
  message: 4000,
  source: 40,
};

const MAX_FIELDS = 12;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(value: unknown, max: number): string {
  if (typeof value !== "string") return "";
  // Strip control characters (incl. header-injection newlines), collapse, trim
  return value
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .replace(/\r\n?/g, "\n")
    .trim()
    .slice(0, max);
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Safe display normalization for US-style numbers; falls back to cleaned input
function normalizePhone(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (digits.length === 10) return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  if (digits.length === 11 && digits.startsWith("1"))
    return `+1 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`;
  return raw;
}

const FIELD_LABELS: Record<string, string> = {
  name: "Name",
  email: "Email",
  phone: "Phone",
  address: "Property address",
  timeline: "Timeline to sell",
  type: "Inquiry type",
  notes: "Notes",
  message: "Message",
  source: "Form",
};

export async function POST(req: Request) {
  let raw: LeadPayload;
  try {
    raw = (await req.json()) as LeadPayload;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  if (typeof raw !== "object" || raw === null || Array.isArray(raw)) {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  // Honeypot: bots that fill the hidden field get a silent success.
  if (typeof raw.company === "string" && raw.company.length > 0) {
    return NextResponse.json({ ok: true });
  }

  // Reject bloated payloads outright.
  if (Object.keys(raw).length > MAX_FIELDS) {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  // Sanitize every known field; unknown fields are dropped.
  const lead: Record<string, string> = {};
  for (const [key, max] of Object.entries(LIMITS)) {
    const v = clean(raw[key], max);
    if (v) lead[key] = v;
  }

  // Validate
  const source = SOURCES[lead.source] ? lead.source : null;
  if (!source) {
    return NextResponse.json({ ok: false, error: "Unsupported form" }, { status: 400 });
  }
  if (!lead.name || !lead.email || !EMAIL_RE.test(lead.email)) {
    return NextResponse.json({ ok: false, error: "Missing required fields" }, { status: 400 });
  }
  if (lead.phone) lead.phone = normalizePhone(lead.phone);

  const formLabel = SOURCES[source];
  const submittedAt = new Date().toISOString();

  const orderedKeys = ["name", "email", "phone", "address", "timeline", "type", "message", "notes"];
  const rows = orderedKeys
    .filter((k) => lead[k])
    .map((k) => ({ label: FIELD_LABELS[k] ?? k, value: lead[k] }));

  const textBody =
    `${formLabel} — kassidylane.net\nSubmitted: ${submittedAt}\nForm: ${source}\n\n` +
    rows.map((r) => `${r.label}: ${r.value}`).join("\n");

  const htmlBody = `<!doctype html><html><body style="font-family:Arial,Helvetica,sans-serif;color:#0F1012;margin:0;padding:24px;background:#F6F2EA">
  <div style="max-width:560px;margin:0 auto;background:#ffffff;border:1px solid #e5e0d5;border-radius:12px;padding:28px">
    <p style="margin:0 0 4px;font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:#A87E33">kassidylane.net</p>
    <h1 style="margin:0 0 18px;font-size:20px">${escapeHtml(formLabel)}</h1>
    <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse">
      ${rows
        .map(
          (r) => `<tr>
        <td style="padding:8px 12px 8px 0;font-size:13px;color:#6B6F76;vertical-align:top;white-space:nowrap">${escapeHtml(r.label)}</td>
        <td style="padding:8px 0;font-size:14px">${escapeHtml(r.value).replace(/\n/g, "<br>")}</td>
      </tr>`
        )
        .join("")}
    </table>
    <p style="margin:20px 0 0;font-size:12px;color:#6B6F76">Submitted ${escapeHtml(submittedAt)} · Reply to this email to respond directly to the lead.</p>
  </div>
</body></html>`;

  // Provider attempts are independent: a failure in one never blocks the others.
  const results = { email: false, sms: false, stored: false };

  // 1) Email via Resend
  const notifyTo = process.env.LEAD_NOTIFICATION_EMAIL || process.env.LEAD_NOTIFY_TO;
  const notifyFrom = process.env.LEAD_FROM_EMAIL || process.env.LEAD_NOTIFY_FROM;
  if (process.env.RESEND_API_KEY && notifyTo && notifyFrom) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: notifyFrom,
          to: notifyTo,
          reply_to: lead.email,
          subject: `[KassidyLane.net] ${formLabel}`,
          text: textBody,
          html: htmlBody,
        }),
      });
      results.email = res.ok;
      if (!res.ok) console.error("Resend non-OK status:", res.status);
    } catch (err) {
      console.error("Resend request failed:", err instanceof Error ? err.message : "unknown");
    }
  }

  // 2) SMS via Twilio Programmable Messaging
  const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_FROM_NUMBER, LEAD_SMS_TO } = process.env;
  if (TWILIO_ACCOUNT_SID && TWILIO_AUTH_TOKEN && TWILIO_FROM_NUMBER && LEAD_SMS_TO) {
    try {
      const smsLines = [
        "NEW WEBSITE LEAD",
        lead.name,
        lead.phone || "(no phone provided)",
        lead.type || formLabel.replace("New ", "").replace(" Lead", ""),
        "See email for full details.",
      ];
      const params = new URLSearchParams({
        To: LEAD_SMS_TO,
        From: TWILIO_FROM_NUMBER,
        Body: smsLines.join("\n").slice(0, 640),
      });
      const res = await fetch(
        `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages.json`,
        {
          method: "POST",
          headers: {
            Authorization:
              "Basic " + Buffer.from(`${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN}`).toString("base64"),
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: params.toString(),
        }
      );
      results.sms = res.ok;
      if (!res.ok) console.error("Twilio non-OK status:", res.status);
    } catch (err) {
      console.error("Twilio request failed:", err instanceof Error ? err.message : "unknown");
    }
  }

  // 3) Optional storage via Supabase (existing behavior, retained)
  if (process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
    try {
      const res = await fetch(`${process.env.SUPABASE_URL}/rest/v1/leads`, {
        method: "POST",
        headers: {
          apikey: process.env.SUPABASE_SERVICE_ROLE_KEY,
          Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
          "Content-Type": "application/json",
          Prefer: "return=minimal",
        },
        body: JSON.stringify({
          source,
          name: lead.name,
          email: lead.email,
          phone: lead.phone || null,
          payload: lead,
          created_at: submittedAt,
        }),
      });
      results.stored = res.ok;
    } catch (err) {
      console.error("Supabase store failed:", err instanceof Error ? err.message : "unknown");
    }
  }

  // Fallback: keep leads recoverable from server logs before providers are configured.
  if (!results.email && !results.sms && !results.stored) {
    console.log(`[LEAD:${source}] ${submittedAt}\n${textBody}`);
  }

  // Client receives success whenever the lead was accepted; provider details stay server-side.
  return NextResponse.json({ ok: true });
}
