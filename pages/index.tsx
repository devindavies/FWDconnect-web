import React from "react";
import { gql } from "apollo-boost";
import { renderMetaTags } from "react-datocms";
import { useQuery } from "@apollo/react-hooks";
import { NextPage } from "next";
import cookie from "cookie";

import Layout from "../layout/layout";
import LeaderList from "../components/LeaderList";
import withDato from "../data/datoCms";
import { withAuthSync } from "../services/auth";
import { FAUNA_SECRET_COOKIE } from "../services/fauna-auth";

interface Props {
  isLoggedIn?: boolean;
}

const Home: NextPage<Props> = props => {
  return (
    <Layout isLoggedIn={props.isLoggedIn}>
      <h1 className="title">FWDchat</h1>
      <h1>Cookie-based authentication example</h1>

      <p>Steps to test the functionality:</p>

      <ol>
        <li>Click signup and create an account, this will also log you in.</li>
        <li>
          Click home and click profile again, notice how your session is being
          used through a token stored in a cookie.
        </li>
        <li>
          Click logout and try to go to profile again. You'll get redirected to
          the `/login` route.
        </li>
      </ol>
      {
        //<LeaderList />
      }
    </Layout>
  );
};

Home.getInitialProps = async ctx => {
  if (typeof window === "undefined") {
    const { req, res } = ctx;
    const cookies = cookie.parse(req?.headers.cookie ?? "");
    const faunaSecret = cookies[FAUNA_SECRET_COOKIE];

    return { isLoggedIn: faunaSecret ? true : false };
  }

  const response = await fetch("/api/profile");
  const data = await response.json();
  return { isLoggedIn: data.userId ? true : false };
};

export default withDato(withAuthSync(Home));
