import Link from "next/link"
import { cn } from "cn"

const tabs = [
  { label: "Sign In", href: "/sign-in", key: "sign-in" },
  { label: "Sign Up", href: "/sign-up", key: "sign-up" },
] as const

export function AuthTabs({ active }: { active: "sign-in" | "sign-up" }) {
  return (
    <nav
      aria-label="Authentication"
      className="flex rounded-xl border border-white/10 bg-white/[0.03] p-1"
    >
      {tabs.map((tab) => (
        <Link
          key={tab.key}
          href={tab.href}
          aria-current={active === tab.key ? "page" : undefined}
          className={cn(
            "flex-1 rounded-lg px-4 py-2 text-center text-sm font-medium transition-colors",
            active === tab.key
              ? "bg-brand text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]"
              : "text-white/60 hover:text-white"
          )}
        >
          {tab.label}
        </Link>
      ))}
    </nav>
  )
}
