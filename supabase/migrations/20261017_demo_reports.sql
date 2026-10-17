-- Run this migration in Supabase before enabling durable demo report storage.
-- The server uses the service role for writes; RLS keeps the table closed to
-- browser clients so visitor_id filtering cannot be bypassed client-side.
create table if not exists public.buylens_demo_reports (
  id uuid primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  visitor_id uuid not null,
  report jsonb not null,
  created_at timestamptz not null default now()
);

create index if not exists buylens_demo_reports_owner_idx
  on public.buylens_demo_reports (user_id, visitor_id, created_at desc);

alter table public.buylens_demo_reports enable row level security;

-- No anon/authenticated policy is intentional. The service role used by the
-- server bypasses RLS after checking both the signed session and visitor id.
