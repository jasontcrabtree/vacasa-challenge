import { ApiResType } from '@/types/types';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data =
  | ApiResType
  | {
      message: string;
    };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const searchTerm = req.query.search;

  // Default to fetching 16
  const url = `https://api.github.com/search/repositories?q=org:${searchTerm}&sort=stars&order=desc&per_page=16`;

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  };

  const data = await fetch(url, options);

  if (data.ok) {
    const json = await data.json();
    res.status(200).json(json);
  } else {
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
