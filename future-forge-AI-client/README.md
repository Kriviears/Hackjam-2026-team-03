# Future Forge AI - Frontend (React)

A modern React application for AI-powered career development and personalized learning roadmaps.

## 📋 Prerequisites

- Node.js 16+
- npm or yarn

## 🚀 Quick Start

### Installation

```bash
npm install
```

### Development Server

```bash
npm run dev
```

The application will open at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure

```
src/
├── components/
│   ├── onboarding/
│   │   ├── AspiringOnboarding.tsx
│   │   ├── AluminusOnboarding.tsx
│   │   ├── LearnerOnboarding.tsx
│   │   └── CommonOnboarding.tsx
│   │
│   ├── roadmap/
│   │   ├── RoadmapTimelineHorizontal.tsx
│   │   ├── RoadmapSummary.tsx
│   │   ├── ForgeNextPhaseDialog.tsx
│   │   └── RoadmapPhase.tsx
│   │
│   └── navbar/
│       └── Navbar.tsx
│
├── pages/
│   ├── onBoarding.tsx
│   ├── roadmap.tsx
│   ├── dashboard.tsx
│   ├── Login.tsx
│   └── techNetworkGroups.tsx
│
├── services/
│   ├── service.ts
│   └── api.ts
│
├── utils/
│   ├── formatPhaseForDisplay.ts
│   └── generatePhaseTemplate.ts
│
├── types/
│   └── types.ts
│
├── App.tsx
└── main.tsx
```

## 🔧 Key Components

### Pages

#### `onBoarding.tsx`
- Orchestrates the onboarding flow
- Detects user role and renders appropriate component
- Calls `getRoadMap` to generate initial roadmap
- Entry point: `/onboarding`

#### `roadmap.tsx`
- Fetches roadmap from backend using userId
- Falls back to localStorage if unavailable
- Transforms backend phases with `formatPhaseForDisplay`
- Entry point: `/roadmap`

#### `RoadmapTimelineHorizontal.tsx`
**Main roadmap visualization**
- Phase selector tabs
- Horizontal milestone timeline
- Milestone details panel
- Step checklist with progress
- Celebrate checkpoint button
- Next phase generation dialog

#### `ForgeNextPhaseDialog.tsx`
- Collects milestone outcome feedback
- Generates next phase via backend
- Includes userId in all requests

## 🔌 API Integration

### `service.ts` Functions

```typescript
getRoadMap(data)              // Generate/update roadmap
getUserRoadmap(userId)        // Fetch user's saved roadmap
login(data)                   // User authentication
getOpportunities(role)        // Get job opportunities
getLocalTechGroups()          // Get tech communities
```

## 🎨 Styling

- **Framework**: Tailwind CSS
- **Dark theme**: slate-950, slate-900
- **Accents**: sky, violet, emerald
- **Responsive**: Mobile-first design

## 🔐 Type Safety

Core interfaces in `types/types.ts`:

```typescript
interface RoadmapData {
  targetRole: string;
  goal: string;
  readinessSnapshot: string;
  topGaps: string[];
  phases: Phase[];
}

interface Phase {
  phaseNumber: number;
  title: string;
  status: "active" | "locked" | "completed";
  milestones: Milestone[];
}

interface Milestone {
  id: string;
  title: string;
  status: "completed" | "in-progress" | "next-up" | "goal";
  help: {
    context: string;
    steps: Step[];
    resources: Resource[];
  };
}
```

## 💾 Local Storage

```javascript
localStorage.getItem('user')           // User profile & auth
localStorage.getItem('roadmap')        // Cached roadmap
localStorage.getItem('userChallenge')  // Current challenge
```

## 🔄 Data Flows

### Onboarding
1. User fills form → `handleForge()`
2. Sends userId + data to `/ai/recommendation`
3. Backend generates phases
4. `formatPhaseForDisplay()` transforms data
5. Shows summary → navigate to `/roadmap`

### Roadmap Viewer
1. Fetch from backend with userId
2. Transform phases with `formatPhaseForDisplay`
3. User selects milestone → shows details
4. Complete steps → celebrate button
5. Submit → generates next phase
6. Navigate to new phase

## 🛠️ Key Utilities

### `formatPhaseForDisplay(phaseData, phaseNumber)`
- Transforms backend phase to frontend interface
- Ensures milestones have valid status
- Validates steps and resources
- **Must be used** before rendering any phase

### `generatePhaseTemplate(phaseNumber)`
- Creates placeholder "coming soon" phase
- Maintains sequential phase numbering

## 🐛 Debugging

**Check user data:**
```javascript
console.log(JSON.parse(localStorage.getItem('user')))
```

**Check roadmap:**
```javascript
console.log(JSON.parse(localStorage.getItem('roadmap')))
```

**Network requests:**
- Open DevTools → Network tab
- Check `/ai/recommendation`, `/career-path` endpoints

## 📦 Key Dependencies

- `react` - UI
- `react-router-dom` - Routing
- `axios` - HTTP client
- `tailwindcss` - Styling
- `typescript` - Type safety
- `vite` - Build tool

## 🚀 Build & Deploy

```bash
# Build production
npm run build

# Output: dist/
```

**Environment Variables** (`.env.production`):
```
VITE_API_BASE_URL=https://your-backend-url.com
```

**Deploy to Vercel/Netlify:**
```bash
vercel
# or
netlify deploy --prod --dir=dist
```

## 🤝 Best Practices

✅ Use TypeScript interfaces for all data
✅ Transform backend data with `formatPhaseForDisplay`
✅ Include userId in backend requests
✅ Fallback to localStorage for offline
✅ Use Tailwind CSS (no custom styles)
✅ Test both new user and returning user flows
✅ Handle loading and error states

## 📝 Development

```bash
# Create feature branch
git checkout -b feature/your-feature

# Make changes
# Test: npm run dev
# Build check: npm run build

# Commit
git add .
git commit -m "feat: description"
```

## 🔗 Related Docs

- [Main Project README](../README.md) - Full project overview
- [Backend README](../future-forge-AI-server/README.md) - Server documentation
