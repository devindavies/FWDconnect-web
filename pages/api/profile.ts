import { NextApiRequest, NextApiResponse } from "next";
import { query } from "faunadb";
import cookie from "cookie";
import { faunaClient, FAUNA_SECRET_COOKIE } from "../../services/fauna-auth";

export const profileApi = async (faunaSecret: string) => {
  const ref: any = await faunaClient(faunaSecret).query(query.Identity());
  console.log(ref.collection);
  return ref.id;
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const cookies = cookie.parse(req.headers.cookie ?? "");
  const faunaSecret = cookies[FAUNA_SECRET_COOKIE];

  if (!faunaSecret) {
    return res.status(401).send("Auth cookie missing.");
  }

  res.status(200).json({ userId: await profileApi(faunaSecret) });
};
