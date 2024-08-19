import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export const Navbar = () => {
  return (
    <div className=" fixed top-0 w-full h-14 px-4 border-b shadow-sm bg-white flex items-center">
      <div className=" md:max-w-screen-2xl mx-auto flex items-center w-full justify-between">
        <Logo />
        <div>
          <Button variant="default" className="mr-2">
            <Link href="./sign-in">Sign In</Link>
          </Button>
          <Button variant="secondary">
            <Link href="./sign-up">Sign Up</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
