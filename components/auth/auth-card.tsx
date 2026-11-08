import type { ReactNode } from "react"

export function AuthCard({ children }: { children: ReactNode }) {
  return (
    <div className="w-full rounded-2xl border border-white/10 bg-[#101014]/90 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.5)] backdrop-blur-xl sm:p-8">
      {children}
    </div>
  )
}
