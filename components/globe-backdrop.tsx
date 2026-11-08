import Image from "next/image"

import globe from "@/app/images/globe.png"
import { cn } from "cn"

export function GlobeBackdrop({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 overflow-hidden",
        className
      )}
    >
      <div className="absolute top-0 left-1/2 w-[1440px] max-w-none -translate-x-1/2">
        <Image
          src={globe}
          alt=""
          preload
          sizes="1440px"
          className="h-auto w-full select-none"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent from-55% to-[#08080a]" />
      <div className="absolute inset-x-0 top-0 h-52 bg-gradient-to-b from-[#08080a] via-[#08080a]/60 to-transparent" />
    </div>
  )
}
