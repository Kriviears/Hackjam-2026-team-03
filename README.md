# Future Forge AI - Career Development Platform

**Future Forge AI** is an intelligent career development platform that generates personalized, AI-powered learning roadmaps to help users transition into their target roles and land their dream jobs.

> 📚 **For Detailed Technical Documentation:**
> - **Frontend (React)**: See [future-forge-AI-client/README.md](future-forge-AI-client/README.md)
> - **Backend (Node.js)**: See [future-forge-AI-server/README.md](future-forge-AI-server/README.md)

## 🎯 Features

- **AI-Generated Roadmaps** - Personalized career paths based on user profile, skills, and goals
- **Interactive Timeline** - Visual phase-by-phase milestone tracking with checkpoint celebrations
- **Progress Tracking** - Mark milestones as complete and monitor career progression
- **Dynamic Phase Generation** - Automatically generates next phase milestones based on user feedback
- **Job Landing Detection** - Special milestone tracking for job landing achievements
- **Tech Community Network** - Find and connect with local tech communities
- **Employer Portal** - Explore job opportunities matching your profile
- **Responsive Dashboard** - Real-time progress overview and quick navigation

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **Axios** - HTTP client

### Backend
- **Node.js/Express** - Server runtime & API framework
- **MongoDB** - Database
- **Google Places API** - Tech community discovery

## 📁 Project Structure

```
├── future-forge-AI-client/          # Frontend React application
│   ├── src/
│   │   ├── components/
│   │   │   ├── onboarding/         # User onboarding flows
│   │   │   ├── roadmap/            # Roadmap visualization
│   │   │   ├── navbar/             # Navigation
│   │   │   └── ...
│   │   ├── pages/
│   │   │   ├── onBoarding.tsx      # Onboarding entry point
│   │   │   ├── roadmap.tsx         # Roadmap viewer
│   │   │   ├── dashboard.tsx       # Dashboard
│   │   │   └── ...
│   │   ├── services/
│   │   │   └── service.ts          # API calls
│   │   ├── types/
│   │   │   └── types.ts            # TypeScript interfaces
│   │   └── utils/
│   │       ├── formatPhaseForDisplay.ts    # Phase transformation
│   │       └── generatePhaseTemplate.ts   # Placeholder generation
│   └── package.json
│
└── future-forge-AI-server/          # Backend Express application
    ├── controllers/
    │   ├── careerController.js      # Career/roadmap logic
    │   └── ...
    ├── models/
    │   ├── User.js                  # User schema
    │   └── ...
    ├── routes/
    │   ├── careerRoutes.js          # Career endpoints
    │   └── ...
    ├── services/
    │   └── googlePlacesService.js   # Tech group discovery
    └── package.json
```

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- MongoDB instance
- Google Places API key

### Run Both Services

```bash
# Terminal 1: Frontend
cd future-forge-AI-client
npm install
npm run dev
# Runs on http://localhost:5173

# Terminal 2: Backend
cd future-forge-AI-server
npm install
npm start
# Runs on http://localhost:5000
```

For detailed setup instructions, see:
- [Frontend Setup](future-forge-AI-client/README.md#-quick-start)
- [Backend Setup](future-forge-AI-server/README.md#-getting-started)

## 📋 Key Workflows

### 1. Onboarding Flow
1. User selects their role (current_learner, alumnus, aspiring)
2. Fills in profile, skills, and career goals
3. AI generates personalized roadmap
4. First phase is displayed in summary view
5. User navigates to detailed roadmap view

### 2. Roadmap Journey
1. User views phases with milestones
2. Completes milestone tasks and checks them off
3. When all steps in a milestone are complete → "Celebrate" button appears
4. User clicks celebrate → ForgeNextPhaseDialog opens
5. User provides feedback and challenge for next phase
6. Backend generates next phase AI recommendations
7. Roadmap updates with new phase + placeholder for phase after

### 3. Fetching User Roadmap
- When accessing roadmap directly, app fetches from backend using userId
- Backend retrieves user's saved phases (currentPhase + pastPhases)
- Data is transformed to match frontend Phase interface
- Falls back to localStorage if backend unavailable

## 🔌 API Endpoints Summary

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/career-path` | GET | Fetch user's saved roadmap |
| `/career-path/complete-phase` | POST | Mark phase as complete |
| `/ai/recommendation` | POST | Generate initial or next phase |
| `/opportunities` | GET | Get job opportunities |
| `/techGroups` | GET | Get tech communities |

**See [future-forge-AI-server/README.md](future-forge-AI-server/README.md#-api-endpoints) for complete API documentation.**

## 🔄 Core Data Structures

The platform uses these main data structures:

- **RoadmapData** - User's complete career roadmap with phases
- **Phase** - A phase in the roadmap with milestones (e.g., "Foundation", "Specialization")
- **Milestone** - Individual milestones within a phase (e.g., "Learn JavaScript")
- **Step** - Actionable tasks within a milestone (e.g., "Complete tutorial X")

**Full type definitions**: [src/types/types.ts](future-forge-AI-client/src/types/types.ts)

## 🔑 Environment Setup

Create `.env` files in both directories:

**Frontend** (`future-forge-AI-client/.env`):
```
VITE_API_BASE_URL=http://localhost:5000
```

**Backend** (`future-forge-AI-server/.env`):
```
MONGODB_URI=mongodb://localhost:27017/future-forge
PORT=5000
GOOGLE_PLACES_API_KEY=your_api_key_here
```

**Detailed setup**: 
- [Frontend](future-forge-AI-client/README.md#-environment-variables)
- [Backend](future-forge-AI-server/README.md#-environment-variables)

## 🐛 Troubleshooting

**Common issues and solutions:**

| Issue | Solution |
|-------|----------|
| "User ID required" error | Ensure userId is sent in request (query/body) |
| Roadmap not loading | Check localStorage for user data, verify backend running |
| Milestone status undefined | Ensure phases are transformed with `formatPhaseForDisplay` |
| Phase numbers skipped | Calculate next phase number dynamically, not hardcoded |
| API calls failing | Check DevTools Network tab, verify `.env` variables |

**For more troubleshooting:**
- [Frontend Debugging](future-forge-AI-client/README.md#-debugging-tips)
- [Backend Issues](future-forge-AI-server/README.md#-common-issues--fixes)

## 📝 Development

### Key Principles
- ✅ Always use TypeScript interfaces
- ✅ Transform backend data with `formatPhaseForDisplay`
- ✅ Include userId in all backend requests
- ✅ Test both new user and returning user flows
- ✅ Fallback to localStorage for offline support

### Workflow

```bash
# Create feature branch
git checkout -b feature/your-feature

# Make changes and test
cd future-forge-AI-client && npm run dev   # Frontend
cd future-forge-AI-server && npm start     # Backend

# Build check
npm run build

# Commit with clear message
git commit -m "feat: description of changes"
```

**See detailed development guides:**
- [Frontend Development](future-forge-AI-client/README.md#-development-workflow)
- [Backend Development](future-forge-AI-server/README.md#-development-guidelines)

## 🤝 Contributing

1. **Create feature branch**: `git checkout -b feature/your-feature`
2. **Make changes**: Update code in client or server
3. **Test thoroughly**: Test both new and existing flows
4. **Commit with clear message**: `git commit -m "feat: description"`
5. **Open PR** for code review

## 📚 Documentation

- **[Frontend Technical Guide](future-forge-AI-client/README.md)** - Components, services, development
- **[Backend Technical Guide](future-forge-AI-server/README.md)** - API, controllers, database
- **[Types Reference](future-forge-AI-client/src/types/types.ts)** - TypeScript interfaces
- **[API Endpoints](future-forge-AI-server/README.md#-api-endpoints)** - Complete API documentation

## 📞 Support & Troubleshooting

**Having issues?** Check:
1. Browser **Console** for error messages
2. DevTools **Network tab** for API responses
3. **localStorage** for user data: `localStorage.getItem('user')`
4. **Database** for user/phase data integrity
5. Relevant **README** files for detailed guidance

**Common solutions**:
- Ensure both frontend and backend are running
- Verify `.env` files are configured correctly
- Check MongoDB connection string
- Verify Google Places API key is valid
