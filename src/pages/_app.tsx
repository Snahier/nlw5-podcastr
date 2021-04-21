import { AppProps } from "next/dist/next-server/lib/router/router"
import styled, { ThemeProvider } from "styled-components"
import { Header } from "../components/Header"
import { Player } from "../components/Player"
import { GlobalStyles } from "../styles/GlobalStyles"
import { light } from "../styles/theme"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppContainer>
      <ThemeProvider theme={light}>
        <GlobalStyles />
        <main>
          <Header />
          <Component {...pageProps} />
        </main>
        <Player />
      </ThemeProvider>
    </AppContainer>
  )
}

const AppContainer = styled.div`
  display: flex;

  main {
    flex: 1;
  }
`

export default MyApp
