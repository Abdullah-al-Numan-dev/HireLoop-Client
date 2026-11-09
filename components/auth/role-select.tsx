"use client"

import { Briefcase, Search, ShieldCheck } from "lucide-react"

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import type { UserRole } from "@/lib/auth-roles"
import { cn } from "@/lib/utils"

const roleOptions: {
  value: UserRole
  title: string
  description: string
  icon: typeof Search
}[] = [
  {
    value: "seeker",
    title: "Job Seeker",
    description: "Find and apply to jobs",
    icon: Search,
  },
  {
    value: "recruiter",
    title: "Recruiter",
    description: "Post jobs and hire talent",
    icon: Briefcase,
  },
  {
    value: "admin",
    title: "Admin",
    description: "Manage the platform",
    icon: ShieldCheck,
  },
]

const roleCardClassName = cn(
  "group flex cursor-pointer flex-col items-stretch gap-1 rounded-xl border border-white/10 bg-white/[0.02] p-3 transition-colors select-none",
  "hover:border-white/25 hover:bg-white/[0.06]",
  "has-[[data-checked]]:border-brand-soft has-[[data-checked]]:bg-brand/10",
  "has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-brand-soft/50",
  "has-[[data-disabled]]:cursor-not-allowed has-[[data-disabled]]:opacity-60"
)

export function RoleSelect({ disabled }: { disabled?: boolean }) {
  return (
    <fieldset className="space-y-2">
      <legend className="mb-2 text-sm font-medium text-white/80">
        I am joining as
      </legend>
      <RadioGroup
        name="role"
        defaultValue="seeker"
        required
        disabled={disabled}
        className="grid grid-cols-1 gap-2 sm:grid-cols-3"
      >
        {roleOptions.map((option) => {
          const Icon = option.icon

          return (
            <Label key={option.value} className={roleCardClassName}>
              <span className="flex w-full items-center justify-between gap-2">
                <Icon aria-hidden className="size-4 text-brand-soft" />
                <RadioGroupItem value={option.value} />
              </span>
              <span className="text-sm leading-tight font-medium text-white">
                {option.title}
              </span>
              <span className="text-xs leading-snug text-white/45">
                {option.description}
              </span>
            </Label>
          )
        })}
      </RadioGroup>
    </fieldset>
  )
}
