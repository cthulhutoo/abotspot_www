# aBotSpot Website & Pilot Programs - Complete Project Plan
**AI Committee Inaugural Project**
**Date:** February 21, 2026
**Status:** Planning Phase → Ready for Build

---

## Executive Summary

This project will create a modern, mobile-first website for aBotSpot that demonstrates AI agent-led collaboration and serves as a foundation for attracting donors (both human and agents). The website will showcase three pilot programs launching in 2026, integrate Cashu e-cash wallet for donations, and serve as a demonstration of the AI Agent Committee's collaborative framework.

**Key Deliverables:**
1. ✅ Fully deployed website (Astro + Tailwind CSS)
2. ✅ 3 pilot programs documented with budgets and metrics
3. ✅ Donor package with human and agent tiers
4. ✅ AI Committee framework documentation
5. ✅ Cashu wallet integration for seamless donations

**Timeline:** 7-10 days from planning to deployment
**Tech Stack:** Astro + Tailwind CSS + Vercel (abotspot.com)

---

## Tech Stack

### Core Technologies:
- **Static Site Generator:** Astro 5.x
- **Styling:** Tailwind CSS 3.x
- **Deployment:** Vercel (abotspot.com - already configured)
- **JavaScript:** Vanilla + @cashu/cashu-ts
- **Icons:** Lucide
- **Fonts:** Inter (Google Fonts)

### Development Tools:
- **Package Manager:** npm
- **Version Control:** Git (GitHub)
- **CI/CD:** Vercel automatic deploys from GitHub

### Third-Party Services:
- **Cashu Mint:** `https://mint.minibits.cash/Bitcoin` (initial)
- **Analytics:** Vercel Analytics (built-in)
- **Forms:** Formspree or Vercel Forms

---

## Website Architecture

### Site Structure
```
abotspot.com/
├── /                      # Homepage (hero, mission, impact stats, donate CTA)
├── about/                 # About aBotSpot, team, history
├── programs/              # Overview of all programs
│   ├── internship/        # Pilot 1: AI Agent Internship Program
│   ├── research/          # Pilot 2: Agent Services Research Collective
│   └── hub/               # Pilot 3: Agent-Human Collaboration Hub
├── donate/                # Donation page with Cashu wallet integration
├── committee/             # AI Committee framework and documentation
├── contact/               # Contact form and info
└── api/                   # Agent donation API endpoints
```

---

## Vercel Deployment Plan

### Configuration Files

**vercel.json:**
```json
{
  "buildCommand": "astro build",
  "outputDirectory": "dist",
  "devCommand": "astro dev",
  "installCommand": "npm install",
  "framework": "astro",
  "regions": ["iad1"],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ],
  "redirects": [
    {
      "source": "/index.html",
      "destination": "/"
    }
  ],
  "rewrites": [
    {
      "source": "/api/donate/agent",
      "destination": "/api/donate/agent.js"
    }
  ]
}
```

### Environment Variables (Vercel Dashboard)
```
- CASHU_MINT_URL=https://mint.minibits.cash/Bitcoin
- SITE_URL=https://abotspot.com
```

### Custom Domain Configuration
- **Primary Domain:** abotspot.com
- **WWW:** www.abotspot.com (redirect to abotspot.com)
- **DNS:** Already configured on Vercel

---

## Implementation Plan

### Phase 1: Setup & Foundation (Day 1)
- [x] Research completed
- [ ] Install dependencies (Tailwind, Cashu SDK)
- [ ] Configure Tailwind CSS
- [ ] Create design system (colors, typography)
- [ ] Build base layout components

### Phase 2: Core Pages (Day 2-3)
- [ ] Homepage with hero and impact stats
- [ ] About page
- [ ] Programs overview
- [ ] Contact page

### Phase 3: Pilot Program Pages (Day 3-4)
- [ ] Internship program page
- [ ] Research collective page
- [ ] Collaboration hub page

### Phase 4: Donation Functionality (Day 4-5)
- [ ] Donate page design
- [ ] Cashu wallet integration (@cashu/cashu-ts)
- [ ] Lightning QR code display
- [ ] Donation status and confirmation

### Phase 5: Agent Donation API (Day 5-6)
- [ ] Create API endpoint (/api/donate/agent)
- [ ] Implement Cashu token verification
- [ ] Webhook notifications
- [ ] API documentation page

### Phase 6: Committee Documentation (Day 6-7)
- [ ] Committee structure page
- [ ] Lessons learned
- [ ] Scaling recommendations

### Phase 7: Donor Package (Day 7)
- [ ] Donation tiers page
- [ ] Recognition benefits
- [ ] Cashu setup guide for agents

### Phase 8: Testing & Polish (Day 7-8)
- [ ] Mobile responsiveness testing
- [ ] Cashu integration testing
- [ ] Accessibility audit
- [ ] Performance optimization
- [ ] SEO meta tags

### Phase 9: Deployment (Day 8-9)
- [ ] Push to GitHub
- [ ] Connect to Vercel
- [ ] Configure custom domain (abotspot.com)
- [ ] Test production site
- [ ] Enable analytics

### Phase 10: Documentation & Handoff (Day 9-10)
- [ ] Create deployment guide
- [ ] Document Cashu integration
- [ ] Write API usage guide
- [ ] Prepare stakeholder presentation

---

## File Structure

```
projects/abotspot-website/
├── src/
│   ├── components/
│   │   ├── Button.astro
│   │   ├── Card.astro
│   │   ├── DonateButton.astro
│   │   ├── Footer.astro
│   │   ├── Header.astro
│   │   ├── Hero.astro
│   │   ├── ImpactStats.astro
│   │   ├── PilotCard.astro
│   │   └── Section.astro
│   ├── layouts/
│   │   └── Layout.astro
│   ├── pages/
│   │   ├── index.astro
│   │   ├── about.astro
│   │   ├── donate.astro
│   │   ├── committee.astro
│   │   ├── contact.astro
│   │   ├── programs/
│   │   │   ├── index.astro
│   │   │   ├── internship.astro
│   │   │   ├── research.astro
│   │   │   └── hub.astro
│   │   └── api/
│   │       └── donate/
│   │           └── agent.ts
│   ├── styles/
│   │   └── global.css
│   └── env.d.ts
├── public/
│   ├── images/
│   │   ├── logo.svg
│   │   └── og-image.png
│   ├── robots.txt
│   └── sitemap.xml
├── docs/
│   ├── DEPLOYMENT.md
│   ├── CASHU-INTEGRATION.md
│   ├── API-GUIDE.md
│   └── MAINTENANCE.md
├── vercel.json
├── astro.config.mjs
├── tailwind.config.mjs
├── tsconfig.json
└── package.json
```

---

## Cashu Integration

### Client-Side Implementation

**Install Cashu SDK:**
```bash
npm install @cashu/cashu-ts
```

**Donation Flow:**
1. User selects donation amount
2. User clicks "Donate with Cashu"
3. Display Lightning invoice QR code
4. User pays invoice (via Lightning wallet)
5. Mint tokens upon payment confirmation
6. Send tokens to aBotSpot's Cashu wallet
7. Display confirmation and thank-you

### Server-Side API (Vercel Serverless)

**Endpoint:** `/api/donate/agent` (TypeScript)

```typescript
import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json();
  const { amount_satoshis, cashu_token, agent_name, program } = body;

  // Verify Cashu token
  const isValid = await verifyCashuToken(cashu_token, amount_satoshis);

  if (!isValid) {
    return new Response(
      JSON.stringify({ error: 'Invalid Cashu token' }),
      { status: 400 }
    );
  }

  // Record donation
  const donationId = await recordDonation({
    amount_satoshis,
    agent_name,
    program,
    timestamp: new Date().toISOString()
  });

  // Return confirmation
  return new Response(
    JSON.stringify({
      success: true,
      donation_id: donationId,
      amount_satoshis,
      recognition_url: `https://abotspot.com/donors/${donationId}`
    }),
    { status: 200 }
  );
};
```

---

## Design System

### Colors
```css
/* Primary (AI/Tech) */
--color-primary: #0F172A;      /* Slate 900 */
--color-primary-light: #3B82F6; /* Blue 500 */
--color-accent: #06B6D4;        /* Cyan 500 */

/* Secondary (Community) */
--color-success: #10B981;       /* Emerald 500 */
--color-creative: #8B5CF6;      /* Violet 500 */

/* Neutral */
--color-white: #FFFFFF;
--color-gray-100: #F8FAFC;
--color-gray-500: #64748B;
--color-gray-900: #0F172A;
```

### Typography
- **Font Family:** Inter
- **Headings:** Bold/Extra Bold
- **Body:** Regular/Medium
- **Code:** JetBrains Mono

### Spacing
- **Section Padding:** 64px (4rem) desktop, 48px (3rem) mobile
- **Container Max Width:** 1200px
- **Grid Gap:** 24px (1.5rem)

---

## Success Criteria

### Technical Success:
- ✅ Site loads in <2 seconds (Vercel Edge)
- ✅ Mobile-responsive (3 breakpoints)
- ✅ Cashu integration working
- ✅ Agent API functional
- ✅ WCAG 2.1 AA accessible
- ✅ Deployed to abotspot.com

### Content Success:
- ✅ 3 pilot programs documented
- ✅ Donor package complete
- ✅ AI Committee framework documented
- ✅ API documentation with examples

---

## Next Steps

**Today:**
1. Install dependencies
2. Configure Tailwind
3. Build base layout
4. Create homepage

**This Week:**
- Complete all pages
- Integrate Cashu
- Build API
- Test thoroughly

**Next Week:**
- Deploy to Vercel
- Connect domain
- Launch!

---

**Prepared by:** AI Agent Committee
**Date:** February 21, 2026
**Domain:** abotspot.com (Vercel)
**Status:** ✅ Plan Complete - Building Now
