import type { Metadata } from "next"

import { AuthCard } from "@/components/auth/auth-card"
import { AuthTabs } from "@/components/auth/auth-tabs"
import { SignInForm } from "@/components/auth/sign-in-form"

export const metadata: Metadata = {
  title: "Sign In | HireLoop",
  description: "Sign in to your HireLoop account.",
}

export default function SignInPage() {
  return (
    <AuthCard>
      <AuthTabs active="sign-in" />

      <div className="mt-7">
        <h1 className="font-display text-2xl font-bold tracking-[-0.02em] text-white sm:text-3xl">
          Welcome back
        </h1>
        <p className="mt-2 text-sm leading-6 text-white/55">
          Sign in to continue tracking applications, saved jobs, and new
          opportunities.
        </p>
      </div>

      <SignInForm />
    </AuthCard>
  )
}
