import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Trans, useTranslation } from "react-i18next"
import { motion, AnimatePresence } from "framer-motion"
import { supabase } from "@/integrations/supabase/client"
import { JeffMascot } from "@/components/JeffMascot"
import { Wordmark } from "@/components/Wordmark"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { ArrowRight, GraduationCap, Users, Loader2, MailCheck, PartyPopper } from "lucide-react"
import Confetti from "@/components/Confetti"
import { DEV_LOCAL_BYPASS } from "@/lib/devBypass"

type AuthMode = "login" | "signup" | "forgot"
type UserRole = "student" | "teacher" | null

export default function Auth() {
  const navigate = useNavigate()
  const { toast } = useToast()
  const { t } = useTranslation()
  
  const [mode, setMode] = useState<AuthMode>("login")
  const [role, setRole] = useState<UserRole>(null)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  // Password reset is a 3-step OTP flow: enter email → enter 6-digit code → set new password.
  const [resetStep, setResetStep] = useState<"email" | "otp" | "password">("email")
  const [otpCode, setOtpCode] = useState("")
  // Signup email verification: "" (form) → "code" (enter 6-digit code) → "done"
  // (confetti "email confirmed" screen with a log-in button).
  const [signupPhase, setSignupPhase] = useState<"" | "code" | "done">("")
  const [signupCode, setSignupCode] = useState("")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) throw error
      if (!data.user) throw new Error(t("auth.noUserReturned"))

      // Route from here rather than waiting on the AppContext auth listener:
      // that listener awaits a profile query which can hang, and on the dev
      // bypass server it is never subscribed at all - so the spinner has to
      // stay up until WE navigate. We fetch the profile ourselves and pick the
      // destination; the listener, when it does run, computes the same one, so
      // the extra navigate is a harmless no-op. Deliberately DON'T clear the
      // spinner on success: the navigation unmounts this form.
      const { data: profile } = await supabase
        .from("profiles")
        .select("role, onboarding_complete")
        .eq("id", data.user.id)
        .maybeSingle()
      if (profile?.role === "teacher") {
        navigate("/teacher-dashboard", { replace: true })
      } else if (profile?.onboarding_complete) {
        navigate("/dashboard", { replace: true })
      } else {
        navigate("/onboarding", { replace: true })
      }
    } catch (error: any) {
      // The account exists but the email was never confirmed (signup gates on
      // a 6-digit code that can get abandoned). Rather than dead-end with an
      // "invalid credentials" toast, drop the user into the code-entry step and
      // send a fresh code right away so they can finish setting up the account.
      if (error?.code === "email_not_confirmed") {
        setSignupCode("")
        setSignupPhase("code")
        const { error: resendError } = await supabase.auth.resend({ type: "signup", email })
        toast(
          resendError
            ? { title: t("auth.couldntSendNewCode"), description: resendError.message, variant: "destructive" }
            : { title: t("auth.confirmYourEmail"), description: t("auth.confirmYourEmailDesc") }
        )
        setLoading(false)
        return
      }
      toast({
        title: t("auth.loginFailed"),
        description: error.message,
        variant: "destructive",
      })
      setLoading(false)
    }
  }

  // Step 1: send a 6-digit recovery code to the user's email.
  // (Supabase emails the {{ .Token }} for type=recovery; no redirect link is used.)
  const handleSendResetCode = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        options: { type: 'recovery' }
      })

      if (error) throw error

      setResetStep("otp")
      toast({
        title: t("auth.codeSent"),
        description: t("auth.codeSentDesc"),
      })
    } catch (error: any) {
      toast({
        title: t("auth.failedToSendCode"),
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  // Step 2: verify the 6-digit code. A successful verifyOtp establishes a
  // recovery session, which is what lets updateUser change the password.
  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { error } = await supabase.auth.verifyOtp({
        email,
        token: otpCode.trim(),
        type: "recovery",
      })

      if (error) throw error

      setResetStep("password")
      toast({
        title: t("auth.codeVerified"),
        description: t("auth.codeVerifiedDesc"),
      })
    } catch (error: any) {
      toast({
        title: t("auth.invalidCode"),
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  // Step 3: set the new password using the recovery session from step 2,
  // then sign out and return to login.
  const handleSetNewPassword = async (e: React.FormEvent) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      toast({
        title: t("auth.passwordsMismatch"),
        description: t("auth.passwordsMismatchDesc"),
        variant: "destructive",
      })
      return
    }

    if (password.length < 6) {
      toast({
        title: t("auth.passwordTooShort"),
        description: t("auth.passwordTooShortDesc"),
        variant: "destructive",
      })
      return
    }

    setLoading(true)

    try {
      const { error } = await supabase.auth.updateUser({ password })
      if (error) throw error

      navigate("/auth")

      toast({
        title: t("auth.passwordUpdated"),
      })

      setMode("login")
      setResetStep("email")
      setOtpCode("")
      setPassword("")
      setConfirmPassword("")
    } catch (error: any) {
      toast({
        title: t("auth.failedToResetPassword"),
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
        title: t("auth.passwordsMismatch"),
        description: t("auth.passwordsMismatchDesc"),
        variant: "destructive",
      })
      return
    }

    if (!role) {
      toast({
        title: t("auth.selectRole"),
        description: t("auth.selectRoleDesc"),
        variant: "destructive",
      })
      return
    }

    // If a session is already active, sign out first so signUp can succeed
    const { data: existing } = await supabase.auth.getSession()
    if (existing.session) {
      console.log("[Auth] Existing session detected - signing out before signup")
      await supabase.auth.signOut()
    }

    setLoading(true)

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          // The on_auth_user_created trigger reads this to provision the
          // profile + user_roles row with the chosen role.
          data: { role },
        },
      })

      if (error) throw error

      // Profile + role are auto-created by the on_auth_user_created trigger
      // from the role metadata above. If a session exists (email confirmation
      // off), route in; otherwise move to the 6-digit code entry step - the
      // confirm-signup email delivers a {{ .Token }} code, not a link.
      if (data.session) {
        toast({
          title: t("auth.accountCreated"),
          description: t("auth.accountCreatedDesc"),
        })
        navigate(role === "teacher" ? "/teacher-dashboard" : "/onboarding")
      } else {
        setSignupCode("")
        setSignupPhase("code")
        toast({
          title: t("auth.checkYourEmail"),
          description: t("auth.checkYourEmailDesc"),
        })
      }

    } catch (error: any) {
      toast({
        title: t("auth.signupFailed"),
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  // Verify the 6-digit signup code. A successful verifyOtp confirms the email
  // and creates a session, so we sign back out to land on a clean "confirmed"
  // screen with an explicit log-in button.
  const handleVerifySignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { error } = await supabase.auth.verifyOtp({
        email,
        token: signupCode.trim(),
        type: "signup",
      })
      if (error) throw error

      await supabase.auth.signOut()
      setSignupPhase("done")
    } catch (error: any) {
      toast({
        title: t("auth.invalidCode"),
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleResendSignupCode = async () => {
    setLoading(true)
    const { error } = await supabase.auth.resend({ type: "signup", email })
    setLoading(false)
    if (error) {
      toast({ title: t("auth.couldntResend"), description: error.message, variant: "destructive" })
    } else {
      toast({ title: t("auth.newCodeSent"), description: t("auth.newCodeSentDesc") })
    }
  }

  // On the dev bypass server (`npm run dev`, port 8080) there is no real
  // Supabase session and the AppContext auth listener is never subscribed, so a
  // login here can never resolve. Show a banner instead of a dead login form.
  // Use `npm run dev:qa` (port 8084) for real auth.
  if (DEV_LOCAL_BYPASS) {
    return (
      <div className="relative min-h-screen bg-background flex flex-col items-center justify-center gap-6 p-4">
        <Wordmark className="text-3xl md:text-5xl" />
        <Card variant="elevated" className="w-full max-w-md">
          <CardHeader>
            <CardTitle>{t("auth.devBypassTitle")}</CardTitle>
            <CardDescription>
              <Trans i18nKey="auth.devBypassBody" components={{ code: <code className="font-mono" /> }} />
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" size="lg" onClick={() => navigate("/dashboard")}>
              {t("auth.goToApp")} <ArrowRight className="ml-2" />
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen bg-background flex flex-col items-center justify-center gap-6 md:gap-8 p-4 py-10">
      {/* In normal flow (not absolutely pinned) so the wordmark always sits
          directly above the card, whichever auth view is showing. */}
      <Wordmark className="text-3xl md:text-5xl" />
      <AnimatePresence mode="wait">
        {signupPhase === "done" ? (
          <motion.div
            key="email-confirmed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background"
          >
            <Confetti />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 18 }}
              className="w-full max-w-md text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 14, delay: 0.15 }}
                className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-primary shadow-glow"
              >
                <PartyPopper className="h-12 w-12 text-white" />
              </motion.div>
              <h1 className="font-display text-3xl md:text-4xl font-extrabold mb-2">{t("auth.emailConfirmed")}</h1>
              <p className="text-muted-foreground mb-8">
                <Trans i18nKey="auth.emailVerified" values={{ email }} components={{ email: <span className="font-medium text-foreground" /> }} />
              </p>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 }}
              >
                <Button
                  size="lg"
                  className="w-full text-base font-bold"
                  onClick={() => {
                    setSignupPhase("")
                    setSignupCode("")
                    setMode("login")
                    setPassword("")
                    setConfirmPassword("")
                    setRole(null)
                  }}
                >
                  {t("auth.logIn")} <ArrowRight className="ml-1.5 h-4 w-4" />
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        ) : signupPhase === "code" ? (
          <motion.div
            key="verify-code"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-md"
          >
            <div className="text-center mb-6">
              <JeffMascot
                size="sm"
                message={t("auth.jeffCodeMessage")}
              />
            </div>
            <Card variant="elevated">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><MailCheck className="h-5 w-5 text-primary" /> {t("auth.enterYourCode")}</CardTitle>
                <CardDescription>
                  <Trans i18nKey="auth.weSentCode" values={{ email }} components={{ email: <span className="font-medium text-foreground" /> }} />
                  <br />
                  <span className="font-semibold text-foreground">{t("auth.dontSeeIt")}</span> {t("auth.checkSpam")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleVerifySignup} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signupCode">{t("auth.verificationCode")}</Label>
                    <Input
                      id="signupCode"
                      inputMode="numeric"
                      autoComplete="one-time-code"
                      placeholder="000000"
                      maxLength={6}
                      value={signupCode}
                      onChange={e => setSignupCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                      className="text-center text-2xl tracking-[0.5em] font-bold"
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={loading || signupCode.length !== 6}>
                    {loading ? <Loader2 className="mr-2 animate-spin" /> : t("auth.confirmEmail")}
                  </Button>
                </form>
                <div className="mt-4 flex items-center justify-between text-sm">
                  <button
                    type="button"
                    onClick={handleResendSignupCode}
                    disabled={loading}
                    className="text-primary hover:underline disabled:opacity-50"
                  >
                    {t("auth.resendCode")}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSignupPhase("")
                      setSignupCode("")
                      setMode("login")
                      setPassword("")
                      setConfirmPassword("")
                      setRole(null)
                    }}
                    className="text-muted-foreground hover:underline"
                  >
                    {t("auth.backToLogIn")}
                  </button>
                </div>
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
                message={
                  resetStep === "otp"
                    ? t("auth.jeffResetOtp")
                    : resetStep === "password"
                    ? t("auth.jeffResetPassword")
                    : t("auth.jeffResetEmail")
                }
              />
            </div>

            <Card variant="elevated">
              <CardHeader>
                <CardTitle>{t("auth.resetPassword")}</CardTitle>
                <CardDescription>
                  {resetStep === "otp"
                    ? t("auth.resetDescOtp", { email })
                    : resetStep === "password"
                    ? t("auth.resetDescPassword")
                    : t("auth.resetDescEmail")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {resetStep === "email" && (
                  <form onSubmit={handleSendResetCode} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="resetEmail">{t("auth.email")}</Label>
                      <Input
                        id="resetEmail"
                        type="email"
                        placeholder={t("auth.emailPlaceholder")}
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full" size="lg" disabled={loading}>
                      {loading ? <Loader2 className="mr-2 animate-spin" /> : t("auth.sendCode")}
                    </Button>
                  </form>
                )}

                {resetStep === "otp" && (
                  <form onSubmit={handleVerifyCode} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="otpCode">{t("auth.verificationCode")}</Label>
                      <Input
                        id="otpCode"
                        type="text"
                        inputMode="numeric"
                        autoComplete="one-time-code"
                        placeholder="000000"
                        value={otpCode}
                        onChange={e => setOtpCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                        required
                        maxLength={6}
                        className="text-center text-2xl tracking-[0.5em] font-mono"
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full"
                      size="lg"
                      disabled={loading || otpCode.length !== 6}
                    >
                      {loading ? <Loader2 className="mr-2 animate-spin" /> : t("auth.verifyCode")}
                    </Button>
                    <p className="text-center text-sm text-muted-foreground">
                      {t("auth.didntGetIt")}{" "}
                      <button
                        type="button"
                        onClick={() => { setResetStep("email"); setOtpCode("") }}
                        className="text-primary hover:underline"
                      >
                        {t("auth.resendCode")}
                      </button>
                    </p>
                  </form>
                )}

                {resetStep === "password" && (
                  <form onSubmit={handleSetNewPassword} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">{t("auth.newPassword")}</Label>
                      <Input
                        id="newPassword"
                        type="password"
                        placeholder={t("auth.newPasswordPlaceholder")}
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                        minLength={6}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmNewPassword">{t("auth.confirmNewPassword")}</Label>
                      <Input
                        id="confirmNewPassword"
                        type="password"
                        placeholder={t("auth.confirmNewPasswordPlaceholder")}
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        required
                        minLength={6}
                      />
                    </div>
                    <Button type="submit" className="w-full" size="lg" disabled={loading}>
                      {loading ? <Loader2 className="mr-2 animate-spin" /> : t("auth.updatePassword")}
                    </Button>
                  </form>
                )}

                <p className="text-center mt-4 text-sm text-muted-foreground">
                  {t("auth.rememberPassword")}{" "}
                  <button
                    onClick={() => {
                      setMode("login")
                      setResetStep("email")
                      setOtpCode("")
                    }}
                    className="text-primary hover:underline"
                  >
                    {t("auth.backToLogin")}
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
                message={t("auth.jeffRoleQuestion")}
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
                  <h3 className="font-display text-xl font-bold mb-2">{t("auth.student")}</h3>
                  <p className="text-sm text-muted-foreground">
                    {t("auth.studentDesc")}
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
                  <h3 className="font-display text-xl font-bold mb-2">{t("auth.teacher")}</h3>
                  <p className="text-sm text-muted-foreground">
                    {t("auth.teacherDesc")}
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <p className="text-center mt-6 text-muted-foreground">
              {t("auth.alreadyHaveAccount")}{" "}
              <button 
                onClick={() => setMode("login")} 
                className="text-primary hover:underline"
              >
                {t("auth.logIn")}
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
            {/* Jeff peeks in from the side to greet you. */}
            <motion.div
              className="fixed bottom-8 right-4 sm:right-8 z-20 hidden sm:flex flex-row-reverse items-center pointer-events-none"
              initial={{ x: "130%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "130%", opacity: 0 }}
              transition={{ type: "spring", stiffness: 80, damping: 14, delay: 0.35 }}
            >
              <JeffMascot
                size="xl"
                mood={mode === "login" ? "happy" : "excited"}
                message={mode === "login"
                  ? t("auth.jeffWelcomeBack")
                  : t("auth.jeffSetup", { context: role ?? undefined })}
              />
            </motion.div>

            <Card variant="elevated">
              <CardHeader>
                <CardTitle>{mode === "login" ? t("auth.logInTitle") : t("auth.signUpTitle")}</CardTitle>
                <CardDescription>
                  {mode === "login"
                    ? t("auth.enterCredentials")
                    : t("auth.createAccountDesc", { context: role ?? undefined })}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={mode === "login" ? handleLogin : handleSignup} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">{t("auth.email")}</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder={t("auth.emailPlaceholder")}
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">{t("auth.password")}</Label>
                      {mode === "login" && (
                        <button
                          type="button"
                          onClick={() => { setMode("forgot"); setResetStep("email"); setOtpCode("") }}
                          className="text-xs text-primary hover:underline"
                        >
                          {t("auth.forgotPassword")}
                        </button>
                      )}
                    </div>
                    <Input
                      id="password"
                      type="password"
                      placeholder={t("auth.passwordPlaceholder")}
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      required
                      minLength={6}
                    />
                  </div>
                  
                  {mode === "signup" && (
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">{t("auth.confirmPassword")}</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        placeholder={t("auth.confirmPasswordPlaceholder")}
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
                        {mode === "login" ? t("auth.logIn") : t("auth.createAccount")}
                        <ArrowRight className="ml-2" />
                      </>
                    )}
                  </Button>
                </form>
                
                <div className="mt-4 text-center text-sm text-muted-foreground">
                  {mode === "login" ? (
                    <p>
                      {t("auth.noAccount")}{" "}
                      <button
                        onClick={() => navigate("/onboarding")}
                        className="text-primary hover:underline"
                      >
                        {t("auth.signUp")}
                      </button>
                    </p>
                  ) : (
                    <p>
                      {t("auth.alreadyHaveAccount")}{" "}
                      <button 
                        onClick={() => setMode("login")} 
                        className="text-primary hover:underline"
                      >
                        {t("auth.logIn")}
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
                  {t("auth.chooseDifferentRole")}
                </button>
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
