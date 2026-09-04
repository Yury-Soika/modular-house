# Payload CMS

The site uses Payload 3 embedded in Next.js and the official PostgreSQL adapter.

## Admin

- URL: `https://modulsdom-brest.by/admin`
- Main pages are shown individually in the left sidebar under **Страницы**.
- House and bath detail pages are managed under **Проекты домов и бань**.
- Existing and newly uploaded images are managed under **Медиатека**.
- Site-wide contact details, default SEO fields, social preview, and PDF catalog are under **Настройки сайта и SEO**.

All public reads use only published content. Page and project history/drafts are enabled. If PostgreSQL is temporarily unavailable, public pages fall back to the bundled content instead of returning an error.

## Required production environment

Add these values to the server-only `.env.production`:

```dotenv
DATABASE_URI=postgresql://user:password@host:5432/database?sslmode=require
PAYLOAD_SECRET=a-long-random-secret
NEXT_PUBLIC_SERVER_URL=https://modulsdom-brest.by
```

PostgreSQL is mandatory. The database user must be allowed to create and alter tables during migrations. Uploaded files live in the persistent `media/` directory; back up both PostgreSQL and that directory.

## Commands

```bash
npm run cms:generate-types
npm run cms -- migrate:create migration_name
PAYLOAD_LOAD_PRODUCTION_ENV=1 npm run cms:migrate
CMS_ADMIN_EMAIL=admin@modulsdom.by CMS_ADMIN_PASSWORD='...' PAYLOAD_LOAD_PRODUCTION_ENV=1 npm run cms:seed
```

The seed is idempotent: it imports 21 catalog projects, all current site images/PDF, four completed-object galleries, and creates the administrator only if it does not exist.

## SEO behavior

CMS content is read on the server and rendered into the initial HTML. Page titles, descriptions, social images, project structured data, and the dynamic sitemap continue to work after edits. Editors still need to keep each page's SEO title, description, image alt text, and project slug accurate; changing a slug requires a redirect from its old URL.
