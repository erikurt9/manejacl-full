-- ============================================================
-- ManejaCL — Setup de base de datos en Supabase
-- Ejecuta esto en el SQL Editor de tu proyecto Supabase
-- ============================================================

-- 1. Tabla de exámenes
create table examenes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  modo text not null check (modo in ('examen', 'estudio')),
  puntaje_obtenido int not null,
  puntaje_maximo int not null,
  correctas int not null,
  incorrectas int not null,
  total int not null,
  created_at timestamptz default now()
);

-- 2. Tabla de respuestas por pregunta
create table respuestas_detalle (
  id uuid primary key default gen_random_uuid(),
  examen_id uuid references examenes(id) on delete cascade not null,
  user_id uuid references auth.users(id) on delete cascade not null,
  pregunta_id int not null,
  categoria text,
  respondida int,
  correcta int not null,
  es_correcta boolean not null,
  created_at timestamptz default now()
);

-- 3. Tabla de rachas
create table rachas (
  user_id uuid primary key references auth.users(id) on delete cascade,
  racha_actual int default 0,
  racha_maxima int default 0,
  ultimo_dia date
);

-- 4. Row Level Security (RLS) — cada usuario solo ve sus datos
alter table examenes enable row level security;
alter table respuestas_detalle enable row level security;
alter table rachas enable row level security;

create policy "usuarios ven sus examenes" on examenes
  for all using (auth.uid() = user_id);

create policy "usuarios ven sus respuestas" on respuestas_detalle
  for all using (auth.uid() = user_id);

create policy "usuarios ven su racha" on rachas
  for all using (auth.uid() = user_id);

-- 5. Índices útiles
create index on examenes(user_id, created_at desc);
create index on respuestas_detalle(user_id, categoria);
