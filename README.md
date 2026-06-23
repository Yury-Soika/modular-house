# Modular House Landing Page

Next.js, TypeScript, and Tailwind CSS landing page for modular timber-frame houses in Belarus.

## Scripts

```bash
npm run dev
npm run build
```

## Notes

- Main content is driven by `app/page.tsx`.
- Supplied photos are available in `public/house-photos`.
- Reference images are stored in `public/reference`.
- Replace `metadataBase` in `app/layout.tsx` with the final production domain before launch.
- The contact form posts to `POST /api/leads`. The customer can leave phone, Telegram, email, and a message. Without email env vars, leads are logged by the server. To send lead notifications to the site owner by email through Postmark, copy `.env.example` to `.env.local` and fill `POSTMARK_SERVER_TOKEN`, `LEAD_RECIPIENT_EMAIL`, and `LEAD_SENDER_EMAIL`.
