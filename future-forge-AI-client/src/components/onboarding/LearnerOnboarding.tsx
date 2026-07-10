export default function LearnerOnboarding() {
  return (
    <>
      <div className="text-center mb-6">
        <h1 className="text-2xl font-semibold text-offwhite mb-2">Build your career roadmap while still learning</h1>
        <p className="text-silver">Get ahead by preparing now. We'll help you plan for internships and your first role.</p>
      </div>

      <form className="space-y-4">
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

        <button type="submit" className="w-full border border-royalblue text-royalblue rounded-md py-2 font-medium hover:bg-royalblue hover:text-black transition">
          Forge my path
        </button>
      </form>
    </>
  )
}
