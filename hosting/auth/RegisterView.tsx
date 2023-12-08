'use client'

import { Heading, Input } from '@chakra-ui/react'
import { useAuth, useFunctions } from 'reactfire'
import { AuthFormView } from './AuthFormView'
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth'
import { useHttpsCallable } from 'react-firebase-hooks/functions'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export function RegisterView (): JSX.Element {
  const router = useRouter()
  const auth = useAuth()
  const functions = useFunctions()
  const [
    createAuthUser,
    createdAuthUser,
    createAuthUserLoading,
    createAuthUserError
  ] = useCreateUserWithEmailAndPassword(auth)
  void createdAuthUser
  const [
    cloudCreateUser,
    cloudCreateUserLoading,
    cloudCreateUserError
  ] = useHttpsCallable(functions, 'createUser')
  const [displayName, setDisplayName] = useState('')
  function handleDisplayNameChange (event: React.ChangeEvent<HTMLInputElement>): void {
    setDisplayName(event.target.value)
  }
  async function authenticate ({ email, password }: { email: string, password: string }): Promise<void> {
    try {
      console.log('1')
      await cloudCreateUser({ email, displayName })
      console.log('2')
      await createAuthUser(email, password)
      console.log('3')
      router.push('/login')
      console.log('4')
    } catch (error) {
      console.warn(error)
    }
  }
  const error = createAuthUserError ?? cloudCreateUserError
  const loading = createAuthUserLoading || cloudCreateUserLoading
  return (
    <>
      <Heading size='lg'>Register</Heading>
      <AuthFormView
        authenticate={authenticate}
        error={error}
        label='Register'
        loading={loading}
        loadingLabel='Registering'
      >
        <Input
          type='text'
          placeholder='Display Name'
          value={displayName}
          onChange={handleDisplayNameChange}
        />
      </AuthFormView>
    </>
  )
}
