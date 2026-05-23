alter table public.productos
add column if not exists decisiones jsonb default null;
