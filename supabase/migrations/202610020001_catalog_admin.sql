create extension if not exists pgcrypto with schema extensions;

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

create table if not exists public.categories (
  slug text primary key check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  name text not null check (length(trim(name)) > 0),
  description text not null default '',
  sort_order integer not null default 0,
  catalog_sort_order integer not null default 0,
  active boolean not null default true,
  catalog_visible boolean not null default true,
  homepage_visible boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.brands (
  name text primary key check (length(trim(name)) > 0),
  sort_order integer not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.products (
  id text primary key default gen_random_uuid()::text,
  name text not null check (length(trim(name)) > 0),
  brand text not null references public.brands (name) on update cascade on delete restrict,
  model text not null default '',
  category text not null references public.categories (slug) on update cascade on delete restrict,
  sort_order integer not null default 0,
  image text,
  images text[] not null default '{}',
  price numeric(12, 2) check (price is null or price >= 0),
  previous_price numeric(12, 2) check (previous_price is null or previous_price >= 0),
  condition text not null check (condition in ('novo', 'seminovo', 'usado')),
  description text not null default '',
  specifications jsonb not null default '[]'::jsonb,
  stock integer check (stock is null or stock >= 0),
  installments jsonb,
  highlight boolean not null default false,
  offer boolean not null default false,
  available boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.site_settings (
  singleton boolean primary key default true check (singleton),
  whatsapp_url text not null default 'https://api.whatsapp.com/send?phone=5541998574242',
  contact_email text not null default 'atendimento@tenormusic.com.br',
  updated_at timestamptz not null default now()
);
insert into public.site_settings (singleton) values (true) on conflict (singleton) do nothing;

create index if not exists products_public_catalog_idx on public.products (available, category, created_at);
create index if not exists products_display_order_idx on public.products (available, sort_order, created_at);
create index if not exists products_highlights_idx on public.products (highlight, available);
create index if not exists products_offers_idx on public.products (offer, available);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists categories_set_updated_at on public.categories;
create trigger categories_set_updated_at before update on public.categories
for each row execute function public.set_updated_at();

drop trigger if exists brands_set_updated_at on public.brands;
create trigger brands_set_updated_at before update on public.brands
for each row execute function public.set_updated_at();

drop trigger if exists products_set_updated_at on public.products;
create trigger products_set_updated_at before update on public.products
for each row execute function public.set_updated_at();

drop trigger if exists site_settings_set_updated_at on public.site_settings;
create trigger site_settings_set_updated_at before update on public.site_settings
for each row execute function public.set_updated_at();

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.admin_users
    where user_id = (select auth.uid())
  );
$$;

revoke all on function public.is_admin() from public, anon;
grant execute on function public.is_admin() to authenticated;

alter table public.admin_users enable row level security;
alter table public.categories enable row level security;
alter table public.brands enable row level security;
alter table public.products enable row level security;
alter table public.site_settings enable row level security;

revoke all on table public.admin_users, public.categories, public.brands, public.products, public.site_settings from anon, authenticated;
grant select on table public.admin_users to authenticated;
grant select on table public.categories, public.brands, public.products to anon, authenticated;
grant insert, update, delete on table public.categories, public.products to authenticated;
grant select on table public.site_settings to anon, authenticated;
grant update on table public.site_settings to authenticated;

create policy admin_users_read_own on public.admin_users
for select to authenticated using (user_id = (select auth.uid()));

create policy categories_public_read on public.categories
for select to anon using (active and (catalog_visible or homepage_visible));
create policy categories_authenticated_read on public.categories
for select to authenticated using ((active and (catalog_visible or homepage_visible)) or public.is_admin());
create policy categories_admin_insert on public.categories
for insert to authenticated with check (public.is_admin());
create policy categories_admin_update on public.categories
for update to authenticated using (public.is_admin()) with check (public.is_admin());
create policy categories_admin_delete on public.categories
for delete to authenticated using (public.is_admin());

create policy brands_public_read on public.brands
for select to anon using (active);
create policy brands_authenticated_read on public.brands
for select to authenticated using (active or public.is_admin());

create policy products_public_read on public.products
for select to anon using (available);
create policy products_authenticated_read on public.products
for select to authenticated using (available or public.is_admin());
create policy products_admin_insert on public.products
for insert to authenticated with check (public.is_admin());
create policy products_admin_update on public.products
for update to authenticated using (public.is_admin()) with check (public.is_admin());
create policy products_admin_delete on public.products
for delete to authenticated using (public.is_admin());

create policy site_settings_public_read on public.site_settings
for select to anon, authenticated using (true);
create policy site_settings_admin_update on public.site_settings
for update to authenticated using (public.is_admin()) with check (public.is_admin());

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('product-images', 'product-images', true, 5242880, array['image/jpeg', 'image/png', 'image/webp'])
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

create policy product_images_public_read on storage.objects
for select to anon, authenticated using (bucket_id = 'product-images');
create policy product_images_admin_insert on storage.objects
for insert to authenticated with check (bucket_id = 'product-images' and public.is_admin());
create policy product_images_admin_update on storage.objects
for update to authenticated using (bucket_id = 'product-images' and public.is_admin())
with check (bucket_id = 'product-images' and public.is_admin());
create policy product_images_admin_delete on storage.objects
for delete to authenticated using (bucket_id = 'product-images' and public.is_admin());
