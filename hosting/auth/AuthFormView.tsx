'use client'

import { Input } from '@chakra-ui/react'
import { ChangeEvent, FormEvent, ReactNode, useState } from 'react'
import { ButtonView } from '../button/ButtonView'

export function AuthFormView ({
  authenticate,
  children,
  error,
  label,
  loading,
  loadingLabel
}: {
  authenticate: ({ email, password }: { email: string, password: string }) => Promise<unknown>
  children?: ReactNode
  error?: Error
  label: string
  loading?: boolean
  loadingLabel?: string
}): JSX.Element {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  function handleSubmit (event: FormEvent<HTMLFormElement>): void {
    event.preventDefault()
    void authenticate({ email, password })
  }
  function handleEmailChange (event: ChangeEvent<HTMLInputElement>): void {
    setEmail(event.target.value)
  }
  function handlePasswordChange (event: ChangeEvent<HTMLInputElement>): void {
    setPassword(event.target.value)
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <Input
          type='email'
          placeholder='Email'
          value={email}
          onChange={handleEmailChange}
        />
        <Input
          type='password'
          placeholder='Password'
          value={password}
          onChange={handlePasswordChange}
          autoComplete=''
        />
        {children}
        <ButtonView
          buttonProps={{ type: 'submit' }}
          error={error}
          loading={loading}
          label={label}
          loadingLabel={loadingLabel}
        />
      </form>
    </>
  )
}
