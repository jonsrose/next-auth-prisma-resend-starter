import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import EmailProvider from "next-auth/providers/email"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import type { User, Session } from "next-auth"
import { Resend } from 'resend'
import { Account } from "next-auth";
import { NextAuthOptions } from "next-auth";
import { DefaultSession } from "next-auth";

const prismaClient = new PrismaClient()

declare module "next-auth" {
  interface Session {
    user?: DefaultSession["user"] & {
      id: string
    }
  }
}

async function linkAccount(user: User, account: Account) {
  // Check if there's an existing account with the same email
  const existingUser = await prismaClient.user.findUnique({
    where: { email: user.email },
    include: { accounts: true },
  })

  if (existingUser) {
    // If the user exists but doesn't have this provider linked
    if (!existingUser.accounts.some((acc: Account) => acc.provider === account.provider)) {
      await prismaClient.account.create({
        data: {
          userId: existingUser.id,
          type: account.type,
          provider: account.provider,
          providerAccountId: account.providerAccountId,
          refresh_token: account.refresh_token,
          access_token: account.access_token,
          expires_at: account.expires_at,
          token_type: account.token_type,
          scope: account.scope,
          id_token: account.id_token,
          session_state: account.session_state,
        },
      })
    }
    return true
  }

  // If no existing user, create a new user and account
  await prismaClient.user.create({
    data: {
      name: user.name,
      email: user.email,
      image: user.image,
      accounts: {
        create: {
          type: account.type,
          provider: account.provider,
          providerAccountId: account.providerAccountId,
          refresh_token: account.refresh_token,
          access_token: account.access_token,
          expires_at: account.expires_at,
          token_type: account.token_type,
          scope: account.scope,
          id_token: account.id_token,
          session_state: account.session_state,
        },
      },
    },
  })

  return true
}

const resend = new Resend(process.env.RESEND_API_KEY)

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prismaClient),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    EmailProvider({
      from: process.env.EMAIL_FROM,
      sendVerificationRequest: async ({ identifier: email, url }) => {
        const { host } = new URL(url)
        await resend.emails.send({
          from: process.env.EMAIL_FROM!,
          to: email,
          subject: `Sign in to ${host}`,
          html: `<p>Click <a href="${url}">here</a> to sign in.</p>`
        })
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      // Custom sign-in logic here
      if (account) {
        return await linkAccount(user, account)
      }
      return true
    },
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