'use client'

import { useState } from 'react'
import { Tier2Card } from './ui'
import { KB_WIND_CATEGORIES, KB_SAILING_SUBS, KB_BOATHANDLING_SUBS, KB_CONCEPT_SUBS } from '@/lib/constants'

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric" })
}

function countInsights(obj: any): number {
  if (!obj) return 0
  if (Array.isArray(obj)) return obj.length
  return Object.values(obj).reduce((sum: number, v: any) => sum + countInsights(v), 0)
}

function renderInsights(items: any[]) {
  return items?.map((ins: any, i: number) => (
    <div key={i} style={{
      fontSize: 12, color: "#cbd5e1", padding: "8px 0",
      borderBottom: i < items.length - 1 ? "1px solid #1a2236" : "none",
      display: "flex", gap: 8, lineHeight: 1.5,
    }}>
      <div style={{ flexShrink: 0, minWidth: 44 }}>
        <span style={{ fontSize: 10, color: "#475569", fontFamily: "monospace" }}>{fmtDate(ins.date)}</span>
        {ins.wind && <div style={{ fontSize: 9, color: "#22d3ee", marginTop: 2 }}>{ins.wind.split("(")[0]?.trim()}</div>}
      </div>
      <span>{ins.text}</span>
    </div>
  ))
}

export default function KnowledgeBase({ kb }: { kb: any }) {
  const [tier1, setTier1] = useState("sailing")
  const [tier2, setTier2] = useState<string | null>(null)
  const [tier3, setTier3] = useState<string | null>(null)

  const sailing = kb?.sailing || {}
  const concepts = kb?.concepts || {}
  const venues = kb?.venues || {}
  const tactics = kb?.tactics || {}
  const regattas = kb?.regattas || {}
  const boathandling = kb?.boathandling || {}

  const subLabels: Record<string, string> = {
    upwind: "Upwind", reaching: "Reaching", downwind: "Downwind",
    mark_roundings: "Mark Roundings", tacks: "Tacks", gybes: "Gybes",
    starts: "Starts", upwind_tactics: "Upwind Tactics",
    downwind_tactics: "Downwind Tactics", fleet_strategy: "Fleet Strategy",
  }
  const conceptLabels: Record<string, string> = {
    mental: "Mental", visualization: "Visualization", fitness_info: "Fitness Info",
    current_tide: "Current / Tide", rules_protests: "Rules / Protests",
  }

  const Crumb = ({ label, onClick, active }: { label: string; onClick: () => void; active: boolean }) => (
    <button onClick={onClick} style={{
      background: "none", border: "none", color: active ? "#f1f5f9" : "#60a5fa",
      fontSize: 14, fontWeight: active ? 700 : 500, cursor: active ? "default" : "pointer",
      fontFamily: "inherit", padding: 0,
    }}>{label}</button>
  )

  return (
    <div>
      <h2 style={{ fontSize: 15, fontWeight: 700, marginBottom: 14, color: "#f1f5f9" }}>Knowledge Base</h2>

      {/* Breadcrumbs */}
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 16, fontSize: 13 }}>
        <Crumb label="Home" onClick={() => { setTier1("sailing"); setTier2(null); setTier3(null) }} active={!tier2} />
        {tier2 && <>
          <span style={{ color: "#475569" }}>/</span>
          <Crumb label={tier1 === "sailing" ? tier2 : (tier1 === "venues" || tier1 === "regattas" ? tier2 : (conceptLabels[tier2] || subLabels[tier2] || tier2))} onClick={() => setTier3(null)} active={!tier3} />
        </>}
        {tier3 && <>
          <span style={{ color: "#475569" }}>/</span>
          <Crumb label={subLabels[tier3] || conceptLabels[tier3] || tier3} onClick={() => {}} active={true} />
        </>}
      </div>

      {/* TIER 1 */}
      {!tier2 && (
        <div>
          <div style={{ display: "flex", gap: 3, background: "#111827", borderRadius: 10, padding: 3, border: "1px solid #1e293b", marginBottom: 16, overflowX: "auto" }}>
            {[
              { id: "sailing", label: "Sailing" },
              { id: "concepts", label: "Concepts" },
              { id: "tactics", label: "Tactics" },
              { id: "regattas", label: "Regattas" },
              { id: "venues", label: "Venues" },
            ].map((t) => (
              <button key={t.id} onClick={() => { setTier1(t.id); setTier2(null); setTier3(null) }} style={{
                flex: 1, padding: "9px 14px", borderRadius: 7, border: "none", fontSize: 13, fontWeight: 600,
                background: tier1 === t.id ? "#3b82f6" : "transparent", fontFamily: "inherit",
                color: tier1 === t.id ? "#fff" : "#64748b", cursor: "pointer", whiteSpace: "nowrap",
              }}>{t.label}</button>
            ))}
          </div>

          {tier1 === "sailing" && (<>
            {KB_WIND_CATEGORIES.map((wc) => (
              <Tier2Card key={wc} label={wc} color="#22d3ee" count={countInsights(sailing[wc])} onClick={() => setTier2(wc)} />
            ))}
            <div style={{ fontSize: 11, fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em", padding: "12px 0 6px" }}>Boat Handling</div>
            {KB_BOATHANDLING_SUBS.map((bh) => (
              <Tier2Card key={bh.id} label={bh.label} color="#f97316" count={boathandling[bh.id]?.length || 0} onClick={() => { setTier2("boathandling"); setTier3(bh.id) }} />
            ))}
          </>)}

          {tier1 === "concepts" && KB_CONCEPT_SUBS.map((c) => (
            <Tier2Card key={c.id} label={c.label} color="#a78bfa"
              count={c.children ? c.children.reduce((s, ch) => s + (concepts[ch.id]?.length || 0), 0) + (concepts[c.id]?.length || 0) : (concepts[c.id]?.length || 0)}
              onClick={() => setTier2(c.id)}
            />
          ))}

          {tier1 === "tactics" && (
            Object.keys(tactics).length === 0
              ? <div style={{ textAlign: "center", color: "#475569", padding: 32, fontSize: 13 }}>No tactics notes yet.</div>
              : Object.keys(tactics).map((t) => (
                <Tier2Card key={t} label={subLabels[t] || t.replace(/_/g, " ").replace(/\b\w/g, (c: string) => c.toUpperCase())} color="#06b6d4" count={tactics[t]?.length || 0} onClick={() => setTier2(t)} />
              ))
          )}

          {tier1 === "regattas" && (
            Object.keys(regattas).length === 0
              ? <div style={{ textAlign: "center", color: "#475569", padding: 32, fontSize: 13 }}>No regatta notes yet.</div>
              : Object.keys(regattas).map((r) => (
                <Tier2Card key={r} label={r} color="#ef4444" count={regattas[r]?.length || 0} onClick={() => setTier2(r)} />
              ))
          )}

          {tier1 === "venues" && (
            Object.keys(venues).length === 0
              ? <div style={{ textAlign: "center", color: "#475569", padding: 32, fontSize: 13 }}>No venue notes yet. Mention a venue in your sailing notes and it'll appear here.</div>
              : Object.keys(venues).map((v) => (
                <Tier2Card key={v} label={v} color="#f97316" count={venues[v]?.length || 0} onClick={() => setTier2(v)} />
              ))
          )}
        </div>
      )}

      {/* TIER 2 */}
      {tier2 && !tier3 && (
        <div>
          {tier1 === "sailing" && tier2 !== "boathandling" && (
            <div>
              {KB_SAILING_SUBS.map((sub) => {
                const windData = sailing[tier2] || {}
                return (
                  <Tier2Card key={sub.id} label={sub.label} color="#3b82f6" count={windData[sub.id]?.length || 0} onClick={() => setTier3(sub.id)} />
                )
              })}
            </div>
          )}

          {tier1 === "sailing" && tier2 === "boathandling" && (
            <div>
              {KB_BOATHANDLING_SUBS.map((bh) => (
                <Tier2Card key={bh.id} label={bh.label} color="#f97316" count={boathandling[bh.id]?.length || 0} onClick={() => setTier3(bh.id)} />
              ))}
            </div>
          )}

          {tier1 === "concepts" && (() => {
            const def = KB_CONCEPT_SUBS.find((c) => c.id === tier2)
            if (def?.children) {
              return (
                <div>
                  {concepts[tier2]?.length > 0 && (
                    <div style={{ background: "#111827", border: "1px solid #1e293b", borderRadius: 10, padding: 16, marginBottom: 10 }}>
                      <h3 style={{ fontSize: 13, fontWeight: 700, color: "#a78bfa", marginBottom: 10 }}>General</h3>
                      {renderInsights(concepts[tier2])}
                    </div>
                  )}
                  {def.children.map((ch) => (
                    <Tier2Card key={ch.id} label={ch.label} color="#a78bfa" count={concepts[ch.id]?.length || 0} onClick={() => setTier3(ch.id)} />
                  ))}
                </div>
              )
            }
            return (
              <div style={{ background: "#111827", border: "1px solid #1e293b", borderRadius: 10, padding: 16 }}>
                {concepts[tier2]?.length > 0 ? renderInsights(concepts[tier2]) : <div style={{ color: "#475569", fontSize: 13, textAlign: "center", padding: 20 }}>No notes yet.</div>}
              </div>
            )
          })()}

          {tier1 === "venues" && (
            <div style={{ background: "#111827", border: "1px solid #1e293b", borderRadius: 10, padding: 16 }}>
              {venues[tier2]?.length > 0 ? renderInsights(venues[tier2]) : <div style={{ color: "#475569", fontSize: 13, textAlign: "center", padding: 20 }}>No notes yet.</div>}
            </div>
          )}

          {tier1 === "tactics" && (
            <div style={{ background: "#111827", border: "1px solid #1e293b", borderRadius: 10, padding: 16 }}>
              {tactics[tier2]?.length > 0 ? renderInsights(tactics[tier2]) : <div style={{ color: "#475569", fontSize: 13, textAlign: "center", padding: 20 }}>No notes yet.</div>}
            </div>
          )}

          {tier1 === "regattas" && (
            <div style={{ background: "#111827", border: "1px solid #1e293b", borderRadius: 10, padding: 16 }}>
              {regattas[tier2]?.length > 0 ? renderInsights(regattas[tier2]) : <div style={{ color: "#475569", fontSize: 13, textAlign: "center", padding: 20 }}>No notes yet.</div>}
            </div>
          )}
        </div>
      )}

      {/* TIER 3 */}
      {tier3 && (
        <div style={{ background: "#111827", border: "1px solid #1e293b", borderRadius: 10, padding: 16 }}>
          {(() => {
            let items: any[] = []
            if (tier1 === "sailing" && tier2 === "boathandling") items = boathandling[tier3] || []
            else if (tier1 === "sailing") items = sailing[tier2!]?.[tier3] || []
            else if (tier1 === "concepts") items = concepts[tier3] || []
            return items.length > 0 ? renderInsights(items) : <div style={{ color: "#475569", fontSize: 13, textAlign: "center", padding: 20 }}>No notes yet.</div>
          })()}
        </div>
      )}
    </div>
  )
}
