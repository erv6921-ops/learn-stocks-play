create table daily_game_completions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade,
  game_date date not null,
  game_type text not null,
  score integer,
  coins_earned integer,
  completed_at timestamptz default now(),
  unique(user_id, game_date)
);

alter table daily_game_completions enable row level security;

create policy "Users can manage own completions"
on daily_game_completions
for all using (auth.uid() = user_id);
