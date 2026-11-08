import type { ReactNode } from "react"

import { GlobeBackdrop } from "@/components/globe-backdrop"

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className="relative isolate flex min-h-[calc(100svh-100px)] items-center justify-center overflow-hidden bg-[#08080a] px-4 py-12 sm:px-6">
      <GlobeBackdrop className="opacity-70" />
      <div className="w-full max-w-md">{children}</div>
    </main>
  )
}
