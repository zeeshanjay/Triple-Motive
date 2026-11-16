# Triple Motive // Brand Strategy Atelier

> **Relational Architecture Over Transactional Marketing.**  
> Great companies don't just market products—they architect emotional brand stories that cultivate empathy, visceral trust, and generational loyalty.

A bespoke, editorial-grade interactive web experience built for **Triple Motive** (full-service brand strategy and marketing agency).

---

## Brand Architecture & System Overview

- **Core Thesis**: Moving modern enterprises from transactional feature-pushing to relational belief and identity anchoring.
- **Visual Direction**: Editorial off-white canvas (`#F2EFE9`), deep ink typography (`#111111`), electric cobalt interactive accents (`#1D4ED8`), and physical paper grain texture.
- **Hero Centerpiece**: Procedural, real-time 3D kinetic brand monument in React Three Fiber representing the interlocking **TM** monogram with titanium & cobalt physical materials.
- **Full-Page Navigation**: High-contrast editorial menu overlay with live atelier telemetry (Denver HQ, NYC SoHo, London Mayfair).
- **Backend & Persistence**: Confidential client inquiry desk backed by **Supabase** (`liberty-science`) with RLS enforcement and local persistent redundancy.

---

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **3D & Spatial Shaders**: Three.js, `@react-three/fiber`, `@react-three/drei`
- **Motion & Smooth Scroll**: Framer Motion, Lenis Smooth Scroll
- **Database**: Supabase PostgreSQL (`@supabase/supabase-js`)

---

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Setup
Configure your `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Run Locally
```bash
npm run dev
# or for production build
npm run build
npm run start
```
Visit `http://localhost:3000`.

---

## Contact & Studio Telemetry
- **Denver Headquarters**: +1 (303) 242-2757
- **Direct Communications**: lisa@triplemotive.net
- **Ateliers**: Denver &middot; New York &middot; London

&copy; Triple Motive Strategy Atelier. All rights reserved.
