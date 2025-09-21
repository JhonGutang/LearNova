'use client'
import React, { useEffect } from 'react';
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
import { useRedirectLink } from '@/src/shadcn/hooks/useRedirectLink';
import { CustomToast } from '@/src/shared/CustomToast';

const Signin = () => {
  const {
    credentials,
    setCredentials,
    handleAuthentication,
    loading,
    error,
    data,
  } = useAuthenticateCreator();

  const { redirect } = useRedirectLink();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Show error toast if error changes
  useEffect(() => {
    if (error) {
      CustomToast({
        type: "error",
        title: "Sign in failed",
        description: error,
      });
    }
  }, [error]);

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
      CustomToast({
        type: "success",
        title: "Sign in successful!",
        description: "You have been signed in. Redirecting...",
      });
    }
    // Optionally, handle redirect or success here
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-50">
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
              <Button variant="ghost" className='cursor-pointer' onClick={() => redirect('/signup')}>
                Signup
              </Button>
            </p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Signin;
