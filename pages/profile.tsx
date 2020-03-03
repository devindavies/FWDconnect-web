import cookie from "cookie";
import Router from "next/router";
import { withAuthSync } from "../services/auth";
import { FAUNA_SECRET_COOKIE } from "../services/fauna-auth";
import { profileApi } from "./api/profile";
import Layout from "../layout/layout";
import { NextPage } from "next";

interface ProfileProps {
  userId?: string;
}

const Profile: NextPage<ProfileProps> = props => {
  const { userId } = props;

  return (
    <Layout isLoggedIn={userId ? true : false}>
      <h1>Your user id is {userId}</h1>
    </Layout>
  );
};

Profile.getInitialProps = async ctx => {
  if (typeof window === "undefined") {
    const { req, res } = ctx;
    const cookies = cookie.parse(req?.headers.cookie ?? "");
    const faunaSecret = cookies[FAUNA_SECRET_COOKIE];

    if (!faunaSecret) {
      res?.writeHead(302, { Location: "/login" });
      res?.end();
      return {};
    }

    const profileInfo = await profileApi(faunaSecret);

    return { userId: profileInfo };
  }

  const response = await fetch("/api/profile");

  if (response.status === 401) {
    Router.push("/login");
    return {};
  }
  if (response.status !== 200) {
    throw new Error(await response.text());
  }

  const data = await response.json();

  return { userId: data.userId };
};

export default withAuthSync(Profile);
