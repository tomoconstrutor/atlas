# AI Atlas

AI Atlas is a one-page interactive website built with Next.js, TypeScript, Tailwind CSS, and the MIND design system.

## Run Locally

```bash
npm install
npm run dev
```

Open:

```txt
http://127.0.0.1:3000
```

## Useful Commands

```bash
npm run lint
npm run build
```

## Content

Main content and configuration live in:

- `data/site.ts`
- `data/industries.ts`
- `data/opportunities.ts`
- `data/materials.ts`

The selected industry drives the exportable report. Visitors can preview the MIND-style report, enter an email, and download it as a PDF after the lead is saved to Formspree.

Formspree lead capture uses public env vars because the site is statically exported:

```txt
NEXT_PUBLIC_FORMSPREE_MAP_FORM_ID=xvzyrrwb
NEXT_PUBLIC_FORMSPREE_ADVISORY_FORM_ID=mjgzrraz
```

The AI map sends leads to the `xvzyrrwb` Formspree form, then starts the client-side PDF download. The AI advisory page sends full brief requests to the `mjgzrraz` Formspree form.

The CTA email is configured in `data/site.ts`:

```ts
export const CONTACT_EMAIL = "";
```

## Design References

The MIND design reference files are kept in the project root:

- `MIND-design-system.md`
- `mind-design-system.html`
