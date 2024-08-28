import { ButtonGroup, Button, ButtonProps } from '@chakra-ui/react'
import { useButtonContext } from './ButtonView'
import { ErrorButtonView } from './ErrorButtonView'

export function ButtonGroupView (props: ButtonProps): JSX.Element {
  const button = useButtonContext()
  return (
    <ButtonGroup isAttached>
      <Button
        isLoading={button.loading}
        loadingText={button.loadingLabel}
        size='sm'
        {...props}
        {...button.buttonProps}
      />
      <ErrorButtonView />
    </ButtonGroup>
  )
}
