import { HStack, Heading } from '@chakra-ui/react'
import { ListsView } from '../../list/ListsView'
import { CreateListView } from '../../list/CreateListView'

export default function Page (): JSX.Element {
  return (
    <>
      <HStack>
        <Heading size='lg'>Lists</Heading>
        <CreateListView />
      </HStack>
      <ListsView />
    </>
  )
}
