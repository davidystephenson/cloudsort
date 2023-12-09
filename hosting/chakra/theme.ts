import { defineStyleConfig, extendTheme } from '@chakra-ui/react'

const config = {
  initialColorMode: 'system',
  useSystemColorMode: true
}

const Button = defineStyleConfig({
  defaultProps: {
    size: 'sm'
  }
})

const components = {
  Button
}

const extension = {
  components,
  config
}

export const chakraTheme = extendTheme(extension)
