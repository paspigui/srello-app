import { Button } from "@/components/ui/button"
import { Navbar } from "@/app/(landing)/_components/navbar"
import Link from "next/link"

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h1 className="text-4xl font-bold text-gray-800 mb-4 text">
          Welcome to Srello!
        </h1>
        <p className="text-lg text-gray-600">
          A simple project management tool that helps you organize your work.
        </p>
        <div className="text-3xl md:text-6xl text-center bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white px-4 p-2 rounded-md pb-4 w-fit ">
          Organize anything, together.
        </div>
        <Button variant="default" className="my-3">
          <Link href="./api/auth/signin">Get Started</Link>
        </Button>
      </div>
    </>
  )
}
