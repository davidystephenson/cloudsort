'use client'

import { Heading, Input } from '@chakra-ui/react'
import { useFunctions } from 'reactfire'
import { AuthFormView } from './AuthFormView'
import { useHttpsCallable } from 'react-firebase-hooks/functions'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { RegisterUserProps } from '../types/shared'

export function RegisterView (): JSX.Element {
  const router = useRouter()
  const functions = useFunctions()
  const [
    cloudRegisterUser,
    cloudRegisterUserLoading,
    cloudRegisterUserError
  ] = useHttpsCallable<RegisterUserProps>(functions, 'registerUser')
  const [displayName, setDisplayName] = useState('')
  function handleDisplayNameChange (event: React.ChangeEvent<HTMLInputElement>): void {
    setDisplayName(event.target.value)
  }
  async function authenticate ({ email, password }: { email: string, password: string }): Promise<void> {
    try {
      console.log('1')
      const result = await cloudRegisterUser({ email, displayName, password })
      console.log('2', result)
      if (result == null) return
      router.push('/login')
      console.log('3')
    } catch (error) {
      console.warn(error)
    }
  }
  const error = cloudRegisterUserError
  const loading = cloudRegisterUserLoading
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
