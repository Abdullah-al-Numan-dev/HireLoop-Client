import type { Metadata } from "next"

import { AuthCard } from "@/components/auth/auth-card"
import { AuthTabs } from "@/components/auth/auth-tabs"
import { SignUpForm } from "@/components/auth/sign-up-form"

export const metadata: Metadata = {
  title: "Sign Up | HireLoop",
  description: "Create your HireLoop account.",
}

export default function SignUpPage() {
  return (
    <AuthCard>
      <AuthTabs active="sign-up" />

      <div className="mt-7">
        <h1 className="font-display text-2xl font-bold tracking-[-0.02em] text-white sm:text-3xl">
          Create your account
        </h1>
        <p className="mt-2 text-sm leading-6 text-white/55">
          Join HireLoop and get matched with curated roles from world-class
          companies.
        </p>
      </div>

      <SignUpForm />
    </AuthCard>
  )
}
