export const STATUS_LABEL: Record<string, string> = {
  completed: "Completed",
  "in-progress": "In progress",
  "next-up": "Next up",
  goal: "Goal",
  active: "Active",
  locked: "Locked",
};

export const STATUS_COLOR: Record<string, { ring: string; dot: string; text: string }> = {
  completed: { ring: "ring-emerald-400", dot: "bg-emerald-400", text: "text-emerald-300" },
  "in-progress": { ring: "ring-sky-400", dot: "bg-sky-400", text: "text-sky-300" },
  "next-up": { ring: "ring-violet-400", dot: "bg-violet-400", text: "text-violet-300" },
  goal: { ring: "ring-slate-500", dot: "bg-slate-600", text: "text-slate-400" },
  active: { ring: "ring-sky-400", dot: "bg-sky-400", text: "text-sky-300" },
  locked: { ring: "ring-slate-600", dot: "bg-slate-600", text: "text-slate-500" },
};
