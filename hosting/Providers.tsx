'use client'

import { ColorModeScript } from '@chakra-ui/react'
import { ChakraProviderView } from './chakra/ChakraProviderView'
import { FirebaseProviderView } from './firebase/FirebaseProviderView'
import { chakraTheme } from './chakra/theme'

export function Providers ({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <FirebaseProviderView>
      <ChakraProviderView>
        <ColorModeScript initialColorMode={chakraTheme.config.initialColorMode} />
        {children}
      </ChakraProviderView>
    </FirebaseProviderView>
  )
}
