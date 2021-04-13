import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import { fileURLToPath } from 'url';

import { Film } from '../components/film/Film';

import { Layout } from '../components/layout/Layout';
import { characterFragment } from '../graphql/characterFragment';
import { fetchSwapi } from '../lib/swapi';
import { ICharacter, IFilm } from '../types';

export type PageProps = {
  films: Array<IFilm> | null;
  characters: Array<ICharacter> | null;
};

export default function PageComponent(
  data: InferGetServerSidePropsType<typeof getServerSideProps>,
): JSX.Element {
  const { films } = data;

  if (!films) {
    return (<p>error</p>);
  }

  return (
    <Layout>
      <Head>
        <title>Star Wars films</title>
      </Head>
      <h1>Star Wars films</h1>
      {films.map((film, i) => (
        <Film
          key={i}
          title={film.title || ''}
          episodeID={film.episodeID || 0}
          openingCrawl={film.openingCrawl || ''}
          characters={film.characterConnection?.characters || []}
        />

      ))}
    </Layout>

  );
}

const query = `
query {
  allFilms {
    films {
      title
      episodeID
      openingCrawl
      characterConnection {
        characters {
          id
          name
        }
      }
    }
  }
}
`;

export const getServerSideProps: GetServerSideProps<PageProps> = async () => {
  const films = await fetchSwapi<any>(query); // TODO EKKI any
  return {
    props: {
      films: films?.allFilms?.films ?? null,
    },
  };
};
