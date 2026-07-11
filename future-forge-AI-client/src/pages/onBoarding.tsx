import { useEffect, useState } from "react"
import AspiringOnboarding from "../components/onboarding/AspiringOnboarding"
import AluminusOnboarding from "../components/onboarding/AluminusOnboarding"
import LearnerOnboarding from "../components/onboarding/LearnerOnboarding"
import RoadmapSummary from "../components/roadmap/RoadmapSummary";
import { getRoadMap } from "@/services/claudeApi";
function Onboarding(){
    const [userRole] = useState("Learner");
    const [status, setStatus] = useState("intake") // "intake" | "loading" | "summary" | "detail" | "error"
    const [roadmap, setRoadmap] = useState(null);
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
            setRoadmap(responseData);
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
                    {status==="summary" && <RoadmapSummary roadmap={roadmap}  />}
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

