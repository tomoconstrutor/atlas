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

The selected industry drives the exportable report. Visitors can preview the MIND-style report in the page, download it as a PDF, or enter an email to send it through a configured serverless email endpoint.

Direct email sending uses a server-side endpoint so the Resend API key never ships to the browser. The static site reads:

```env
NEXT_PUBLIC_REPORT_EMAIL_ENDPOINT=https://your-domain.com/api/send-report
```

The endpoint in `api/send-report.ts` expects these server-side environment variables:

```env
RESEND_API_KEY=re_xxxxxxxxx
RESEND_FROM_EMAIL="AI Atlas <reports@your-domain.com>"
REPORT_EMAIL_ALLOWED_ORIGINS=https://atlas-ai.pt
```

If `NEXT_PUBLIC_REPORT_EMAIL_ENDPOINT` is not configured, the email field falls back to a prefilled `mailto:` note and the PDF can still be downloaded.

The CTA email is configured in `data/site.ts`:

```ts
export const CONTACT_EMAIL = "";
```

## Design References

The MIND design reference files are kept in the project root:

- `MIND-design-system.md`
- `mind-design-system.html`
