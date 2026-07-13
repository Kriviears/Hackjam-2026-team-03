/* global use, db */
// MongoDB Playground
// To disable this template go to Settings | MongoDB | Use Default Template For Playground.
// Make sure you are connected to enable completions and to be able to run a playground.
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.
// The result of the last command run in a playground is shown on the results panel.
// By default the first 20 documents will be returned with a cursor.
// Use 'console.log()' to print to the debug output.
// For more documentation on playgrounds please refer to
// https://www.mongodb.com/docs/mongodb-vscode/playgrounds/

// Select the database to use.
use('futureforgeaidb');

db.users.insertOne({
  name: "Shanu Priya",
  email: "shanu@gmail.com",
  password:"$2b$10$1EJJmXGTaMkP5EI2nxxaq.p5HpIeKAf8RdoXedpwmCTqFQkYIPlca",
  journeyStage: "alumnus",
  degree: "Bachelor's",
  fieldOfStudy: "Computer Science",
  challenge: "Not sure tech is really for someone without a CS background.",
  jobSearchStage: "searching",
  goal: "Decide on a tech path and get into a training program",
  readinessSnapshot: "Exploring fit — strong transferable skills from hospitality, no tech exposure yet.",
  topGaps: [
    "Hands-on exposure to what day-to-day tech work looks like",
    "Clarity on which track (web dev, cybersecurity, etc.) fits best",
    "Confidence that a non-CS background is workable"
  ],
  currentSkills: [],
  notableProjects: [],
  certifications: [],
  activePhaseNumber: 1,
  currentPhase: {
    phaseNumber: 1,
    title: "Explore paths and interests",
    oneLineDescription: "Get a real feel for tech work before committing to a program.",
    roadmapShape: "exploratory",
    milestones: [
      {
        id: "m1",
        title: "Try a free intro coding exercise",
        description: "A low-stakes way to see if the daily work feels engaging.",
        category: "exploration",
        done: true,
        type: "task",
        help: {
          context: "Direct exposure beats reading about it.",
          steps: ["Pick one free intro tutorial", "Spend 30 minutes building something small"],
          resources: [{ label: "freeCodeCamp", url: "https://www.freecodecamp.org" }]
        }
      },
      {
        id: "m2",
        title: "Talk to a Per Scholas alum about their path",
        description: "Hear directly what the transition from another field was like.",
        category: "networking",
        done: false,
        type: "task",
        help: {
          context: "Real perspective from someone who made the same leap.",
          steps: ["Request an informational chat via Per Scholas alumni network", "Ask what surprised them most"],
          resources: []
        }
      },
      {
        id: "m3",
        title: "Review the admissions process",
        description: "Know what the baseline assessment and behavioral interview involve.",
        category: "admissions",
        done: false,
        type: "task",
        help: {
          context: "Removes surprise from the application steps.",
          steps: ["Read the admissions overview", "Note the two prep areas: assessment and interview"],
          resources: []
        }
      },
      {
        id: "m4",
        title: "Decide on a tech path",
        description: "Choose a direction to apply toward.",
        category: "milestone",
        done: false,
        type: "checkpoint",
        help: {
          context: "This is the decision point for the phase.",
          steps: ["Weigh what felt engaging", "Commit to one path"],
          resources: []
        },
        outcomeQuestion: "Which path did you choose, and what tipped it?"
      }
    ]
  },
  phaseHistory: [],
  createdAt: new Date(),
  updatedAt: new Date()
});

use('futureforgeaidb');
db.getCollectionNames()
db.users.insertOne({
  name: "Shanu Priya1",
  email: "shanu1@gmail.com",
  password:"$2b$10$1EJJmXGTaMkP5EI2nxxaq.p5HpIeKAf8RdoXedpwmCTqFQkYIPlca",
  journeyStage: "current_learner",
  degree: "Bachelor's",
  fieldOfStudy: "Computer Science",
  challenge: "Not sure tech is really for someone without a CS background.",
  jobSearchStage: "searching",
  createdAt: new Date(),
  updatedAt: new Date()
});

db.getCollectionNames()
db.users.insertOne({
  name: "Shanu Priya1",
  email: "shanu12@gmail.com",
  password:"$2b$10$1EJJmXGTaMkP5EI2nxxaq.p5HpIeKAf8RdoXedpwmCTqFQkYIPlca",
  journeyStage: "current_learner",
  degree: "Bachelor's",
  fieldOfStudy: "Computer Science",
  challenge: "",
  jobSearchStage: "searching",
  createdAt: new Date(),
  updatedAt: new Date()
});

use('futureforgeaidb');
db.users.insertOne({
  name: "Wilfried Bako",
  email: "bakowilfriedmarcel@gmail.com",
  password:"$2b$10$1EJJmXGTaMkP5EI2nxxaq.p5HpIeKAf8RdoXedpwmCTqFQkYIPlca",
  journeyStage: "alumnus",
  degree: "Master's",
  fieldOfStudy: "Chemical and Process Engineering",
  challenge: "I'm applying for Cloud and Platform Engineering roles but getting very few interview opportunities.",
  jobSearchStage: "searching",
  createdAt: new Date(),
  updatedAt: new Date()
});