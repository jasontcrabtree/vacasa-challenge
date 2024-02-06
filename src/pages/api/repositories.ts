import type { NextApiRequest, NextApiResponse } from 'next';

type Data =
  | {
      total_count: number;
      incomplete_results: boolean;
      items: Array<any>; // any due to time constraints
    }
  | {
      message: string;
    };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const searchTerm = req.query.search;

  const url = `https://api.github.com/search/repositories?q=org:${searchTerm}&sort=stars&order=desc`;

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

    console.log(json);
    res.status(200).json(json);
  } else {
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
