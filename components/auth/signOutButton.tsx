import { signOut } from "@/auth"
import { Button } from "@/components/ui/button"

export function SignOutButton() {
  return (
    <form
      action={async () => {
        "use server"
        await signOut({ redirectTo: "/" })
      }}
    >
      <Button variant="default" type="submit">
        Sign out
      </Button>
    </form>
  )
}
