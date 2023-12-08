// import { createCloudFunction } from './createCloudFunction'
// import { CreateListProps } from './types/shared'
// import { guardCurrentUid } from './guardCurrentUid'
// import { listsFirelord } from './init'

// export const createList = createCloudFunction<CreateListProps>(async (props, context, transaction) => {
//   const uid = guardCurrentUid({ context })
//   const { title } = props
//   const list = transaction.get(`/lists/${uid}`)
//   if (list != null) {
//     throw new Error('The user already has a list.')
//   }
//   transaction.set(`/lists/${uid}`, {
//     title
//   })
// })
