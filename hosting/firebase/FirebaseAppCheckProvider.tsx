import { AppCheckProvider, useFirebaseApp } from 'reactfire'
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check'
import { firebaseConfig } from './config'

export function FirebaseAppCheckProvider ({ children }: {
  children: React.ReactNode
}): JSX.Element {
  const app = useFirebaseApp()

  if (
    process.env.NEXT_PUBLIC_APPCHECK_SITE_KEY == null ||
    !firebaseConfig.inBrowser
  ) {
    return <>{children}</>
  }

  if (!firebaseConfig.production) {
    Object.assign(window, {
      FIREBASE_APPCHECK_DEBUG_TOKEN: process.env.NEXT_PUBLIC_APPCHECK_DEBUG_TOKEN
    })
  }

  const provider = new ReCaptchaV3Provider(process.env.NEXT_PUBLIC_APPCHECK_SITE_KEY)
  const options = {
    provider,
    isTokenAutoRefreshEnabled: true
  }
  const sdk = initializeAppCheck(app, options)

  return <AppCheckProvider sdk={sdk}>{children}</AppCheckProvider>
};

export default FirebaseAppCheckProvider
