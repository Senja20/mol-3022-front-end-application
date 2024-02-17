// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  prediction: boolean;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log("Request body:", req.body);

  // wait for 2 seconds to simulate a long running process
  setTimeout(() => {
    res.status(200).json({ prediction: true });
  }, 2000);
}
