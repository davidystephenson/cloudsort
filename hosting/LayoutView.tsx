'use client'

import { Container, HStack, Heading } from '@chakra-ui/react'
import { ReactNode } from 'react'
import { ColorModeView } from './chakra/ColorModeView'
import { SignOutView } from './auth/SignOutView'

export function LayoutView ({
  children
}: {
  children: ReactNode
}): JSX.Element {
  return (
    <Container>
      <HStack>
        <Heading>CloudSort</Heading>
        <SignOutView />
        <ColorModeView />
      </HStack>
      {children}
    </Container>
  )
}
