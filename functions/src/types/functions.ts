import { https } from 'firebase-functions'
import { Transaction, MetaTypeCreator } from 'firelord'
import { List, Registration, User } from './shared'

export type TransactionCallback <Props> = (
  props: Props,
  context: https.CallableContext,
  transaction: Transaction
) => Promise<unknown>
export type CloudCallback <Props> = TransactionCallback<Props> | Array<TransactionCallback<Props>>

export type ListsMeta = MetaTypeCreator<List, 'lists'>
export type UsersMeta = MetaTypeCreator<User, 'users'>
export type RegistrationsMeta = MetaTypeCreator<Registration, 'registrations'>
