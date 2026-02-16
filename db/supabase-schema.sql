-- Fitting Point enterprise schema (Supabase/PostgreSQL)

create table if not exists categories (
  id text primary key,
  name text not null,
  slug text unique not null,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists products (
  id text primary key,
  category_id text references categories(id) on delete set null,
  slug text unique not null,
  name text not null,
  description text not null,
  price numeric(10,2) not null,
  stock int not null default 0,
  badge text check (badge in ('NEW','BESTSELLER') or badge is null),
  visible boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists product_images (
  id bigserial primary key,
  product_id text not null references products(id) on delete cascade,
  image_url text not null,
  image_type text not null check (image_type in ('PRIMARY','HOVER','GALLERY')),
  sort_order int not null default 0
);

create table if not exists carts (
  id uuid primary key default gen_random_uuid(),
  session_id text,
  customer_id text,
  created_at timestamptz not null default now()
);

create table if not exists cart_items (
  id bigserial primary key,
  cart_id uuid not null references carts(id) on delete cascade,
  product_id text not null references products(id),
  quantity int not null check (quantity > 0)
);

create table if not exists orders (
  id text primary key,
  customer_name text not null,
  customer_phone text not null,
  customer_email text,
  customer_address text not null,
  total_amount numeric(10,2) not null,
  status text not null default 'NEW',
  notes text,
  created_at timestamptz not null default now()
);

create table if not exists order_items (
  id bigserial primary key,
  order_id text not null references orders(id) on delete cascade,
  product_id text not null references products(id),
  quantity int not null check (quantity > 0),
  unit_price numeric(10,2) not null
);

create table if not exists settings (
  id int primary key default 1,
  logo_url text,
  home_banners jsonb,
  primary_color text,
  secondary_color text,
  font_style text,
  whatsapp_number text,
  contact_email text,
  updated_at timestamptz not null default now(),
  constraint single_settings_row check (id = 1)
);
