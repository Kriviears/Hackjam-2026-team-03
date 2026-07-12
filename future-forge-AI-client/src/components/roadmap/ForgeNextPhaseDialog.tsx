import { useEffect, useRef, useState } from "react";

export function ForgeNextPhaseDialog({ open, currentPhase, existingChallenge, onSubmit }) {
  const [outcomeAnswer, setOutcomeAnswer] = useState("");
  const [challenge, setChallenge] = useState(existingChallenge);
  const [userName, setUserName] = useState("");
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (open) {
      // Retrieve user data from localStorage
      const user = localStorage.getItem("user");
      if (user) {
        const userData = JSON.parse(user);
        setUserName(userData.firstName || userData.name || userData.email);
      }

      // Retrieve challenge from localStorage
      const storedChallenge = localStorage.getItem("userChallenge");
      if (storedChallenge) {
        setChallenge(storedChallenge);
      }

      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [open]);

  const handleSubmit = () => {
    onSubmit({ outcomeAnswer, challenge });
    setOutcomeAnswer("");
    setChallenge(existingChallenge);
    dialogRef.current?.close();
  };

  return (
    <dialog ref={dialogRef} className="rounded-xl bg-slate-900 border border-slate-800 backdrop:bg-black/50 max-w-lg shadow-2xl">
      <div className="flex items-center justify-between p-6 border-b border-slate-800">
        <h2 className="text-2xl font-bold text-white">🎉 Great Progress!</h2>
        <button onClick={() => dialogRef.current?.close()}className="text-slate-400 hover:text-white transition text-xl font-bold">
          ✕
        </button>
      </div>

      <div className="p-6 space-y-4">
        {userName && (
          <p className="text-sky-300 text-sm bg-slate-950 rounded p-2">
            Welcome back, <span className="font-semibold">{userName}</span>! 👋
          </p>
        )}
        <p className="text-slate-300 font-medium">How did this milestone go?</p>

        <textarea value={outcomeAnswer} onChange={(e) => setOutcomeAnswer(e.target.value)}  placeholder="Tell us about your experience..."
          className="w-full h-24 bg-slate-950 border border-slate-700 rounded-lg p-3 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-sky-400 resize-none"/>

        <p className="text-slate-300 font-medium">What's your challenge now? (optional)</p>
        <p>Edit if anything's changed, or leave as is.</p>

        <textarea value={challenge} onChange={(e) => setChallenge(e.target.value)} placeholder={existingChallenge || "What's your next challenge?"}
          className="w-full h-24 bg-slate-950 border border-slate-700 rounded-lg p-3 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-sky-400 resize-none" />

        <button onClick={handleSubmit}
          className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-medium transition mt-4">
          🚀 Forge my next phase
        </button>
      </div>
    </dialog>
  );
}