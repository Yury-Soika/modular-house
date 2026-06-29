import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";

type LeadPayload = {
  leadType?: string;
  name?: string;
  phone?: string;
  telegram?: string;
  email?: string;
  message?: string;
};

const rusenderToken = process.env.RUSENDER_API_TOKEN;
const rusenderKeyId = process.env.RUSENDER_KEY_ID;
const leadRecipient = process.env.LEAD_RECIPIENT_EMAIL;
const leadSender = process.env.RUSENDER_FROM_EMAIL;
const leadSenderName = process.env.RUSENDER_FROM_NAME || "Modul S";

function clean(value: unknown) {
  return typeof value === "string" ? value.trim().slice(0, 300) : "";
}

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    '"': "&quot;"
  })[character] as string);
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

  const subject = `Новая заявка с сайта Modul S — ${lead.leadType}`;
  const textBody = [
    "Новая заявка с сайта Modul S",
    "",
    `Тип заявки: ${lead.leadType}`,
    `Имя: ${lead.name || "-"}`,
    `Телефон: ${lead.phone || "-"}`,
    `Telegram: ${lead.telegram || "-"}`,
    `Email: ${lead.email || "-"}`,
    `Сообщение: ${lead.message || "-"}`,
    `Создано: ${new Date().toLocaleString("ru-RU", { timeZone: "Europe/Minsk" })}`
  ].join("\n");

  const htmlBody = `
    <h2>Новая заявка с сайта Modul S</h2>
    <table cellpadding="8" cellspacing="0" style="border-collapse:collapse">
      <tr><td><strong>Тип заявки</strong></td><td>${escapeHtml(lead.leadType)}</td></tr>
      <tr><td><strong>Имя</strong></td><td>${escapeHtml(lead.name || "-")}</td></tr>
      <tr><td><strong>Телефон</strong></td><td>${escapeHtml(lead.phone || "-")}</td></tr>
      <tr><td><strong>Telegram</strong></td><td>${escapeHtml(lead.telegram || "-")}</td></tr>
      <tr><td><strong>Email</strong></td><td>${escapeHtml(lead.email || "-")}</td></tr>
      <tr><td><strong>Сообщение</strong></td><td>${escapeHtml(lead.message || "-")}</td></tr>
    </table>`;

  if (!rusenderToken || !rusenderKeyId || !leadRecipient || !leadSender) {
    console.error("RuSender is not configured", { textBody });
    return NextResponse.json({ error: "Email delivery is not configured" }, { status: 503 });
  }

  const response = await fetch(`https://api.rusender.ru/api/v1/external-mails/send/${encodeURIComponent(rusenderKeyId)}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${rusenderToken}`
    },
    body: JSON.stringify({
      idempotencyKey: `modul-s-lead-${randomUUID()}`,
      mail: {
        to: { email: leadRecipient, name: "Modul S" },
        from: { email: leadSender, name: leadSenderName },
        subject,
        previewTitle: "Новая заявка с сайта",
        text: textBody,
        html: htmlBody
      }
    })
  });

  if (!response.ok) {
    console.error("RuSender delivery failed", response.status, await response.text());
    return NextResponse.json({ error: "Email delivery failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true, delivery: "rusender" });
}
