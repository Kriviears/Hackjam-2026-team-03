import type { Milestone, MilestoneStatus, RoadmapData } from "@/types/types";
import { useState, useEffect } from "react";

interface RoadmapTimelineProps {
  roadmap: RoadmapData;
}

export default function RoadmapTimelineHorizontal({ roadmap }: RoadmapTimelineProps) {

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

  const [selectedPhaseNumber, setSelectedPhaseNumber] = useState(1);
  const selectedPhase = roadmap.phases.find((p) => p.phaseNumber === selectedPhaseNumber) ?? roadmap.phases[0];
  const milestones = selectedPhase.milestones;
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>({});

  const [selectedId, setSelectedId] = useState(
    milestones.find((m) => m.status === "in-progress")?.id ?? milestones[0]?.id
  );
  const selected: Milestone | undefined = milestones.find((m) => m.id === selectedId);

  const toggleStep = (stepId: string) => {
  setCompletedSteps((prev) => ({
    ...prev,
    [stepId]: !prev[stepId]  // example stepId - "m1-s1"
  }));
};

  useEffect(() => {
    if (selected && selected.help.steps.length > 0) {
      const allStepsCompleted = selected.help.steps.every((step) => completedSteps[step.id]);

      if (allStepsCompleted && selected.status !== "completed") {
        selected.status = "completed";

        const nextMilestone = milestones.find((m) => m.status === "in-progress");
        if (nextMilestone) {
          setSelectedId(nextMilestone.id);
        }
      }
    }
  }, [completedSteps, selected, milestones]);

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
                      checked={completedSteps[step.id] || false}
                      onChange={() => toggleStep(step.id)}
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
