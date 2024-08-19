import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import { UserButton } from "@clerk/nextjs"

export const Navbar = () => {
  return (
    <div className=" fixed top-0 w-full h-14 px-4 border-b shadow-sm bg-white flex items-center">
      <div className=" md:max-w-screen-2xl mx-auto flex items-center w-full justify-between">
        <Logo />
        <div className="flex items-center">
          <Button variant="default" className="mr-2">
            Create a board
          </Button>
          <UserButton />
        </div>
      </div>
    </div>
  )
}
