'use client'

import { createContext, useContext } from 'react'
import { BUTTON_CONTEXT_VALUE_KEYS, ButtonContextValue } from '../types/hosting'
import { ButtonGroupView } from './ButtonGroupView'
import { ButtonProps } from '@chakra-ui/react'

export const buttonContext = createContext<ButtonContextValue | undefined>(undefined)

export function useButtonContext (): ButtonContextValue {
  const value = useContext(buttonContext)
  if (value == null) {
    throw new Error('useButtonContext must be used within a ButtonProvider')
  }
  return value
}

export function ButtonView ({
  children,
  ...restProps
}: ButtonContextValue & ButtonProps): JSX.Element {
  const propEntries = Object.entries(restProps)
  const buttonEntries = propEntries.filter(entry => {
    const [key] = entry
    const contextKey = BUTTON_CONTEXT_VALUE_KEYS.some(contextKey => contextKey === key)
    return !contextKey
  })
  const buttonProps = Object.fromEntries(buttonEntries)
  return (
    <buttonContext.Provider value={restProps}>
      <ButtonGroupView {...buttonProps}>
        {children}
      </ButtonGroupView>
    </buttonContext.Provider>
  )
}
