import { useState } from "react"

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" })

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    console.log("Login attempt:", form)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-matteblack">
      <div className="mx-auto max-w-sm px-4">
        <div className="bg-softblack border border-bordergray rounded-xl shadow-md p-6 mx-auto">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-semibold text-offwhite">Welcome Back</h1>
            <p className="text-silver">Login to continue your journey</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div className="space-y-2">
              <label htmlFor="email" className="text-silver text-sm">Email</label>
              <input name="email"type="email" placeholder="you@example.com"value={form.email}onChange={handleChange} required
                className="w-full bg-matteblack border border-bordergray text-offwhite rounded-md px-3 py-2 focus:outline-none focus:border-royalblue" />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-silver text-sm">
                Password
              </label>
              <input id="password" name="password" type="password" value={form.password} onChange={handleChange} required
                className="w-full bg-matteblack border border-bordergray text-offwhite rounded-md px-3 py-2 focus:outline-none focus:border-royalblue"/>
            </div>

            <button type="submit"className="w-full border border-royalblue text-royalblue rounded-md
             py-2 font-medium hover:bg-royalblue hover:text-matteblack transition">Login</button>
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
