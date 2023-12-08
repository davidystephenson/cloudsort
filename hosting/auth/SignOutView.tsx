'use client'

import { useAuth, useUser } from 'reactfire'
import { useSignOut } from 'react-firebase-hooks/auth'
import { ButtonView } from '../button/ButtonView'

export function SignOutView (): JSX.Element {
  const auth = useAuth()
  const [
    signOut,
    signOutLoading,
    signOutError
  ] = useSignOut(auth)
  const { status, data } = useUser()
  const loading = signOutLoading || status === 'loading'
  const label = data == null ? <>X</> : <>Sign Out {auth.currentUser.email}</>
  async function onClick (): Promise<void> {
    await signOut()
  }
  return (
    <ButtonView
      buttonProps={{
        onClick: () => {
          void onClick()
        }
      }}
      error={signOutError}
      label={label}
      loading={loading}
      loadingLabel='Signing Out'
    />
  )
}
