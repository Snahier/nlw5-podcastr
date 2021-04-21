import { format } from "date-fns"
import ptBR from "date-fns/locale/pt-BR"
import styled, { css } from "styled-components"

export const Header = () => {
  const currentDate = format(new Date(), "EEEEEE, d MMMM", {
    locale: ptBR,
  })

  return (
    <HeaderContainer>
      <img src="/logo.svg" alt="Podcastr" />

      <p>O melhor para você ouvir, sempre</p>

      <span>{currentDate}</span>
    </HeaderContainer>
  )
}

const HeaderContainer = styled.header`
  ${({ theme }) => css`
    background: ${theme.white};
    height: 6.5rem;

    display: flex;
    align-items: center;

    padding: 2rem 4rem;

    border-bottom: 1px solid ${theme.gray100};

    p {
      margin-left: 2rem;
      padding: 0.25rem 0 0.25rem 2rem;
      border-left: 1px solid ${theme.gray100};
    }

    span {
      margin-left: auto;
      text-transform: capitalize;
    }
  `}
`
