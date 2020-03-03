import { query as q } from "faunadb";
import { serverClient, serializeFaunaCookie } from "../../services/fauna-auth";
import { NextApiRequest, NextApiResponse } from "next";
import { LoginResponse } from "./login";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { fname, lname, email, password } = await req.body;

  try {
    if (!email || !password) {
      throw new Error("Email and password must be provided.");
    }
    console.log(`email: ${email} trying to create user.`);

    let user: any;

    try {
      user = await serverClient.query(
        q.Create(q.Collection("users"), {
          credentials: { password },
          data: { fname, lname, email }
        })
      );
    } catch (error) {
      console.error("Fauna create user error:", error);
      throw new Error("User already exists.");
    }

    if (!user.ref) {
      throw new Error("No ref present in create query response.");
    }

    const loginRes: LoginResponse = await serverClient.query(
      q.Login(user.ref, {
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
