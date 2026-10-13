# template_react_web

React 19 + Vite 8 + TypeScript web ilova shabloni. Angular shablonlari bilan bir xil arxitektura: `core / shared / features / layout`.

**Stack:** React Router 7 · Zustand (sessiya) · TanStack Query (server holati) · react-hook-form + zod (formalar) · i18next · Tailwind 4 · sonner (toast) · lucide-react.

## Ishga tushirish

```bash
npm install
cp .env.example .env   # VITE_API_URL ni sozlang
npm run dev            # http://localhost:5173
npm run build          # tsc + vite build → dist/
npm run lint
```

Yangi loyiha boshlaganda o'zgartiring: `package.json → name`, `.env → VITE_API_URL`,
`src/styles.css → ranglar`, `index.html → title`.

## Struktura

```
src/
├── main.tsx                # kirish nuqtasi: shrift, stil, i18n, <App/>
├── styles.css              # Tailwind + dizayn tokenlari (yagona manba)
├── app/
│   ├── App.tsx             # provider'lar (Query, Router, Toaster)
│   └── router.tsx          # marshrutlar, guard'lar, lazy sahifalar
├── layout/
│   └── Shell.tsx           # header + nav + <Outlet/>
├── core/                   # yagona infratuzilma (UI'siz yoki minimal)
│   ├── env.ts              # import.meta.env → tiplangan config
│   ├── api/                # http (fetch wrapper: token, til, 401 refresh), ApiError, queryClient
│   ├── auth/               # session.store (zustand), auth.api, useMe, modellar
│   ├── guards/             # RequireAuth, RequireGuest
│   ├── i18n/               # i18next sozlamasi, useLang, locales/*.json
│   └── storage/            # appStorage (tiplangan kalitlar)
├── shared/
│   ├── ui/                 # Button, Input
│   └── utils/              # cn, format
└── features/               # sahifalar — har biri o'z papkasida
    ├── auth/               # LoginPage + login.schema (zod)
    ├── home/
    └── profile/
```

## Qoidalar

- **Qatlamlar:** `features → shared, core`; `core` hech qachon `features` ni import qilmaydi; feature boshqa feature'ni import qilmaydi (ESLint `no-restricted-imports` tekshiradi).
- **Alias'lar:** `@app`, `@core`, `@shared`, `@features`, `@layout` — `../../..` yo'q.
- **Holat:** client holati → Zustand store (`core/`), server ma'lumoti → TanStack Query (`useQuery` hook'lari). `useState` faqat lokal UI holati uchun.
- **HTTP:** komponentda `fetch` yo'q — `http.get/post` orqali, feature'ga xos so'rovlar `features/xxx/xxx.api.ts` da.
- **Formalar:** `react-hook-form` + `zod` sxema (`xxx.schema.ts`); xato matni — tarjima kaliti.
- **Matn:** faqat `core/i18n/locales/*.json` orqali (`t('...')`).
- **Stil:** Tailwind token klasslari (`bg-brand`, `text-ink`); hex kod komponentda yo'q.
- **Nomlash:** komponent fayllari `PascalCase.tsx`, qolganlari `kebab-case.ts`; sahifa — `default export`, qolgan komponentlar — named export.

## Yangi sahifa qo'shish

1. `src/features/orders/OrdersPage.tsx` (`export default`) va kerak bo'lsa `orders.api.ts`, `use-orders.ts`.
2. `app/router.tsx` dagi `Shell` children'iga: `{ path: '/orders', lazy: page(() => import('@features/orders/OrdersPage')) }`.
3. `layout/Shell.tsx` dagi `NAV` ga link, tarjimalarni `locales/` ga qo'shing.
