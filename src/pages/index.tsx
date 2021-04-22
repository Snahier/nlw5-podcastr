import { format, parseISO } from "date-fns"
import { ptBR } from "date-fns/locale"
import { GetStaticProps } from "next"
import styled from "styled-components"
import { api } from "../services/api"
import { convertDurationToTimeString } from "../utils/convertDurationToTimeString"

type Episode = {
  id: string
  title: string
  thumbnail: string
  description: string
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
  console.log(data)

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
      description: episode.description,
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
  return (
    <HomeContainer>
      <LatestEpisodes>
        <h2>Últimos lançamentos</h2>

        <ul>
          {latest_episodes.map((episode) => (
            <li key={episode.id}>
              <img src={episode.thumbnail} alt={episode.title} />

              <EpisodeDetails>
                <a href="">{episode.title}</a>
                <p>{episode.members}</p>
                <span>{episode.published_at}</span>
                <span>{episode.durationAsString}</span>
              </EpisodeDetails>

              <button>
                <img src="/play-green.svg" alt="Tocar episódio" />
              </button>
            </li>
          ))}
        </ul>
      </LatestEpisodes>

      <AllEpisodes></AllEpisodes>
    </HomeContainer>
  )
}

const HomeContainer = styled.div``

const LatestEpisodes = styled.section``

const AllEpisodes = styled.section``

const EpisodeDetails = styled.div``
