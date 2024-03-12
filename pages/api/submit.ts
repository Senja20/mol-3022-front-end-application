// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  prediction: boolean;
  id: string;
};

const randomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const handle = (req: NextApiRequest, res: NextApiResponse<Data>) => {
  if (req.method !== "POST") {
    res.status(405);
    return;
  }

  setTimeout(() => {
    res
      .status(200)
      .json({ prediction: !!randomInt(0, 1), id: req.body.data.id });
  }, randomInt(2000, 5000));
};

export default handle;
