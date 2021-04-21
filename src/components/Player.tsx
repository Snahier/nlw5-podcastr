import styled, { css } from "styled-components"

export const Player = () => {
  return <PlayerContainer></PlayerContainer>
}

const PlayerContainer = styled.div`
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
  `}
`
