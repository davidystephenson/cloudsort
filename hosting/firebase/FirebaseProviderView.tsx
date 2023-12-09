'use client'

import { ReactNode } from 'react'
import { firebaseApp, firebaseAuth, firebaseFunctions, firestore } from './config'
import { FirebaseAppProvider, AuthProvider, FunctionsProvider, FirestoreProvider } from 'reactfire'
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
          <FirestoreProvider sdk={firestore}>
            <FunctionsProvider sdk={firebaseFunctions}>
              {children}
            </FunctionsProvider>
          </FirestoreProvider>
        </AuthProvider>
      </FirebaseAppCheckProvider>
    </FirebaseAppProvider>
  )
}
