import { useState } from "react"
import {  useNavigate } from "react-router-dom";
import { login } from "@/services/service";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await login(form);
      const user = response.user;

      // Store user object in localStorage
      localStorage.setItem("user", JSON.stringify(user));

      // Store challenge for roadmap dialog
      if (user.challenge) {
        localStorage.setItem("userChallenge", user.challenge);
      }

      // Navigate based on onboarding status
      if (user.activePhaseNumber && user.currentPhase) {
        // User has roadmap → go to dashboard
        navigate("/dashboard");
      } else {
        // User has no roadmap → go to onboarding
        navigate("/onboarding");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || "Login failed");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-matteblack">
      <div className="mx-auto max-w-sm px-4">
        <div className="bg-softblack border border-bordergray rounded-xl shadow-md p-6 mx-auto">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-semibold text-offwhite">Welcome</h1>
            <p className="text-silver">Login to continue your journey</p>
          </div>

          {error && (
            <div className="bg-red-900/20 border border-red-700 text-red-300 rounded-md p-3 text-sm mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">

            <div className="space-y-2">
              <label htmlFor="email" className="text-silver text-sm">Email</label>
              <input name="email" type="email" placeholder="you@example.com" value={form.email} onChange={handleChange} required disabled={loading}
                className="w-full bg-matteblack border border-bordergray text-offwhite rounded-md px-3 py-2 focus:outline-none focus:border-royalblue disabled:opacity-50" />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-silver text-sm">
                Password
              </label>
              <input id="password" name="password" type="password" value={form.password} onChange={handleChange} required disabled={loading}
                className="w-full bg-matteblack border border-bordergray text-offwhite rounded-md px-3 py-2 focus:outline-none focus:border-royalblue disabled:opacity-50"/>
            </div>

            <button type="submit" disabled={loading} className="w-full border border-royalblue text-royalblue rounded-md py-2 font-medium hover:bg-royalblue hover:text-matteblack transition disabled:opacity-50 disabled:cursor-not-allowed">
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="text-sm text-silver text-center mt-4">
            Don’t have an account?
            <a href="/register" className="text-royalblue ml-1 hover:underline">Sign Up</a>
          </div>
        </div>
      </div>
    </div>
  )
}
