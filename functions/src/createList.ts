import { createCloudFunction } from './createCloudFunction'
import { CreateListProps } from './types/shared'
import { listsRef } from './init'
import { https } from 'firebase-functions/v1'
import { guardCurrentUser } from './guardCurrentUser'

export const createList = createCloudFunction<CreateListProps>(async (props, context, transaction) => {
  if (props.name == null) {
    throw new https.HttpsError('invalid-argument', 'Name is required')
  }
  const { currentUid, currentUser } = await guardCurrentUser({ context, transaction })
  const listRef = listsRef.doc(currentUid, props.name)
  const list = await transaction.get(listRef)
  if (list.exists) {
    const message = `You already have a list named '${props.name}'`
    throw new https.HttpsError('already-exists', message)
  }
  transaction.create(listRef, {
    name: props.name,
    uid: currentUid,
    displayName: currentUser.displayName
  })
})
