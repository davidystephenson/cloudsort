'use client'

import { ReactNode } from 'react'
import { firebaseApp, firebaseAuth, firebaseFunctions } from './config'
import { FirebaseAppProvider, AuthProvider, FunctionsProvider } from 'reactfire'
import FirebaseAppCheckProvider from './FirebaseAppCheckProvider'

export function FirebaseProviderView ({
  children
}: {
  children: ReactNode
}): JSX.Element {
  return (
    <FirebaseAppProvider firebaseApp={firebaseApp}>
      <FirebaseAppCheckProvider>
        <AuthProvider sdk={firebaseAuth}>
          <FunctionsProvider sdk={firebaseFunctions}>
            {children}
          </FunctionsProvider>
        </AuthProvider>
      </FirebaseAppCheckProvider>
    </FirebaseAppProvider>
  )
}
