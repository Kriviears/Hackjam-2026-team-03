const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRound = 10;

const milestoneSchema = new mongoose.Schema(
  {
    id: String,
    title: String,
    description: String,
    category: String,
    done: { type: Boolean, default: false },
    type: { type: String, enum: ["task", "checkpoint"] },
    help: {
      context: String,
      steps: [String],
      resources: [{ label: String, url: String, email: String }],
    },
    outcomeQuestion: String,
  },
  { _id: false }
);

const phaseSchema = new mongoose.Schema(
  {
    phaseNumber: Number,
    title: String,
    oneLineDescription: String,
    roadmapShape: {
      type: String,
      enum: ["exploratory", "skills-ladder", "diagnostic-ladder"],
    },
    milestones: [milestoneSchema],
  },
  { _id: false }
);

const phaseOutcomeSchema = new mongoose.Schema(
  {
    phase: phaseSchema,
    topGaps: [String],
    readinessSnapshot: String,
    milestonesCompleted: [String],
    checkpointResult: String,
    completedAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String },
 
    // --- inputs for roadmap gneration  ---
    journeyStage: {
      type: String,
      enum: ["aspiring", "current_learner", "alumnus"],
      required: true,
    },
    targetRole: { type: String }, 
    graduationProgram: { type: String }, // e.g. "AI-Native Software Development (MERN)"
    currentSkills: { type: [String], default: [] },
 
    // Optional — primarily used for `aspiring` career-changer framing
    degree: { type: String },
    fieldOfStudy: { type: String },
 
    // Optional self-reported evidence
    notableProjects: { type: [String], default: [] },
    certifications: { type: [String], default: [] },
 
    jobSearchStage: { type: String, enum: ["searching", "employed"], default: "searching",
    },
 
    // The person's own words on their current blocker/hesitation —
    // used across all three personas, interpreted differently per stage
    challenge: { type: String },
 
    // --- Roadmap state ---
    activePhaseNumber: { type: Number, default: 1 },
    currentPhase: phaseSchema, // latest AI-generated phase (only one active at a time)
    phaseHistory: { type: [phaseOutcomeSchema], default: [] }, // completed/retried phases with outcomes
 
    // Top-level AI output fields (regenerated with each phase, kept for display)
    readinessSnapshot: { type: String },
    topGaps: {
      type: [String],
    },
    goal: { type: String }, // "Employed as [targetRole]"
 
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

userSchema.methods.isCorrectPassword = async function (password) {
    if(this.password)
        return await bcrypt.compare(password, this.password);
    else
        return true;

}

userSchema.methods.savePhaseOutcome = function (phase, topGaps, readinessSnapshot, milestonesCompleted, checkpointResult) {
  this.phaseHistory.push({
    phase,
    topGaps,
    readinessSnapshot,
    milestonesCompleted,
    checkpointResult,
    completedAt: new Date(),
  });
  this.activePhaseNumber += 1;
  return this.save();
}

module.exports = mongoose.model("User", userSchema);