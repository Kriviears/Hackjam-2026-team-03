import { useState } from "react"

function Onboarding(){
    const [userRole] = useState("Aspiring")

    const getHeadlineAndDescription = () => {
        switch(userRole) {
            case "Aluminus":
                return {
                    headline: "You've graduated — let's map what's between you and your first offer",
                    description: "FutureForge will forge a personalized path to get you there."
                }
            case "Learner":
                return {
                    headline: "Build your career roadmap while still learning",
                    description: "Get ahead by preparing now. We'll help you plan for internships and your first role."
                }
            case "Aspiring":
                return {
                    headline: "Ready for your next career move?",
                    description: "Let's find the perfect role that matches your experience and aspirations."
                }
            default:
                return {
                    headline: "Let's forge your future",
                    description: "Tell us about yourself to get started."
                }
        }
    }

    const renderFieldsForRole = () => {
        switch(userRole) {
            case "Aluminus":
                return (
                    <>
                        <div className="space-y-2">
                            <label className="text-silver text-sm">Target Role</label>
                            <input type="text" placeholder="e.g., Software Engineer" className="w-full bg-matteblack border border-bordergray text-offwhite rounded-md px-3 py-2 focus:outline-none focus:border-royalblue" />
                        </div>

                        <div className="space-y-2">
                            <label className="text-silver text-sm">Add current skills</label>
                            <input type="text" placeholder="e.g., Python, React" className="w-full bg-matteblack border border-bordergray text-offwhite rounded-md px-3 py-2 focus:outline-none focus:border-royalblue" />
                        </div>

                        <div className="space-y-2">
                            <label className="text-silver text-sm">Job Search Stage</label>
                            <input type="text" placeholder="e.g., Active, Planning" className="w-full bg-matteblack border border-bordergray text-offwhite rounded-md px-3 py-2 focus:outline-none focus:border-royalblue" />
                        </div>

                        <div className="space-y-2">
                            <label className="text-silver text-sm">Challenge</label>
                            <input type="text" placeholder="e.g., Enter the challenge you are facing now." className="w-full bg-matteblack border border-bordergray text-offwhite rounded-md px-3 py-2 focus:outline-none focus:border-royalblue" />
                        </div>
                    </>
                )
            case "Learner":
                return (
                    <>
                        <div className="space-y-2">
                            <label className="text-silver text-sm">Target Role</label>
                            <input type="text" placeholder="e.g., Software Engineer" className="w-full bg-matteblack border border-bordergray text-offwhite rounded-md px-3 py-2 focus:outline-none focus:border-royalblue" />
                        </div>

                        <div className="space-y-2">
                            <label className="text-silver text-sm">Current Year</label>
                            <input type="text" placeholder="e.g., 3rd Year" className="w-full bg-matteblack border border-bordergray text-offwhite rounded-md px-3 py-2 focus:outline-none focus:border-royalblue" />
                        </div>

                        <div className="space-y-2">
                            <label className="text-silver text-sm">Add current skills</label>
                            <input type="text" placeholder="e.g., Python, React" className="w-full bg-matteblack border border-bordergray text-offwhite rounded-md px-3 py-2 focus:outline-none focus:border-royalblue" />
                        </div>
                    </>
                )
            case "Aspiring":
                return (
                    <>
                        <div className="space-y-2">
                            <label className="text-silver text-sm">Target Role</label>
                            <input type="text" placeholder="e.g., Senior Software Engineer" className="w-full bg-matteblack border border-bordergray text-offwhite rounded-md px-3 py-2 focus:outline-none focus:border-royalblue" />
                        </div>

                        <div className="space-y-2">
                            <label className="text-silver text-sm">Years of Experience</label>
                            <input type="text" placeholder="e.g., 5 years" className="w-full bg-matteblack border border-bordergray text-offwhite rounded-md px-3 py-2 focus:outline-none focus:border-royalblue" />
                        </div>

                        <div className="space-y-2">
                            <label className="text-silver text-sm">Skills</label>
                            <input type="text" placeholder="e.g., Python, React, System Design" className="w-full bg-matteblack border border-bordergray text-offwhite rounded-md px-3 py-2 focus:outline-none focus:border-royalblue" />
                        </div>
                    </>
                )
            default:
                return null
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-matteblack">
            <div className="mx-auto max-w-sm px-4">
                <div className="bg-softblack border border-bordergray rounded-xl shadow-md p-6 mx-auto">
                    <div className="text-center mb-6">
                        <h1 className="text-2xl font-semibold text-offwhite mb-2">{getHeadlineAndDescription().headline}</h1>
                        <p className="text-silver">{getHeadlineAndDescription().description}</p>
                    </div>

                    <form className="space-y-4">
                        {renderFieldsForRole()}
                        <button type="submit" className="w-full border border-royalblue text-royalblue rounded-md py-2 font-medium hover:bg-royalblue hover:text-black transition">
                            Forge my path
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Onboarding;