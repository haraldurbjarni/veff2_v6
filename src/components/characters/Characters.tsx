import React, { useState } from 'react';

import Link from 'next/link';

import s from './Characters.module.scss';
import { Button } from '../button/Button';
import { ICharacter, IPeopleResponse } from '../../types';

type Props = {
  people: IPeopleResponse | null;
};

/**
 * Hjálpar týpa ef við erum að filtera burt hugsanleg null gildi:
 *
 * const items: T = itemsWithPossiblyNull
 *  .map((item) => {
 *    if (!item) {
 *      return null;
 *    }
 *    return item;
 *  })
 *  .filter((Boolean as unknown) as ExcludesFalse);
 * items verður Array<T> en ekki Array<T | null>
 */
type ExcludesFalse = <T>(x: T | null | undefined | false) => x is T;

export function Characters({ people }: Props): JSX.Element {
  const [loading, setLoading] = useState<boolean>(false);

  const [characters, setCharacters] = useState<Array<ICharacter>>(people?.allPeople?.people ?? []);

  const [nextPage, setNextPage] = useState<string | null>(people?.allPeople?.pageInfo?.endCursor
    ?? null);

  const [hasNextPage, setHasNextPage] = useState<boolean>(people?.allPeople?.pageInfo?.hasNextPage
    ?? false);

  const fetchMore = async (): Promise<void> => {
    setLoading(true);
    const url = `api/characters/?after=${nextPage}`;
    let newCharacters: IPeopleResponse | undefined;
    try {
      const result = await fetch(url);
      if (!result.ok) {
        throw new Error('result no ok');
      }
      newCharacters = await result.json();
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
    setHasNextPage(newCharacters?.allPeople?.pageInfo?.hasNextPage ?? false);
    setCharacters(characters.concat(newCharacters?.allPeople?.people ?? []));
    setNextPage(newCharacters?.allPeople?.pageInfo?.endCursor ?? '');
  };

  return (
    <section className={s.characters}>
      <ul className={s.characters__list}>
        {characters.map((char, i) => (
          <li key={i}>
            <Link href={`/characters/${char.id}`}>{char.name}</Link>
          </li>
        ))}
      </ul>
      {loading
        && (
        <p className={s.news__loading}>
          Fetching data...
        </p>
        )}
      {
        hasNextPage ? (
          <Button disabled={loading} onClick={fetchMore}>Fetch more</Button>
        ) : (
          <p>
            No more characters!
          </p>
        )
      }
    </section>
  );
}
