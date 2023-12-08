import { auth } from 'firebase-functions'
import { deleteDoc, getDoc, setDoc } from 'firelord'
import { adminAuth, registrationsFirelord, usersFirelord } from './init'

export const onCreateUser = auth.user().onCreate(async user => {
  console.info(`Completing ${user.uid}...`)
  if (user.email == null) {
    throw new Error('There is no user.')
  }
  const registrationRef = registrationsFirelord.doc(user.email)
  const registrationDoc = await getDoc(registrationRef)
  if (!registrationDoc.exists) {
    throw new Error('There is no doc.')
  }
  const registration = registrationDoc.data()
  if (registration == null) {
    throw new Error('There is no data.')
  }
  const userRef = usersFirelord.doc(user.uid)
  const newDocData = { uid: user.uid, ...registration }
  await setDoc(userRef, newDocData)
  const newAuthData = { displayName: registration.displayName }
  await adminAuth.updateUser(user.uid, newAuthData)
  await deleteDoc(registrationRef)
  console.info(`${user.uid} completed!`)
})
