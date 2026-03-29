import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { rawNotes, existingKB, taggedTopics, windCondition } = await req.json()

    const apiKey = process.env.ANTHROPIC_API_KEY
    if (!apiKey) {
      return NextResponse.json({ error: 'API key not configured' }, { status: 500 })
    }

    const kbContext = existingKB && Object.keys(existingKB).length > 0
      ? `Here is the sailor's existing knowledge base of consolidated insights:\n${JSON.stringify(existingKB, null, 1)}\n\n`
      : ""

    const resp = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1000,
        system: `You are a sailing coach assistant for an ILCA 7 Olympic campaign sailor. Take raw session notes and produce a structured summary. Be concise but preserve tactical insights. Output ONLY valid JSON, no markdown, no backticks.

The knowledge base is organized hierarchically:
1. SAILING — organized by wind category ("Super Light Air", "Light Air", "Medium Breeze", "Heavy Air", "Super Heavy Air"), then by sub-topic: "upwind", "reaching", "downwind"
2. BOATHANDLING — "mark_roundings", "tacks", "gybes" (across all wind conditions)
3. CONCEPTS — "mental", "visualization", "fitness_info", "current_tide", "rules_protests"
4. TACTICS — "starts", "upwind_tactics", "downwind_tactics", "fleet_strategy"
5. VENUES — venue-specific knowledge
6. REGATTAS — regatta-specific recaps

JSON schema:
{
  "summary": "2-3 sentence summary of the session",
  "keyInsights": ["1-4 short tactical/technical insights"],
  "sailingInsights": {"sub_topic_id": "insight text"} — use keys from: upwind, reaching, downwind. Only include topics actually discussed.,
  "boathandlingInsights": {"sub_topic_id": "insight text"} — use keys from: mark_roundings, tacks, gybes. Only if discussed.,
  "conceptInsights": {"concept_id": "insight text"} — use keys from: mental, visualization, fitness_info, current_tide, rules_protests. Only if discussed.,
  "tacticInsights": {"tactic_id": "insight text"} — use keys from: starts, upwind_tactics, downwind_tactics, fleet_strategy. Only if discussed.,
  "venueInsights": {"venue_name": "insight text"} — only if a specific venue/location is mentioned.,
  "regattaInsights": {"regatta_name": "insight text"} — only if discussing a specific regatta.,
  "alerts": {
    "contradictions": ["quote both new and old insight if contradiction found"],
    "duplicates": ["quote existing insight if this is a repeat"]
  }
}`,
        messages: [
          {
            role: "user",
            content: `${kbContext}Wind condition: ${windCondition}. Topics tagged: ${taggedTopics.join(", ")}.\n\nRaw session notes:\n"${rawNotes}"\n\nSummarize and categorize. Return ONLY the JSON object.`,
          },
        ],
      }),
    })

    const data = await resp.json()
    const text = data.content?.map((c: any) => c.text || "").join("") || ""
    const clean = text.replace(/```json|```/g, "").trim()
    const result = JSON.parse(clean)

    return NextResponse.json(result)
  } catch (e: any) {
    console.error("Summarization error:", e)
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
