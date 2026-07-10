export default function AluminusOnboarding() {
  return (
    <>
      <div className="text-center mb-6">
        <h1 className="text-2xl font-semibold text-offwhite mb-2">You've graduated — let's map what's between you and your first offer</h1>
        <p className="text-silver">FutureForge will forge a personalized path to get you there.</p>
      </div>

      <form className="space-y-4">
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

        <button type="submit" className="w-full border border-royalblue text-royalblue rounded-md py-2 font-medium hover:bg-royalblue hover:text-black transition">
          Forge my path
        </button>
      </form>
    </>
  )
}
