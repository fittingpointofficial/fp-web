# Fitting Point Enterprise E-commerce

Next.js App Router + Tailwind implementation for a premium Islamic / Hajj / Umrah essentials store.

## Includes
- Customer site: `/`, `/shop`, `/product/[slug]`, `/cart`, `/checkout`, `/order/success`
- Low-code visual admin panel at `/admin`
- Admin API routes are session-protected (cookie auth)
- WhatsApp checkout handoff (`wa.me/919826022251` configurable)
- Google Sheets order logging (webhook-based)
- Supabase-ready relational schema (`db/supabase-schema.sql`)

## Environment

```bash
ADMIN_USER=admin
ADMIN_PASSWORD=admin123
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
