"use client"

import { type MouseEvent, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu } from "lucide-react"
import { cn } from "cn"

import logo from "@/app/images/logo.png"
import { buttonVariants } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

const navLinks = [
  { label: "Browse Jobs", href: "/jobs" },
  { label: "Company", href: "/companies" },
  { label: "Pricing", href: "/pricing" },
]

function NavLink({
  href,
  label,
  active,
}: {
  href: string
  label: string
  active: boolean
}) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "text-[16px] leading-[1.8] tracking-[-0.2px] text-foreground transition-colors hover:text-brand-soft",
        active && "font-bold underline underline-offset-4"
      )}
    >
      {label}
    </Link>
  )
}

export function Navbar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`)

  const closeIfCurrent = (
    event: MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (pathname === href) {
      event.preventDefault()
      setOpen(false)
    }
  }

  const closeOnNavigate = () => setOpen(false)

  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 pt-4 pb-4 backdrop-blur-xl">
      <div className="mx-auto flex h-[68px] w-full max-w-[1344px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" aria-label="HireLoop home" className="shrink-0">
          <Image
            src={logo}
            alt="HireLoop"
            preload
            className="h-10 w-auto sm:h-11"
          />
        </Link>

        <nav
          aria-label="Main navigation"
          className="hidden h-[68px] items-center gap-6 rounded-md border border-border bg-surface-2 py-2 pr-2 pl-6 lg:flex"
        >
          <div className="flex items-center gap-5">
            {navLinks.map((link) => (
              <NavLink
                key={link.href}
                {...link}
                active={isActive(link.href)}
              />
            ))}
          </div>

          <span aria-hidden className="h-6 w-px shrink-0 bg-[#a8a8a8]/40" />

          <div className="flex items-center gap-4">
            <Link
              href="/sign-in"
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "h-[38px] rounded-md px-4 font-[family-name:var(--font-inter)] text-[18px] leading-[1.45] font-semibold tracking-normal text-brand shadow-[inset_0_3px_10px_rgba(255,255,255,0.12)] hover:bg-white/5 hover:text-brand-soft"
              )}
            >
              Sign In
            </Link>
            <Link
              href="/sign-up"
              className={cn(
                buttonVariants({ variant: "default" }),
                "h-[52px] rounded-md border border-black/10 bg-brand px-6 font-[family-name:var(--font-instrument-sans)] text-[18px] leading-[1.45] font-medium tracking-normal text-[#ededef] shadow-[inset_0_3px_10px_rgba(255,255,255,0.2)] hover:bg-brand hover:brightness-110"
              )}
            >
              Get Started
            </Link>
          </div>
        </nav>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            aria-label="Open navigation menu"
            className={cn(
              buttonVariants({ variant: "outline", size: "icon-lg" }),
              "rounded-md border-border bg-surface-2 lg:hidden"
            )}
          >
            <Menu />
          </SheetTrigger>

          <SheetContent
            side="right"
            className="gap-0 border-border bg-surface-2 p-6"
          >
            <SheetHeader className="gap-2 p-0">
              <SheetTitle className="sr-only">Navigation menu</SheetTitle>
              <SheetDescription className="sr-only">
                Browse HireLoop pages and access your account.
              </SheetDescription>
              <Link
                href="/"
                aria-label="HireLoop home"
                onClick={(event) => closeIfCurrent(event, "/")}
                onNavigate={closeOnNavigate}
                className="w-fit"
              >
                <Image src={logo} alt="HireLoop" className="h-10 w-auto" />
              </Link>
            </SheetHeader>

            <nav aria-label="Mobile navigation" className="mt-10 flex flex-col gap-1">
              {navLinks.map((link) => {
                const active = isActive(link.href)

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    onClick={(event) => closeIfCurrent(event, link.href)}
                    onNavigate={closeOnNavigate}
                    className={cn(
                      "flex h-12 items-center rounded-md px-3 text-base font-medium text-foreground transition-colors hover:bg-white/5",
                      active && "bg-surface-3 font-semibold text-brand"
                    )}
                  >
                    {link.label}
                  </Link>
                )
              })}
            </nav>

            <div className="mt-auto flex flex-col gap-3 pt-8">
              <span aria-hidden className="mb-2 h-px w-full bg-border" />
              <Link
                href="/sign-in"
                onClick={(event) => closeIfCurrent(event, "/sign-in")}
                onNavigate={closeOnNavigate}
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "h-12 w-full rounded-md border-border bg-transparent font-[family-name:var(--font-inter)] text-[18px] leading-[1.45] font-semibold tracking-normal text-brand hover:bg-white/5"
                )}
              >
                Sign In
              </Link>
              <Link
                href="/sign-up"
                onClick={(event) => closeIfCurrent(event, "/sign-up")}
                onNavigate={closeOnNavigate}
                className={cn(
                  buttonVariants({ variant: "default" }),
                  "h-12 w-full rounded-md border border-black/10 bg-brand font-[family-name:var(--font-instrument-sans)] text-[18px] leading-[1.45] font-medium tracking-normal text-[#ededef] hover:bg-brand hover:brightness-110"
                )}
              >
                Get Started
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
