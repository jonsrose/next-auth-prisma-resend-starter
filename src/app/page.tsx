'use client'

import Link from 'next/link'
import { withAuth } from '@/components/withAuth'
import { signOut } from 'next-auth/react'

export default function Home() {
  return (
    <main>
      <h1>Welcome to my Next.js app!</h1>
    </main>
  )
}
