'use client'

import { Card, CardBody, CardHeader, Flex, Heading, Spinner, Text } from '@chakra-ui/react'
import { collectionGroup } from 'firebase/firestore'
import { useFirestore, useFirestoreCollectionData } from 'reactfire'

export function ListsView (): JSX.Element {
  const firestore = useFirestore()
  const listsRef = collectionGroup(firestore, 'lists')
  const { status, data } = useFirestoreCollectionData(listsRef, { idField: 'id' })

  if (status === 'loading') {
    return <Spinner />
  }
  console.log('data', data)
  const listViews = data.map((list) => (
    <Card key={list.id} w='fit-content'>
      <CardHeader w='fit-content'>
        <Heading size='md' w='fit-content'>
          {list.name}
        </Heading>
      </CardHeader>
      <CardBody w='fit-content'>
        <Text w='fit-content'>
          {list.displayName}
        </Text>
      </CardBody>
    </Card>
  ))

  return (
    <Flex gap='10px'>
      {listViews}
    </Flex>
  )
}
