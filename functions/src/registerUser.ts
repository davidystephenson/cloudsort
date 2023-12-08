import { query, where } from 'firelord'
import { createCloudFunction } from './createCloudFunction'
import { adminAuth, usersFirelord } from './init'
import { RegisterUserProps } from './types/shared'
import { https } from 'firebase-functions'

export const registerUser = createCloudFunction<RegisterUserProps>(async (props, context, transaction) => {
  const whereEmail = where('email', '==', props.email)
  const emailQuery = query(usersFirelord.collection(), whereEmail)
  const emailDocs = await transaction.get(emailQuery)
  if (emailDocs.size > 0) {
    const message = `The email ${props.email} is taken`
    throw new https.HttpsError('already-exists', message)
  }
  const whereDisplayName = where('displayName', '==', props.displayName)
  const displayNameQuery = query(usersFirelord.collection(), whereDisplayName)
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
  const userRef = usersFirelord.doc(userRecord.uid)
  const user = {
    email: props.email,
    displayName: props.displayName,
    uid: userRecord.uid
  }
  transaction.create(userRef, user)
  return user
})
