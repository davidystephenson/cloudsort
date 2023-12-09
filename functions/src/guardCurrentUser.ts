import { https } from 'firebase-functions'
import { Transaction } from 'firelord'
import { usersRef } from './init'
import { guardDocData } from './guardDocData'
import { guardCurrentUid } from './guardCurrentUid'
import { CurrentUserGuard } from './types/functions'

export async function guardCurrentUser ({ context, transaction }: {
  context: https.CallableContext
  transaction: Transaction
}): Promise<CurrentUserGuard> {
  const currentUid = guardCurrentUid({ context })
  const currentUserRef = usersRef.doc(currentUid)
  const currentUserData = await guardDocData({
    docRef: currentUserRef,
    transaction
  })
  const currentUser = { id: currentUid, ...currentUserData }
  return { currentUserRef, currentUserData, currentUid, currentUser }
}
