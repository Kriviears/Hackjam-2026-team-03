import { useState } from "react"
import AspiringOnboarding from "../components/onboarding/AspiringOnboarding"
import AluminusOnboarding from "../components/onboarding/AluminusOnboarding"
import LearnerOnboarding from "../components/onboarding/LearnerOnboarding"
import { sampleRoadmap } from "../data/roadmapSummaryStaticData";
import RoadmapSummary from "../components/roadmap/RoadmapSummary";
function Onboarding(){
    const [userRole] = useState("Learner");
    const [status, setStatus] = useState("intake") // "intake" | "loading" | "summary" | "detail" | "error"
    const [roadmap, setRoadmap] = useState(null);
    const [errorMsg, setErrorMsg] = useState("");
    
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

    const handleForge = () => {
        setStatus("loading")
        setErrorMsg("")
        try {
            // Temporary: use static sample data instead of calling the API.
            const data = sampleRoadmap
            setRoadmap(data)
            setStatus("summary")

        } catch (err) {
            setErrorMsg(err.message)
            setStatus("error")
        }
    }

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

