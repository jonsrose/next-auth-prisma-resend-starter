'use client';

import { signIn, getProviders } from "next-auth/react"
import { useEffect, useState, FormEvent } from "react"

export default function SignIn() {
  const [providers, setProviders] = useState<any>(null)
  const [email, setEmail] = useState('')

  useEffect(() => {
    const fetchProviders = async () => {
      const res = await getProviders()
      setProviders(res)
    }
    fetchProviders()
  }, [])

  const handleEmailSignIn = async (e: FormEvent) => {
    e.preventDefault()
    await signIn('email', { email, callbackUrl: '/' })
  }

  if (!providers) return null

  return (
    <div>
      {Object.values(providers).map((provider: any) => (
        <div key={provider.name}>
          {provider.id === 'email' ? (
            <form onSubmit={handleEmailSignIn}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
              <button type="submit">Sign in with Email</button>
            </form>
          ) : (
            <button onClick={() => signIn(provider.id, { callbackUrl: '/' })}>
              Sign in with {provider.name}
            </button>
          )}
        </div>
      ))}
    </div>
  )
}