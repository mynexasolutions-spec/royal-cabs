# Royal Cabs Kolhapur: frontend demo

Next.js (App Router) + TypeScript + Tailwind CSS v4. Frontend only: all data is mock data in `src/lib/data.ts`, nothing is saved, and there is no backend.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Pages

| Area | Routes |
|---|---|
| Public site | `/`, `/quote`, `/confirm`, `/fleet`, `/tariff`, `/about`, `/contact`, `/login` |
| Customer | `/customer`, `/customer/bookings` |
| Admin | `/admin`, `/bookings`, `/bookings/new`, `/leads`, `/dispatch`, `/customers`, `/drivers`, `/payouts`, `/vehicles`, `/billing`, `/billing/[id]`, `/reports`, `/rate-card`, `/settings` |
| Driver app | `/driver`, `/trip`, `/trips`, `/earnings`, `/profile`, `/vehicle`, `/support` |

`/login` has "Skip to Customer / Driver / Admin" shortcuts for demos.

## What works in the demo

- The booking form, the fare quote and the admin phone-booking form calculate fares live from `src/lib/fare.ts`. The rates there are placeholders until the client confirms them.
- The driver trip flow (arrive → OTP → start → expenses → end → payment) is clickable.
- Everything else is visual only: WhatsApp, GPS/maps, payments, saving.

The 4 design mockups are in `design/`.
