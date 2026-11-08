import Link from "next/link"
import { MapPin, Search, Sparkles } from "lucide-react"

import { GlobeBackdrop } from "@/components/globe-backdrop"

const trendingPositions = [
  "Product Designer",
  "AI Engineering",
  "Dev-ops Engineer",
]

export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate -mt-[100px] overflow-hidden bg-[#08080a] pt-[100px]"
    >
      <GlobeBackdrop />

      <div className="mx-auto flex min-h-[760px] w-full max-w-[1344px] flex-col items-center px-4 pt-16 pb-24 text-center sm:min-h-[820px] sm:px-6 sm:pt-20 lg:min-h-[860px] lg:px-8 lg:pt-28">
        <div className="flex items-center justify-center">
          <span
            aria-hidden
            className="hidden h-px w-16 bg-gradient-to-r from-[#010123]/70 to-[#a8a8a8]/70 sm:block"
          />
          <div className="flex items-center gap-3 rounded-full border border-white/20 bg-[linear-gradient(90deg,rgba(71,71,71,0.95),rgba(1,1,2,0.95))] px-4 py-2.5 shadow-[inset_0_0_6px_6px_rgba(0,0,0,0.1)] sm:gap-4 sm:px-6 sm:py-3">
            <Sparkles className="size-5 shrink-0 text-white sm:size-6" />
            <span className="font-badge text-[11px] leading-none tracking-[0.08em] text-white uppercase sm:text-sm lg:text-[20px] lg:tracking-normal">
              50,000+ new jobs this month
            </span>
          </div>
          <span
            aria-hidden
            className="hidden h-px w-16 bg-gradient-to-l from-[#010123]/70 to-[#a8a8a8]/70 sm:block"
          />
        </div>

        <h1
          id="hero-title"
          className="mt-8 max-w-[784px] font-display text-[40px] leading-[1.12] font-bold tracking-[-0.02em] text-white sm:text-[48px] lg:text-[56px] lg:leading-[1.15]"
        >
          Find Your Dream Job Today
        </h1>

        <p className="mt-4 max-w-[784px] font-display text-base leading-[1.6] text-white/90 sm:text-lg lg:text-[20px]">
          HireLoop connects top talent with world-class companies. Browse
          thousands of curated opportunities and land your next role — faster.
        </p>

        <form
          role="search"
          action="/jobs"
          className="mt-10 flex w-full max-w-[784px] flex-col gap-2 rounded-2xl border border-white/20 bg-[#101010] p-2 text-left sm:mt-12 sm:flex-row sm:items-center"
        >
          <div className="flex h-12 flex-1 items-center gap-2 rounded-xl px-4">
            <Search aria-hidden className="size-5 shrink-0 text-white" />
            <label htmlFor="hero-search-query" className="sr-only">
              Job title, skill or company
            </label>
            <input
              id="hero-search-query"
              name="q"
              type="search"
              placeholder="Job title, skill or company"
              className="h-full w-full min-w-0 bg-transparent font-sans text-base text-white outline-none placeholder:text-white/60"
            />
          </div>

          <span
            aria-hidden
            className="mx-4 h-px shrink-0 bg-white/20 sm:mx-0 sm:h-[26px] sm:w-px"
          />

          <div className="flex h-12 flex-1 items-center gap-2 rounded-xl px-4">
            <MapPin aria-hidden className="size-5 shrink-0 text-white" />
            <label htmlFor="hero-search-location" className="sr-only">
              Location or remote
            </label>
            <input
              id="hero-search-location"
              name="location"
              type="search"
              placeholder="Location or Remote"
              className="h-full w-full min-w-0 bg-transparent font-sans text-base text-white outline-none placeholder:text-white/60"
            />
          </div>

          <button
            type="submit"
            aria-label="Search jobs"
            className="flex h-12 w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-brand text-base font-medium text-white transition-[filter] hover:brightness-110 focus-visible:ring-2 focus-visible:ring-brand-soft focus-visible:ring-offset-2 focus-visible:ring-offset-[#101010] focus-visible:outline-none sm:ml-2 sm:size-12 sm:w-12 sm:p-0"
          >
            <Search aria-hidden className="size-5" />
            <span className="sm:hidden">Search Jobs</span>
          </button>
        </form>

        <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
          <span className="font-display text-base text-white/90">
            Trending Position
          </span>
          <ul className="flex flex-wrap justify-center gap-2">
            {trendingPositions.map((position) => (
              <li key={position}>
                <Link
                  href={`/jobs?q=${encodeURIComponent(position)}`}
                  className="inline-flex items-center rounded-full border border-white/10 bg-[#1a1a1b] px-3 py-1.5 font-display text-sm leading-[1.5] text-white/90 transition-colors hover:border-white/25 hover:text-white"
                >
                  {position}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
