import { initializeApp, getApps } from 'firebase/app'
import { indexedDBLocalPersistence, inMemoryPersistence, initializeAuth, connectAuthEmulator } from 'firebase/auth'
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore'
import { getFunctions, connectFunctionsEmulator } from 'firebase/functions'
import { getStorage, connectStorageEmulator } from 'firebase/storage'

export const firebaseConfig = {
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  authEmulatorPort: Number(process.env.NEXT_PUBLIC_FIREBASE_AUTH_EMULATOR_PORT),
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  emulate: process.env.NEXT_PUBLIC_EMULATE_FIREBASE === 'true',
  emulatorHost: process.env.NEXT_PUBLIC_FIREBASE_EMULATOR_HOST,
  firestoreEmulatorPort: Number(process.env.NEXT_PUBLIC_FIRESTORE_EMULATOR_PORT),
  functionsEmulatorPort: Number(process.env.NEXT_PUBLIC_FIREBASE_FUNCTIONS_EMULATOR_PORT),
  inBrowser: typeof window !== 'undefined',
  production: process.env.NEXT_PUBLIC_NODE_ENV === 'production',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  storageEmulatorPort: Number(process.env.NEXT_PUBLIC_FIREBASE_STORAGE_EMULATOR_PORT)
}

const apps = getApps()
const cold = apps.length === 0
export const firebaseApp = cold ? initializeApp(firebaseConfig) : apps[0]

// make sure we're not using IndexedDB when SSR
// as it is only supported on browser environments
const inBrowser = typeof window !== 'undefined'
const persistence = inBrowser
  ? indexedDBLocalPersistence
  : inMemoryPersistence

export const firebaseAuth = initializeAuth(firebaseApp, { persistence })
export const firestore = getFirestore(firebaseApp)
export const firebaseStorage = getStorage(firebaseApp)
export const firebaseFunctions = getFunctions(firebaseApp)

if (firebaseConfig.emulate) {
  if (firebaseConfig.emulatorHost == null) {
    throw new Error('There is no NEXT_PUBLIC_FIREBASE_EMULATOR_HOST.')
  }
  const authHost = `http://${firebaseConfig.emulatorHost}:${firebaseConfig.authEmulatorPort}`
  connectAuthEmulator(firebaseAuth, authHost)
  connectFirestoreEmulator(firestore, firebaseConfig.emulatorHost, firebaseConfig.firestoreEmulatorPort)
  connectStorageEmulator(firebaseStorage, firebaseConfig.emulatorHost, firebaseConfig.storageEmulatorPort)
  connectFunctionsEmulator(firebaseFunctions, firebaseConfig.emulatorHost, firebaseConfig.functionsEmulatorPort)
}
