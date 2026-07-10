import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"


export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" })

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    console.log("Login attempt:", form)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-md shadow-lg border-border">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
          <CardDescription>Login to continue your journey</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" placeholder="you@example.com" value={form.email} 
              onChange={handleChange} required/>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password"placeholder="••••••••"value={form.password} 
              onChange={handleChange} required/>
            </div>

            <Button type="submit" className="w-full">Login</Button>
          </form>
        </CardContent>

        <CardFooter className="text-sm text-muted-foreground flex justify-center">
          Don’t have an account?{" "}
          <a href="/register" className="text-primary ml-1 hover:underline">Create one</a>
        </CardFooter>
      </Card>
    </div>
  )
}
