'use client'

import { Heading } from '@chakra-ui/react'
import { useAuth } from 'reactfire'
import { AuthFormView } from './AuthFormView'
import { UserCredential } from 'firebase/auth'
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth'

export function LoginView (): JSX.Element {
  const auth = useAuth()
  const [
    signIn,
    user,
    loading,
    error
  ] = useSignInWithEmailAndPassword(auth)
  void user
  async function authenticate ({ email, password }: { email: string, password: string }): Promise<UserCredential> {
    return await signIn(email, password)
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
