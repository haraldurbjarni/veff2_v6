import { NextApiRequest, NextApiResponse } from 'next';
import { fetchCharacters } from '../../lib/swapi';
import { IPeopleResponse } from '../../types';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const after = req.query?.after as string | undefined;
  const data = await fetchCharacters<IPeopleResponse>(after);
  if (data) res.json(data);
  else res.status(200).json(null);
};
