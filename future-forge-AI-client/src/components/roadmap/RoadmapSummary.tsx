
import type { Roadmap } from "../../types/types";
export default function RoadmapSummary({ roadmap }: { roadmap: Roadmap }) {
  const { targetRole, readinessSnapshot, topGaps } = roadmap;

  return (
    <div className="max-w-2xl mx-auto p-8 bg-softblack border border-bordergray rounded-2xl">
      <p className="text-royalblue text-xs font-semibold mb-2">Your readiness snapshot</p>
      <h1 className="text-2xl font-semibold text-offwhite mb-6">{targetRole}</h1>

      <div className="bg-matteblack border border-bordergray rounded-lg p-5 mb-8">
        <p className="text-offwhite text-sm leading-relaxed">{readinessSnapshot}</p>
      </div>

      <p className="text-silver text-xs font-semibold uppercase tracking-wider mb-4">Top 3 things to fix first</p>
      <div className="space-y-3 mb-8">
        {topGaps.map((gap, i) => (
          <div key={i} className="flex gap-3 items-start">
            <span className="w-6 h-6 rounded-full bg-softblack border border-royalblue text-royalblue text-xs font-semibold flex items-center justify-center flex-shrink-0">
              {i + 1}
            </span>
            <span className="text-sm text-offwhite leading-relaxed mt-0.5">{gap}</span>
          </div>
        ))}
      </div>

      <button
        type="button" className="w-full py-3 px-4 rounded-md bg-royalblue text-black text-sm font-medium hover:bg-royalblue/90 transition" >
        See your full roadmap
      </button>
    </div>
  );
}
