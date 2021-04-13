import Link from 'next/link';
import { ICharacter } from '../../types';

import s from './Film.module.scss';

type Props = {
  title: string;
  episodeID: number;
  openingCrawl: string;
  characters: Array<ICharacter>;
};

export function Film({
  title, episodeID, openingCrawl, characters,
}: Props): JSX.Element {
  return (
    <>
      <h2 className={s.film__title}>
        Episode {episodeID}: {title}
      </h2>
      <section className={s.film}>
        <div className={s.film__crawl}>
          <p>
            {openingCrawl}
          </p>
        </div>
        <section>
          <h3>
            Characters
          </h3>
          <div className={s.film__characters}>
            {characters.map((char, i) => (
              <Link key={i} href={`/characters/${char.id}`}>{char.name}</Link>
            ))}
          </div>

        </section>
      </section>
      <hr />

    </>

  );
}
