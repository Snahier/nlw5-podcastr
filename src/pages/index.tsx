import { format, parseISO } from "date-fns"
import { ptBR } from "date-fns/locale"
import { GetStaticProps } from "next"
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
  episodes: Episode[]
}

export default function Home(props: HomeProps) {
  return (
    <div>
      <h1>Index</h1>
      <pre>
        <p>{JSON.stringify(props.episodes, null, 2)}</p>
      </pre>
    </div>
  )
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

  return {
    props: {
      episodes,
    },
    revalidate: 60 * 60 * 8,
  }
}
