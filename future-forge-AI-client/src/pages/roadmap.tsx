import { useLocation } from "react-router-dom";
import RoadmapTimelineHorizontal from "@/components/roadmap/RoadmapTimelineHorizontal";
import type { RoadmapData } from "@/types/types";

export function Roadmap(){
    const location = useLocation();
    const roadmap = location.state?.roadmap as RoadmapData;

    if (!roadmap) {
        return <div className="text-center py-10 text-gray-400">No roadmap data available. Please complete onboarding first.</div>;
    }

    return <RoadmapTimelineHorizontal roadmap={roadmap} />
}