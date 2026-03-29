'use client'

import { useState, useEffect } from 'react'
import { TabBar } from '@/components/ui'
import FitnessLog from '@/components/FitnessLog'
import FitnessHistory from '@/components/FitnessHistory'
import SailingLog from '@/components/SailingLog'
import SailingHistory from '@/components/SailingHistory'
import KnowledgeBase from '@/components/KnowledgeBase'
import { getFitnessEntries, getSailingEntries, getKnowledgeBase } from '@/lib/db'

const APP_PASSWORD = process.env.NEXT_PUBLIC_APP_PASSWORD || 'sendit'

export default function Home() {
  const [unlocked, setUnlocked] = useState(false)
  const [pwInput, setPwInput] = useState("")
  const [pwError, setPwError] = useState(false)

  const [view, setView] = useState("fitness_log")
  const [fitnessEntries, setFitnessEntries] = useState<any[]>([])
  const [sailingEntries, setSailingEntries] = useState<any[]>([])
  const [knowledgeBase, setKnowledgeBase] = useState<any>({})
  const [loaded, setLoaded] = useState(false)

  const loadData = async () => {
    try {
      const [f, s, k] = await Promise.all([
        getFitnessEntries(),
        getSailingEntries(),
        getKnowledgeBase(),
      ])
      setFitnessEntries(f)
      setSailingEntries(s)
      setKnowledgeBase(k)
    } catch (e) {
      console.error("Load error:", e)
    }
    setLoaded(true)
  }

  useEffect(() => {
    if (unlocked) loadData()
  }, [unlocked])

  // Stats
  const now = new Date()
  const weekStart = new Date(now); weekStart.setDate(now.getDate() - now.getDay()); weekStart.setHours(0,0,0,0)
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1)
  const fitThisWeek = fitnessEntries.filter((e) => new Date(e.date) >= weekStart).length
  const sailThisWeek = sailingEntries.filter((e) => new Date(e.date) >= weekStart).length
  const sailThisMonth = sailingEntries.filter((e) => new Date(e.date) >= monthStart).length

  // Password gate
  if (!unlocked) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{
          background: "#111827", border: "1px solid #1e293b", borderRadius: 16,
          padding: "40px 32px", textAlign: "center", maxWidth: 360, width: "90%",
        }}>
          <div style={{
            width: 48, height: 48, borderRadius: 12, margin: "0 auto 16px",
            background: "linear-gradient(135deg, #3b82f6, #06b6d4)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 14, fontWeight: 800, color: "#fff",
          }}>TJ</div>
          <h2 style={{ margin: "0 0 6px", fontSize: 18, fontWeight: 700, color: "#f1f5f9" }}>Training Journal</h2>
          <p style={{ margin: "0 0 24px", fontSize: 13, color: "#64748b" }}>Enter code to access</p>
          <div style={{ display: "flex", gap: 8 }}>
            <input
              type="password" value={pwInput}
              onChange={(e) => { setPwInput(e.target.value); setPwError(false) }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  if (pwInput === APP_PASSWORD) setUnlocked(true)
                  else { setPwError(true); setPwInput("") }
                }
              }}
              placeholder="Code..."
              style={{
                flex: 1, background: "#1a2236", border: `1px solid ${pwError ? "#ef4444" : "#2a3550"}`,
                borderRadius: 8, padding: "10px 14px", color: "#e2e8f0", fontSize: 14, fontFamily: "inherit",
              }}
            />
            <button onClick={() => {
              if (pwInput === APP_PASSWORD) setUnlocked(true)
              else { setPwError(true); setPwInput("") }
            }} style={{
              background: "#3b82f6", color: "#fff", border: "none", borderRadius: 8,
              padding: "10px 20px", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "inherit",
            }}>Go</button>
          </div>
          {pwError && <p style={{ margin: "10px 0 0", fontSize: 12, color: "#ef4444" }}>Wrong code. Try again.</p>}
        </div>
      </div>
    )
  }

  if (!loaded) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", color: "#64748b" }}>
        Loading journal...
      </div>
    )
  }

  const tabs = [
    { id: "fitness_log", label: "Log Fitness" },
    { id: "sailing_log", label: "Log Sailing" },
    { id: "fitness_history", label: "Fitness" },
    { id: "sailing_history", label: "Sailing" },
    { id: "knowledge", label: "Knowledge" },
  ]

  return (
    <div>
      {/* Header */}
      <div style={{
        background: "linear-gradient(180deg, #111827 0%, #0a0e1a 100%)",
        borderBottom: "1px solid #1e293b", padding: "20px 16px 14px",
      }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 8,
              background: "linear-gradient(135deg, #3b82f6, #06b6d4)",
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 800, color: "#fff",
            }}>TJ</div>
            <div>
              <h1 style={{ margin: 0, fontSize: 19, fontWeight: 800, color: "#f8fafc", letterSpacing: "-0.03em" }}>
                Training Journal
              </h1>
              <p style={{ margin: 0, fontSize: 11, color: "#64748b", fontFamily: "monospace" }}>
                ILCA 7 · LA 2028
              </p>
            </div>
            <div style={{ marginLeft: "auto", display: "flex", gap: 12, fontSize: 11, color: "#64748b" }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 18, fontWeight: 700, color: "#22d3ee" }}>{fitThisWeek}</div>
                <div>gym/wk</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 18, fontWeight: 700, color: "#3b82f6" }}>{sailThisWeek}</div>
                <div>sail/wk</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 18, fontWeight: 700, color: "#f97316" }}>{sailThisMonth}</div>
                <div>sail/mo</div>
              </div>
            </div>
          </div>
          <TabBar tabs={tabs} active={view} onChange={setView} />
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "16px 16px 60px" }}>
        {view === "fitness_log" && <FitnessLog onSaved={loadData} />}
        {view === "sailing_log" && <SailingLog knowledgeBase={knowledgeBase} onSaved={loadData} />}
        {view === "fitness_history" && <FitnessHistory entries={fitnessEntries} onDelete={loadData} />}
        {view === "sailing_history" && <SailingHistory entries={sailingEntries} onDelete={loadData} />}
        {view === "knowledge" && <KnowledgeBase kb={knowledgeBase} />}
      </div>
    </div>
  )
}
