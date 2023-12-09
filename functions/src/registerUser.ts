import { query, where } from 'firelord'
import { createCloudFunction } from './createCloudFunction'
import { adminAuth, usersRef } from './init'
import { RegisterUserProps } from './types/shared'
import { https } from 'firebase-functions'

export const registerUser = createCloudFunction<RegisterUserProps>(async (props, context, transaction) => {
  if (props.email == null) {
    throw new https.HttpsError('invalid-argument', 'Email is required')
  }
  if (props.displayName == null) {
    throw new https.HttpsError('invalid-argument', 'Display name is required')
  }
  if (props.password == null) {
    throw new https.HttpsError('invalid-argument', 'Password is required')
  }
  const whereEmail = where('email', '==', props.email)
  const emailQuery = query(usersRef.collection(), whereEmail)
  const emailDocs = await transaction.get(emailQuery)
  if (emailDocs.size > 0) {
    const message = `The email ${props.email} is taken`
    throw new https.HttpsError('already-exists', message)
  }
  const whereDisplayName = where('displayName', '==', props.displayName)
  const displayNameQuery = query(usersRef.collection(), whereDisplayName)
  const displayNameDocs = await transaction.get(displayNameQuery)
  if (displayNameDocs.size > 0) {
    const message = `The display name ${props.displayName} is taken`
    throw new https.HttpsError('already-exists', message)
  }
  const userRecord = await adminAuth.createUser({
    email: props.email,
    emailVerified: false,
    password: props.password,
    displayName: props.displayName,
    disabled: false
  })
  const userRef = usersRef.doc(userRecord.uid)
  const user = {
    email: props.email,
    displayName: props.displayName,
    uid: userRecord.uid
  }
  transaction.create(userRef, user)
  return user
})
