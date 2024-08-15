import NextAuth from "next-auth"
import Github from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { db } from "./drizzle/db"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Github, Google],
  adapter: DrizzleAdapter(db),
  // events: {
  //   async linkAccount({ user }) {
  //     await db.user.update({  //issue with this line
  //       where: { id: user.id },
  //       data: { emailVerified: new Date() },
  //     })
  //   },
  // },
})
