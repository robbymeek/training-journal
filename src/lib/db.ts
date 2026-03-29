import { supabase } from './supabase'

// ─── Fitness ───
export async function getFitnessEntries() {
  const { data, error } = await supabase
    .from('fitness_entries')
    .select('*')
    .order('date', { ascending: false })
  if (error) throw error
  return data || []
}

export async function addFitnessEntry(entry: {
  date: string
  categories: string[]
  effort: number
  duration?: string
  notes?: string
}) {
  const { data, error } = await supabase
    .from('fitness_entries')
    .insert(entry)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function deleteFitnessEntry(id: string) {
  const { error } = await supabase
    .from('fitness_entries')
    .delete()
    .eq('id', id)
  if (error) throw error
}

// ─── Sailing ───
export async function getSailingEntries() {
  const { data, error } = await supabase
    .from('sailing_entries')
    .select('*')
    .order('date', { ascending: false })
  if (error) throw error
  return data || []
}

export async function addSailingEntry(entry: {
  date: string
  wind: string
  wind_cat: string
  session_type: string
  topics: string[]
  raw_notes: string
  summary: string
  key_insights: string[]
}) {
  const { data, error } = await supabase
    .from('sailing_entries')
    .insert(entry)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function deleteSailingEntry(id: string) {
  const { error } = await supabase
    .from('sailing_entries')
    .delete()
    .eq('id', id)
  if (error) throw error
}

// ─── Knowledge Base ───
export async function getKnowledgeBase() {
  const { data, error } = await supabase
    .from('knowledge_base')
    .select('*')
    .order('created_at', { ascending: true })
  if (error) throw error

  // Restructure flat rows into hierarchical object
  const kb: any = {
    sailing: {},
    concepts: {},
    venues: {},
    tactics: {},
    regattas: {},
    boathandling: {},
  }

  for (const row of data || []) {
    const { section, category, sub_topic, insight, wind, source_date } = row
    const entry = { text: insight, date: source_date || row.created_at, wind: wind || '' }

    if (sub_topic) {
      // Nested: e.g. sailing → "Medium Breeze" → "upwind"
      if (!kb[section]) kb[section] = {}
      if (!kb[section][category]) kb[section][category] = {}
      if (!kb[section][category][sub_topic]) kb[section][category][sub_topic] = []
      kb[section][category][sub_topic].push(entry)
    } else {
      // Flat: e.g. concepts → "mental", venues → "Long Beach"
      if (!kb[section]) kb[section] = {}
      if (!kb[section][category]) kb[section][category] = []
      kb[section][category].push(entry)
    }
  }

  return kb
}

export async function addKnowledgeInsight(entry: {
  section: string
  category: string
  sub_topic?: string
  insight: string
  wind?: string
  source_date?: string
}) {
  const { error } = await supabase
    .from('knowledge_base')
    .insert(entry)
  if (error) throw error
}

export async function getKBCount() {
  const { count, error } = await supabase
    .from('knowledge_base')
    .select('*', { count: 'exact', head: true })
  if (error) throw error
  return count || 0
}
