'use client'

import { ChakraProvider } from '@chakra-ui/react'

import { chakraTheme } from './theme'

export function ChakraProviderView ({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <ChakraProvider theme={chakraTheme}>{children}</ChakraProvider>
  )
}
