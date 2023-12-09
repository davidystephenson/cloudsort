'use client'

import { Button, Input, InputGroup, InputRightElement } from '@chakra-ui/react'
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
  const [showPassword, setShowPassword] = useState(false)
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
  function handleShowPasswordChange (): void {
    setShowPassword(current => !current)
  }
  const passwordLabel = showPassword ? 'Hide' : 'Show'
  const passwordInputType = showPassword ? 'text' : 'password'
  return (
    <>
      <form onSubmit={handleSubmit}>
        <Input
          type='email'
          placeholder='Email'
          value={email}
          onChange={handleEmailChange}
        />
        <InputGroup>
          <Input
            type={passwordInputType}
            placeholder='Password'
            value={password}
            onChange={handlePasswordChange}
            autoComplete=''
          />
          <InputRightElement w='fit-content'>
            <Button onClick={handleShowPasswordChange}>
              {passwordLabel}
            </Button>
          </InputRightElement>
        </InputGroup>
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
