'use client'
import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/src/shadcn/components/ui/card";
import { Input } from "@/src/shadcn/components/ui/input";
import { Button } from "@/src/shadcn/components/ui/button";
import { Label } from "@/src/shadcn/components/ui/label";
import { useAuthenticateCreator } from "./useAuthenticateCreator";
import { toast } from 'sonner';
import { Toaster } from '@/src/shadcn/components/ui/sonner';

const Signin = () => {
  const {
    credentials,
    setCredentials,
    handleAuthentication,
    loading,
    error,
    data,
  } = useAuthenticateCreator();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await handleAuthentication();
    // Show success toast if authentication was successful
    if (
      response &&
      response.data &&
      (response.data as any).authenticateCreator &&
      (response.data as any).authenticateCreator.__typename !== "AuthError"
    ) {
      toast(
        "Sign in successful!",
        {
          description: "You have been signed in. Redirecting...",
          position: "top-right",
        }
      );
    }
    // Optionally, handle redirect or success here
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-50">
      <Toaster position="top-right" variant='success' />
      <Card className="w-full max-w-sm p-8 m-4">
        <CardHeader>
          <CardTitle className="text-4xl font-extrabold text-center mb-2">
            Sign In
          </CardTitle>
          <CardDescription className="text-center mb-8">
            Welcome back! Please enter your details.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email Input */}
            <div>
              <Label htmlFor="email" className="block text-sm font-medium">
                Email address
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                placeholder="you@example.com"
                className="mt-1"
                value={credentials.email}
                onChange={handleChange}
                disabled={loading}
              />
            </div>

            {/* Password Input */}
            <div>
              <Label htmlFor="password" className="block text-sm font-medium">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                placeholder="••••••••"
                className="mt-1"
                value={credentials.password}
                onChange={handleChange}
                disabled={loading}
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="text-red-600 text-sm text-center">
                {error}
              </div>
            )}

            {/* Sign-in Button */}
            <div>
              <Button
                type="submit"
                className="w-full bg-blue-600"
                disabled={loading}
              >
                {loading ? "Signing In..." : "Sign In"}
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-center">
          <div className="mt-6 text-center w-full">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <a
                href="#"
                className="font-medium underline hover:opacity-80 transition-all"
              >
                Sign up
              </a>
            </p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Signin;
