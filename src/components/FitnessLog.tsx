'use client'

import { useState } from 'react'
import { Badge } from './ui'
import { FITNESS_CATEGORIES, EFFORT_LEVELS } from '@/lib/constants'
import { addFitnessEntry } from '@/lib/db'

export default function FitnessLog({ onSaved }: { onSaved: () => void }) {
  const [cats, setCats] = useState<string[]>([])
  const [effort, setEffort] = useState(3)
  const [duration, setDuration] = useState("")
  const [notes, setNotes] = useState("")
  const [saving, setSaving] = useState(false)

  const submit = async () => {
    if (cats.length === 0) return
    setSaving(true)
    try {
      await addFitnessEntry({
        date: new Date().toISOString(),
        categories: cats,
        effort,
        duration: duration || undefined,
        notes: notes || undefined,
      })
      setCats([]); setEffort(3); setDuration(""); setNotes("")
      onSaved()
    } catch (e) {
      console.error(e)
    }
    setSaving(false)
  }

  return (
    <div>
      <h2 style={{ fontSize: 15, fontWeight: 700, marginBottom: 14, color: "#f1f5f9" }}>What did you work on?</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 20 }}>
        {FITNESS_CATEGORIES.map((c) => (
          <Badge key={c.id} color={c.color}
            selected={cats.includes(c.id)}
            onClick={() => setCats((p) => p.includes(c.id) ? p.filter((x) => x !== c.id) : [...p, c.id])}
          >{c.label}</Badge>
        ))}
      </div>

      <h2 style={{ fontSize: 15, fontWeight: 700, marginBottom: 10, color: "#f1f5f9" }}>Effort</h2>
      <div style={{ display: "flex", gap: 6, marginBottom: 20 }}>
        {EFFORT_LEVELS.map((e) => (
          <Badge key={e.val} color={e.color} selected={effort === e.val}
            onClick={() => setEffort(e.val)}
            style={{ flex: 1, textAlign: "center", justifyContent: "center" }}
          >{e.val} — {e.label}</Badge>
        ))}
      </div>

      <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
        <div style={{ flex: 1 }}>
          <label style={{ fontSize: 12, color: "#64748b", display: "block", marginBottom: 4 }}>Duration (optional)</label>
          <input value={duration} onChange={(e) => setDuration(e.target.value)}
            placeholder="e.g. 60 min"
            style={{
              width: "100%", background: "#1a2236", border: "1px solid #2a3550", borderRadius: 8,
              padding: "10px 12px", color: "#e2e8f0", fontSize: 14, fontFamily: "inherit", outline: "none",
            }}
          />
        </div>
      </div>

      <label style={{ fontSize: 12, color: "#64748b", display: "block", marginBottom: 4 }}>Notes (optional)</label>
      <textarea value={notes} onChange={(e) => setNotes(e.target.value)}
        placeholder="Quick notes — sets, reps, how it felt..."
        rows={3}
        style={{
          width: "100%", background: "#1a2236", border: "1px solid #2a3550", borderRadius: 8,
          padding: "10px 12px", color: "#e2e8f0", fontSize: 14, fontFamily: "inherit", outline: "none",
          resize: "vertical", marginBottom: 16,
        }}
      />

      <button onClick={submit} disabled={cats.length === 0 || saving}
        style={{
          width: "100%", padding: "12px", borderRadius: 8, border: "none", fontSize: 14, fontWeight: 700,
          background: cats.length > 0 && !saving ? "#3b82f6" : "#1e293b",
          color: cats.length > 0 && !saving ? "#fff" : "#475569",
          cursor: cats.length > 0 && !saving ? "pointer" : "default",
          fontFamily: "inherit",
        }}
      >{saving ? "Saving..." : "Log Session"}</button>
    </div>
  )
}
