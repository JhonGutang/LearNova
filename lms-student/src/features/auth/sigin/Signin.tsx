'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Mail,
  Lock,
  Waves
} from "lucide-react"
import { useAuth } from "../useAuth"

export default function Signin() {
  const { login, loading, error } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [formError, setFormError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormError(null)
    try {
      await login({ email, password, role: undefined as any }) // role will be set to STUDENT in useAuth
      // TODO: redirect or show success
    } catch (err: any) {
      setFormError(err?.message || "Login failed")
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-100 p-8 md:p-0 items-center justify-center">
      <div className="flex w-full overflow-hidden rounded-3xl bg-white shadow-xl max-w-[80vw] mx-auto min-h-[500px]">
        {/* Left Side (Image and Text) */}
        <div className="hidden md:flex flex-col items-center justify-center bg-blue-600 w-[55%] p-10 relative">
          {/* Background shapes and effects */}
          <div className="absolute inset-0 z-0">
            {/* You can add your decorative elements here, like the circles and floating cards */}
            {/* The image will be added here. Replace this comment with your Image component. */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
              {/* Insert your image component here */}
              {/* Example: <img src="/your-image.png" alt="Description" className="object-cover w-full h-full" /> */}
            </div>
          </div>
          <div className="relative z-10 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">New Scheduling And Routing Options</h2>
            <p className="text-sm">We also updated the format of points and rewards.</p>
          </div>
        </div>

        {/* Right Side (Login Form) */}
        <div className="flex flex-col items-center justify-center p-5 w-[45%] min-h-[500px]">
          <Card className="w-full max-w-sm border-none shadow-none">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <Waves className="h-10 w-10 text-blue-600" />
              </div>
              <CardTitle className="text-2xl font-bold">Hello Again!</CardTitle>
              <CardDescription className="text-sm text-gray-500">
                Lopsum dolor sit amet, consectetuer adipiscing elit. Aenean
                commodo ligula eget dolor.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="email@example.com"
                        className="pl-10"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                        autoComplete="email"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Password</Label>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="password"
                        type="password"
                        placeholder="********"
                        className="pl-10"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                        autoComplete="current-password"
                      />
                    </div>
                  </div>
                </div>
                {(formError || error) && (
                  <div className="text-red-500 text-sm text-center">
                    {formError || error?.message}
                  </div>
                )}
                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 cursor-pointer"
                  disabled={loading}
                >
                  {loading ? "Logging in..." : "Login"}
                </Button>
                <div className="relative flex items-center justify-center text-xs text-gray-400">
                  <span className="absolute left-0 w-full border-t border-gray-200"></span>
                  <span className="relative z-10 px-2 bg-white">OR</span>
                </div>
                <Button variant="outline" className="w-full flex items-center space-x-2 cursor-pointer" type="button">
                  {/* <Google className="h-4 w-4" /> */}
                  <span>Sign in with Google</span>
                </Button>
              </form>
            </CardContent>
          </Card>
          <div className="mt-2 text-sm text-gray-500">
            Don't have an account yet?{" "}
            <a href="#" className="font-semibold text-blue-600 hover:underline">
              Sign Up
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}