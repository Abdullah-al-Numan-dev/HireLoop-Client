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

export function SignInForm() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const email = String(formData.get("email") ?? "").trim()
    const password = String(formData.get("password") ?? "")
    const rememberMe = formData.get("rememberMe") === "on"

    setError(null)
    setIsSubmitting(true)

    try {
      const { error: signInError } = await authClient.signIn.email({
        email,
        password,
        rememberMe,
      })

      if (signInError) {
        setError(
          signInError.message ?? "Invalid email or password. Please try again."
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
          autoComplete="current-password"
          disabled={isSubmitting}
        />
      </div>

      <div className="flex items-center gap-2">
        <Checkbox
          id="rememberMe"
          name="rememberMe"
          nativeButton
          render={<button type="button" />}
          disabled={isSubmitting}
          className="border-white/25"
        />
        <Label
          htmlFor="rememberMe"
          className="text-sm font-normal text-white/70"
        >
          Remember me
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
            Signing in...
          </>
        ) : (
          <>
            Sign In
            <ArrowRight aria-hidden className="size-4" />
          </>
        )}
      </button>

      <p className="text-center text-sm text-white/50">
        New to HireLoop?{" "}
        <Link
          href="/sign-up"
          className="font-medium text-brand-soft transition-colors hover:text-brand"
        >
          Create an account
        </Link>
      </p>
    </form>
  )
}
