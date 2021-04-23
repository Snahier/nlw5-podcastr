import Image from "next/image"
import { rgba } from "polished"
import Slider from "rc-slider"
import "rc-slider/assets/index.css"
import { useContext } from "react"
import styled, { css, ThemeContext } from "styled-components"
import { PlayerContext } from "../contexts/PlayerContext"

export const Player = () => {
  const { episodeList, currentEpisodeIndex, isPlaying } = useContext(
    PlayerContext
  )
  const theme = useContext(ThemeContext)

  const episode = episodeList[currentEpisodeIndex]

  return (
    <PlayerContainer>
      <Header>
        <img src="/playing.svg" alt="Tocando agora" />
        <strong>Tocando agora</strong>
      </Header>

      {episode ? (
        <CurrentEpisode>
          <Image
            width={592}
            height={592}
            src={episode.thumbnail}
            alt=""
            objectFit="cover"
          />
          <strong>{episode.title}</strong>
          <span>{episode.members}</span>
        </CurrentEpisode>
      ) : (
        <EmptyPlayer>
          <strong>Selecione um podcast para ouvir</strong>
        </EmptyPlayer>
      )}

      <Footer className={!episode ? "empty" : null}>
        <Progress>
          <span>00:00</span>
          <SliderWrapper>
            {episode ? (
              <Slider
                trackStyle={{ backgroundColor: theme.green500 }}
                railStyle={{ backgroundClip: theme.purple300 }}
                handleStyle={{ borderColor: theme.green500, borderWidth: 4 }}
              />
            ) : (
              <EmptySlider />
            )}
          </SliderWrapper>
          <span>00:00</span>
        </Progress>

        {episode && <audio src={episode.url} autoPlay />}

        <Buttons>
          <button disabled={!episode}>
            <img src="/shuffle.svg" alt="Embaralhar" />
          </button>
          <button disabled={!episode}>
            <img src="/play-previous.svg" alt="Tocar anterior" />
          </button>
          <button className="playButton" disabled={!episode}>
            {isPlaying ? (
              <img src="/pause.svg" alt="Pausar" />
            ) : (
              <img src="/play.svg" alt="Tocar" />
            )}
          </button>
          <button disabled={!episode}>
            <img src="/play-next.svg" alt="Tocar anterior" />
          </button>
          <button disabled={!episode}>
            <img src="/repeat.svg" alt="Repetir" />
          </button>
        </Buttons>
      </Footer>
    </PlayerContainer>
  )
}

const PlayerContainer = styled.section`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    width: 26.5rem;
    height: 100vh;
    padding: 3rem 4rem;

    background: ${theme.purple500};

    color: ${theme.white};

    strong {
      font-family: ${theme.fonts.lexend}, sans-serif;
      font-weight: 600;
    }
  `}
`

const Header = styled.header`
  display: flex;
  align-items: center;
  gap: 16px;
`

const CurrentEpisode = styled.div`
  ${({ theme }) => css`
    text-align: center;

    img {
      border-radius: 1.5rem;
    }

    strong {
      display: block;

      margin-top: 2rem;

      font: 600 1.25rem ${theme.fonts.lexend}, sans-serif;
      line-height: 1.75rem;
    }

    span {
      display: block;

      opacity: 0.6;

      margin-top: 1rem;

      line-height: 1.5rem;
    }
  `}
`

const EmptyPlayer = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: center;

    width: 100%;
    height: 20rem;
    padding: 4rem;

    border: 1px dashed ${theme.purple300};
    border-radius: 1.5rem;
    background: linear-gradient(
      143.8deg,
      ${rgba(theme.purple400, 0.8)},
      ${rgba(theme.black, 0)}
    );

    text-align: center;
  `}
`

const Footer = styled.footer`
  align-self: stretch;

  &.empty {
    opacity: 0.5;
  }
`

const Progress = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  font-size: 0.875rem;

  span {
    display: inline-block;
    width: 4rem;
    text-align: center;
  }
`

const SliderWrapper = styled.div`
  flex: 1;
`

const EmptySlider = styled.div`
  ${({ theme }) => css`
    width: 100%;
    height: 4px;

    border-radius: 2px;
    background: ${theme.purple300};
  `}
`

const Buttons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;

  margin-top: 2.5rem;

  button {
    border: 0;
    background: transparent;

    font-size: 0;

    transition: filter 0.2s;

    &:disabled {
      cursor: default;
    }

    &:hover:not(:disabled) {
      filter: brightness(0.7);
    }

    &.playButton {
      ${({ theme }) => css`
        width: 4rem;
        height: 4rem;

        border-radius: 1rem;
        background: ${theme.purple400};

        &:hover:not(:disabled) {
          filter: brightness(0.95);
        }
      `}
    }
  }
`
