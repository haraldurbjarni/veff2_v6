// Hér eru þær týpur sem við skilgreinum á móti GraphQL endapunkti

export interface ICharacter {
  id: string;
  name?: string;
  birthYear?: string;
  eyeColor?: string;
  hairColor?: string;
  mass?: number;
  height?: number;
  // TODO fleiri týpur
}

// TODO hér ættum við að útbúa interface fyrir öll gögn sem við vinnum með (t.d. IFilm, IPaging)
export interface IPeopleResponse {
  id: string;
  name?: string;
  // TODO fleiri týpur
}

export interface IFilm {
  id: string;
  title?: string;
  episodeID?: number;
  openingCrawl?: string;
  characterConnection?: CharacterConnection;
  // TODO fleiri týpur
}
// og svör sem við fáum frá GraphQL endapunkti

interface CharacterConnection {
  characters?: Array<ICharacter>;
}
