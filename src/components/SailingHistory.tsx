'use client'

import { deleteSailingEntry } from '@/lib/db'

function fmtDateFull(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })
}

export default function SailingHistory({ entries, onDelete }: { entries: any[]; onDelete: () => void }) {
  const now = new Date()
  const thisMonth = entries.filter((e: any) => {
    const d = new Date(e.date)
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
  }).length
  const regattaDays = entries.filter((e: any) => e.session_type === "Regatta").length

  const handleDelete = async (id: string) => {
    await deleteSailingEntry(id)
    onDelete()
  }

  return (
    <div>
      <h2 style={{ fontSize: 15, fontWeight: 700, marginBottom: 6, color: "#f1f5f9" }}>Sailing Log</h2>
      <div style={{ display: "flex", gap: 12, marginBottom: 16, fontSize: 12, color: "#64748b" }}>
        <span>{entries.length} sessions</span>
        <span>·</span>
        <span>{regattaDays} regatta days</span>
        <span>·</span>
        <span>{thisMonth} this month</span>
      </div>

      {entries.length === 0 && (
        <div style={{ textAlign: "center", color: "#475569", padding: 40, fontSize: 13 }}>
          No sailing sessions logged yet.
        </div>
      )}

      {entries.map((entry: any) => (
        <div key={entry.id} style={{ background: "#111827", border: "1px solid #1e293b", borderRadius: 10, padding: 16, marginBottom: 10 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
            <div>
              <span style={{ fontSize: 12, color: "#64748b", fontFamily: "monospace" }}>{fmtDateFull(entry.date)}</span>
              <div style={{ display: "flex", gap: 6, marginTop: 4, flexWrap: "wrap" }}>
                {entry.wind && <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 4, background: "#22d3ee22", color: "#22d3ee", fontWeight: 600 }}>{entry.wind}</span>}
                <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 4, background: "#a78bfa22", color: "#a78bfa", fontWeight: 600 }}>{entry.session_type}</span>
              </div>
            </div>
            <button onClick={() => handleDelete(entry.id)} style={{
              background: "none", border: "none", color: "#475569", cursor: "pointer", fontSize: 14, padding: 2, fontFamily: "inherit",
            }}>×</button>
          </div>

          {entry.topics?.length > 0 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 8 }}>
              {entry.topics.map((t: string) => (
                <span key={t} style={{ fontSize: 10, padding: "2px 6px", borderRadius: 3, background: "#3b82f622", color: "#60a5fa" }}>{t}</span>
              ))}
            </div>
          )}

          <p style={{ fontSize: 13, color: "#cbd5e1", lineHeight: 1.6, margin: "0 0 6px" }}>{entry.summary}</p>

          {entry.key_insights?.length > 0 && (
            <div style={{ marginTop: 8, paddingTop: 8, borderTop: "1px solid #1e293b" }}>
              {entry.key_insights.map((ins: string, i: number) => (
                <div key={i} style={{ fontSize: 11, color: "#94a3b8", padding: "3px 0" }}>→ {ins}</div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
