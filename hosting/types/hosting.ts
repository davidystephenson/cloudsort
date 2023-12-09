import { ButtonProps } from '@chakra-ui/react'

export class ButtonContextValue {
  buttonProps?: ButtonProps
  error?: Error
  errorMessage?: string
  label: string | JSX.Element
  loading: boolean
  loadingLabel: string
}
export const BUTTON_CONTEXT_VALUE_KEYS = getWhitelistedKeys<ButtonContextValue>({
  buttonProps: true,
  error: true,
  errorMessage: true,
  label: true,
  loading: true,
  loadingLabel: true
})

function getWhitelistedKeys<Object> (object: { [key in keyof Required<Object>]: boolean }): Array<keyof Object> {
  return Object
    .entries(object)
    .map(([key]) => key as keyof Object)
}
