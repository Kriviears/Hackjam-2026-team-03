const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRound = 10;

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
    //currentPhase: { type: PhaseSchema }, // latest AI-generated phase (only one active at a time)
  //  phaseHistory: { type: [PhaseOutcomeSchema], default: [] }, // completed/retried phases
 
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

module.exports = mongoose.model("User", userSchema);