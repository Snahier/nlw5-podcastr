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

      <Footer></Footer>
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

const Footer = styled.footer``
