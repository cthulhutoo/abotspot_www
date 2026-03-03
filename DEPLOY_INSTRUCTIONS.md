# Deployment Instructions

## Current Status
✅ Code is ready to deploy
✅ Build succeeds locally
❌ Not yet deployed to Vercel

## Deployment Options

### Option 1: Git Push (Recommended)
```bash
cd /data/.openclaw/workspace/abotspot_www
# Switch to HTTPS remote (already done)
git remote set-url origin https://github.com/cthulhutoo/abotspot_www.git
# Push with GitHub token
git push https://YOUR_GITHUB_TOKEN@github.com/cthulhutoo/abotspot_www.git main
```

### Option 2: Vercel CLI
```bash
cd /data/.openclaw/workspace/abotspot_www
# Login to Vercel
npx vercel login
# Deploy to production
npx vercel --prod
```

### Option 3: Manual Upload via Vercel Dashboard
1. Go to https://vercel.com/dashboard
2. Find abotspot.com project
3. Click "Redeploy"
4. This will pull the latest from GitHub and deploy

### Option 4: Use Vercel API (needs token)
```bash
# Requires VERCEL_TOKEN environment variable
curl -X POST https://api.vercel.com/v1/integrations/deploy \
  -H "Authorization: Bearer $VERCEL_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"abotspot-website","target":"production"}'
```

## What Changed
- Added OAuth API routes: /api/auth/google and /api/auth/callback
- Updated login page with error messaging
- Added board portal pages: discovery, pipeline, funders, analytics, alerts
- Fixed build errors in API routes and supabase.ts

## Environment Variables Required
These should already be set in Vercel:
- SUPABASE_URL=https://myqyqdiaoojoglxjwtnu.supabase.co
- SUPABASE_ANON_KEY=sb_publishable_Y4iHbWeFUm0Jj2xQls48fg_7dKmt99Q
