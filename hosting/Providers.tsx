'use client'

import { ColorModeScript } from '@chakra-ui/react'
import { ChakraProviderView } from './chakra/ChakraProviderView'
import { FirebaseProviderView } from './firebase/FirebaseProviderView'
import { chakraTheme } from './chakra/theme'
import { CacheProvider } from '@chakra-ui/next-js'

export function Providers ({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <CacheProvider>
      <FirebaseProviderView>
        <ChakraProviderView>
          <ColorModeScript initialColorMode={chakraTheme.config.initialColorMode} />
          {children}
        </ChakraProviderView>
      </FirebaseProviderView>
    </CacheProvider>
  )
}
