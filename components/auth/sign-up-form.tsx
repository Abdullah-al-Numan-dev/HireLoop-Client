"use client"

import { useState } from "react"
import type { FormEvent } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowRight, LoaderCircle, TriangleAlert } from "lucide-react"

import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { authClient } from "@/lib/auth-client"

import { PasswordInput } from "./password-input"
import { authInputClassName } from "./styles"

export function SignUpForm() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const name = String(formData.get("name") ?? "").trim()
    const email = String(formData.get("email") ?? "").trim()
    const password = String(formData.get("password") ?? "")
    const confirmPassword = String(formData.get("confirmPassword") ?? "")
    const acceptedTerms = formData.get("terms") === "on"

    if (password !== confirmPassword) {
      setError("Passwords do not match.")
      return
    }

    if (!acceptedTerms) {
      setError("Please accept the Terms of Service and Privacy Policy.")
      return
    }

    setError(null)
    setIsSubmitting(true)

    try {
      const { error: signUpError } = await authClient.signUp.email({
        name,
        email,
        password,
      })

      if (signUpError) {
        setError(
          signUpError.message ??
            "We couldn't create your account. Please try again."
        )
        return
      }

      router.push("/")
    } catch {
      setError("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} method="post" className="mt-7 space-y-5">
      <div className="space-y-2">
        <Label htmlFor="name" className="text-white/80">
          Full name
        </Label>
        <Input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          placeholder="Alex Sterling"
          required
          disabled={isSubmitting}
          className={authInputClassName}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="text-white/80">
          Email
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          required
          disabled={isSubmitting}
          className={authInputClassName}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password" className="text-white/80">
          Password
        </Label>
        <PasswordInput
          id="password"
          name="password"
          autoComplete="new-password"
          placeholder="Create a password"
          disabled={isSubmitting}
        />
        <p className="text-xs text-white/40">Must be at least 8 characters.</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword" className="text-white/80">
          Confirm password
        </Label>
        <PasswordInput
          id="confirmPassword"
          name="confirmPassword"
          autoComplete="new-password"
          placeholder="Confirm your password"
          disabled={isSubmitting}
        />
      </div>

      <div className="flex items-start gap-2">
        <Checkbox
          id="terms"
          name="terms"
          nativeButton
          render={<button type="button" />}
          disabled={isSubmitting}
          className="mt-0.5 border-white/25"
        />
        <Label
          htmlFor="terms"
          className="text-sm leading-snug font-normal text-white/70"
        >
          I agree to the Terms of Service and Privacy Policy.
        </Label>
      </div>

      {error ? (
        <p
          role="alert"
          className="flex items-start gap-2 rounded-xl border border-destructive/40 bg-destructive/10 px-3 py-2.5 text-sm text-red-300"
        >
          <TriangleAlert aria-hidden className="mt-0.5 size-4 shrink-0" />
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isSubmitting}
        aria-busy={isSubmitting}
        className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-brand text-base font-medium text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] transition-[filter] hover:brightness-110 focus-visible:ring-2 focus-visible:ring-brand-soft focus-visible:ring-offset-2 focus-visible:ring-offset-[#101014] focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:brightness-100"
      >
        {isSubmitting ? (
          <>
            <LoaderCircle aria-hidden className="size-4 animate-spin" />
            Creating account...
          </>
        ) : (
          <>
            Create Account
            <ArrowRight aria-hidden className="size-4" />
          </>
        )}
      </button>

      <p className="text-center text-sm text-white/50">
        Already have an account?{" "}
        <Link
          href="/sign-in"
          className="font-medium text-brand-soft transition-colors hover:text-brand"
        >
          Sign in
        </Link>
      </p>
    </form>
  )
}
