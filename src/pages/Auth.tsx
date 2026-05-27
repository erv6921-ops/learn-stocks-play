import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { supabase } from "@/integrations/supabase/client"
import { JeffMascot } from "@/components/JeffMascot"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { ArrowRight, GraduationCap, Users, Loader2 } from "lucide-react"

type AuthMode = "login" | "signup" | "forgot"
type UserRole = "student" | "teacher" | null

export default function Auth() {
  const navigate = useNavigate()
  const { toast } = useToast()
  
  const [mode, setMode] = useState<AuthMode>("login")
  const [role, setRole] = useState<UserRole>(null)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [resetSent, setResetSent] = useState(false)
  const [verificationSent, setVerificationSent] = useState(false)


  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Hard timeout so the button never spins forever if a query stalls.
    const withTimeout = <T,>(p: PromiseLike<T>, ms = 4000): Promise<T | null> =>
      Promise.race([
        Promise.resolve(p),
        new Promise<null>(resolve => setTimeout(() => resolve(null), ms)),
      ])

    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) throw error
      if (!data.user) throw new Error("No user returned")

      // Don't block the login button on profile/progress reads. Route students in immediately,
      // then quietly correct the route if this account is a teacher or still needs onboarding.
      setLoading(false)
      navigate("/dashboard", { replace: true })

      const [roleRes, profileRes] = await Promise.all([
        withTimeout(
          supabase.from("user_roles").select("role").eq("user_id", data.user.id).maybeSingle()
        ),
        withTimeout(
          supabase.from("profiles").select("onboarding_complete").eq("id", data.user.id).maybeSingle()
        ),
      ])

      const role = (roleRes as any)?.data?.role
      const onboardingComplete = (profileRes as any)?.data?.onboarding_complete

      if (role === "teacher") {
        navigate("/teacher-dashboard", { replace: true })
      } else if (onboardingComplete === false) {
        navigate("/onboarding", { replace: true })
      }
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      })

      if (error) throw error

      setResetSent(true)
      toast({
        title: "Reset link sent!",
        description: "Check your email for a password reset link.",
      })
    } catch (error: any) {
      toast({
        title: "Failed to send reset link",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[Auth] handleSignup fired", { email, role, hasPassword: !!password })

    if (password !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure both passwords are the same.",
        variant: "destructive",
      })
      return
    }

    if (!role) {
      toast({
        title: "Please select a role",
        description: "Choose whether you're a student or teacher.",
        variant: "destructive",
      })
      return
    }

    if (role === "teacher") {
      toast({
        title: "Teacher accounts require approval",
        description: "For security, teacher accounts must be provisioned by an administrator. Please contact your school admin.",
        variant: "destructive",
      })
      return
    }

    // If a session is already active, sign out first so signUp can succeed
    const { data: existing } = await supabase.auth.getSession()
    if (existing.session) {
      console.log("[Auth] Existing session detected — signing out before signup")
      await supabase.auth.signOut()
    }

    setLoading(true)

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: window.location.origin,
        },
      })

      if (error) throw error

      // Role + profile are auto-created by the on_auth_user_created trigger
      // (defaults to 'student'). If a session exists (email confirmation off),
      // route into onboarding; otherwise show the "check your email" screen.
      if (data.session) {
        toast({
          title: "Account created!",
          description: "You're signed in.",
        })
        navigate("/onboarding")
      } else {
        setVerificationSent(true)
      }

    } catch (error: any) {
      toast({
        title: "Signup failed",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <AnimatePresence mode="wait">
        {verificationSent ? (
          <motion.div
            key="verify-email"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-md"
          >
            <div className="text-center mb-6">
              <JeffMascot
                size="sm"
                message="Almost there! Check your inbox to verify your email."
              />
            </div>
            <Card variant="elevated">
              <CardHeader>
                <CardTitle>Verify your email</CardTitle>
                <CardDescription>
                  We sent a confirmation link to <span className="font-medium">{email}</span>. Click it to activate your account, then come back and log in.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Didn't get it? Check your spam folder, or resend below.
                </p>
                <Button
                  variant="outline"
                  className="w-full"
                  disabled={loading}
                  onClick={async () => {
                    setLoading(true)
                    const { error } = await supabase.auth.resend({
                      type: "signup",
                      email,
                      options: { emailRedirectTo: window.location.origin },
                    })
                    setLoading(false)
                    if (error) {
                      toast({ title: "Couldn't resend", description: error.message, variant: "destructive" })
                    } else {
                      toast({ title: "Confirmation email resent", description: "Check your inbox." })
                    }
                  }}
                >
                  {loading ? <Loader2 className="mr-2 animate-spin" /> : "Resend confirmation email"}
                </Button>
                <Button
                  className="w-full"
                  onClick={() => {
                    setVerificationSent(false)
                    setMode("login")
                    setPassword("")
                    setConfirmPassword("")
                    setRole(null)
                  }}
                >
                  Back to log in
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ) : mode === "forgot" ? (

          <motion.div
            key="forgot-form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-md"
          >
            <div className="text-center mb-6">
              <JeffMascot 
                size="sm" 
                message={resetSent ? "Check your email for the reset link!" : "No worries! Let's reset your password."}
              />
            </div>

            <Card variant="elevated">
              <CardHeader>
                <CardTitle>Reset Password</CardTitle>
                <CardDescription>
                  {resetSent 
                    ? "We've sent a reset link to your email" 
                    : "Enter your email to receive a reset link"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {resetSent ? (
                  <div className="text-center space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Didn't receive the email? Check your spam folder or try again.
                    </p>
                    <Button variant="outline" onClick={() => setResetSent(false)} className="w-full">
                      Send Again
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleForgotPassword} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="resetEmail">Email</Label>
                      <Input
                        id="resetEmail"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full" size="lg" disabled={loading}>
                      {loading ? <Loader2 className="mr-2 animate-spin" /> : "Send Reset Link"}
                    </Button>
                  </form>
                )}

                <p className="text-center mt-4 text-sm text-muted-foreground">
                  Remember your password?{" "}
                  <button 
                    onClick={() => { setMode("login"); setResetSent(false); }} 
                    className="text-primary hover:underline"
                  >
                    Back to login
                  </button>
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ) : mode === "signup" && !role ? (
          <motion.div
            key="role-select"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-lg"
          >
            <div className="text-center mb-6">
              <JeffMascot 
                size="sm" 
                message="Are you joining as a student or a teacher?"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <Card 
                variant="elevated" 
                className="cursor-pointer hover:border-primary transition-all"
                onClick={() => setRole("student")}
              >
                <CardContent className="p-6 text-center">
                  <GraduationCap className="w-12 h-12 mx-auto mb-4 text-primary" />
                  <h3 className="font-display text-xl font-bold mb-2">Student</h3>
                  <p className="text-sm text-muted-foreground">
                    Learn financial literacy through interactive lessons
                  </p>
                </CardContent>
              </Card>
              
              <Card 
                variant="elevated" 
                className="cursor-pointer hover:border-primary transition-all"
                onClick={() => setRole("teacher")}
              >
                <CardContent className="p-6 text-center">
                  <Users className="w-12 h-12 mx-auto mb-4 text-primary" />
                  <h3 className="font-display text-xl font-bold mb-2">Teacher</h3>
                  <p className="text-sm text-muted-foreground">
                    Create classes and monitor student progress
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <p className="text-center mt-6 text-muted-foreground">
              Already have an account?{" "}
              <button 
                onClick={() => setMode("login")} 
                className="text-primary hover:underline"
              >
                Log in
              </button>
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="auth-form"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="w-full max-w-md"
          >
            <div className="text-center mb-6">
              <JeffMascot 
                size="sm" 
                message={mode === "login" 
                  ? "Welcome back! Let's continue your journey!" 
                  : `Great choice! Let's set up your ${role} account.`}
              />
            </div>
            
            <Card variant="elevated">
              <CardHeader>
                <CardTitle>{mode === "login" ? "Log In" : "Sign Up"}</CardTitle>
                <CardDescription>
                  {mode === "login" 
                    ? "Enter your credentials to continue" 
                    : `Create your ${role} account`}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={mode === "login" ? handleLogin : handleSignup} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Password</Label>
                      {mode === "login" && (
                        <button
                          type="button"
                          onClick={() => setMode("forgot")}
                          className="text-xs text-primary hover:underline"
                        >
                          Forgot password?
                        </button>
                      )}
                    </div>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      required
                      minLength={6}
                    />
                  </div>
                  
                  {mode === "signup" && (
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="Confirm your password"
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        required
                        minLength={6}
                      />
                    </div>
                  )}
                  
                  <Button type="submit" className="w-full" size="lg" disabled={loading}>
                    {loading ? (
                      <Loader2 className="mr-2 animate-spin" />
                    ) : (
                      <>
                        {mode === "login" ? "Log In" : "Create Account"}
                        <ArrowRight className="ml-2" />
                      </>
                    )}
                  </Button>
                </form>
                
                <div className="mt-4 text-center text-sm text-muted-foreground">
                  {mode === "login" ? (
                    <p>
                      Don't have an account?{" "}
                      <button 
                        onClick={() => { setMode("signup"); setRole(null); }} 
                        className="text-primary hover:underline"
                      >
                        Sign up
                      </button>
                    </p>
                  ) : (
                    <p>
                      Already have an account?{" "}
                      <button 
                        onClick={() => setMode("login")} 
                        className="text-primary hover:underline"
                      >
                        Log in
                      </button>
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
            
            {mode === "signup" && role && (
              <p className="text-center mt-4 text-sm text-muted-foreground">
                <button 
                  onClick={() => setRole(null)} 
                  className="text-primary hover:underline"
                >
                  ← Choose a different role
                </button>
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
