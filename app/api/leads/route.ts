import { NextResponse } from "next/server";

type LeadPayload = {
  leadType?: string;
  name?: string;
  phone?: string;
  telegram?: string;
  email?: string;
  message?: string;
};

const postmarkToken = process.env.POSTMARK_SERVER_TOKEN;
const leadRecipient = process.env.LEAD_RECIPIENT_EMAIL;
const leadSender = process.env.LEAD_SENDER_EMAIL;

function clean(value: unknown) {
  return typeof value === "string" ? value.trim().slice(0, 300) : "";
}

export async function POST(request: Request) {
  let payload: LeadPayload;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const lead = {
    leadType: clean(payload.leadType) || "consultation",
    name: clean(payload.name),
    phone: clean(payload.phone),
    telegram: clean(payload.telegram),
    email: clean(payload.email),
    message: clean(payload.message)
  };

  if (!lead.phone && !lead.telegram && !lead.email) {
    return NextResponse.json({ error: "Phone, Telegram, or email is required" }, { status: 400 });
  }

  const subject = `New ${lead.leadType} lead from Modul House`;
  const textBody = [
    "New lead from the Modul House website",
    "",
    `Lead type: ${lead.leadType}`,
    `Name: ${lead.name || "-"}`,
    `Phone: ${lead.phone || "-"}`,
    `Telegram: ${lead.telegram || "-"}`,
    `Email: ${lead.email || "-"}`,
    `Message: ${lead.message || "-"}`,
    `Created at: ${new Date().toISOString()}`
  ].join("\n");

  if (!postmarkToken || !leadRecipient || !leadSender) {
    console.info(textBody);
    return NextResponse.json({ ok: true, delivery: "logged" });
  }

  const response = await fetch("https://api.postmarkapp.com/email", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-Postmark-Server-Token": postmarkToken
    },
    body: JSON.stringify({
      From: leadSender,
      To: leadRecipient,
      Subject: subject,
      TextBody: textBody,
      MessageStream: "outbound"
    })
  });

  if (!response.ok) {
    return NextResponse.json({ error: "Email delivery failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true, delivery: "email" });
}
