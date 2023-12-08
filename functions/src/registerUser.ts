import { createCloudFunction } from './createCloudFunction'
import { registrationsFirelord } from './init'
import { Registration } from './types/shared'

export const registerUser = createCloudFunction<Registration>(async (props, context, transaction) => {
  const registrationRef = registrationsFirelord.doc(props.email)
  transaction.create(registrationRef, {
    displayName: props.displayName,
    email: props.email
  })
})
