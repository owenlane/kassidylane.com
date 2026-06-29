import { NextResponse } from "next/server";

export const runtime = "nodejs";

type LeadPayload = Record<string, string | undefined> & {
  source?: string;
  company?: string; // honeypot
  email?: string;
  name?: string;
};

export async function POST(req: Request) {
  let body: LeadPayload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  // Honeypot: silently accept bot submissions without acting on them.
  if (body.company) {
    return NextResponse.json({ ok: true });
  }

  if (!body.email || !body.name) {
    return NextResponse.json({ ok: false, error: "Missing required fields" }, { status: 400 });
  }

  const source = body.source || "website";
  const submittedAt = new Date().toISOString();

  const lines = Object.entries(body)
    .filter(([k, v]) => v && k !== "company")
    .map(([k, v]) => `${k}: ${v}`)
    .join("\n");

  // 1) Email notification via Resend REST (only if configured)
  if (process.env.RESEND_API_KEY) {
    try {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: process.env.LEAD_NOTIFY_FROM || "leads@kassidylane.com",
          to: process.env.LEAD_NOTIFY_TO || "kassidylane@gmail.com",
          reply_to: body.email,
          subject: `New ${source} lead — ${body.name}`,
          text: `New lead from kassidylane.com\nSource: ${source}\nSubmitted: ${submittedAt}\n\n${lines}`,
        }),
      });
    } catch (err) {
      console.error("Resend notify failed:", err);
    }
  }

  // 2) Optional storage via Supabase REST (only if configured)
  if (process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
    try {
      await fetch(`${process.env.SUPABASE_URL}/rest/v1/leads`, {
        method: "POST",
        headers: {
          apikey: process.env.SUPABASE_SERVICE_ROLE_KEY,
          Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
          "Content-Type": "application/json",
          Prefer: "return=minimal",
        },
        body: JSON.stringify({
          source,
          name: body.name,
          email: body.email,
          phone: body.phone || null,
          payload: body,
          created_at: submittedAt,
        }),
      });
    } catch (err) {
      console.error("Supabase store failed:", err);
    }
  }

  // Always log so leads are recoverable from server logs even before env is set.
  if (!process.env.RESEND_API_KEY && !process.env.SUPABASE_URL) {
    console.log(`[LEAD:${source}] ${submittedAt}\n${lines}`);
  }

  return NextResponse.json({ ok: true });
}
