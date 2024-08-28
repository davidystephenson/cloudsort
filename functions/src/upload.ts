import { createCloudFunction } from './createCloudFunction'
import { guardCurrentUser } from './guardCurrentUser'
import importItems from './service/mergeChoice/importItems'
import { UploadProps } from './types/shared'
import { listsRef } from './init'
import { guardDocData } from './guardDocData'

export const upload = createCloudFunction<UploadProps>(async (props, context, transaction) => {
  const { currentUid } = await guardCurrentUser({ context, transaction })
  const listRef = listsRef.doc(currentUid, props.listId)
  const list = await guardDocData({ docRef: listRef, transaction })
  const newState = importItems({ items: props.movies, state: list.state })
  transaction.update(listRef, { state: newState })
  return newState
})
