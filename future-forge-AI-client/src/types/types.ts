export type OnboardingComponentProps = {
  onForge?: (payload: Record<string, any>) => void;
};


export interface Roadmap {
  targetRole: string;
  readinessSnapshot: string;
  topGaps: string[];
}

/** roadmap milestone props */

export type MilestoneStatus = "completed" | "in-progress" | "next-up" | "goal";

export interface Resource {
  label: string;
  url?: string;
  email?: string;
}

export interface Step {
  id: string;
  label: string;
  done: boolean;
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  category: string;
  xp: number;
  done: boolean;
  type: "task" | "checkpoint";
  status: MilestoneStatus; // derived on the frontend from done/phase position, see deriveStatus()
  help: {
    context: string;
    steps: Step[];
    resources: Resource[];
  };
}

export interface Phase {
  phaseNumber: number;
  title: string;
  status: "active" | "locked" | "completed";
  oneLineDescription: string;
  milestones: Milestone[];
}

export interface RoadmapData {
  targetRole: string;
  goal: string;
  readinessSnapshot: string;
  topGaps: string[];
  phases: Phase[];
}
