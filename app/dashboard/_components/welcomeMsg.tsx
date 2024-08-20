"use client"
import { useUser } from "@clerk/nextjs"

export const WelcomeMsg = () => {
  const { user, isLoaded } = useUser()

  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-center">
        <h1 className="text-2xl font-semibold">
          Welcome to Srello{isLoaded ? ", " : " "}
          {user?.firstName} !
        </h1>
      </div>
    </div>
  )
}
