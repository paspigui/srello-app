import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import { UserButton } from "@clerk/nextjs"
import Link from "next/link"

export const Navbar = () => {
  return (
    <nav className=" top-0 w-full h-14 px-4 border-b shadow-sm bg-white flex items-center">
      <div className=" md:max-w-screen-2xl mx-auto flex items-center w-full justify-between">
        <Link href={"/dashboard"}>
          <Logo />
        </Link>
        <div className="flex items-center">
          <Button variant="default" className="mr-2">
            Create a board
          </Button>
          <UserButton
            appearance={{
              elements: {
                avatarBox: {
                  height: 30,
                  width: 30,
                },
              },
            }}
          />
        </div>
      </div>
    </nav>
  )
}
