import { useEffect, useState } from "react"
import AspiringOnboarding from "../components/onboarding/AspiringOnboarding"
import AluminusOnboarding from "../components/onboarding/AluminusOnboarding"
import LearnerOnboarding from "../components/onboarding/LearnerOnboarding"
import RoadmapSummary from "../components/roadmap/RoadmapSummary";
import { getRoadMap } from "@/services/claudeApi";
import type { RoadmapData } from "@/types/types";
function Onboarding(){
    const [userRole] = useState("Aluminus");
    const [status, setStatus] = useState("intake") // "intake" | "loading" | "summary" | "detail" | "error"
    const [roadmap, setRoadmap] = useState<RoadmapData | null>(null);
    const [errorMsg, setErrorMsg] = useState("");
    const [formData, setFormData] = useState<Record<string, any> | null>(null);
    
    const renderOnboardingComponent = () => {
        switch(userRole) {
            case "Aluminus":
                return <AluminusOnboarding onForge={handleForge} />
            case "Learner":
                return <LearnerOnboarding onForge={handleForge} />
            case "Aspiring":
                return <AspiringOnboarding onForge={handleForge} />
            default:
                return null
        }
    }

    const handleForge = (data: Record<string, any>) => {
        console.log(data);
        setFormData(data);
        setStatus("loading");
        setErrorMsg("");
    }

    useEffect(()=>{
       if (status !== "loading") return;
       const fetchRoadmap = async ()=>{
            try {
            if (!formData) {
                setErrorMsg("Missing form data");
                setStatus("error");
                return;
            }

            const responseData = await getRoadMap(formData);
            // Transform API response to match component format
            const rec = responseData.recommendation || responseData;

            // Transform the first phase's milestones to add status field and fix steps structure
            const firstPhase = rec.phases?.[0] || rec.phase;
            const transformedPhase = firstPhase ? {
              ...firstPhase,
              status: "active",
              milestones: (firstPhase.milestones || []).map((m: any, index: number) => ({
                ...m,
                status: m.done ? "completed" : index === 0 ? "in-progress" : "next-up",
                help: {
                  ...m.help,
                  steps: (m.help?.steps || []).map((step: string | any, stepIndex: number) =>
                    typeof step === "string"
                      ? { id: `${m.id}-s${stepIndex + 1}`, label: step, done: false }
                      : step
                  ),
                  resources: m.help?.resources || [],
                },
              })),
            } : null;

            const transformedRoadmap = {
              targetRole: rec.targetRole,
              goal: rec.goal,
              readinessSnapshot: rec.readinessSnapshot,
              topGaps: rec.topGaps,
              phases: transformedPhase ? [
                transformedPhase,
                { phaseNumber: 2, title: "Convert to offers", status: "locked", oneLineDescription: "Unlocks after landing your first interview", milestones: [] },
                { phaseNumber: 3, title: "Onboard and ramp", status: "locked", oneLineDescription: "Unlocks after accepting an offer", milestones: [] },
              ] : [],
            };
            setRoadmap(transformedRoadmap);
            setStatus("summary");

        } catch (err) {
            const message = (err as any)?.message ?? String(err);
            setErrorMsg(message);
            setStatus("error")
        }
       }
       fetchRoadmap();
    },[status, formData])

    return (
        <div className="min-h-screen flex items-center justify-center bg-matteblack">
            <div className="mx-auto max-w-sm px-4">
                <div className="bg-softblack border border-bordergray rounded-xl shadow-md p-6 mx-auto">
                    {status==="intake" && renderOnboardingComponent()}
                    {status==="loading" && <p className="text-gray-400 text-center py-10">Building your roadmap…</p>}
                    {status==="summary" && roadmap && <RoadmapSummary roadmap={roadmap as any}  />}
                    {status === "error" && 
                       <div className="text-center py-10">
                            <p className="text-white mb-4">{errorMsg}</p>
                            <button onClick={() => setStatus("intake")} className="text-blue-400 underline">
                                Try again
                            </button>
                        </div>
                    }  
                </div>
            </div>
        </div>
    );
}

export default Onboarding;

