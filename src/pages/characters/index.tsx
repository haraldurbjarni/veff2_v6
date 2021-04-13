import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import { Characters } from '../../components/characters/Characters';

import { Layout } from '../../components/layout/Layout';
import { fetchCharacters, fetchSwapi } from '../../lib/swapi';
import { ICharacter, IPeopleResponse } from '../../types';

export type PageProps = {
  peopleResponse: Array<ICharacter> | null; // TODO EKKI any
};

export default function PageComponent(
  data: InferGetServerSidePropsType<typeof getServerSideProps>,
): JSX.Element {
  const { peopleResponse } = data;
  return (
    <Layout>
      <Head>
        <title>Star Wars characters</title>
      </Head>
      <h1>Star Wars characters</h1>
      <Characters />
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps<PageProps> = async () => {
  // TODO sækja karaktera
  const peopleResponse = await fetchCharacters<any>();
  return {
    props: {
      peopleResponse: peopleResponse ?? null,
    },
  };
};
