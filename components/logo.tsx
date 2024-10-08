import Image from "next/image"
import { cn } from "@/lib/utils"

export const Logo = () => {
  return (
    <div className=" hover:opacity-75 transition items-center gap-x-2 hidden md:flex">
      <Image src="/logo.svg" alt="logo" width={30} height={30} />
      <p className={cn("text-lg text-neutral-700 pb-1")}>Srello</p>
    </div>
  )
}
