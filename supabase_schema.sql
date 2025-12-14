-- Create a table for public profiles
create table if not exists public.beta_members (
  user_id uuid not null references auth.users on delete cascade primary key,
  role text check (role in ('player', 'court')),
  full_name text,
  city text,
  sport text,
  whatsapp text,
  allow_public boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Convert to public view with safe fields
create or replace view public.public_beta_members as
select
  user_id,
  coalesce(full_name, 'Usuario') as display_name,
  city,
  sport,
  role,
  created_at
from public.beta_members
where allow_public = true;

-- Set up Row Level Security (RLS)
alter table public.beta_members enable row level security;

create policy "Users can view their own profile"
  on public.beta_members for select
  using ( auth.uid() = user_id );

create policy "Users can insert their own profile"
  on public.beta_members for insert
  with check ( auth.uid() = user_id );

create policy "Users can update their own profile"
  on public.beta_members for update
  using ( auth.uid() = user_id );

-- Allow public access to the view
grant select on public.public_beta_members to anon, authenticated;

-- Function to handle updated_at
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Trigger for updated_at
create trigger handle_updated_at
  before update on public.beta_members
  for each row
  execute procedure public.handle_updated_at();
