import { format, parseISO } from "date-fns"
import { ptBR } from "date-fns/locale"
import { GetStaticPaths, GetStaticProps } from "next"
import { Params } from "next/dist/next-server/server/router"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import styled, { css } from "styled-components"
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

  return (
    <EpisodeContainer>
      <ThumbnailContainer>
        <Link href="/">
          <GoBackButton>
            <img src="/arrow-left.svg" alt="Voltar" />
          </GoBackButton>
        </Link>

        <Image
          width={700}
          height={160}
          src={episode.thumbnail}
          objectFit="cover"
        />

        <PlayButton>
          <img src="/play.svg" alt="Tocar" />
        </PlayButton>
      </ThumbnailContainer>

      <Header>
        <h1>{episode.title}</h1>
        <span>{episode.members}</span>
        <span>{episode.published_at}</span>
        <span>{episode.durationAsString}</span>
      </Header>

      <Description dangerouslySetInnerHTML={{ __html: episode.description }} />
    </EpisodeContainer>
  )
}

const EpisodeContainer = styled.section`
  margin: 0 auto;
  max-width: 45rem;
  padding: 3rem 2rem;
`

const ThumbnailContainer = styled.div`
  position: relative;

  img {
    border-radius: 1rem;
  }
`

const buttonStyles = css`
  position: absolute;
  z-index: 5;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 3rem;
  height: 3rem;

  border: 0;
  border-radius: 0.75rem;

  font-size: 0;

  &:hover {
    filter: brightness(0.9);
  }
`

const GoBackButton = styled.button`
  ${buttonStyles}
  ${({ theme }) => css`
    left: 0;
    top: 50%;
    transform: translate(-50%, -50%);

    background: ${theme.purple500};
  `}
`

const PlayButton = styled.button`
  ${buttonStyles}
  ${({ theme }) => css`
    right: 0;
    top: 50%;
    transform: translate(50%, -50%);

    background: ${theme.green500};
  `}
`

const Header = styled.header`
  ${({ theme }) => css`
    padding-bottom: 1rem;

    border-bottom: 1px solid ${theme.gray100};

    h1 {
      margin-top: 2rem;
      margin-bottom: 1.5rem;
    }

    span {
      display: inline-block;

      font-size: 0.875rem;

      & + span {
        position: relative;

        margin-left: 1rem;
        padding-left: 1rem;

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

const Description = styled.div`
  ${({ theme }) => css`
    color: ${theme.gray800};
    margin-top: 2rem;

    line-height: 1.675rem;

    p {
      margin: 1.5rem 0;
    }
  `}
`
