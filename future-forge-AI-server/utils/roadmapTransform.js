// Transform API response into normalized phase object
function transformPhaseData(phaseData, phaseNumber, status = "active") {
  if (!phaseData) return null;

  return {
    ...phaseData,
    phaseNumber,
    status,
    milestones: (phaseData.milestones || []).map((milestone, index) => ({
      ...milestone,
      status: index === 0 ? "in-progress" : "next-up",
      help: {
        ...milestone.help,
        steps: normalizeSteps(milestone.help?.steps || []),
        resources: milestone.help?.resources || [],
      },
    })),
  };
}

// Transform steps into consistent format (object with id, label, done)
function normalizeSteps(steps) {
  return steps.map((step, stepIndex) => {
    if (typeof step === "string") {
      return {
        id: `step-${stepIndex + 1}`,
        label: step,
        done: false,
      };
    }
    return step;
  });
}

// Extract phase from API response (handles different response formats)
function extractPhaseFromResponse(responseData) {
  const rec = responseData.recommendation || responseData;
  return rec.phases?.[0] || rec.phase;
}

// Save roadmap to localStorage
function saveRoadmapToLocalStorage(roadmap) {
  localStorage.setItem("roadmap", JSON.stringify(roadmap));
}

// Update roadmap phases array with new/modified phase
function updateRoadmapPhases(roadmap, newPhase, phaseNumber) {
  const updatedPhases = roadmap.phases.map(phase =>
    phase.phaseNumber === phaseNumber ? newPhase : phase
  );

  return {
    ...roadmap,
    phases: updatedPhases,
  };
}

module.exports = {
  transformPhaseData,
  normalizeSteps,
  extractPhaseFromResponse,
  saveRoadmapToLocalStorage,
  updateRoadmapPhases,
};
