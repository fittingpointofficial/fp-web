# Fitting Point Enterprise E-commerce

Next.js App Router + Tailwind implementation for a premium Islamic / Hajj / Umrah essentials store.

## Includes
- Customer site: `/`, `/shop`, `/product/[slug]`, `/cart`, `/checkout`, `/order/success`
- Low-code visual admin panel at `/admin`
- Admin API routes are session-protected (cookie auth)
- WhatsApp checkout handoff (`wa.me/919826022251` configurable)
- Google Sheets order logging (webhook-based)
- Supabase-ready relational schema (`db/supabase-schema.sql`)

## Contact details used in UI
- Address: configurable in `lib/site-config.ts` (default: Salman Plaza, 82, Manik Bagh Rd, Nandanvan Colony, Indore, Madhya Pradesh 452014)
- WhatsApp: configurable in `lib/site-config.ts` (default: +919826022251)
- Email: configurable in `lib/site-config.ts` (default: fitting.point.official@gmail.com)

## Environment

```bash
ADMIN_USER=fitting.point.official@gmail.com
ADMIN_PASSWORD=Farhan@456
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
GOOGLE_SHEETS_WEBHOOK_URL=
NODE_ENV=development
```

## Google Sheets webhook payload columns
- Order ID
- DateTime
- Name
- Phone
- Address
- Items
- Quantity
- Total
- Status (NEW)

## Run

```bash
npm install
npm run dev
```


## Merge Conflict Prevention

- This repo uses `.gitattributes` line-ending normalization to reduce cross-platform merge noise.
- Before opening a PR, run:

```bash
./scripts/check-conflicts.sh
```

- If you are rebasing/cherry-picking, prefer keeping `lib/site-config.ts` as the single source of truth for brand/contact/admin defaults and avoid duplicating literals in UI/API files.
