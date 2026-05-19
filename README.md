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

The CTA email is configured in `data/site.ts`:

```ts
export const CONTACT_EMAIL = "";
```

## Design References

The MIND design reference files are kept in the project root:

- `MIND-design-system.md`
- `mind-design-system.html`
