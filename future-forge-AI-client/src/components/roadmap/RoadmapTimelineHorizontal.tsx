import type { Milestone, MilestoneStatus, RoadmapData } from "@/types/types";
import { useState } from "react";

// Sample data matching the response shape an Express route would return
// after calling Claude and saving the result to MongoDB.
const ROADMAP: RoadmapData = {
  targetRole: "Java Full Stack Developer",
  goal: "Land a job as Java Full Stack Developer",
  readinessSnapshot:
    "You're on track with the curriculum, but the curriculum alone won't differentiate you — everyone in your cohort is building the same capstone and writing the same resume. The milestones below focus on what goes beyond the required program: things that make you stand out and build momentum before graduation.",
  topGaps: [
    "No proof of initiative beyond required coursework",
    "No informal industry contacts — only classmates and instructors so far",
    "No peer accountability structure in place for after the cohort's shared schedule ends",
  ],
  phases: [
    {
      phaseNumber: 1,
      title: "Build momentum beyond the curriculum",
      status: "completed",
      oneLineDescription: "Everyone in your cohort has the same capstone. These milestones are what set you apart.",
      milestones: [
        {
          id: "l1",
          title: "Build a second, smaller project on your own",
          description:
            "Something scoped to a weekend, outside your required capstone — an API, a CLI tool, a small integration. Shows initiative, not just curriculum completion.",
          category: "job-readiness",
          xp: 200,
          done: true,
          type: "task",
          status: "completed",
          help: {
            context:
              "Every recruiter sees the same capstone project from your entire cohort. A second, self-directed project — even a small one — is the first thing that makes your GitHub look different from everyone else's.",
            steps: [
              { id: "l1-s1", label: "Pick something small and scoped — one weekend, not one month", done: true },
              { id: "l1-s2", label: "Build and deploy it", done: true },
              { id: "l1-s3", label: "Write a short README explaining why you built it", done: true },
            ],
            resources: [
              { label: "GitHub", url: "https://github.com" },
              { label: "Project idea list (Frontend Mentor)", url: "https://frontendmentor.io" },
            ],
          },
        },
        {
          id: "l2",
          title: "Have 3 informational chats with people in your target role",
          description:
            "Not asking for a job — just learning what the day-to-day actually looks like. Lower-pressure than a referral ask, and a good first step into your target industry.",
          category: "job-readiness",
          xp: 150,
          done: false,
          type: "task",
          status: "completed",
          help: {
            context:
              "Most learners' only industry contact is their instructor. A handful of informal conversations gives you real context for interviews and starts building a network before you need one.",
            steps: [
              { id: "l2-s1", label: "Find 3 people in your target role via the Portal or LinkedIn", done: true },
              { id: "l2-s2", label: "Send a short, low-pressure message asking for 15 minutes", done: false },
              { id: "l2-s3", label: "Ask what their day-to-day actually looks like, and one thing they wish they knew starting out", done: false },
            ],
            resources: [
              { label: "Employer Possibilities Portal", url: "/portal/employers" },
              { label: "LinkedIn", url: "https://linkedin.com" },
            ],
          },
        },
        {
          id: "l3",
          title: "Contribute to one open-source issue",
          description: "Even a small one — a typo fix, a small bug, a doc update. Shows you can collaborate on someone else's codebase.",
          category: "job-readiness",
          xp: 150,
          done: false,
          type: "task",
          status: "completed",
          help: {
            context:
              "Working in an existing, unfamiliar codebase — following someone else's conventions, opening a PR, responding to review comments — is a real job skill that solo capstone projects don't teach.",
            steps: [
              { id: "l3-s1", label: "Find a beginner-friendly issue tagged 'good first issue'", done: false },
              { id: "l3-s2", label: "Fork the repo and make the change locally", done: false },
              { id: "l3-s3", label: "Open a pull request and respond to any feedback", done: false },
            ],
            resources: [
              { label: "goodfirstissue.dev", url: "https://goodfirstissue.dev" },
              { label: "GitHub", url: "https://github.com" },
            ],
          },
        },
        {
          id: "l4",
          title: "Build a target company list with notes",
          description: "10-15 companies you'd actually want to work at, with a note on why each fits — turns broad applying into a deliberate strategy.",
          category: "job-readiness",
          xp: 100,
          done: false,
          type: "task",
          status: "next-up",
          help: {
            context: "Applying broadly without a target list usually means low match quality and no way to prioritize your time once the search ramps up.",
            steps: [
              { id: "l4-s1", label: "List 10-15 companies hiring for your target role and location", done: false },
              { id: "l4-s2", label: "Note one specific reason each one fits you", done: false },
              { id: "l4-s3", label: "Check the Portal for readiness % and alumni connections at each", done: false },
            ],
            resources: [
              { label: "Employer Possibilities Portal", url: "/portal/employers" },
            ],
          },
        },
        {
          id: "l5",
          title: "Pair up with a cohort peer for weekly check-ins",
          description: "Find one classmate at a similar stage and commit to a 15-minute weekly call — share what you're stuck on and hold each other accountable.",
          category: "job-readiness",
          xp: 75,
          done: false,
          type: "task",
          status: "next-up",
          help: {
            context: "Momentum often drops off exactly when the cohort's shared structure ends. A standing peer check-in — not a PD coach requirement, just two people keeping each other honest — replaces that structure informally, before it disappears entirely at graduation.",
            steps: [
              { id: "l5-s1", label: "Find a classmate from the cohort strip working toward a similar role", done: false },
              { id: "l5-s2", label: "Agree on a recurring 15-minute weekly call or message check-in", done: false },
              { id: "l5-s3", label: "Each week, share one thing you're stuck on and one thing you finished", done: false },
            ],
            resources: [
              { label: "Your cohort", url: "/dashboard" },
            ],
          },
        },
        {
          id: "l6",
          title: "Land your first interview",
          description: "Once the milestones above are in motion, interviews should start coming.",
          category: "job-readiness",
          xp: 0,
          done: false,
          type: "checkpoint",
          status: "next-up",
          help: {
            context: "This checkpoint confirms the differentiation and organization work above is translating into real traction.",
            steps: [
              { id: "l6-s1", label: "Track responses in your job search tracker", done: false },
              { id: "l6-s2", label: "If no traction after several weeks, revisit your target company list and resume", done: false },
            ],
            resources: [
              { label: "Per Scholas interview prep", email: "coaches@perscholas.org" },
            ],
          },
        },
      ],
    },
    {
      phaseNumber: 2,
      title: "Convert interviews to offers",
      status: "active",
      oneLineDescription: "Generated once you land your first interview.",
      milestones: [],
    },
    {
      phaseNumber: 3,
      title: "Onboard and ramp up",
      status: "locked",
      oneLineDescription: "Generated once you accept an offer.",
      milestones: [],
    },
  ],
};

const STATUS_LABEL: Record<MilestoneStatus, string> = {
  completed: "Completed",
  "in-progress": "In progress",
  "next-up": "Next up",
  goal: "Goal",
};

const STATUS_COLOR: Record<MilestoneStatus, { ring: string; dot: string; text: string }> = {
  completed: { ring: "ring-emerald-400", dot: "bg-emerald-400", text: "text-emerald-300" },
  "in-progress": { ring: "ring-sky-400", dot: "bg-sky-400", text: "text-sky-300" },
  "next-up": { ring: "ring-violet-400", dot: "bg-violet-400", text: "text-violet-300" },
  goal: { ring: "ring-slate-500", dot: "bg-slate-600", text: "text-slate-400" },
};

export default function RoadmapTimelineHorizontal() {
  const [roadmap, setRoadmap] = useState(ROADMAP);
  const [selectedPhaseNumber, setSelectedPhaseNumber] = useState(1);
  const selectedPhase = roadmap.phases.find((p) => p.phaseNumber === selectedPhaseNumber) ?? roadmap.phases[0];
  const milestones = selectedPhase.milestones;

  const [selectedId, setSelectedId] = useState(
    milestones.find((m) => m.status === "in-progress")?.id ?? milestones[0]?.id
  );
  const selected: Milestone | undefined = milestones.find((m) => m.id === selectedId);

  const toggleStep = (milestoneId: string, stepId: string) => {
   
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-slate-950 rounded-2xl p-6 sm:p-8">
      {/* Phase selector tabs */}
      <div className="flex gap-2 mb-8 border-b border-slate-800">
        {roadmap.phases.map((phase) => (
          <button
            key={phase.phaseNumber}
            onClick={() => setSelectedPhaseNumber(phase.phaseNumber)}
            disabled={phase.status === "locked"}
            className={`pb-3 px-4 text-sm font-medium transition ${
              selectedPhaseNumber === phase.phaseNumber
                ? "text-sky-300 border-b-2 border-sky-300"
                : phase.status === "locked"
                ? "text-slate-600 cursor-not-allowed"
                : "text-slate-400 hover:text-slate-300"
            }`}
          >
            Phase {phase.phaseNumber}
            {phase.status === "locked" && " 🔒"}
          </button>
        ))}
      </div>

      {/* Readiness snapshot + top gaps -- new sections not in the original component */}
      <div className="mb-8">
        <p className="text-xs uppercase tracking-wide text-sky-300 mb-2">AI readiness snapshot</p>
        <p className="text-slate-300 text-sm leading-relaxed mb-4">{roadmap.readinessSnapshot}</p>
        <div className="flex flex-col gap-2">
          {roadmap.topGaps.map((gap, i) => (
            <div key={i} className="flex items-center gap-3 bg-slate-900 rounded-lg px-3 py-2">
              <span className="w-5 h-5 rounded-full bg-slate-800 text-sky-300 text-xs flex items-center justify-center">
                {i + 1}
              </span>
              <span className="text-slate-300 text-sm">{gap}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Phase context */}
      <div className="mb-6">
        <p className="text-xs uppercase tracking-wide text-slate-500 mb-1">
          Phase {selectedPhase.phaseNumber}
        </p>
        <h1 className="text-white font-semibold text-lg mb-1">{selectedPhase.title}</h1>
        <p className="text-slate-400 text-sm">{selectedPhase.oneLineDescription}</p>
      </div>

      {/* Horizontal timeline of milestones within the active phase */}
      {milestones.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 text-center mb-10">
          <p className="text-slate-400 text-sm">
            {selectedPhase.status === "locked"
              ? `🔒 This phase unlocks once you complete Phase ${selectedPhase.phaseNumber - 1}.`
              : "No milestones yet for this phase."}
          </p>
        </div>
      ) : (
        <div className="relative flex items-start justify-between mb-10">
          <div className="absolute top-4 left-4 right-4 h-0.5 bg-slate-800" />
          {milestones.map((m) => {
            const isSelected = m.id === selectedId;
            const color = STATUS_COLOR[m.status];
            return (
              <button
                key={m.id}
                onClick={() => setSelectedId(m.id)}
                className="relative z-10 flex flex-col items-center gap-2 flex-1 group"
              >
                <span
                  className={`w-8 h-8 rounded-full flex items-center justify-center ring-2 ${color.ring} ${isSelected ? "scale-110" : ""
                    } transition-transform bg-slate-950`}
                >
                  <span className={`w-3 h-3 rounded-full ${color.dot}`} />
                </span>
                <span className={`text-xs font-medium text-center leading-tight ${isSelected ? "text-white" : "text-slate-400"}`}>
                  {m.title}
                </span>
                <span className={`text-[11px] ${color.text}`}>{STATUS_LABEL[m.status]}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Full milestone detail panel -- description, context, steps, resources, xp */}
      {selected && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-white font-medium text-base">{selected.title}</h2>
            <span className={`text-xs px-2.5 py-1 rounded-full bg-slate-800 ${STATUS_COLOR[selected.status].text}`}>
              {STATUS_LABEL[selected.status]}
            </span>
          </div>

          <p className="text-slate-400 text-sm mb-3">{selected.description}</p>

          <div className="flex items-center gap-3 mb-4 text-xs text-slate-500">
            <span className="uppercase tracking-wide">{selected.category}</span>
            {selected.xp > 0 && <span>+{selected.xp} XP</span>}
            {selected.type === "checkpoint" && <span className="text-violet-300">Checkpoint</span>}
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-lg p-4 mb-4">
            <p className="text-xs uppercase tracking-wide text-slate-500 mb-1">Why this matters</p>
            <p className="text-slate-300 text-sm">{selected.help.context}</p>
          </div>

          {selected.help.steps.length === 0 ? (
            <p className="text-slate-500 text-sm">No tasks to check off here.</p>
          ) : (
            <ul className="space-y-3 mb-4">
              {selected.help.steps.map((step) => (
                <li key={step.id}>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={step.done}
                      onChange={() => toggleStep(selected.id, step.id)}
                      className="w-4 h-4 rounded accent-sky-400"
                    />
                    <span className={`text-sm ${step.done ? "text-slate-500 line-through" : "text-slate-200"}`}>
                      {step.label}
                    </span>
                  </label>
                </li>
              ))}
            </ul>
          )}

          {selected.help.resources.length > 0 && (
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500 mb-2">Resources</p>
              <ul className="space-y-1">
                {selected.help.resources.map((r, i) => (
                  <li key={i}>
                    <a
                      href={r.url ?? `mailto:${r.email}`}
                      className="text-sky-300 text-sm hover:underline"
                    >
                      {r.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
