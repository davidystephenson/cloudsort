import { https } from 'firebase-functions'
import { Transaction, MetaTypeCreator, DocumentReference, MetaType } from 'firelord'
import { List, RegisterUserProps, User } from './shared'

export type TransactionCallback <Props> = (
  props: Props,
  context: https.CallableContext,
  transaction: Transaction
) => Promise<unknown>
export type CloudCallback <Props> = TransactionCallback<Props> | Array<TransactionCallback<Props>>
export type RegistrationsMeta = MetaTypeCreator<RegisterUserProps, 'registrations'>
export type Result <Collection extends MetaType> = Collection['read'] & { id: string }
export type UsersMeta = MetaTypeCreator<User, 'users'>
export type UserResult = Result<UsersMeta>
export type ListsMeta = MetaTypeCreator<List, 'lists', string, UsersMeta>
export type ListResult = Result<ListsMeta>

export interface CurrentUserGuard {
  currentUserRef: DocumentReference<UsersMeta>
  currentUserData: User['read']
  currentUid: string
  currentUser: UserResult
}
