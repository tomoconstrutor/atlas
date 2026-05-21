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

The selected industry drives the exportable report. Visitors can preview the MIND-style report, enter an email, and download it as a PDF after the lead is saved to Supabase.

Supabase lead capture uses public env vars because the site is statically exported:

```txt
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

Create the lead table with insert-only anonymous access:

```sql
create table public.report_leads (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  industry_id text not null,
  industry_name text not null,
  locale text not null,
  report_filename text not null,
  page_url text,
  user_agent text,
  created_at timestamptz not null default now()
);

alter table public.report_leads enable row level security;

create policy "Allow anonymous lead inserts"
on public.report_leads
for insert
to anon
with check (true);
```

The AI advisory page captures brief requests in a separate table:

```sql
create table public.advisory_leads (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  name text,
  role text,
  leverage_goal text,
  page_url text,
  user_agent text,
  created_at timestamptz not null default now()
);

alter table public.advisory_leads enable row level security;

create policy "Allow anonymous advisory lead inserts"
on public.advisory_leads
for insert
to anon
with check (true);
```

The CTA email is configured in `data/site.ts`:

```ts
export const CONTACT_EMAIL = "";
```

## Design References

The MIND design reference files are kept in the project root:

- `MIND-design-system.md`
- `mind-design-system.html`
