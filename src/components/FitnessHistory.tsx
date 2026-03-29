'use client'

import { FITNESS_CATEGORIES, EFFORT_LEVELS } from '@/lib/constants'
import { deleteFitnessEntry } from '@/lib/db'

function fmtDateFull(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })
}

export default function FitnessHistory({ entries, onDelete }: { entries: any[]; onDelete: () => void }) {
  const now = new Date()
  const last30 = entries.filter((e: any) => new Date(e.date) >= new Date(now.getTime() - 30 * 86400000))
  const catFreq: Record<string, number> = {}
  last30.forEach((e: any) => e.categories.forEach((c: string) => { catFreq[c] = (catFreq[c] || 0) + 1 }))
  const maxCount = Math.max(...Object.values(catFreq), 1)
  const missingCats = FITNESS_CATEGORIES.filter((c) => !catFreq[c.id] || catFreq[c.id] < 2)

  const handleDelete = async (id: string) => {
    await deleteFitnessEntry(id)
    onDelete()
  }

  return (
    <div>
      <h2 style={{ fontSize: 15, fontWeight: 700, marginBottom: 6, color: "#f1f5f9" }}>Fitness Log</h2>
      <p style={{ fontSize: 12, color: "#64748b", marginBottom: 16 }}>{entries.length} sessions logged</p>

      <div style={{ background: "#111827", borderRadius: 10, padding: 14, marginBottom: 16, border: "1px solid #1e293b" }}>
        <h3 style={{ fontSize: 12, fontWeight: 600, color: "#64748b", marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.05em" }}>
          Last 30 Days — Category Frequency
        </h3>
        {FITNESS_CATEGORIES.map((c) => {
          const count = catFreq[c.id] || 0
          return (
            <div key={c.id} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
              <span style={{ fontSize: 11, color: "#94a3b8", width: 120, flexShrink: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {c.short}
              </span>
              <div style={{ flex: 1, height: 16, background: "#0a0e1a", borderRadius: 4, overflow: "hidden" }}>
                <div style={{
                  width: `${(count / maxCount) * 100}%`, height: "100%",
                  background: count === 0 ? "transparent" : c.color + "66",
                  borderRadius: 4, minWidth: count > 0 ? 16 : 0,
                  display: "flex", alignItems: "center", justifyContent: "flex-end", paddingRight: 4,
                }}>
                  {count > 0 && <span style={{ fontSize: 10, fontWeight: 700, color: c.color }}>{count}</span>}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {missingCats.length > 0 && (
        <div style={{ marginBottom: 16, padding: 14, background: "rgba(234,179,8,0.08)", border: "1px solid rgba(234,179,8,0.2)", borderRadius: 10, fontSize: 12, color: "#94a3b8" }}>
          <strong style={{ color: "#facc15" }}>Gaps in last 30 days:</strong>{" "}
          {missingCats.map((c) => c.short).join(", ")}
        </div>
      )}

      {entries.length === 0 && (
        <div style={{ textAlign: "center", color: "#475569", padding: 40, fontSize: 13 }}>
          No fitness sessions logged yet.
        </div>
      )}

      {entries.map((entry: any) => (
        <div key={entry.id} style={{ background: "#111827", border: "1px solid #1e293b", borderRadius: 10, padding: 14, marginBottom: 8 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <span style={{ fontSize: 12, color: "#64748b", fontFamily: "monospace" }}>{fmtDateFull(entry.date)}</span>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{
                fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 4,
                background: EFFORT_LEVELS[entry.effort - 1]?.color + "22",
                color: EFFORT_LEVELS[entry.effort - 1]?.color,
              }}>{EFFORT_LEVELS[entry.effort - 1]?.label}</span>
              {entry.duration && <span style={{ fontSize: 11, color: "#64748b" }}>{entry.duration}</span>}
              <button onClick={() => handleDelete(entry.id)} style={{
                background: "none", border: "none", color: "#475569", cursor: "pointer", fontSize: 14, padding: 2, fontFamily: "inherit",
              }}>×</button>
            </div>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
            {entry.categories.map((catId: string) => {
              const cat = FITNESS_CATEGORIES.find((c) => c.id === catId)
              return cat ? (
                <span key={catId} style={{ fontSize: 11, padding: "3px 8px", borderRadius: 4, background: cat.color + "18", color: cat.color, fontWeight: 500 }}>
                  {cat.label}
                </span>
              ) : null
            })}
          </div>
          {entry.notes && <p style={{ margin: "8px 0 0", fontSize: 12, color: "#94a3b8" }}>{entry.notes}</p>}
        </div>
      ))}
    </div>
  )
}
