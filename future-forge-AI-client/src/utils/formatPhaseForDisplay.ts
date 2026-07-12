export function formatPhaseForDisplay(phaseData: any, overridePhaseNumber?: number) {
  if (!phaseData) return null;

  return {
    ...phaseData,
    ...(overridePhaseNumber && { phaseNumber: overridePhaseNumber }),
    status: "active",
    milestones: (phaseData.milestones || []).map((milestone: any, index: number) => ({
      ...milestone,
      status: milestone.done ? "completed" : index === 0 ? "in-progress" : "next-up",
      help: {
        ...milestone.help,
        steps: (milestone.help?.steps || []).map((step: string | any, stepIndex: number) =>
          typeof step === "string"
            ? { id: `${milestone.id}-s${stepIndex + 1}`, label: step, done: false }
            : step
        ),
        resources: milestone.help?.resources || [],
      },
    })),
  };
}
