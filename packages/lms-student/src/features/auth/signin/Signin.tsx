"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Mail, Lock, Github, BadgeCheck } from "lucide-react"
import { useAuth } from "../useAuth"
import AuthLayout from "@/shared/layout/AuthLayout"
import { Error, Role } from "@lms/shared-types"
import { useRedirectLink } from "@/hooks/useRedirect"

export default function Signin() {
  const { redirect } = useRedirectLink()
  const { login, loginLoading, loginError } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [formError, setFormError] = useState<string | null>(null)
  const [rememberMe, setRememberMe] = useState<boolean>(false)

  const handleRememberMeChange = (checked: boolean | "indeterminate") => {
    setRememberMe(checked === true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormError(null)
    try {
      await login({ email, password, role: Role.STUDENT }) 
    } catch (err: unknown) {
      setFormError((err as Error)?.message || "Login failed")
    }
  }

  return (
    <AuthLayout
      leftTitle="Level Up Your Learning"
      leftDescription="Join thousands of learners earning achievements, connecting with peers, and mastering new skills in our gamified learning environment."
      leftIcon={
        <div className="flex gap-3">
          <span className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">🥇</span>
          <span className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">⭐</span>
          <span className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">🏅</span>
        </div>
      }
      leftImage={
        <div className="flex flex-col items-center">
          <div className="rounded-xl bg-white/10 p-4 shadow-2xl">
            <div className="h-48 w-56 rounded-lg bg-white/90 flex items-center justify-center">
              <div className="h-36 w-44 rounded-md bg-teal-100" />
            </div>
          </div>
          <div className="mt-8 grid grid-cols-3 gap-8 text-center text-white">
            <div>
              <div className="text-sm font-bold">10K+</div>
              <div className="text-[10px] opacity-80">Active Learners</div>
            </div>
            <div>
              <div className="text-sm font-bold">500+</div>
              <div className="text-[10px] opacity-80">Courses</div>
            </div>
            <div>
              <div className="text-sm font-bold">95%</div>
              <div className="text-[10px] opacity-80">Success Rate</div>
            </div>
          </div>
        </div>
      }
    >
      <Card className="w-full max-w-sm border-none shadow-none">
        <CardHeader className="text-center">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-teal-600 text-white">
              <BadgeCheck className="h-5 w-5" />
            </div>
            <div className="font-semibold">LearNova</div>
          </div>
          <CardTitle className="mt-4 text-2xl font-bold">Welcome Back!</CardTitle>
          <CardDescription className="text-sm text-gray-500">
            Continue your learning journey and unlock new achievements.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
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
                  <a className="text-xs text-gray-500 hover:text-teal-700 cursor-pointer">Forgot password?</a>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    className="pl-10"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={handleRememberMeChange}
                  />
                  <Label htmlFor="remember" className="text-sm text-gray-600">Remember me</Label>
                </div>
              </div>
            </div>
            {(formError || loginError) && (
              <div className="text-red-500 text-sm text-center">
                {formError || loginError?.message}
              </div>
            )}
            <Button
              type="submit"
              className="w-full bg-teal-700 hover:bg-teal-600 cursor-pointer shadow-lg shadow-teal-700/25"
              disabled={loginLoading}
            >
              {loginLoading ? "Signing in..." : "Sign in"}
            </Button>
            <div className="relative flex items-center justify-center text-xs text-gray-400">
              <span className="absolute left-0 w-full border-t border-gray-200"></span>
              <span className="relative z-10 px-2 bg-white">Or continue with</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                type="button"
                className="w-full cursor-pointer"
                onClick={() => {
                  window.location.href = "http://localhost:8000/auth/google/student";
                }}
              >
                <span className="mr-2">G</span> Google
              </Button>
              <Button variant="outline" type="button" className="w-full cursor-pointer">
                <Github className="mr-2 h-4 w-4" /> GitHub
              </Button>
            </div>
          </form>
          <div className="text-sm text-center text-gray-500">
            Don&apos;t have an account?{" "}
            <a onClick={() => redirect("/signup")} className="font-semibold text-teal-700 hover:underline cursor-pointer">
              Sign up
            </a>
          </div>
        </CardContent>
      </Card>
    </AuthLayout>
  )
}