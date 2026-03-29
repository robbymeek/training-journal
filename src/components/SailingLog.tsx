'use client'

import { useState } from 'react'
import { Badge } from './ui'
import { WIND_CONDITIONS, SESSION_TYPES, SAILING_TOPICS, windToCategory } from '@/lib/constants'
import { addSailingEntry, addKnowledgeInsight } from '@/lib/db'

export default function SailingLog({ knowledgeBase, onSaved }: { knowledgeBase: any; onSaved: () => void }) {
  const [wind, setWind] = useState("")
  const [sessionType, setSessionType] = useState("")
  const [topics, setTopics] = useState<string[]>([])
  const [notes, setNotes] = useState("")
  const [summarizing, setSummarizing] = useState(false)
  const [lastResult, setLastResult] = useState<any>(null)

  const submit = async () => {
    if (!notes.trim() || !wind || !sessionType) return
    setSummarizing(true)
    setLastResult(null)

    const windCat = windToCategory(wind)

    // Call our API route (keeps key server-side)
    let aiResult = null
    try {
      const resp = await fetch('/api/summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rawNotes: notes,
          existingKB: knowledgeBase,
          taggedTopics: topics,
          windCondition: windCat,
        }),
      })
      aiResult = await resp.json()
    } catch (e) {
      console.error("Summarization failed:", e)
    }

    // Save sailing entry
    await addSailingEntry({
      date: new Date().toISOString(),
      wind,
      wind_cat: windCat,
      session_type: sessionType,
      topics,
      raw_notes: notes,
      summary: aiResult?.summary || notes.slice(0, 200),
      key_insights: aiResult?.keyInsights || [],
    })

    // Update knowledge base
    const isDup = (text: string) =>
      aiResult?.alerts?.duplicates?.some((d: string) => d.toLowerCase().includes(text.toLowerCase().slice(0, 30)))

    if (aiResult?.sailingInsights) {
      for (const [subTopic, text] of Object.entries(aiResult.sailingInsights)) {
        if (!isDup(text as string)) {
          await addKnowledgeInsight({ section: 'sailing', category: windCat, sub_topic: subTopic, insight: text as string, wind, source_date: new Date().toISOString() })
        }
      }
    }
    if (aiResult?.boathandlingInsights) {
      for (const [subTopic, text] of Object.entries(aiResult.boathandlingInsights)) {
        if (!isDup(text as string)) {
          await addKnowledgeInsight({ section: 'boathandling', category: subTopic, insight: text as string, wind, source_date: new Date().toISOString() })
        }
      }
    }
    if (aiResult?.conceptInsights) {
      for (const [conceptId, text] of Object.entries(aiResult.conceptInsights)) {
        if (!isDup(text as string)) {
          await addKnowledgeInsight({ section: 'concepts', category: conceptId, insight: text as string, source_date: new Date().toISOString() })
        }
      }
    }
    if (aiResult?.tacticInsights) {
      for (const [tacticId, text] of Object.entries(aiResult.tacticInsights)) {
        if (!isDup(text as string)) {
          await addKnowledgeInsight({ section: 'tactics', category: tacticId, insight: text as string, source_date: new Date().toISOString() })
        }
      }
    }
    if (aiResult?.venueInsights) {
      for (const [venue, text] of Object.entries(aiResult.venueInsights)) {
        if (!isDup(text as string)) {
          await addKnowledgeInsight({ section: 'venues', category: venue, insight: text as string, wind, source_date: new Date().toISOString() })
        }
      }
    }
    if (aiResult?.regattaInsights) {
      for (const [regatta, text] of Object.entries(aiResult.regattaInsights)) {
        if (!isDup(text as string)) {
          await addKnowledgeInsight({ section: 'regattas', category: regatta, insight: text as string, wind, source_date: new Date().toISOString() })
        }
      }
    }

    setLastResult(aiResult)
    setSummarizing(false)
    setNotes(""); setTopics([]); setWind(""); setSessionType("")
    onSaved()
  }

  const ready = notes.trim() && wind && sessionType && !summarizing

  return (
    <div>
      <h2 style={{ fontSize: 15, fontWeight: 700, marginBottom: 10, color: "#f1f5f9" }}>Session Details</h2>
      <div style={{ display: "flex", gap: 8, marginBottom: 14, flexWrap: "wrap" }}>
        {WIND_CONDITIONS.map((w) => (
          <Badge key={w} color="#22d3ee" selected={wind === w} onClick={() => setWind(w)}>{w}</Badge>
        ))}
      </div>
      <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
        {SESSION_TYPES.map((t) => (
          <Badge key={t} color="#a78bfa" selected={sessionType === t} onClick={() => setSessionType(t)}>{t}</Badge>
        ))}
      </div>

      <h2 style={{ fontSize: 15, fontWeight: 700, marginBottom: 10, color: "#f1f5f9" }}>Topics Covered</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 20 }}>
        {SAILING_TOPICS.map((t) => (
          <Badge key={t} color="#3b82f6" selected={topics.includes(t)}
            onClick={() => setTopics((p) => p.includes(t) ? p.filter((x) => x !== t) : [...p, t])}
          >{t}</Badge>
        ))}
      </div>

      <h2 style={{ fontSize: 15, fontWeight: 700, marginBottom: 6, color: "#f1f5f9" }}>Session Notes</h2>
      <p style={{ fontSize: 12, color: "#64748b", marginBottom: 8 }}>
        Write freely — AI will summarize, extract insights, and flag contradictions with your past notes.
      </p>
      <textarea value={notes} onChange={(e) => setNotes(e.target.value)}
        placeholder="What did you learn today? What worked, what didn't, what do you want to remember..."
        rows={6}
        style={{
          width: "100%", background: "#1a2236", border: "1px solid #2a3550", borderRadius: 8,
          padding: "12px", color: "#e2e8f0", fontSize: 14, fontFamily: "inherit", outline: "none",
          resize: "vertical", marginBottom: 16, lineHeight: 1.6,
        }}
      />

      <button onClick={submit} disabled={!ready}
        style={{
          width: "100%", padding: "12px", borderRadius: 8, border: "none", fontSize: 14, fontWeight: 700,
          background: ready ? "#3b82f6" : "#1e293b",
          color: ready ? "#fff" : "#475569",
          cursor: ready ? "pointer" : "default",
          fontFamily: "inherit",
        }}
      >{summarizing ? "Summarizing with AI..." : "Summarize & Save"}</button>

      {lastResult && (
        <div style={{ marginTop: 16, background: "#111827", border: "1px solid #1e293b", borderRadius: 12, padding: 18 }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: "#60a5fa", marginBottom: 8 }}>AI Summary</h3>
          <p style={{ fontSize: 13, color: "#cbd5e1", lineHeight: 1.6, marginBottom: 12 }}>{lastResult.summary}</p>
          {lastResult.keyInsights?.length > 0 && (
            <>
              <h4 style={{ fontSize: 12, fontWeight: 600, color: "#94a3b8", marginBottom: 6 }}>KEY INSIGHTS</h4>
              {lastResult.keyInsights.map((ins: string, i: number) => (
                <div key={i} style={{ fontSize: 12, color: "#94a3b8", padding: "6px 0", borderBottom: i < lastResult.keyInsights.length - 1 ? "1px solid #1e293b" : "none" }}>
                  → {ins}
                </div>
              ))}
            </>
          )}
          {lastResult.alerts?.contradictions?.length > 0 && (
            <div style={{ marginTop: 12, padding: 12, background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: 8 }}>
              <h4 style={{ fontSize: 12, fontWeight: 700, color: "#ef4444", marginBottom: 4 }}>CONTRADICTIONS DETECTED</h4>
              {lastResult.alerts.contradictions.map((c: string, i: number) => (
                <p key={i} style={{ fontSize: 12, color: "#fca5a5", margin: "4px 0" }}>{c}</p>
              ))}
            </div>
          )}
          {lastResult.alerts?.duplicates?.length > 0 && (
            <div style={{ marginTop: 8, padding: 12, background: "rgba(234,179,8,0.08)", border: "1px solid rgba(234,179,8,0.2)", borderRadius: 8 }}>
              <h4 style={{ fontSize: 12, fontWeight: 700, color: "#facc15", marginBottom: 4 }}>ALREADY IN YOUR KNOWLEDGE BASE</h4>
              {lastResult.alerts.duplicates.map((d: string, i: number) => (
                <p key={i} style={{ fontSize: 12, color: "#fde68a", margin: "4px 0" }}>{d}</p>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
