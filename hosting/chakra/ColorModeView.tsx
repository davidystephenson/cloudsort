'use client'

import { Button, HStack, useColorMode } from '@chakra-ui/react'
import { MoonIcon, SunIcon, UpDownIcon } from '@chakra-ui/icons'

export function ColorModeView (): JSX.Element {
  const { toggleColorMode } = useColorMode()
  return (
    <Button onClick={toggleColorMode}>
      <HStack>
        <MoonIcon />
        <UpDownIcon transform='rotate(90deg)' />
        <SunIcon />
      </HStack>
    </Button>
  )
}
