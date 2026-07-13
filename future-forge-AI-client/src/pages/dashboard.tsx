import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserRoadmap } from "@/services/service";

interface UserData {
  firstName?: string;
  email?: string;
  targetRole?: string;
}

interface RoadmapData {
  targetRole: string;
  phases: any[];
  jobStatus?: string;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [roadmap, setRoadmap] = useState<RoadmapData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = localStorage.getItem("user");
        const userData = user ? JSON.parse(user) : null;

        if (userData) {
          setUserData(userData);

          // Fetch roadmap from backend database
          const roadmapData = await getUserRoadmap(userData.id || userData._id);

          // Transform backend data to match frontend format
          if (roadmapData && roadmapData.roadmap) {
            const transformedRoadmap: RoadmapData = {
              targetRole: roadmapData.userProfile?.targetRole || "",
              phases: roadmapData.roadmap.currentPhase ? [roadmapData.roadmap.currentPhase, ...roadmapData.roadmap.pastPhases] : roadmapData.roadmap.pastPhases,
              jobStatus: roadmapData.userProfile?.jobStatus || "searching"
            };
            setRoadmap(transformedRoadmap);

            // Also save to localStorage for offline access
            localStorage.setItem("roadmap", JSON.stringify(transformedRoadmap));
          } else {
            // Fallback to localStorage if backend data not available
            const savedRoadmap = localStorage.getItem("roadmap");
            if (savedRoadmap) {
              setRoadmap(JSON.parse(savedRoadmap));
            }
          }
        }
      } catch (error) {
        console.error("Error fetching roadmap:", error);
        // Fallback to localStorage on error
        const savedRoadmap = localStorage.getItem("roadmap");
        if (savedRoadmap) {
          setRoadmap(JSON.parse(savedRoadmap));
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <p className="text-slate-400">Loading dashboard...</p>
      </div>
    );
  }

  const userName = userData?.firstName || userData?.email || "User";
  const completedPhases = roadmap?.phases.filter((p) => p.status === "completed").length || 0;
  const totalPhases = roadmap?.phases.length || 0;
  const progressPercentage = totalPhases > 0 ? Math.round((completedPhases / totalPhases) * 100) : 0;
  const currentPhase = roadmap?.phases.find((p) => p.status === "active" || p.status === "in-progress");
  const nextMilestone = currentPhase?.milestones?.find((m: any) => m.status === "in-progress" || m.status === "next-up");

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-slate-900 via-purple-900/20 to-slate-900 border-b border-slate-800 px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-2">Welcome back, {userName}! 👋</h1>
          <p className="text-slate-400 text-lg">
            {roadmap?.jobStatus === "job_landed"
              ? "You landed your first job! Keep growing your skills."
              : "Continue your journey to " + (roadmap?.targetRole || "your dream role")}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
          {/* Progress Card */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-xl p-6 hover:border-purple-500/50 transition">
            <p className="text-slate-400 text-sm font-medium mb-2">Overall Progress</p>
            <p className="text-3xl font-bold text-white mb-3">{progressPercentage}%</p>
            <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-purple-600 to-blue-600 h-full transition-all"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <p className="text-xs text-slate-500 mt-2">{completedPhases} of {totalPhases} phases complete</p>
          </div>

          {/* Current Phase Card */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-xl p-6 hover:border-sky-500/50 transition">
            <p className="text-slate-400 text-sm font-medium mb-2">Current Phase</p>
            <p className="text-3xl font-bold text-sky-300 mb-1">
              {currentPhase ? `Phase ${currentPhase.phaseNumber}` : "—"}
            </p>
            <p className="text-xs text-slate-500">
              {currentPhase?.title || "Start your journey"}
            </p>
          </div>

          {/* Next Milestone Card */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-xl p-6 hover:border-violet-500/50 transition">
            <p className="text-slate-400 text-sm font-medium mb-2">Next Milestone</p>
            <p className="text-sm text-white font-semibold mb-1">
              {nextMilestone?.title || "All caught up!"}
            </p>
            <p className="text-xs text-slate-500">
              {nextMilestone ? `+${nextMilestone.xp || 0} XP` : "Check back soon"}
            </p>
          </div>

          {/* Job Status Card */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-xl p-6 hover:border-emerald-500/50 transition">
            <p className="text-slate-400 text-sm font-medium mb-2">Career Status</p>
            <div className="flex items-center gap-2 mb-1">
              <span className={`w-2 h-2 rounded-full ${
                roadmap?.jobStatus === "job_landed" ? "bg-emerald-400" : "bg-sky-400"
              }`} />
              <p className="text-sm font-semibold text-white">
                {roadmap?.jobStatus === "job_landed" ? "Employed ✓" : "Job Searching"}
              </p>
            </div>
            <p className="text-xs text-slate-500">Keep building your skills</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold text-white mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => navigate("/roadmap")}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-medium py-3 px-6 rounded-lg transition shadow-lg hover:shadow-xl"
            >
              📍 View My Roadmap
            </button>
            <button
              onClick={() => navigate("/techNetworkGroups")}
              className="bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white font-medium py-3 px-6 rounded-lg transition shadow-lg hover:shadow-xl"
            >
              🌐 Connect with Network
            </button>
            <button
              onClick={() => navigate("/portal")}
              className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white font-medium py-3 px-6 rounded-lg transition shadow-lg hover:shadow-xl"
            >
              🏢 Explore Opportunities
            </button>
          </div>
        </div>

        {/* Roadmap Overview */}
        {roadmap && (
          <div className="mb-12">
            <h2 className="text-xl font-semibold text-white mb-4">Your Roadmap</h2>
            <div className="space-y-3">
              {roadmap.phases.map((phase, idx) => (
                <div
                  key={idx}
                  className="bg-gradient-to-r from-slate-900 to-slate-950 border border-slate-800 rounded-lg p-4 hover:border-slate-700 transition cursor-pointer"
                  onClick={() => navigate("/roadmap")}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-semibold text-white">Phase {phase.phaseNumber}</span>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          phase.status === "completed"
                            ? "bg-emerald-900/30 text-emerald-300"
                            : phase.status === "active" || phase.status === "in-progress"
                            ? "bg-sky-900/30 text-sky-300"
                            : "bg-slate-800 text-slate-400"
                        }`}>
                          {phase.status === "active" || phase.status === "in-progress" ? "In Progress" : phase.status === "completed" ? "Completed" : "Locked"}
                        </span>
                      </div>
                      <p className="text-sm text-slate-400">{phase.title}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-slate-500">
                        {phase.milestones?.length || 0} milestones
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
    </div>
    </div>
  );
}