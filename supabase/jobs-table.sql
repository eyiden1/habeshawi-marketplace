-- Habeshawi Marketplace: free community jobs table
-- Run this entire file in Supabase SQL Editor.

create extension if not exists pgcrypto;

create table if not exists public.jobs (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  company text not null,
  category text not null,
  employment_type text not null,
  location text not null,
  pay text,
  description text not null,
  requirements text[] not null default '{}',
  contact_name text not null,
  contact_email text not null,
  contact_phone text,
  apply_url text,
  status text not null default 'pending'
    check (status in ('pending', 'approved', 'rejected', 'expired')),
  created_at timestamptz not null default now(),
  approved_at timestamptz
);

alter table public.jobs enable row level security;

-- Anyone may submit a job. The browser is only allowed to create pending jobs.
drop policy if exists "Anyone can submit pending jobs" on public.jobs;
create policy "Anyone can submit pending jobs"
on public.jobs
for insert
to anon, authenticated
with check (status = 'pending');

-- Public visitors can only read approved jobs.
drop policy if exists "Public can read approved jobs" on public.jobs;
create policy "Public can read approved jobs"
on public.jobs
for select
to anon, authenticated
using (status = 'approved');

create index if not exists jobs_status_created_at_idx
  on public.jobs (status, created_at desc);
