import { SignIn, ClerkLoading, ClerkLoaded } from "@clerk/nextjs"
import { Loader2 } from "lucide-react"

export default function Page() {
  return (
    <div className="min-h-screen bg-fuchsia-200">
      <div className="h-full flex-col items-center justify-center px-4">
        <div className=" text-center space-y-4 pt-16">
          <h1 className="text-4xl font-bold text-gray-800">Welcome back!</h1>
          <p className="text-gray-600">Sign in to your account to continue.</p>
        </div>
        <div className=" h-full flex items-center justify-center mt-8">
          <ClerkLoaded>
            <SignIn path="/sign-in" forceRedirectUrl={"/dashboard"} />
          </ClerkLoaded>
          <ClerkLoading>
            <Loader2 className="animate-spin text-muted-foreground" />
          </ClerkLoading>
        </div>
      </div>
    </div>
  )
}
