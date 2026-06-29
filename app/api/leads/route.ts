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

const unisenderApiKey = process.env.UNISENDER_API_KEY;
const unisenderListId = process.env.UNISENDER_LIST_ID;
const leadRecipient = process.env.LEAD_RECIPIENT_EMAIL || "Modulsdom@mail.ru";
const leadSender = process.env.UNISENDER_SENDER_EMAIL;
const leadSenderName = process.env.UNISENDER_SENDER_NAME || "Modul S";

type UnisenderResponse = {
  error?: string;
  code?: string;
  result?: Array<{ id?: string; errors?: Array<{ code?: string; message?: string }> }>;
};

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
  const htmlBody = `
    <h2>Новая заявка с сайта Modul S</h2>
    <table cellpadding="8" cellspacing="0" style="border-collapse:collapse">
      <tr><td><strong>Тип заявки</strong></td><td>${escapeHtml(lead.leadType)}</td></tr>
      <tr><td><strong>Имя</strong></td><td>${escapeHtml(lead.name || "-")}</td></tr>
      <tr><td><strong>Телефон</strong></td><td>${escapeHtml(lead.phone || "-")}</td></tr>
      <tr><td><strong>Telegram</strong></td><td>${escapeHtml(lead.telegram || "-")}</td></tr>
      <tr><td><strong>Email</strong></td><td>${escapeHtml(lead.email || "-")}</td></tr>
      <tr><td><strong>Сообщение</strong></td><td>${escapeHtml(lead.message || "-")}</td></tr>
      <tr><td><strong>Создано</strong></td><td>${escapeHtml(new Date().toLocaleString("ru-RU", { timeZone: "Europe/Minsk" }))}</td></tr>
    </table>`;

  if (!unisenderApiKey || !unisenderListId || !leadSender) {
    console.error("UniSender is not configured");
    return NextResponse.json({ error: "Email delivery is not configured" }, { status: 503 });
  }

  const requestBody = new URLSearchParams({
    format: "json",
    api_key: unisenderApiKey,
    email: leadRecipient,
    sender_name: leadSenderName,
    sender_email: leadSender,
    subject,
    body: htmlBody,
    list_id: unisenderListId,
    lang: "ru",
    track_read: "0",
    track_links: "0",
    error_checking: "1",
    ref_key: `modul-s-lead-${randomUUID()}`
  });

  const response = await fetch("https://api.unisender.com/ru/api/sendEmail", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: requestBody.toString()
  });

  if (!response.ok) {
    console.error("UniSender HTTP request failed", response.status, await response.text());
    return NextResponse.json({ error: "Email delivery failed" }, { status: 502 });
  }

  const result = (await response.json()) as UnisenderResponse;
  const recipientResult = Array.isArray(result.result) ? result.result[0] : undefined;

  if (result.error || recipientResult?.errors?.length || !recipientResult?.id) {
    console.error("UniSender delivery failed", JSON.stringify(result));
    return NextResponse.json({ error: "Email delivery failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true, delivery: "unisender" });
}
