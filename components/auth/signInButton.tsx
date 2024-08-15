import { signIn } from "@/auth"
import { Button } from "@/components/ui/button"

export const SignInButton = () => {
  return (
    <form
      action={async () => {
        "use server"
        await signIn("github, google", { redirectTo: "/dashboard" })
      }}
    >
      <Button variant="default" type="submit">
        Sign in
      </Button>
    </form>
  )
}
