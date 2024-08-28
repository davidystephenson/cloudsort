'use client'

import { Heading } from '@chakra-ui/react'
import { useAuth } from 'reactfire'
import { AuthFormView } from './AuthFormView'
import { UserCredential } from 'firebase/auth'
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth'
import { useRouter } from 'next/navigation'

export function LoginView (): JSX.Element {
  const router = useRouter()
  const auth = useAuth()
  const [
    signIn,
    user,
    loading,
    error
  ] = useSignInWithEmailAndPassword(auth)
  void user
  async function authenticate ({ email, password }: { email: string, password: string }): Promise<UserCredential> {
    const user = await signIn(email, password)
    router.push('/lists')
    return user
  }
  return (
    <>
      <Heading size='lg'>Login</Heading>
      <AuthFormView
        authenticate={authenticate}
        error={error}
        label='Login'
        loading={loading}
        loadingLabel='Logging In'
      />
    </>
  )
}
