# NovaCart — Trending Gadgets, Honest Delivery

> A premium, animation-rich dropshipping storefront + admin OS. NovaCart holds **no inventory**: products are imported from supplier catalogs through a pluggable `SupplierAdapter`, marked up by a pricing engine, and when a customer orders, the order is forwarded to the supplier who ships directly to the customer — tracked end-to-end.

![Hero screenshot placeholder](https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80)
_GIF placeholder: replace with a screen recording of hero → quick-add → cart drawer → checkout → tracking timeline._

## Features
**Storefront:** 44 seeded products across 8 categories with variants, compare-at prices, supplier stock, ratings, delivery windows and Trending/New/Low-stock badges · Instant search suggestions, filters (category/price/rating/shipping speed/stock), 5 sorts, 6 collection pages · Persistent cart drawer with free-shipping progress ($50), quantity controls, promo codes (WELCOME10 / NOVA20 / FREESHIP) · Guest checkout with validation, shipping methods, Stripe test mode (simulated gateway when no keys — card data never stored) · Order confirmation with confetti + tracking page (email + order number, animated Paid → Delivered timeline) · Auth (email/password + Google demo) with customer/admin roles · Customer dashboard (orders, wishlist, addresses) · Reviews with verified-buyer badges and review photos · Trust pages (shipping, returns, FAQ, contact, privacy, terms) · Spin-to-win wheel (once per visitor), multi-currency display (USD/EUR/GBP), frequently-bought-together, dark mode, mobile bottom tab bar, PWA manifest.

**Admin** (`/admin`): Analytics (Recharts revenue/orders/AOV/profit, funnel, top products, low-margin alerts) · Product table with margin per SKU · Supplier import (preview DemoSupplier catalog, select, auto-markup per category) · Order management (Forward to supplier mock API with retry/flag on failure, status updates, refunds) · Pricing engine explainer with per-product cost/shipping/fee/profit.

## Tech Stack
Next.js (App Router) + TypeScript · Tailwind CSS · Framer Motion · **PostgreSQL via Drizzle ORM** (this environment; the spec's Prisma/SQLite maps 1:1 — swap `src/db/schema.ts` models) · Recharts · Zustand-style React store (cart/UI in `src/lib/store.tsx`) · Lucide icons · canvas-confetti.

## Design System — "Aurora Bento"
Light `#F6F7FB` bg / `#FFFFFF` surface / `#0B0B1E` ink; Dark `#07070F` / `#11111F` / `#F2F2FA`. Primary electric indigo `#5B3DF5`, aqua `#00D4C8`, hot pink `#FF3D81`, lemon `#FFE45C`. Aurora gradient (indigo→aqua→pink) on hero glows/CTAs, glass cards (backdrop-blur + 1px border), 24px bento radius, 999px pills. Fonts: **Sora** headings, **Plus Jakarta Sans** body, **IBM Plex Mono** prices/order numbers. Respects `prefers-reduced-motion`; aqua focus rings; 44px touch targets; grids 4→2→1.

## Folder Structure
```
src/app/ (page, shop, products/[slug], collections/[slug], checkout, track, login, account, admin, policies/[slug], cart, api/{products,orders,misc,events,health})
src/components/ui.tsx (Header, ProductCard, CartDrawer, Footer, SpinWheel)
src/lib/ (store.tsx, data.ts seed+pricing, db-helpers.ts seeding, suppliers.ts adapter interface)
src/db/ (schema.ts, index.ts) · worker/index.ts (sync + abandoned-cart jobs) · public/ (manifest, robots)
```

## Run Locally
Prerequisites: Node 20+, PostgreSQL (or the provided sandbox `DATABASE_URL`).
```bash
npm install
npx drizzle-kit push        # apply schema
npm run build && npm start  # or: npm run dev
# worker (separate terminal, demo run): npx tsx worker/index.ts
```
The app **auto-seeds on first request** (44 products, 6 collections, 3 promos, demo users, reviews, orders in every status, 28 days of analytics events) — no seed command needed.

## Environment Variables
| Var | Required | Notes |
|---|---|---|
| `DATABASE_URL` | Yes | PostgreSQL connection string |
| `STRIPE_SECRET_KEY` / `NEXT_PUBLIC_STRIPE_KEY` | No | Absent = simulated gateway (test card 4242…) |
| `ANTHROPIC_API_KEY` | No | Optional AI descriptions; falls back to templates |
| `GOOGLE_CLIENT_ID/SECRET` | No | Google OAuth; demo button works without |

## Database Schema (Drizzle/Postgres)
`users` (role customer/admin) · `products` (cost, price, compareAt, stock, supplier, variants/badges JSON) · `collections` · `orders` (items JSON, profit, status, supplierOrderId, trackingNumber, carrier) · `reviews` · `promo_codes` · `wishlist` · `addresses` · `events` (view/cart/checkout/paid funnel) · `pricing_rules` (per-category markup + min margin).

## API Overview
`GET /api/products?q&category&sort&max&rating&instock` · `POST /api/products` (create) · `GET/POST/PATCH /api/orders` (list/lookup, create with **server-side price & stock verification**, forward/refund/status) · `GET /api/misc?kind=supplier|analytics|reviews|promo|collections` · `POST /api/misc` (`review`, `auth-login`, `auth-register`, `import`, `contact`) · `POST /api/events` · `GET /api/health`.

## How Dropshipping Works Here
1. **Import:** Admin → Supplier import previews `DemoSupplierAdapter` SKUs (cost + stock). Selected items import with the category pricing rule (default **+110%**).
2. **Pricing:** `profit = price − cost − shipping ($2.40) − fee (2.9% + $0.30)`; margin % = profit/price. Under the configurable 25% threshold → amber warning in Admin → Pricing.
3. **Order:** Checkout re-verifies every price/stock server-side, decrements supplier stock, stores estimated profit.
4. **Forward:** Admin clicks *Forward to supplier* → mock supplier API returns `SUP-ORD-…` + tracking (8% simulated timeout → status *Forward failed* with retry).
5. **Track:** Customer follows Paid → Sent to supplier → Shipped → In transit → Delivered on `/track`.

**Writing a real adapter:** implement `SupplierAdapter` in `src/lib/suppliers.ts` (`listProducts`, `getStock`, `createOrder`, `getTracking`) against e.g. CJ Dropshipping/Spocket APIs or a CSV upload — the import UI and forwarding flow stay unchanged. Never scrape AliExpress/Amazon.

## Demo Accounts & Test Card
Customer: `demo@novacart.demo` / `demo1234` · Admin: `admin@novacart.demo` / `admin123` (also Maya: `maya@novacart.demo` / `demo1234`). Stripe test: `4242 4242 4242 4242`, any future expiry/CVC. Try tracking `NC-2600` with the demo email.

## Deployment
App → Vercel (set `DATABASE_URL`); DB → Neon/Supabase free tier; Worker → Render/Railway cron running `worker/index.ts` jobs. Run `npx drizzle-kit push` against the production DB once.

## Legal & Compliance Notes
Show real delivery windows (we do: 5–10 business days everywhere, no fake urgency — viewer counts/countdowns are labeled *demo*). NovaCart is seller of record: own refunds, consumer-protection and VAT/tax obligations for your jurisdictions, supplier terms, and product-safety rules (CE/FCC where applicable). Don't use dark patterns or invented discounts — compare-at prices here reflect supplier MSRP.

## Media Credits
Unsplash & Pexels (product/lifestyle photography), DiceBear (review avatars), Lucide (icons), Google Fonts, DummyJSON/FakeStore (catalog inspiration). All URLs centralized in `src/lib/data.ts` + `src/lib/suppliers.ts`.

## Future Improvements
Real Stripe webhook fulfillment, live CJ/Spocket adapters, node-cron scheduled sync, Anthropic-generated descriptions, abandoned-cart email via Resend, R3F 3D hero model, full-text search.

## License
MIT — demo store; supplier orders and payments are simulated unless you add real keys.
