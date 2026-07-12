import { getOpportunities } from "@/services/service";
import { useState, useEffect } from "react";

export default function EmployerPossibilitiesPortal({ defaultRole = "Software Engineer" }) {
  const [role, setRole] = useState(defaultRole);
  const [location, setLocation] = useState("");
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searched, setSearched] = useState(false);

  const search = async (e?: any) => {
    e?.preventDefault();
    if (!role.trim()) return;

    setLoading(true);
    setError(null);
    setSearched(true);

    try {
      const data = await getOpportunities(role);
      setJobs(data);
    } catch (err) {
      setError(err.message);
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (defaultRole) search();
  }, []);

  return (
    <div className="w-full max-w-3xl mx-auto px-4">
      <form onSubmit={search} className="flex gap-2 mb-6">
        <input type="text" value={role} onChange={(e) => setRole(e.target.value)} placeholder="Full stack developer"
          className="flex-[2] px-3 py-2 rounded-md bg-zinc-900 border border-zinc-700 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        <input type="text" value={location} onChange={(e) => setLocation(e.target.value)}placeholder="City, State"
          className="flex-1 px-3 py-2 rounded-md bg-zinc-900 border border-zinc-700 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
        <button type="submit" disabled={loading || !role.trim()}
          className="px-4 py-2 rounded-md bg-indigo-600 text-white font-medium hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition">
          {loading ? "…" : "Search"}
        </button>
      </form>

      {error && ( <div className="rounded-md border border-red-800 bg-red-950/40 text-red-300 text-sm px-4 py-2 mb-4">
                    {error} </div>)}

      {!loading && searched && jobs.length === 0 && !error && (<EmptyState role={role} /> )}

      <div className="space-y-3">
        {jobs.map((job, i) => (<JobCard key={i} job={job} />))}
      </div>
    </div>
  );
}

// displays a single job positngs with mentor info.
function JobCard({ job }) {
  const hasMentor = job.mentors && job.mentors.length > 0;

  return (
    <div className={`rounded-xl border bg-zinc-900 px-5 py-4 ${
        hasMentor ? "border-indigo-500 border-t-2" : "border-zinc-800"
      }`}>
      <div className="flex justify-between items-start gap-4">
        <div>
          <p className="font-medium text-zinc-100">{job.title}</p>
          <p className="text-sm text-zinc-400">
            {job.company} · {job.location}
          </p>
        </div>
        {job.salaryMin && (
          <span className="text-sm text-zinc-400 whitespace-nowrap">
            ${job.salaryMin.toLocaleString()}
          </span>
        )}
      </div>

      <div className="mt-3 pt-3 border-t border-zinc-800">
        {hasMentor ? (
          <div className="flex items-center gap-2 flex-wrap">
            {job.mentors.map((mentor, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-indigo-950 text-indigo-300 flex items-center justify-center text-xs font-medium">
                  {initials(mentor.name)}
                </div>
                <p className="text-sm text-zinc-300">
                  <span className="font-medium">{mentor.name}</span>
                  <span className="text-zinc-500"> works here · {mentor.role}</span>
                </p>
              </div>
            ))}
            <a
              href={job.url}
              target="_blank" rel="noopener noreferrer"
              className="ml-auto text-sm px-3 py-1.5 rounded-md border border-zinc-700 text-zinc-200 hover:bg-zinc-800 transition-colors">
              View posting
            </a>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <p className="text-sm text-zinc-500">No alumni mentor at this company yet</p>
            <a
              href={job.url}
              target="_blank"  rel="noopener noreferrer"
              className="text-sm px-3 py-1.5 rounded-md border border-zinc-700 text-zinc-200 hover:bg-zinc-800 transition-colors">
              View posting
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

function EmptyState({ role }) {
  return (
    <div className="text-center py-12 border border-dashed border-zinc-800 rounded-xl">
      <p className="text-zinc-300 font-medium mb-1">No openings found for "{role}"</p>
      <p className="text-sm text-zinc-500">Try a broader role or a different location.</p>
    </div>
  );
}

function initials(name: string) {
  const words = name.split(" ");
  const letters = words.slice(0, 2).map(w => w[0]).join("");
  return letters.toUpperCase();
}
