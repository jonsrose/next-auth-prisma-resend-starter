import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "@/lib/prisma"
import type { User, Session } from "next-auth"

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session, user }: { session: Session; user: User }) {
      if (session.user) {
        session.user.id = user.id;
      } else {
        session.user = { id: user.id };
      }
      return session;
    },
  },
  pages: {
    signIn: '/signin',
    newUser: '/'
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }