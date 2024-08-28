import { createCloudFunction } from './createCloudFunction'
import { CreateListProps, Movie } from './types/shared'
import { listsRef } from './init'
import { https } from 'firebase-functions/v1'
import { guardCurrentUser } from './guardCurrentUser'
import STATE from './service/mergeChoice/STATE'

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
    displayName: currentUser.displayName,
    name: props.name,
    state: STATE<Movie>(),
    uid: currentUid
  })
})
