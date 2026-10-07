-- Meteorology question bank tables

create table if not exists met_questions (
  id           uuid primary key default gen_random_uuid(),
  section_id   text not null,           -- e.g. "A.8.1"
  question     text not null,
  option_a     text not null,
  option_b     text not null,
  option_c     text not null,
  option_d     text not null,
  correct_answer char(1) not null check (correct_answer in ('a','b','c','d')),
  explanation  text,
  difficulty   text not null default 'medium' check (difficulty in ('easy','medium','hard')),
  source       text default 'Oxford ATPL MET',
  created_at   timestamptz default now()
);

create table if not exists met_flashcards (
  id           uuid primary key default gen_random_uuid(),
  section_id   text not null,
  front        text not null,
  back         text not null,
  difficulty   text not null default 'medium' check (difficulty in ('easy','medium','hard')),
  created_at   timestamptz default now()
);

create table if not exists exam_sessions (
  id              uuid primary key default gen_random_uuid(),
  user_id         uuid references auth.users(id) on delete cascade,
  subject         text not null default 'meteorology',
  questions_used  uuid[] not null,
  score           int,
  total           int,
  time_taken_sec  int,
  completed       boolean default false,
  created_at      timestamptz default now()
);

create table if not exists user_question_history (
  id             uuid primary key default gen_random_uuid(),
  user_id        uuid references auth.users(id) on delete cascade,
  question_id    uuid references met_questions(id) on delete cascade,
  last_seen      timestamptz default now(),
  times_seen     int default 1,
  correct_count  int default 0,
  unique (user_id, question_id)
);

create table if not exists user_flashcard_progress (
  id              uuid primary key default gen_random_uuid(),
  user_id         uuid references auth.users(id) on delete cascade,
  flashcard_id    uuid references met_flashcards(id) on delete cascade,
  ease_factor     float default 2.5,
  interval_days   int default 1,
  next_review     timestamptz default now(),
  reviews_done    int default 0,
  unique (user_id, flashcard_id)
);

-- Indexes
create index if not exists idx_met_questions_section on met_questions(section_id);
create index if not exists idx_met_flashcards_section on met_flashcards(section_id);
create index if not exists idx_exam_sessions_user on exam_sessions(user_id);
create index if not exists idx_uqh_user on user_question_history(user_id);
create index if not exists idx_ufp_user on user_flashcard_progress(user_id, next_review);

-- RLS
alter table met_questions enable row level security;
alter table met_flashcards enable row level security;
alter table exam_sessions enable row level security;
alter table user_question_history enable row level security;
alter table user_flashcard_progress enable row level security;

-- Public read for questions and flashcards
create policy "public_read_questions" on met_questions for select using (true);
create policy "public_read_flashcards" on met_flashcards for select using (true);

-- Users own their data
create policy "own_exam_sessions" on exam_sessions
  for all using (auth.uid() = user_id);
create policy "own_question_history" on user_question_history
  for all using (auth.uid() = user_id);
create policy "own_flashcard_progress" on user_flashcard_progress
  for all using (auth.uid() = user_id);
