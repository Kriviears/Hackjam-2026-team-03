import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import RoadmapTimelineHorizontal from "@/components/roadmap/RoadmapTimelineHorizontal";
import { getUserRoadmap } from "@/services/service";
import type { RoadmapData } from "@/types/types";

export function Roadmap(){
    const location = useLocation();
    const [roadmap, setRoadmap] = useState<RoadmapData | null>(location.state?.roadmap || null);
    const [loading, setLoading] = useState(!location.state?.roadmap);

    useEffect(() => {
        if (roadmap) return; // Already have data from navigation state

        const fetchRoadmapData = async () => {
            try {
                // Try backend first
                const user = localStorage.getItem("user");
                if (user) {
                    const userData = JSON.parse(user);
                    const userId = userData.id || userData._id;

                    if (userId) {
                        const backendData = await getUserRoadmap(userId);

                        if (backendData?.roadmap) {
                            const transformedRoadmap: RoadmapData = {
                                targetRole: backendData.userProfile?.targetRole || "",
                                phases: backendData.roadmap.currentPhase
                                    ? [backendData.roadmap.currentPhase, ...backendData.roadmap.pastPhases]
                                    : backendData.roadmap.pastPhases || [],
                                goal: backendData.goal || "",
                                readinessSnapshot: backendData.readinessSnapshot || "",
                                topGaps: backendData.topGaps || []
                            };
                            setRoadmap(transformedRoadmap);
                            setLoading(false);
                            return;
                        }
                    }
                }

                // Fallback to localStorage
                const savedRoadmap = localStorage.getItem("roadmap");
                if (savedRoadmap) {
                    setRoadmap(JSON.parse(savedRoadmap));
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

        fetchRoadmapData();
    }, []);

    if (loading) {
        return <div className="text-center py-10 text-gray-400">Loading roadmap...</div>;
    }

    if (!roadmap) {
        return <div className="text-center py-10 text-gray-400">No roadmap data available. Please complete onboarding first.</div>;
    }

    return <RoadmapTimelineHorizontal roadmap={roadmap} />
}