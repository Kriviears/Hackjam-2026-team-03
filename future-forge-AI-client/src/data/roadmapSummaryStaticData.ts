export const sampleRoadmap = {
  targetRole: "Java Full Stack Developer",
  goal: "Land a job as Java Full Stack Developer",
  readinessSnapshot:
    "You have real technical skills — the problem right now isn't your ability, it's visibility. Getting zero interview calls after many applications almost always points to something before the interview stage: your resume isn't passing initial screening, you're applying to roles that don't match your actual experience level, or your application volume is outpacing quality. This is fixable, and it's a different fix than a skills gap.",
  topGaps: [
    "Resume likely isn't surfacing relevant keywords/experience for ATS screening",
    "Applying broadly instead of targeting roles matching your actual readiness %",
    "No referral or warm-intro path being used — applying cold only",
  ],


"phases": [
      {
        "phaseNumber": 1,
        "title": "Get your first interview while still enrolled",
        "status": "active",
        "oneLineDescription": "Stop applying cold. Use referrals and target non-gated roles instead.",
        "roadmapShape": "diagnostic-ladder",
        "milestones": [
          {
            "id": "cl1",
            "title": "Filter out 'recent graduate only' postings",
            "description": "Update your job search to exclude roles requiring 'recent graduate' status. You'll graduate in 9 weeks — postings that gate on that are structurally off-limits for now.",
            "category": "job-readiness",
            "xp": 100,
            "done": false,
            "type": "task",
            "help": {
              "context": "As a current learner, you're technically not eligible for 'recent graduate' roles yet — no matter how good your resume is. Cold applications to those postings will always get rejected at screening. Narrow your target to roles that don't have that gate, or that explicitly say 'current students welcome.'",
              "steps": [
                "Review your last 10 applications — which ones said 'recent graduate required' or 'graduating soon?'",
                "Add a filter in your job search: exclude postings mentioning recent grad requirement",
                "Focus on roles that say 'entry-level' or 'junior' without the grad requirement"
              ],
              "resources": [
                { "label": "LinkedIn Jobs (advanced filters)", "url": "https://linkedin.com/jobs" },
                { "label": "Indeed (saved searches with filters)", "url": "https://indeed.com" },
                { "label": "Career coach for role targeting", "email": "coaches@perscholas.org" }
              ]
            }
          },
          {
            "id": "cl2",
            "title": "Get a warm introduction at a target company",
            "description": "Use the Job Portal to find a role you want. Check the Employer Possibilities Portal to see if any Per Scholas alumni work there. Request an introduction instead of applying cold.",
            "category": "job-readiness",
            "xp": 200,
            "done": false,
            "type": "task",
            "help": {
              "context": "Cold applications are getting filtered out at ATS — you're not even getting to a human. A referral from someone inside bypasses that entirely and converts at 5-10x the rate. Per Scholas has 20k+ alumni; many are already at companies hiring right now.",
              "steps": [
                "Go to the Job Portal and find 5 MERN roles you'd want",
                "For each one, check Employer Possibilities Portal for Per Scholas alumni at that company",
                "If you find a match, send them a message: 'I'm a current learner at Per Scholas graduating in 9 weeks, would you be open to a brief chat?'",
                "Ask them to refer you for the role"
              ],
              "resources": [
                { "label": "Per Scholas Job Portal", "url": "/portal/jobs" },
                { "label": "Per Scholas Employer Possibilities Portal", "url": "/portal/employers" },
                { "label": "Alumni directory", "email": "alumni@perscholas.org" }
              ]
            }
          },
          {
            "id": "cl3",
            "title": "Complete your capstone and get it on GitHub",
            "description": "Make sure your capstone project is finished, deployed, and linked in your resume. This is your proof of capability — interviewers will ask about it.",
            "category": "job-readiness",
            "xp": 150,
            "done": false,
            "type": "task",
            "help": {
              "context": "During interviews, they'll drill into your capstone. It's your strongest proof that you can actually build things. Having it polished and deployed shows professionalism.",
              "steps": [
                "Finish any remaining capstone features",
                "Push all code to GitHub with a clear README",
                "Deploy the app (Netlify for frontend, Render for backend)",
                "Test it end-to-end and add the links to your resume"
              ],
              "resources": [
                { "label": "GitHub", "url": "https://github.com" },
                { "label": "Netlify (free static hosting)", "url": "https://netlify.com" },
                { "label": "Render (free backend hosting)", "url": "https://render.com" }
              ]
            }
          },
          {
            "id": "cl4",
            "title": "Land your first interview",
            "description": "Referral + deployed capstone + polished resume = interview. This checkpoint proves the eligibility and visibility fixes worked.",
            "category": "job-readiness",
            "xp": 0,
            "done": false,
            "type": "checkpoint",
            "help": {
              "context": "If you've done the previous three milestones — filtered out gated roles, gotten at least 2 warm intros, and have your capstone deployed — interviews should start coming. This is the signal you've solved the visibility problem.",
              "steps": [
                "Track your applications and warm intros",
                "Wait 3-5 days for responses",
                "If no interviews after 5 intros, reassess: Did the referral actually get through? Are you applying to roles that match 70%+ of your skills?"
              ],
              "resources": [
                { "label": "Mock interview practice (Pramp)", "url": "https://pramp.com" },
                { "label": "Per Scholas interview prep", "email": "coaches@perscholas.org" }
              ]
            }
          }
        ]
      },
      {
        "phaseNumber": 2,
        "title": "Convert interviews to offers",
        "status": "locked",
        "oneLineDescription": "Generated once you land your first interview — will likely cover interview prep and negotiation.",
        "roadmapShape": null,
        "milestones": []
      },
      {
        "phaseNumber": 3,
        "title": "Onboard and ramp up",
        "status": "locked",
        "oneLineDescription": "Generated once you accept an offer.",
        "roadmapShape": null,
        "milestones": []
      }
    ]

};
