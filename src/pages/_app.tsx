import { AppProps } from "next/dist/next-server/lib/router/router"
import { ThemeProvider } from "styled-components"
import { GlobalStyles } from "../styles/GlobalStyles"
import { light } from "../styles/theme"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={light}>
      <GlobalStyles />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
