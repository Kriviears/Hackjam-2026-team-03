import { useState } from "react";

const INTERESTS = ["Web development", "Data", "Cybersecurity", "Devops", "Not sure yet"];

export default function AspiringOnboarding({ onForge }: Props) {
  const [experience, setExperience] = useState("new");
  const [interests, setInterests] = useState<string[]>([]);
  const [triedTraining, setTriedTraining] = useState("no");
  const [targetRole, setTargetRole] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState("");
  const [exploringBootcamp, setExploringBootcamp] = useState("no");

  const toggleInterest = (interest: string) => {
    setInterests((prev) =>
      prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]
    );
  };

  const addSkill = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // KeyboardEvent for input: check for Enter key
    if ((e as React.KeyboardEvent).key === "Enter" && skillInput.trim()) {
      e.preventDefault();
      if (!skills.includes(skillInput.trim())) setSkills([...skills, skillInput.trim()]);
      setSkillInput("");
    }
  };

  const removeSkill = (skill: string) => setSkills(skills.filter((s) => s !== skill));

  const handleForge = () => {
    const payload =
      experience === "new"
        ? { experience, interests, triedTraining }
        : { experience, targetRole, skills, exploringBootcamp };
    onForge?.(payload);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-semibold text-offwhite mb-2">Let's find your starting point</h1>
        <p className="text-silver">A few quick questions so FutureForge can tailor your path.</p>
      </div>

      <div className="space-y-4">
        <div className="flex gap-3">
          <button
            onClick={() => setExperience("new")}
            className={`flex-1 px-4 py-2 rounded-md font-medium transition ${experience === "new"
                ? "bg-royalblue text-black" : "border border-bordergray text-silver hover:border-royalblue"}`} >
            New to tech
          </button>

          <button
            onClick={() => setExperience("some")}
            className={`flex-1 px-4 py-2 rounded-md font-medium transition ${experience === "some"
                ? "bg-royalblue text-black" : "border border-bordergray text-silver hover:border-royalblue"
              }`} >Some experience
          </button>
        </div>

        {experience === "new" && (
          <>
            <label >Which of these sounds interesting?</label>
            <div>
              {INTERESTS.map((interest) => (
                <button key={interest} type="button" onClick={() => toggleInterest(interest)}>
                  {interest}
                </button>
              ))}
            </div>

            <label >Have you looked into any tech training programs yet?</label>
            <div >
              <button type="button" onClick={() => setTriedTraining("yes")}>Yes</button>
              <button type="button" onClick={() => setTriedTraining("no")}>
                No
              </button>
            </div>
          </>
        )}

        {experience === "some" && (
          <div className="space-y-4 mt-6 pt-6 border-t border-bordergray">
            <div className="space-y-2">
              <label className="text-silver text-sm">Target role</label>
              <input
                value={targetRole} onChange={(e) => setTargetRole(e.target.value)} placeholder="e.g. Frontend developer, or Not sure yet"
                list="target-role-options"
                className="w-full bg-matteblack border border-bordergray text-offwhite rounded-md px-3 py-2 focus:outline-none focus:border-royalblue"
              />
              <datalist id="target-role-options">
                <option value="Not sure yet" />
              </datalist>
            </div>

            <div className="space-y-2">
              <label className="text-silver text-sm">Current skills</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="bg-softblack border border-royalblue text-offwhite px-3 py-1 rounded-full text-sm flex items-center gap-2"
                  >
                    {skill}
                    <button type="button" onClick={() => removeSkill(skill)} aria-label={`Remove ${skill}`}
                      className="text-royalblue hover:text-offwhite font-bold"> × </button>
                  </span>
                ))}
              </div>
              <input value={skillInput} onChange={(e) => setSkillInput(e.target.value)} onKeyDown={addSkill} placeholder="+ Add skill (press Enter)"
                className="w-full bg-matteblack border border-bordergray text-offwhite rounded-md px-3 py-2 focus:outline-none focus:border-royalblue" />
            </div>

            <div className="space-y-2">
              <label className="text-silver text-sm">Currently exploring bootcamp programs?</label>
              <div className="flex gap-3">
                <button type="button" onClick={() => setExploringBootcamp("yes")}
                 className={`flex-1 px-4 py-2 rounded-md font-medium transition ${exploringBootcamp === "yes"
                      ? "bg-royalblue text-black": "border border-bordergray text-silver hover:border-royalblue"
                    }`}>
                  Yes
                </button>
                <button
                  type="button" onClick={() => setExploringBootcamp("no")} className={`flex-1 px-4 py-2 rounded-md font-medium transition ${exploringBootcamp === "no"
                      ? "bg-royalblue text-black" : "border border-bordergray text-silver hover:border-royalblue" }`} >
                  No
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <button
        onClick={handleForge}
        className="w-full border border-royalblue text-royalblue rounded-md py-2 font-medium hover:bg-royalblue hover:text-black transition"
      >
        Forge my path
      </button>
    </div>
  );
}

