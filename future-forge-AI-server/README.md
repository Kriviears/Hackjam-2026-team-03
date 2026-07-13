# FutureForge AI Server

AI-powered career roadmap generation and tracking system for Per Scholas learners and alumni.

## Overview

FutureForge AI Server generates personalized career roadmaps using Claude AI. It handles:
- User onboarding data (journey stage, skills, goals, challenges)
- AI-driven phase generation based on user context
- Complete roadmap history tracking with milestone progression
- Phase outcome tracking and next phase generation

## Setup

### Prerequisites
- Node.js (v16+)
- MongoDB
- Anthropic API key

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env` file:
```
ANTHROPIC_API_KEY=your_api_key_here
MONGODB_URI=mongodb://localhost:27017/futureforge
PORT=5000
```

### Running the Server

```bash
npm start
```

## Database Schema

### User Document

```javascript
{
  // Authentication
  name: String,
  email: String (unique),
  password: String (hashed),

  // Onboarding inputs
  journeyStage: "aspiring" | "current_learner" | "alumnus",
  targetRole: String,
  graduationProgram: String,
  currentSkills: [String],
  degree: String,
  fieldOfStudy: String,
  notableProjects: [String],
  certifications: [String],
  jobSearchStage: "searching" | "employed",
  challenge: String,

  // Roadmap state
  activePhaseNumber: Number (default: 1),
  currentPhase: Phase Object,
  phaseHistory: [PhaseOutcome],

  // AI-generated fields
  readinessSnapshot: String,
  topGaps: [String],
  goal: String,

  timestamps: Date
}
```

### Phase Object

```javascript
{
  phaseNumber: Number,
  title: String,
  oneLineDescription: String,
  roadmapShape: "exploratory" | "skills-ladder" | "diagnostic-ladder",
  milestones: [Milestone]
}
```

### Milestone Object

```javascript
{
  id: String,
  title: String,
  description: String,
  category: String,
  done: Boolean,
  status: "pending" | "in-progress" | "completed",
  type: "task" | "checkpoint",
  help: {
    context: String,
    steps: [String],
    resources: [{ label, url, email }]
  },
  outcomeQuestion: String // only on checkpoint milestones
}
```

### PhaseOutcome Object (Historical)

```javascript
{
  phase: Phase,
  topGaps: [String],
  readinessSnapshot: String,
  milestonesCompleted: [String],
  checkpointResult: String,
  completedAt: Date
}
```

## API Endpoints

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user

### Roadmap Generation
- `POST /ai/recommendation` - Generate phase from Claude AI
  - Body: `{ userId, journeyStage, targetRole, currentSkills, challenge, ... }`
  - Returns: Generated phase with readinessSnapshot, topGaps, goal

### Roadmap Management
- `GET /career-path` - Fetch complete roadmap (current + past phases)
  - Query: `?userId=<id>`
  - Returns: User profile, current phase, phase history

- `POST /career-path/milestone/:milestoneId` - Update milestone status
  - Body: `{ userId, status: "pending" | "in-progress" | "completed" }`

- `POST /career-path/complete-phase` - Save completed phase to history
  - Body: `{ userId, milestonesCompleted: [String], checkpointResult: String }`

## Flow: Generating and Saving Roadmaps

### 1. User Submits Onboarding
Frontend sends onboarding data via `POST /ai/recommendation`

### 2. Claude Generates Phase
```
AI Input: User data + activePhaseNumber + previousPhaseOutcome (if phase 2+)
       ↓
Claude generates phase with:
- readinessSnapshot
- topGaps [3 items]
- phase { phaseNumber, title, roadmapShape, milestones[4] }
```

### 3. Server Saves to Database
```javascript
user.currentPhase = recommendation.phase;
user.readinessSnapshot = recommendation.readinessSnapshot;
user.topGaps = recommendation.topGaps;
user.goal = recommendation.goal;
await user.save();
```

### 4. User Works Through Phase
- Updates milestone status: `POST /career-path/milestone/:id`
- Completes all milestones and checkpoint

### 5. Phase Completion Saves to History
```javascript
await user.savePhaseOutcome(
  currentPhase,
  topGaps,
  readinessSnapshot,
  milestonesCompleted,
  checkpointResult
);
```
- Phase moves to `phaseHistory`
- `activePhaseNumber` increments
- `currentPhase` clears (ready for next generation)

### 6. Next Phase Generation
Claude now receives:
- `activePhaseNumber: 2`
- `previousPhaseOutcome: { phase 1 data, milestones completed, user feedback }`
- Generates Phase 2 informed by Phase 1 outcomes

## Key Features

✅ **Multi-persona support** - Aspirings, current learners, alumni
✅ **Dynamic phase generation** - Each phase considers previous outcomes
✅ **Complete history tracking** - All phases with gaps and readiness snapshots
✅ **Milestone status tracking** - pending → in-progress → completed
✅ **AI-informed progression** - Claude understands user journey and adjusts difficulty
✅ **Checkpoint outcomes** - Captures user's real experience for next phase

## Prompt Template

The AI uses `prompts/futureforge-roadmap-prompt.md` which:
- Follows Per Scholas MERN curriculum when applicable
- Diagnoses blocker types (skills gap, visibility, eligibility)
- Generates 4 milestones per phase (3 tasks + 1 checkpoint)
- Keeps output under 2,500 tokens
- Never generates future/locked phases

## Development

### Add a New Route

1. Create controller in `controllers/`
2. Export function
3. Add route in `routes/`
4. Mount router in `server.js`

### Database Models

Models are in `models/` directory. Use Mongoose schemas for consistency.

## Troubleshooting

**Steps not showing in UI?**
- Ensure steps are strings (Claude generates them as `steps: [String]`)
- Frontend needs to map strings to step objects with unique IDs

**Status showing "Unknown"?**
- Check milestone has `status` field in DB schema
- Ensure `status: { enum: ["pending", "in-progress", "completed"] }`

**Phase history not saving?**
- Verify `phaseHistory` field exists in User schema
- Call `user.savePhaseOutcome()` before response
- Check all required fields are passed

## File Structure

```
future-forge-AI-server/
├── controllers/          # Route handlers
├── models/              # Mongoose schemas
├── routes/              # API routes
├── services/            # Business logic (aiService)
├── prompts/             # AI system prompts
├── data/                # Static data
├── server.js            # Express setup
└── README.md            # This file
```

## Future Enhancements

- [ ] Warm introduction workflow integration
- [ ] Interview preparation tracking
- [ ] Skill decay detection for alums
- [ ] Batch phase outcome processing
- [ ] Analytics and cohort tracking

## License

Per Scholas
