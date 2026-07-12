const perscholasAlumns = require("../seed/perscholasAlumns");

const ADZUNA_APP_ID = process.env.ADZUNA_APP_ID;
const ADZUNA_APP_KEY = process.env.ADZUNA_APP_KEY;
const RESULTS_PER_PAGE = 50; 

// Build a lookup once, not per-job — company name -> alumni array
// returns the list of Per Scholas alumni (potential mentors/warm-intro contacts) who work there
const alumniByCompany = perscholasAlumns.reduce((acc, a) => {
  // acc = the object being built (starts as {})
  // a   = the current alumnus being processed right now
  if (!a.company) return acc;
  (acc[a.company] ??= []).push({ name: a.name, role: a.role, location: a.location });
  return acc;// hand the (possibly updated) acc to the next step
}, {});// {} is the starting value of acc

//1. fetch the live job oppertunities using Azuna APIs,
//2. Iterate each jobs, find the matching alumuns who work there.
async function getOpportunities(role, location = "United States") {
  const url = `https://api.adzuna.com/v1/api/jobs/us/search/1?app_id=${ADZUNA_APP_ID}&app_key=${ADZUNA_APP_KEY}&what=${encodeURIComponent(
    role
  )}&where=${encodeURIComponent(location)}&results_per_page=${RESULTS_PER_PAGE}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error(`Adzuna request failed: ${res.status}`);

  const data = await res.json();

  return (data.results || []).map((job) => {
    const company = job.company?.display_name;
    const mentors = company ? alumniByCompany[company] || null : null;

    return {
      title: job.title,
      company,
      location: job.location?.display_name,
      url: job.redirect_url,
      salaryMin: job.salary_min ? Math.round(job.salary_min) : null,
      salaryMax: job.salary_max ? Math.round(job.salary_max) : null,
      mentors, // real alumni array if matched, null if not — never invented
    };
  });
}

module.exports = { getOpportunities };
