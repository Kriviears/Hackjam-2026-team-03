import { useState } from "react";
import type { OnboardingComponentProps } from "../../types/types";
const PROGRAMS = [
  "AI-Native Software Development (MERN)",
  "Java Full Stack Development",
  "Cybersecurity",
];

const PROGRESS_OPTIONS = [
  { value: "just_started", label: "Just started" },
  { value: "mid_program", label: "Mid-program" },
  { value: "near_completion", label: "Near completion" },
];

export default function LearnerOnboarding({ onForge }: OnboardingComponentProps) {
  const [program, setProgram] = useState("");
  const [expectedCompletion, setExpectedCompletion] = useState("");
  const [targetRole, setTargetRole] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState("");
  const [progress, setProgress] = useState("");
  const [concern, setConcern] = useState("");

  const addSkill = () => {
    if (!skillInput.trim()) return;
    setSkills([...skills, skillInput.trim()]);
    setSkillInput("");
  };

  const handleSkillKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill();
    }
  };

  const handleForge = (e: React.FormEvent) => {
    e.preventDefault();
    onForge?.({
      journeyStage: "current_learner",
      program,
      expectedCompletion,
      targetRole,
      currentSkills: skills,
      progress,
      concern,
    });
  };

  return (
    <div className="px-2">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-semibold text-offwhite mb-2">
          Build your career roadmap while still learning
        </h1>
        <p className="text-silver">
          We'll help you finish strong and know exactly what comes next.
        </p>
      </div>

      <form className="space-y-4" onSubmit={handleForge}>
        <div className="space-y-2">
          <label className="text-silver text-sm">Program</label>
          <select value={program} onChange={(e) => setProgram(e.target.value)}
            className="w-full bg-matteblack border border-bordergray text-offwhite rounded-md px-3 py-2 focus:outline-none focus:border-royalblue" >
            <option value="">Select your program</option>
            {PROGRAMS.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-silver text-sm">Expected completion</label>
          <input type="text" value={expectedCompletion} onChange={(e) => setExpectedCompletion(e.target.value)} placeholder="e.g., September 2026"
            className="w-full bg-matteblack border border-bordergray text-offwhite rounded-md px-3 py-2 focus:outline-none focus:border-royalblue" />
        </div>

        <div className="space-y-2">
          <label className="text-silver text-sm">Where are you in the program?</label>
          <div className="flex gap-2">
            {PROGRESS_OPTIONS.map((opt) => (
              <button type="button" key={opt.value} onClick={() => setProgress(opt.value)}
                className={`flex-1 border rounded-md py-2 text-sm transition ${
                  progress === opt.value ? "border-royalblue text-royalblue" : "border-bordergray text-silver" }`} >
                {opt.label}
              </button>
            ))}
          </div>
        </div>        <div className="space-y-2">
          <label className="text-silver text-sm">Target role</label>
          <input type="text" value={targetRole} onChange={(e) => setTargetRole(e.target.value)} placeholder="e.g., Java Full Stack Developer"
            className="w-full bg-matteblack border border-bordergray text-offwhite rounded-md px-3 py-2 focus:outline-none focus:border-royalblue" />
        </div>

        <div className="space-y-2">
          <label className="text-silver text-sm">Current skills</label>
          <div className="flex flex-wrap gap-2 mb-2">
            {skills.map((s) => (
              <span key={s} className="text-xs bg-royalblue/10 text-royalblue rounded-md px-2 py-1">
                {s}
              </span>
            ))}
          </div>
          <input type="text" value={skillInput} onChange={(e) => setSkillInput(e.target.value)}
            onKeyDown={handleSkillKeyDown}
            placeholder="e.g., Python, React — press Enter to add"
            className="w-full bg-matteblack border border-bordergray text-offwhite rounded-md px-3 py-2 focus:outline-none focus:border-royalblue"
          />
        </div>

        <div className="space-y-2">
          <label className="text-silver text-sm">
            Challenge <span className="text-bordergray">(optional)</span>
          </label>
          <textarea
            value={concern}
            onChange={(e) => setConcern(e.target.value)}
            placeholder="e.g., I'm behind on the curriculum, or I don't know how to start job searching"
            className="w-full bg-matteblack border border-bordergray text-offwhite rounded-md px-3 py-2 focus:outline-none focus:border-royalblue"
            rows={2}
          />
        </div>

        <button
          type="submit"
          className="w-full border border-royalblue text-royalblue rounded-md py-2 font-medium hover:bg-royalblue hover:text-black transition"
        >
          Forge my path
        </button>
      </form>
    </div>
  );
}
