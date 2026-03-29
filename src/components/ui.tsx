'use client'

export function Badge({ children, color, onClick, selected, style }: {
  children: React.ReactNode
  color: string
  onClick?: () => void
  selected?: boolean
  style?: React.CSSProperties
}) {
  return (
    <button onClick={onClick} style={{
      padding: "5px 12px", borderRadius: 6, border: `1px solid ${selected ? color : "#2a3550"}`,
      background: selected ? color + "22" : "#1a2236", color: selected ? color : "#94a3b8",
      fontSize: 12, fontWeight: selected ? 600 : 400, cursor: "pointer", transition: "all 0.15s",
      fontFamily: "inherit", whiteSpace: "nowrap", ...style,
    }}>{children}</button>
  )
}

export function TabBar({ tabs, active, onChange }: {
  tabs: { id: string; label: string }[]
  active: string
  onChange: (id: string) => void
}) {
  return (
    <div style={{ display: "flex", gap: 3, background: "#111827", borderRadius: 10, padding: 3, border: "1px solid #1e293b", overflowX: "auto" }}>
      {tabs.map((t) => (
        <button key={t.id} onClick={() => onChange(t.id)} style={{
          flex: 1, padding: "9px 14px", borderRadius: 7, border: "none", fontSize: 13, fontWeight: 600,
          background: active === t.id ? "#3b82f6" : "transparent", fontFamily: "inherit",
          color: active === t.id ? "#fff" : "#64748b", cursor: "pointer", transition: "all 0.2s",
          whiteSpace: "nowrap",
        }}>{t.label}</button>
      ))}
    </div>
  )
}

export function Tier2Card({ label, count, onClick, color }: {
  label: string
  count: number
  onClick: () => void
  color?: string
}) {
  return (
    <button onClick={onClick} style={{
      background: "#111827", border: "1px solid #1e293b", borderRadius: 10,
      padding: "14px 16px", textAlign: "left", cursor: "pointer", fontFamily: "inherit",
      width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center",
      borderLeft: `3px solid ${color || "#3b82f6"}`,
      marginBottom: 6, transition: "all 0.15s",
    }}>
      <span style={{ fontSize: 14, fontWeight: 600, color: "#e2e8f0" }}>{label}</span>
      <span style={{ fontSize: 11, color: "#64748b" }}>{count > 0 ? `${count} notes` : "—"}</span>
    </button>
  )
}
