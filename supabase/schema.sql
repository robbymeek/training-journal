-- Run this in Supabase SQL Editor (Dashboard → SQL Editor → New Query)

-- Fitness log entries
CREATE TABLE fitness_entries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now(),
  date TIMESTAMPTZ NOT NULL,
  categories TEXT[] NOT NULL,
  effort INTEGER NOT NULL CHECK (effort >= 1 AND effort <= 5),
  duration TEXT,
  notes TEXT
);

-- Sailing log entries
CREATE TABLE sailing_entries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now(),
  date TIMESTAMPTZ NOT NULL,
  wind TEXT,
  wind_cat TEXT,
  session_type TEXT NOT NULL,
  topics TEXT[],
  raw_notes TEXT,
  summary TEXT,
  key_insights TEXT[]
);

-- Knowledge base — hierarchical key-value store
-- section: "sailing", "concepts", "venues", "tactics", "regattas", "boathandling"
-- category: wind category or concept id or venue name or tactic type
-- sub_topic: "upwind", "downwind", etc. (nullable for flat categories)
CREATE TABLE knowledge_base (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now(),
  section TEXT NOT NULL,
  category TEXT NOT NULL,
  sub_topic TEXT,
  insight TEXT NOT NULL,
  wind TEXT,
  source_date TIMESTAMPTZ
);

-- Indexes for fast lookups
CREATE INDEX idx_fitness_date ON fitness_entries(date DESC);
CREATE INDEX idx_sailing_date ON sailing_entries(date DESC);
CREATE INDEX idx_kb_section ON knowledge_base(section, category);
CREATE INDEX idx_kb_lookup ON knowledge_base(section, category, sub_topic);

-- Enable Row Level Security (but allow all for now since we use app-level password)
ALTER TABLE fitness_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE sailing_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE knowledge_base ENABLE ROW LEVEL SECURITY;

-- Allow all operations with anon key
CREATE POLICY "Allow all fitness" ON fitness_entries FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all sailing" ON sailing_entries FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all kb" ON knowledge_base FOR ALL USING (true) WITH CHECK (true);
