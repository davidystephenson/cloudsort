import { getFirelord, getFirestore } from 'firelord'
import { initializeApp } from 'firebase-admin/app'
import { ListsMeta, RegistrationsMeta, UsersMeta } from './types/functions'
import { getAuth } from 'firebase-admin/auth'

initializeApp()
export const adminAuth = getAuth()

export const db = getFirestore() // or getFirestore(app), you can skip this line
db.settings({ ignoreUndefinedProperties: true })

export const registrationsFirelord = getFirelord<RegistrationsMeta>(db, 'registrations')

export const usersRef = getFirelord<UsersMeta>(db, 'users')
export const listsRef = getFirelord<ListsMeta>(db, 'users', 'lists')

// Recommendation: Export this if the collection is sub-collection and then fill in collection path later, because sub collection most likely have dynamic document ID.
// export const firelordExample = getFirelord<ListsMeta>(db)
