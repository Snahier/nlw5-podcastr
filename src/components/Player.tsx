import { rgba } from "polished"
import styled, { css } from "styled-components"

export const Player = () => {
  return (
    <PlayerContainer>
      <Header>
        <img src="/playing.svg" alt="Tocando agora" />
        <strong>Tocando agora</strong>
      </Header>

      <EmptyPlayer>
        <strong>Selecione um podcast para ouvir</strong>
      </EmptyPlayer>

      <Footer className="empty">
        <Progress>
          <span>00:00</span>
          <Slider>
            <EmptySlider />
          </Slider>
          <span>00:00</span>
        </Progress>

        <Buttons>
          <button>
            <img src="/shuffle.svg" alt="Embaralhar" />
          </button>
          <button>
            <img src="/play-previous.svg" alt="Tocar anterior" />
          </button>
          <button className="playButton">
            <img src="/play.svg" alt="Tocar" />
          </button>
          <button>
            <img src="/play-next.svg" alt="Tocar anterior" />
          </button>
          <button>
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

const Slider = styled.div`
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
  }

  .playButton {
    ${({ theme }) => css`
      width: 4rem;
      height: 4rem;

      border-radius: 1rem;
      background: ${theme.purple400};
    `}
  }
`
