# Training Journal — ILCA 7 LA 2028

A personal training journal for tracking fitness, sailing sessions, and building a knowledge base with AI-powered note summarization.

## Stack
- **Next.js 14** — React framework
- **Supabase** — PostgreSQL database
- **Claude API** — AI summarization of sailing notes
- **Vercel** — Hosting (auto-deploys from GitHub)

## Setup

### 1. Clone and install
```bash
git clone https://github.com/YOUR_USERNAME/training-journal.git
cd training-journal
npm install
```

### 2. Set up Supabase database
Go to your Supabase project dashboard → **SQL Editor** → **New Query**

Run these SQL files **in order**:
1. Copy/paste contents of `supabase/schema.sql` → Run
2. Copy/paste contents of `supabase/seed.sql` → Run
3. Copy/paste contents of `supabase/seed_tp_data.sql` → Run

### 3. Configure environment variables
Copy `.env.local` and fill in your Anthropic API key:
```
NEXT_PUBLIC_SUPABASE_URL=https://fcpkajctxxzwixgxltoa.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
ANTHROPIC_API_KEY=your_anthropic_api_key_here
NEXT_PUBLIC_APP_PASSWORD=sendit
```

### 4. Run locally
```bash
npm run dev
```
Open http://localhost:3000

### 5. Deploy to Vercel
1. Push code to GitHub
2. Go to vercel.com → New Project → Import your GitHub repo
3. Add environment variables in Vercel project settings:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `ANTHROPIC_API_KEY`
   - `NEXT_PUBLIC_APP_PASSWORD`
4. Deploy

## Project Structure
```
src/
  app/
    page.tsx              — Main app (password gate, tabs, layout)
    layout.tsx            — Root layout
    globals.css           — Global styles
    api/summarize/route.ts — Claude API endpoint (server-side)
  components/
    ui.tsx                — Shared components (Badge, TabBar, Tier2Card)
    FitnessLog.tsx        — Log fitness sessions
    FitnessHistory.tsx    — View fitness history + frequency chart
    SailingLog.tsx        — Log sailing sessions with AI summarization
    SailingHistory.tsx    — View sailing session history
    KnowledgeBase.tsx     — Hierarchical knowledge base browser
  lib/
    supabase.ts           — Supabase client
    db.ts                 — Database operations
    constants.ts          — Categories, wind conditions, KB structure
supabase/
    schema.sql            — Database table definitions
    seed.sql              — Initial knowledge base data
    seed_tp_data.sql      — TrainingPeaks import data
```

## Making Changes
Edit any component file, push to GitHub, and Vercel auto-deploys. Or use Claude Code to describe changes in plain language.
