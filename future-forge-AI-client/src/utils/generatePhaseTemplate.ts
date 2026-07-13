export function generatePhaseTemplate(phaseNumber: number) {
  return {
    phaseNumber,
    title: `Phase ${phaseNumber}`,
    status: "locked",
    oneLineDescription: `Phase ${phaseNumber}`,
    milestones: []
  };
}

export function shouldGenerateNextPhase(): boolean {
  return true;
}

export function getNextPhaseNumber(currentPhaseNumber: number): number {
  return currentPhaseNumber + 1;
}
