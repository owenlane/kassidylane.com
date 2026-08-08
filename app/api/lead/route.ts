import { NextResponse } from "next/server";

export const runtime = "nodejs";

// ---------------------------------------------------------------------------
// Centralized lead pipeline. Every website form (Home Value, Contact, Spanish
// Contact) submits here.
//
// State contract (see LeadState below): the route tracks emailConfigured /
// emailAttempted / emailAccepted separately and NEVER reports notification
// success merely because the payload validated. Email is the business-critical
// notification; SMS and storage are optional and cannot invalidate it.
// ---------------------------------------------------------------------------

type LeadPayload = Record<string, unknown>;

type EmailFailureCategory =
  | "not_configured"
  | "provider_rejected"
  | "network_error"
  | null;

type LeadState = {
  leadAccepted: boolean;
  emailConfigured: boolean;
  emailAttempted: boolean;
  emailAccepted: boolean;
  emailMessageId: string | null;
  emailFailureCategory: EmailFailureCategory;
  smsAttempted: boolean;
  smsAccepted: boolean;
  storageSucceeded: boolean;
};

const SOURCES: Record<string, string> = {
  "home-value": "New Home Value Lead",
  contact: "New Contact Lead",
  "contact-es": "New Spanish Contact Lead",
};

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

// Safe structured diagnostics. Never logs secrets, headers, or full payloads.
function logDiag(fields: Record<string, unknown>) {
  const safe = Object.fromEntries(
    Object.entries(fields).filter(([, v]) => v !== undefined && v !== null)
  );
  console.log(`[LEAD_DIAG] ${JSON.stringify(safe)}`);
}

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
    return NextResponse.json({ ok: true, notified: true });
  }

  if (Object.keys(raw).length > MAX_FIELDS) {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  const lead: Record<string, string> = {};
  for (const [key, max] of Object.entries(LIMITS)) {
    const v = clean(raw[key], max);
    if (v) lead[key] = v;
  }

  const source = SOURCES[lead.source] ? lead.source : null;
  if (!source) {
    return NextResponse.json({ ok: false, error: "Unsupported form" }, { status: 400 });
  }
  if (!lead.name || !lead.email || !EMAIL_RE.test(lead.email)) {
    return NextResponse.json({ ok: false, error: "Missing required fields" }, { status: 400 });
  }
  if (lead.phone) lead.phone = normalizePhone(lead.phone);

  // Optional correlation ID for tracing a specific authorized test end to end.
  const testId = clean(raw.testId, 64) || null;

  const state: LeadState = {
    leadAccepted: true,
    emailConfigured: false,
    emailAttempted: false,
    emailAccepted: false,
    emailMessageId: null,
    emailFailureCategory: null,
    smsAttempted: false,
    smsAccepted: false,
    storageSucceeded: false,
  };

  const formLabel = SOURCES[source];
  const submittedAt = new Date().toISOString();

  const orderedKeys = ["name", "email", "phone", "address", "timeline", "type", "message", "notes"];
  const rows = orderedKeys
    .filter((k) => lead[k])
    .map((k) => ({ label: FIELD_LABELS[k] ?? k, value: lead[k] }));

  const textBody =
    `${formLabel} — kassidylane.net\nSubmitted: ${submittedAt}\nForm: ${source}\n` +
    (testId ? `Test ID: ${testId}\n` : "") +
    `\n` +
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

  // ---- 1) Email via Resend (business-critical) ----
  const notifyTo = process.env.LEAD_NOTIFICATION_EMAIL || process.env.LEAD_NOTIFY_TO;
  const notifyFrom = process.env.LEAD_FROM_EMAIL || process.env.LEAD_NOTIFY_FROM;
  state.emailConfigured = Boolean(process.env.RESEND_API_KEY && notifyTo && notifyFrom);

  if (!state.emailConfigured) {
    state.emailFailureCategory = "not_configured";
    // Names only — never values. Makes a missing/misnamed var immediately visible.
    logDiag({
      event: "email_not_configured",
      source,
      testId,
      hasApiKey: Boolean(process.env.RESEND_API_KEY),
      hasRecipient: Boolean(notifyTo),
      hasSender: Boolean(notifyFrom),
      at: submittedAt,
    });
  } else {
    state.emailAttempted = true;
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
          subject: `[KassidyLane.net] ${formLabel}${testId ? ` (${testId})` : ""}`,
          text: textBody,
          html: htmlBody,
        }),
      });

      // Parse the provider response body so acceptance/rejection is diagnosable.
      let body: unknown = null;
      try {
        body = await res.json();
      } catch {
        body = null;
      }
      const parsed = (body ?? {}) as { id?: string; name?: string; message?: string };

      if (res.ok) {
        state.emailAccepted = true;
        state.emailMessageId = parsed.id ?? null;
        logDiag({
          event: "email_accepted",
          provider: "resend",
          source,
          testId,
          messageId: state.emailMessageId,
          status: res.status,
          at: new Date().toISOString(),
        });
      } else {
        state.emailFailureCategory = "provider_rejected";
        logDiag({
          event: "email_rejected",
          provider: "resend",
          source,
          testId,
          status: res.status,
          errorType: parsed.name ?? null,
          errorMessage: parsed.message ?? null,
          at: new Date().toISOString(),
        });
      }
    } catch (err) {
      state.emailFailureCategory = "network_error";
      logDiag({
        event: "email_network_error",
        provider: "resend",
        source,
        testId,
        errorMessage: err instanceof Error ? err.message : "unknown",
        at: new Date().toISOString(),
      });
    }
  }

  // ---- 2) SMS via Twilio (optional; cannot invalidate email) ----
  const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_FROM_NUMBER, LEAD_SMS_TO } = process.env;
  if (TWILIO_ACCOUNT_SID && TWILIO_AUTH_TOKEN && TWILIO_FROM_NUMBER && LEAD_SMS_TO) {
    state.smsAttempted = true;
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
      state.smsAccepted = res.ok;
      if (!res.ok) {
        logDiag({ event: "sms_rejected", provider: "twilio", source, testId, status: res.status });
      }
    } catch (err) {
      logDiag({
        event: "sms_network_error",
        provider: "twilio",
        source,
        testId,
        errorMessage: err instanceof Error ? err.message : "unknown",
      });
    }
  }

  // ---- 3) Optional storage via Supabase (optional; cannot invalidate email) ----
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
      state.storageSucceeded = res.ok;
    } catch (err) {
      logDiag({
        event: "storage_error",
        source,
        testId,
        errorMessage: err instanceof Error ? err.message : "unknown",
      });
    }
  }

  // Last-resort capture so a lead is never lost when no notification succeeded.
  if (!state.emailAccepted && !state.smsAccepted && !state.storageSucceeded) {
    console.log(`[LEAD_FALLBACK:${source}] ${submittedAt}\n${textBody}`);
  }

  // ---- Response semantics ----
  // ok       = the application accepted and captured the lead (APPLICATION_ACCEPTED)
  // notified = the email provider accepted the message      (PROVIDER_ACCEPTED)
  //
  // These are deliberately separate. `ok` never implies delivery. The lead is
  // captured server-side either way, so this stays 200 rather than an error
  // status: a hard error would push the visitor into duplicate resubmissions
  // for a lead that was in fact received. The frontend renders a degraded
  // "call to confirm" state when notified is false.
  // Provider error detail stays server-side; the client never sees it.
  return NextResponse.json({ ok: true, notified: state.emailAccepted });
}
