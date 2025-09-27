"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Mail, Lock, Waves } from "lucide-react"
import { useAuth } from "../useAuth"
import { useRouter } from "next/navigation"
import AuthLayout from "@/shared/layout/AuthLayout"

export default function Signin() {
  const router = useRouter()
  const { login, loginLoading, loginError } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [formError, setFormError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormError(null)
    try {
      await login({ email, password, role: undefined as any }) // role will be set to STUDENT in useAuth
    } catch (err: any) {
      setFormError(err?.message || "Login failed")
    }
  }

  const redirectToSignup = () => {
    router.push('/signup')
  }

  return (
    <AuthLayout
      leftTitle="New Scheduling And Routing Options"
      leftDescription="We also updated the format of points and rewards."
      leftIcon={<Waves className="h-10 w-10 text-white" />}
    >
      <Card className="w-full max-w-sm border-none shadow-none">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Hello Again!</CardTitle>
          <CardDescription className="text-sm text-gray-500">
            Lopsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.
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
            {(formError || loginError) && (
              <div className="text-red-500 text-sm text-center">
                {formError || loginError?.message}
              </div>
            )}
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 cursor-pointer"
              disabled={loginLoading}
            >
              {loginLoading ? "Logging in..." : "Login"}
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
        <a onClick={redirectToSignup} className="font-semibold text-blue-600 hover:underline cursor-pointer">
          Sign Up
        </a>
      </div>
    </AuthLayout>
  )
}