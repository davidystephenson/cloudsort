import { https } from 'firebase-functions'
import { DocumentReference, MetaType, Transaction } from 'firelord'

export async function guardDocData <Collection extends MetaType> ({
  docRef,
  transaction
}: {
  docRef: DocumentReference<Collection>
  transaction: Transaction
}): Promise<Collection['read']> {
  const doc = await transaction.get(docRef)
  if (!doc.exists) {
    throw new https.HttpsError(
      'unavailable',
      `${docRef.path} does not exist.`
    )
  }
  const docData = doc.data()
  if (docData == null) {
    throw new https.HttpsError(
      'failed-precondition',
      `${docRef.path} is empty.`
    )
  }

  return docData
}
