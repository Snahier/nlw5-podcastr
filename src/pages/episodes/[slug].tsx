import { format, parseISO } from "date-fns"
import { ptBR } from "date-fns/locale"
import { GetStaticPaths, GetStaticProps } from "next"
import { Params } from "next/dist/next-server/server/router"
import { useRouter } from "next/router"
import { api } from "../../services/api"
import { convertDurationToTimeString } from "../../utils/convertDurationToTimeString"

type Episode = {
  id: string
  title: string
  thumbnail: string
  members: string
  duration: number
  durationAsString: string
  url: string
  published_at: string
  description: string
}

type EpisodeProps = {
  episode: Episode
}

export const getStaticProps: GetStaticProps = async ({ params }: Params) => {
  const { slug } = params

  const { data } = await api.get(`/episodes/${slug}`)

  const episode = {
    id: data.id,
    title: data.title,
    thumbnail: data.thumbnail,
    members: data.members,
    published_at: format(parseISO(data.published_at), "d MMM yy", {
      locale: ptBR,
    }),
    duration: Number(data.file.duration),
    durationAsString: convertDurationToTimeString(Number(data.file.duration)),
    description: data.description,
    url: data.file.url,
  }

  return {
    props: {
      episode,
    },
    revalidate: 60 * 60 * 24, // 24 hours
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  }
}

export default function Episode({ episode }: EpisodeProps) {
  const router = useRouter()

  return <h1>{episode.title}</h1>
}
