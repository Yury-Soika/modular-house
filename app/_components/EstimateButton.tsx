"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Calculator, Mail, MessageCircle, Phone, X } from "lucide-react";

export default function EstimateButton({ phone, email, projectNo, className, label = "Получить расчёт" }: {
  phone: string;
  email: string;
  projectNo?: string;
  className: string;
  label?: string;
}) {
  const [open, setOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  const descriptionId = useId();
  const request = projectNo ? `Здравствуйте! Хочу получить расчёт проекта №${projectNo}.` : "Здравствуйте! Хочу получить расчёт модульного дома или бани.";
  const normalizedPhone = phone.replace(/[^+\d]/g, "");

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.current?.showModal();
    return () => {
      dialog.current?.close();
      document.body.style.overflow = previous;
      trigger.current?.focus();
    };
  }, [open]);

  return <>
    <button ref={trigger} type="button" className={className} onClick={() => setOpen(true)} aria-haspopup="dialog"><Calculator size={17} />{label}</button>
    {open && <dialog ref={dialog} onCancel={() => setOpen(false)} onClose={() => setOpen(false)} onClick={(event) => { if (event.target === event.currentTarget) setOpen(false); }} aria-labelledby={titleId} aria-describedby={descriptionId} className="fixed inset-0 m-auto max-h-[85vh] w-[calc(100%-2rem)] max-w-lg overflow-y-auto rounded-xl bg-white p-6 text-charcoal shadow-2xl backdrop:bg-forest-950/80 sm:p-8">
      <button type="button" onClick={() => setOpen(false)} className="focus-ring absolute right-4 top-4 rounded-md p-2 text-forest-700" aria-label="Закрыть"><X size={22} /></button>
      <h2 id={titleId} className="pr-10 text-2xl font-semibold text-forest-950">Получить расчёт</h2>
      {projectNo && <p className="mt-3 font-semibold text-forest-700">Проект №{projectNo}</p>}
      <p id={descriptionId} className="mt-4 text-sm leading-6 text-charcoal/70">Позвоните или напишите нам удобным способом. Укажите проект, населённый пункт и пожелания по комплектации — подготовим расчёт.</p>
      <div className="mt-6 grid gap-3">
        <a data-ym-goal="phone_click" className="focus-ring inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-forest-700 p-3 font-semibold text-white" href={`tel:${normalizedPhone}`}><Phone size={18} />Позвонить: {phone}</a>
        <a data-ym-goal="telegram_click" className="focus-ring inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-forest-700 p-3 font-semibold text-forest-700" href={`https://t.me/${normalizedPhone}?text=${encodeURIComponent(request)}`} target="_blank" rel="noopener noreferrer"><MessageCircle size={18} />Написать в Telegram</a>
        <a data-ym-goal="viber_click" className="focus-ring inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-forest-900/15 p-3 font-semibold text-forest-700" href={`viber://chat?number=${encodeURIComponent(normalizedPhone)}`}><MessageCircle size={18} />Написать в Viber</a>
        <a data-ym-goal="email_click" className="focus-ring inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-forest-900/15 p-3 font-semibold text-forest-700" href={`mailto:${email}?subject=${encodeURIComponent(projectNo ? `Расчёт проекта №${projectNo}` : "Расчёт модульного дома или бани")}&body=${encodeURIComponent(request)}`}><Mail size={18} />{email}</a>
      </div>
    </dialog>}
  </>;
}
