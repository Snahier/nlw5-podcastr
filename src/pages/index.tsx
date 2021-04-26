import { format, parseISO } from "date-fns"
import { ptBR } from "date-fns/locale"
import { GetStaticProps } from "next"
import Image from "next/image"
import Link from "next/link"
import { useContext } from "react"
import styled, { css } from "styled-components"
import { PlayerContext } from "../contexts/PlayerContext"
import { api } from "../services/api"
import { convertDurationToTimeString } from "../utils/convertDurationToTimeString"

type Episode = {
  id: string
  title: string
  thumbnail: string
  members: string
  duration: number
  durationAsString: string
  url: string
  published_at: string
}

type HomeProps = {
  latest_episodes: Episode[]
  all_episodes: Episode[]
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get("episodes", {
    params: {
      _limit: 12,
      _sort: "published_at",
      _order: "desc",
    },
  })

  const episodes = data.map((episode: any) => {
    return {
      id: episode.id,
      title: episode.title,
      thumbnail: episode.thumbnail,
      members: episode.members,
      published_at: format(parseISO(episode.published_at), "d MMM yy", {
        locale: ptBR,
      }),
      duration: Number(episode.file.duration),
      durationAsString: convertDurationToTimeString(
        Number(episode.file.duration)
      ),
      url: episode.file.url,
    }
  })

  const latest_episodes = episodes.slice(0, 2)
  const all_episodes = episodes.slice(2, episodes.length)

  return {
    props: {
      latest_episodes,
      all_episodes,
    },
    revalidate: 60 * 60 * 8,
  }
}

export default function Home({ all_episodes, latest_episodes }: HomeProps) {
  const { playList } = useContext(PlayerContext)

  const episodeList = [...latest_episodes, ...all_episodes]

  return (
    <HomeContainer>
      <LatestEpisodes>
        <h2>Últimos lançamentos</h2>

        <ul>
          {latest_episodes.map((episode, index) => (
            <li key={episode.id}>
              <Image
                width={192}
                height={192}
                src={episode.thumbnail}
                alt={episode.title}
                objectFit="cover"
              />

              <EpisodeDetails>
                <a href="">{episode.title}</a>
                <p>{episode.members}</p>
                <span>{episode.published_at}</span>
                <span>{episode.durationAsString}</span>
              </EpisodeDetails>

              <Button onClick={() => playList(episodeList, index)}>
                <img src="/play-green.svg" alt="Tocar episódio" />
              </Button>
            </li>
          ))}
        </ul>
      </LatestEpisodes>

      <AllEpisodes>
        <h2>Todos episódios</h2>

        <table cellSpacing={0}>
          <thead>
            <tr>
              <th></th>
              <th>Podcast</th>
              <th>Integrantes</th>
              <th>Data</th>
              <th>Duração</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {all_episodes.map((episode, index) => (
              <tr key={episode.id}>
                <td style={{ width: 72 }}>
                  <Image
                    width={120}
                    height={120}
                    src={episode.thumbnail}
                    alt={episode.title}
                    objectFit="cover"
                  />
                </td>
                <td>
                  <Link href={`/episodes/${episode.id}`}>
                    <a>{episode.title}</a>
                  </Link>
                </td>
                <td>{episode.members}</td>
                <td style={{ width: 100 }}>{episode.published_at}</td>
                <td>{episode.durationAsString}</td>
                <td>
                  <ButtonSmall
                    onClick={() =>
                      playList(episodeList, index + latest_episodes.length)
                    }>
                    <img src="/play-green.svg" alt="Tocar episódio" />
                  </ButtonSmall>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </AllEpisodes>
    </HomeContainer>
  )
}

const HomeContainer = styled.div`
  overflow-y: scroll;

  height: calc(100vh - 6.5rem);
  padding: 0 4rem;

  h2 {
    margin-top: 3rem;
    margin-bottom: 1.5rem;
  }
`

const LatestEpisodes = styled.section`
  ${({ theme }) => css`
    ul {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1.5rem;

      list-style: none;

      li {
        position: relative;

        display: flex;
        align-items: center;

        padding: 1.25rem;

        border: 1px solid ${theme.gray100};
        border-radius: 1.5rem;
        background: ${theme.white};
      }

      img {
        width: 6rem;
        height: 6rem;

        border-radius: 1rem;
      }
    }
  `}
`

const AllEpisodes = styled.section`
  ${({ theme }) => css`
    padding-bottom: 2rem;

    table {
      width: 100%;

      th,
      td {
        padding: 0.75rem 1rem;

        border-bottom: 1px solid ${theme.gray100};
      }

      th {
        color: ${theme.gray200};

        text-transform: uppercase;
        font: 500 0.75rem ${theme.fonts.lexend}, sans-serif;
        text-align: left;
      }

      td {
        font-size: 0.875rem;

        img {
          width: 2.5rem;
          height: 2.5rem;

          border-radius: 0.5rem;
        }

        a {
          color: ${theme.gray800};
          font-size: 1rem;
          font-family: ${theme.fonts.lexend}, sans-serif;
          font-weight: 600;
          text-decoration: none;
          line-height: 1.4rem;

          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
  `}
`

const EpisodeDetails = styled.div`
  ${({ theme }) => css`
    flex: 1;

    margin-left: 1rem;

    a {
      display: block;

      color: ${theme.gray800};
      font-family: ${theme.fonts.lexend}, sans-serif;
      font-weight: 600;
      text-decoration: none;
      line-height: 1.4rem;

      &:hover {
        text-decoration: underline;
      }
    }

    p {
      overflow: hidden;

      max-width: 70%;
      margin-top: 0.5rem;

      font-size: 0.875rem;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    span {
      display: inline-block;

      margin-top: 0.5rem;

      font-size: 0.875rem;

      &:last-child {
        position: relative;

        margin-left: 0.5rem;
        padding-left: 0.5rem;

        &::before {
          content: "";
          position: absolute;
          left: 0;
          top: 50%;
          transform: translate(-50%, -50%);

          width: 4px;
          height: 4px;

          border-radius: 2px;
          background: #ddd;
        }
      }
    }
  `}
`

const Button = styled.button`
  ${({ theme }) => css`
    position: absolute;
    right: 2rem;
    bottom: 2rem;

    transition: filter 0.2s;

    width: 2.5rem;
    height: 2.5rem;

    background: ${theme.white};
    border: 1px solid ${theme.gray100};
    border-radius: 0.675rem;

    font-size: 0;

    &:hover {
      filter: brightness(0.9);
    }

    img {
      width: 1.5rem !important;
      height: 1.5rem !important;
    }
  `}
`

const ButtonSmall = styled.button`
  ${({ theme }) => css`
    transition: filter 0.2s;

    width: 2rem;
    height: 2rem;

    background: ${theme.white};
    border: 1px solid ${theme.gray100};
    border-radius: 0.5rem;

    font-size: 0;

    &:hover {
      filter: brightness(0.9);
    }

    img {
      width: 1.25rem !important;
      height: 1.25rem !important;
    }
  `}
`
