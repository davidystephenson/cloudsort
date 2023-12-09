import { WarningIcon } from '@chakra-ui/icons'
import { Popover, PopoverTrigger, IconButton, PopoverContent, PopoverArrow, PopoverBody, Text } from '@chakra-ui/react'
import { useButtonContext } from './ButtonView'

export function ErrorButtonView (): JSX.Element {
  const button = useButtonContext()
  if (button.error == null) {
    return <></>
  }
  const message = button.errorMessage ?? button.error?.message ?? 'Error'
  return (
    <Popover>
      <PopoverTrigger>
        <IconButton size='sm' aria-label={message} bg='red.800' color='white' icon={<WarningIcon />} />
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverBody>
          <Text fontSize='md' fontWeight='normal'>{message}</Text>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}
