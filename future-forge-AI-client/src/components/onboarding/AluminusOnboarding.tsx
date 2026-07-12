import { useState } from "react";
import type { OnboardingComponentProps } from "../../types/types";

export default function AluminusOnboarding({ onForge }: OnboardingComponentProps) {
  const [targetRole, setTargetRole] = useState("");
  const [skills, setSkills] = useState("");
   const [projects, setProjects] = useState("");
    const [certifications, setCertifications] = useState("");
  const [jobSearchStage, setJobSearchStage] = useState("");
  const [challenge, setChallenge] = useState("");

  const handleForge = (e: React.FormEvent) => {
    e.preventDefault();
    onForge?.({
      journeyStage: "aluminus",
      targetRole,
      currentSkills: skills,
      jobSearchStage,
      challenge,
    });
  };
  return (
    <>
      <div className="text-center mb-6">
        <h1 className="text-2xl font-semibold text-offwhite mb-2">You've graduated — let's map what's between you and your first offer</h1>
        <p className="text-silver">FutureForge will forge a personalized path to get you there.</p>
      </div>

      <form className="space-y-4" onSubmit={handleForge}>
        <div className="space-y-2">
          <label className="text-silver text-sm">Target Role</label>
          <input type="text" value={targetRole} onChange={(e) => setTargetRole(e.target.value)} placeholder="e.g., Software Engineer" className="w-full bg-matteblack border border-bordergray text-offwhite rounded-md px-3 py-2 focus:outline-none focus:border-royalblue" />
        </div>

        <div className="space-y-2">
          <label className="text-silver text-sm">Add current skills</label>
          <input type="text" value={skills} onChange={(e) => setSkills(e.target.value)} placeholder="e.g., Python, React" className="w-full bg-matteblack border border-bordergray text-offwhite rounded-md px-3 py-2 focus:outline-none focus:border-royalblue" />
        </div>
        <div className="space-y-2">
          <label className="text-silver text-sm">Notable projects</label>
          <input type="text" value={projects} onChange={(e) => setProjects(e.target.value)} placeholder="e.g., Event Manager- full-stack app" className="w-full bg-matteblack border border-bordergray text-offwhite rounded-md px-3 py-2 focus:outline-none focus:border-royalblue" />
        </div>
        <div className="space-y-2">
          <label className="text-silver text-sm">Certifications</label>
          <input type="text" value={certifications} onChange={(e) => setCertifications(e.target.value)} placeholder="e.g., CompTIA Security+" className="w-full bg-matteblack border border-bordergray text-offwhite rounded-md px-3 py-2 focus:outline-none focus:border-royalblue" />
        </div>
        <div className="space-y-2">
          <label className="text-silver text-sm">Job Search Stage</label>
          <input type="text" value={jobSearchStage} onChange={(e) => setJobSearchStage(e.target.value)} placeholder="e.g., Active, Planning" className="w-full bg-matteblack border border-bordergray text-offwhite rounded-md px-3 py-2 focus:outline-none focus:border-royalblue" />
        </div>

        <div className="space-y-2">
          <label className="text-silver text-sm">Challenge</label>
          <textarea value={challenge} onChange={(e) => setChallenge(e.target.value)} placeholder="e.g., I have applied to many jobs but haven't gotten a single interview call" className="w-full bg-matteblack border border-bordergray text-offwhite rounded-md px-3 py-2 focus:outline-none focus:border-royalblue resize-none h-20" />
        </div>

        <button type="submit" className="w-full border border-royalblue text-royalblue rounded-md py-2 font-medium hover:bg-royalblue hover:text-black transition">
          Forge my path
        </button>
      </form>
    </>
  );
}
