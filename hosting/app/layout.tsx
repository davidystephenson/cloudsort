import { LayoutView } from '../LayoutView'
import { Providers } from '../Providers'

export default function RootLayout ({
  children
}: {
  children: React.ReactNode
}): JSX.Element {
  return (
    <html lang='en' suppressHydrationWarning>
      <head suppressHydrationWarning />
      <body suppressHydrationWarning>
        <Providers>
          <LayoutView>
            {children}
          </LayoutView>
        </Providers>
      </body>
    </html>
  )
}
