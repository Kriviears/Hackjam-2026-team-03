export type OnboardingComponentProps = {
  onForge?: (payload: Record<string, any>) => void;
};


export interface Roadmap {
  targetRole: string;
  readinessSnapshot: string;
  topGaps: string[];
}
