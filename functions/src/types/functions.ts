import { https } from 'firebase-functions'
import { Transaction, MetaTypeCreator } from 'firelord'
import { List, RegisterUserProps, User } from './shared'

export type TransactionCallback <Props> = (
  props: Props,
  context: https.CallableContext,
  transaction: Transaction
) => Promise<unknown>
export type CloudCallback <Props> = TransactionCallback<Props> | Array<TransactionCallback<Props>>
export type RegistrationsMeta = MetaTypeCreator<RegisterUserProps, 'registrations'>

export type UsersMeta = MetaTypeCreator<User, 'users'>
export type ListsMeta = MetaTypeCreator<List, 'lists', string, UsersMeta>
