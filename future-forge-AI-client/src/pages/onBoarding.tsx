import { useState } from "react"
import AspiringOnboarding from "@/components/onboarding/AspiringOnboarding"
import AluminusOnboarding from "@/components/onboarding/AluminusOnboarding"
import LearnerOnboarding from "@/components/onboarding/LearnerOnboarding"

function Onboarding(){
    const [userRole] = useState("Aspiring")

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

    const handleForge= ()=>{
        //API request to AI
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-matteblack">
            <div className="mx-auto max-w-sm px-4">
                <div className="bg-softblack border border-bordergray rounded-xl shadow-md p-6 mx-auto">
                    {renderOnboardingComponent()}
                </div>
            </div>
        </div>
    );
}

export default Onboarding;
