import { createCloudFunction } from './createCloudFunction'
import { CreateListProps } from './types/shared'
import { guardCurrentUid } from './guardCurrentUid'
import { listsFirelord } from './init'
import { https } from 'firebase-functions/v1'

export const createList = createCloudFunction<CreateListProps>(async (props, context, transaction) => {
  const uid = guardCurrentUid({ context })
  const listRef = listsFirelord.doc(uid, props.title)
  const list = await transaction.get(listRef)
  if (list.exists) {
    throw new https.HttpsError('already-exists', 'The list already exists.')
  }
  transaction.create(listRef, {
    title: props.title,
    uid
  })
})
