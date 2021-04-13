// Hér eru þær týpur sem við skilgreinum á móti GraphQL endapunkti

export interface ICharacter {
  id: string;
  name?: string;
  birthYear?: string;
  eyeColor?: string;
  hairColor?: string;
  mass?: number;
  height?: number;
}

export interface IFilm {
  id: string;
  title?: string;
  episodeID?: number;
  openingCrawl?: string;
  characterConnection?: ICharacterConnection;
}

export interface IFilmResponse {
  allFilms?: IAllFilms;
}

interface IAllFilms {
  films?: Array<IFilm>
}

interface ICharacterConnection {
  characters?: Array<ICharacter>;
}

export interface IPeopleResponse {
  allPeople?: IAllPeople;
}

interface IAllPeople {
  pageInfo?: IPageInfo;
  people?: Array<ICharacter>;
}

interface IPageInfo {
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
  startCursor?: string;
  endCursor?: string;
}

export interface ICharacterResponse {
  person: ICharacter;
}
