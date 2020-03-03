import { query } from "faunadb";
import { serverClient, serializeFaunaCookie } from "../../services/fauna-auth";
import { NextApiRequest, NextApiResponse } from "next";

export interface LoginResponse {
  secret?: string;
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, password } = await req.body;

  try {
    if (!email || !password) {
      throw new Error("Email and password must be provided.");
    }

    const loginRes: LoginResponse = await serverClient.query(
      query.Login(query.Match(query.Index("users_by_email"), email), {
        password
      })
    );

    if (!loginRes.secret) {
      throw new Error("No secret present in login query response.");
    }

    const cookieSerialized = serializeFaunaCookie(loginRes.secret);

    res.setHeader("Set-Cookie", cookieSerialized);
    res.status(200).end();
  } catch (error) {
    res.status(400).send(error.message);
  }
};
