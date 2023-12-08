import { WarningIcon } from '@chakra-ui/icons'
import { Popover, PopoverTrigger, IconButton, PopoverContent, PopoverArrow, PopoverBody } from '@chakra-ui/react'
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
        <IconButton aria-label={message} bg='red.800' color='white' icon={<WarningIcon />} />
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverBody>{message}</PopoverBody>
      </PopoverContent>
    </Popover>
  )
}
