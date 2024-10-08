'use client'

import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function SignIn() {
  const router = useRouter()

  const handleSignIn = async () => {
    const result = await signIn('google', { callbackUrl: '/' })
    if (result?.error) {
      console.error('Sign in error:', result.error)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-2xl mb-4">Sign In</h1>
      <button
        onClick={handleSignIn}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Sign in with Google
      </button>
    </div>
  )
}