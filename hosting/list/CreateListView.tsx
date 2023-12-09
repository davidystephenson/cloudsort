'use client'

import { useFunctions } from 'reactfire'
import { ButtonView } from '../button/ButtonView'
import { useHttpsCallable } from 'react-firebase-hooks/functions'
import { CreateListProps } from '../types/shared'

export function CreateListView (): JSX.Element {
  const functions = useFunctions()
  const [
    createList,
    createListLoading,
    createListError
  ] = useHttpsCallable<CreateListProps>(functions, 'createList')
  function handleClick (): void {
    void createList({ name: 'fake' })
  }
  return (
    <ButtonView
      error={createListError}
      label='Create List'
      loading={createListLoading}
      loadingLabel='Creating List'
      onClick={handleClick}
    />
  )
}
