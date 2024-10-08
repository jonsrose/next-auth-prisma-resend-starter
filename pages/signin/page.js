import { signIn } from "next-auth/react"

export default function SignIn() {
  const handleSignIn = () => {
    signIn("github")  // or any other provider you've set up
  }

  return (
    <button onClick={handleSignIn}>Sign in with GitHub</button>
  )
}