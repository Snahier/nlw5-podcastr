import { AppProps } from "next/dist/next-server/lib/router/router"
import { useState } from "react"
import styled, { ThemeProvider } from "styled-components"
import { Header } from "../components/Header"
import { Player } from "../components/Player"
import { PlayerContext } from "../contexts/PlayerContext"
import { GlobalStyles } from "../styles/GlobalStyles"
import { light } from "../styles/theme"

function MyApp({ Component, pageProps }: AppProps) {
  const [episodeList, setEpisodeList] = useState([])
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  const play = (episode) => {
    setEpisodeList([episode])
    setCurrentEpisodeIndex(0)
    setIsPlaying(true)
  }

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  return (
    <AppContainer>
      <ThemeProvider theme={light}>
        <GlobalStyles />
        <PlayerContext.Provider
          value={{
            episodeList,
            currentEpisodeIndex,
            isPlaying,
            play,
            togglePlay,
          }}>
          <main>
            <Header />
            <Component {...pageProps} />
          </main>
          <Player />
        </PlayerContext.Provider>
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
