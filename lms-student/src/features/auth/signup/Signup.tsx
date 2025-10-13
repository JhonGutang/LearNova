"use client";
import React, { useCallback, useState } from "react";
import { SignupFormFields } from "@/constants/AuthFormFields";
import { useAuth } from "../useAuth";
import { Eye, EyeOff, BadgeCheck, UserPlus } from "lucide-react";
import AuthLayout from "@/shared/layout/AuthLayout";
import { useRouter } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const initialFormState: Record<string, string> = {
  email: "",
  "first-name": "",
  "middle-name": "",
  "last-name": "",
  phone: "",
  address: "",
  password: "",
  "confirm-password": "",
};

const Signup: React.FC = () => {
  const router = useRouter()
  const { register, registerLoading } = useAuth();
  const [form, setForm] = useState<Record<string, string>>({ ...initialFormState });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState<Record<string, boolean>>({
    password: false,
    "confirm-password": false,
  });
  const [agree, setAgree] = useState<boolean>(false);

  const redirectToSignin = () => {
    router.push('/signin')
  }

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  }, []);

  const toggleShowPassword = useCallback((fieldId: string) => {
    setShowPassword((prev) => ({ ...prev, [fieldId]: !prev[fieldId] }));
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      await register(
        form,
        () => {
          setForm({ ...initialFormState });
          setErrors({});
        },
        (validationErrors) => {
          setErrors(validationErrors);
        }
      );
    },
    [form, register]
  );
  
  return (
    <AuthLayout
      leftTitle="LearNova"
      leftDescription="Join thousands of learners and start your gamified learning journey today."
      formOnRight
      leftImage={
        <div className="text-white w-full max-w-md">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-white/20">
              <BadgeCheck className="h-5 w-5" />
            </div>
            <div className="text-xl font-semibold">LearNova</div>
          </div>
          <p className="text-sm opacity-90 mb-8">Join thousands of learners and start your gamified learning journey today.</p>
          <div className="space-y-5">
            <div className="flex items-start gap-3">
              <div className="h-8 w-8 rounded-full bg-white/15 flex items-center justify-center">🏆</div>
              <div>
                <div className="text-sm font-semibold">Earn Achievements</div>
                <div className="text-[11px] opacity-80">Unlock badges and level up as you learn</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="h-8 w-8 rounded-full bg-white/15 flex items-center justify-center">👥</div>
              <div>
                <div className="text-sm font-semibold">Join Community</div>
                <div className="text-[11px] opacity-80">Connect with fellow learners worldwide</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="h-8 w-8 rounded-full bg-white/15 flex items-center justify-center">📈</div>
              <div>
                <div className="text-sm font-semibold">Track Progress</div>
                <div className="text-[11px] opacity-80">Monitor your learning journey in real-time</div>
              </div>
            </div>
          </div>
        </div>
      }
    >
      <div className="w-full max-w-xl">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold">Create Account</h1>
          <p className="text-sm text-gray-500 mt-1">Start your learning adventure today</p>
        </div>
        <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="mb-3" htmlFor="first-name">First Name</Label>
              <Input id="first-name" type="text" placeholder="First name" className={`${errors["first-name"] ? "border-red-500" : ""}`} value={form["first-name"] || ""} onChange={handleChange} autoComplete="off" disabled={registerLoading} />
              {errors["first-name"] && <span className="text-xs text-red-500">{errors["first-name"]}</span>}
            </div>
            <div>
              <Label className="mb-3" htmlFor="last-name">Last Name</Label>
              <Input id="last-name" type="text" placeholder="Last name" className={`${errors["last-name"] ? "border-red-500" : ""}`} value={form["last-name"] || ""} onChange={handleChange} autoComplete="off" disabled={registerLoading} />
              {errors["last-name"] && <span className="text-xs text-red-500">{errors["last-name"]}</span>}
            </div>
          </div>
          <div>
            <Label className="mb-3" htmlFor="middle-name">Middle Name (Optional)</Label>
            <Input id="middle-name" type="text" placeholder="Middle name" className={`${errors["middle-name"] ? "border-red-500" : ""}`} value={form["middle-name"] || ""} onChange={handleChange} autoComplete="off" disabled={registerLoading} />
            {errors["middle-name"] && <span className="text-xs text-red-500">{errors["middle-name"]}</span>}
          </div>
          <div>
            <Label className="mb-3" htmlFor="address">Address</Label>
            <Input id="address" type="text" placeholder="Enter your address" className={`${errors["address"] ? "border-red-500" : ""}`} value={form["address"] || ""} onChange={handleChange} autoComplete="off" disabled={registerLoading} />
            {errors["address"] && <span className="text-xs text-red-500">{errors["address"]}</span>}
          </div>
          <div>
            <Label className="mb-3" htmlFor="email">Email Address</Label>
            <Input id="email" type="email" placeholder="Enter your email" className={`${errors["email"] ? "border-red-500" : ""}`} value={form["email"] || ""} onChange={handleChange} autoComplete="off" disabled={registerLoading} />
            {errors["email"] && <span className="text-xs text-red-500">{errors["email"]}</span>}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="mb-3" htmlFor="password">Password</Label>
              <div className="relative">
                <Input id="password" type={showPassword["password"] ? "text" : "password"} placeholder="Create password" className={`pr-10 ${errors["password"] ? "border-red-500" : ""}`} value={form["password"] || ""} onChange={handleChange} autoComplete="off" disabled={registerLoading} />
                <button type="button" tabIndex={-1} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer" onClick={() => toggleShowPassword("password")} aria-label={showPassword["password"] ? "Hide password" : "Show password"} disabled={registerLoading}>
                  {showPassword["password"] ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors["password"] && <span className="text-xs text-red-500">{errors["password"]}</span>}
            </div>
            <div>
              <Label className="mb-3" htmlFor="confirm-password">Confirm Password</Label>
              <div className="relative">
                <Input id="confirm-password" type={showPassword["confirm-password"] ? "text" : "password"} placeholder="Confirm password" className={`pr-10 ${errors["confirm-password"] ? "border-red-500" : ""}`} value={form["confirm-password"] || ""} onChange={handleChange} autoComplete="off" disabled={registerLoading} />
                <button type="button" tabIndex={-1} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer" onClick={() => toggleShowPassword("confirm-password")} aria-label={showPassword["confirm-password"] ? "Hide password" : "Show password"} disabled={registerLoading}>
                  {showPassword["confirm-password"] ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors["confirm-password"] && <span className="text-xs text-red-500">{errors["confirm-password"]}</span>}
            </div>
          </div>
          <div className="flex items-start gap-2 text-sm text-gray-600">
            <Checkbox id="agree" checked={agree} onCheckedChange={(v:any)=>setAgree(Boolean(v))} />
            <label htmlFor="agree">I agree to the <span className="underline cursor-pointer">Terms of Service</span> and <span className="underline cursor-pointer">Privacy Policy</span></label>
          </div>
          <button type="submit" className="w-full bg-teal-700 hover:bg-teal-600 text-white font-semibold py-2 rounded-md transition-colors disabled:opacity-60 shadow-lg shadow-teal-700/25 flex items-center justify-center gap-2" disabled={registerLoading}>
            <UserPlus className="h-4 w-4" />
            {registerLoading ? "Creating Account..." : "Create Account"}
          </button>
        </form>
        <div className="mt-3 text-sm text-gray-500 text-center">Already have an account? <a onClick={redirectToSignin} className="font-semibold text-teal-700 hover:underline cursor-pointer">Login here</a></div>
        <div className="relative mt-4 flex items-center justify-center text-xs text-gray-400">
          <span className="absolute left-0 w-full border-t border-gray-200"></span>
          <span className="relative z-10 px-2 bg-white">Or sign up with</span>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-3">
          <button type="button" className="w-full border rounded-md py-2 text-sm hover:bg-gray-50 flex items-center justify-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="h-4 w-4"><path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.84,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,16.108,19.009,14,24,14c3.059,0,5.84,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.857,8.337,6.306,14.691z"/><path fill="#4CAF50" d="M24,44c5.164,0,9.86-1.977,13.409-5.193l-6.19-5.238C29.164,35.091,26.715,36,24,36c-5.202,0-9.619-3.321-11.281-7.955l-6.49,5.004C9.801,39.556,16.414,44,24,44z"/><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.569c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/></svg>
            Google
          </button>
          <button type="button" className="w-full border rounded-md py-2 text-sm hover:bg-gray-50 flex items-center justify-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-4 w-4 fill-[#1877F2]"><path d="M22.675 0h-21.35C.595 0 0 .595 0 1.325v21.351C0 23.405.595 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.796.715-1.796 1.763v2.313h3.59l-.467 3.622h-3.123V24h6.127C23.405 24 24 23.405 24 22.676V1.325C24 .595 23.405 0 22.675 0z"/></svg>
            Facebook
          </button>
        </div>
      </div>
    </AuthLayout>
  );
};
export default Signup;
