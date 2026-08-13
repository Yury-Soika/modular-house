"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

declare global {
  interface Window {
    ym?: (counterId: number, method: string, ...args: unknown[]) => void;
  }
}

const counterId = Number(process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID);
const CONSENT_KEY = "modul-s-cookie-consent";
const CONSENT_EVENT = "modul-s-consent-change";

function classifyLink(anchor: HTMLAnchorElement) {
  const explicitGoal = anchor.dataset.ymGoal;
  if (explicitGoal) return explicitGoal;

  const href = anchor.getAttribute("href") ?? "";
  if (href.startsWith("tel:")) return "phone_click";
  if (href.startsWith("mailto:")) return "email_click";
  if (href.startsWith("viber:")) return "viber_click";
  if (href.includes("t.me/")) return "telegram_click";
  if (href.includes("catalog.pdf")) return "catalog_download";
  if (href.includes("#consultation")) return "consultation_click";
  if (/\/projects\/\d+/.test(href)) return "project_open";
  return null;
}

export function YandexMetrika() {
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const updateConsent = () => setAllowed(window.localStorage.getItem(CONSENT_KEY) === "all");
    updateConsent();
    window.addEventListener(CONSENT_EVENT, updateConsent);
    window.addEventListener("storage", updateConsent);
    return () => {
      window.removeEventListener(CONSENT_EVENT, updateConsent);
      window.removeEventListener("storage", updateConsent);
    };
  }, []);

  useEffect(() => {
    if (!allowed || !counterId) return;

    const handleClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest<HTMLAnchorElement>("a[href]");
      if (!anchor) return;
      const goal = classifyLink(anchor);
      if (!goal) return;

      window.ym?.(counterId, "reachGoal", goal, {
        href: anchor.getAttribute("href") ?? "",
        project_id: anchor.dataset.projectId
      });
    };

    document.addEventListener("click", handleClick, { capture: true });
    return () => document.removeEventListener("click", handleClick, { capture: true });
  }, [allowed]);

  if (!allowed || !counterId) return null;

  return (
    <Script id="yandex-metrika" strategy="afterInteractive">
      {`(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};m[i].l=1*new Date();for(var j=0;j<document.scripts.length;j++){if(document.scripts[j].src===r){return;}}k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})(window,document,"script","https://mc.yandex.ru/metrika/tag.js","ym");ym(${counterId},"init",{clickmap:true,trackLinks:true,accurateTrackBounce:true,webvisor:true});`}
    </Script>
  );
}
