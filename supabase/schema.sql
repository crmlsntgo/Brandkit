-- ============================================================
-- BrandKit AI — Supabase schema
-- Paste this into the Supabase SQL Editor (Dashboard > SQL Editor)
-- ============================================================

create table if not exists brand_kits (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  brand_name text not null,
  kit_data jsonb not null,
  created_at timestamptz default now() not null
);

create index if not exists brand_kits_user_id_idx on brand_kits(user_id);
create index if not exists brand_kits_created_at_idx on brand_kits(created_at desc);

alter table brand_kits enable row level security;

create policy "Users can select their own brand kits"
  on brand_kits for select
  using (auth.uid() = user_id);

create policy "Users can insert their own brand kits"
  on brand_kits for insert
  with check (auth.uid() = user_id);

create policy "Users can delete their own brand kits"
  on brand_kits for delete
  using (auth.uid() = user_id);

-- Optional: cap saved kits per user at 20 via a trigger (enforced again
-- client-side in lib/useCloudHistory.ts, this is a defense-in-depth backstop)
create or replace function enforce_brand_kit_limit()
returns trigger as $$
begin
  if (select count(*) from brand_kits where user_id = new.user_id) >= 20 then
    delete from brand_kits
    where id = (
      select id from brand_kits
      where user_id = new.user_id
      order by created_at asc
      limit 1
    );
  end if;
  return new;
end;
$$ language plpgsql security definer;

create trigger trg_enforce_brand_kit_limit
  before insert on brand_kits
  for each row execute function enforce_brand_kit_limit();
