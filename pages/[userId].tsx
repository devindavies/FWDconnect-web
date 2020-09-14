/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "firebase/auth";
import "firebase/firestore";

import Layout from "../layout/layout";
import PostList from "../components/PostList";
import { FirebaseUser } from "../types/index";

// Types
import type {
  NextPage,
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from "next";

type ProfileData = {
  user?: FirebaseUser;
};

type QueryParams = {
  userId: string;
};

export const getStaticPaths: GetStaticPaths<QueryParams> = async () => {
  const admin = await import("firebase-admin");
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      }),
      databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    });
  }
  const db = admin.firestore();
  const userList = await db.collection("users").get();
  return {
    paths: userList.docs.map((doc) => ({
      params: { userId: doc.id },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<ProfileData, QueryParams> = async (
  context
) => {
  if (context.params?.userId) {
    const admin = await import("firebase-admin");
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
        }),
        databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      });
    }
    const user = await admin
      .firestore()
      .collection("users")
      .doc(context.params.userId)
      .get();
    return {
      props: {
        user: user.data() as ProfileData["user"],
      },
    };
  } else
    return {
      props: {},
    };
};

const Profile: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = (
  props
) => {
  return (
    <Layout>
      <div className="section">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-two-thirds">
              <nav className="panel">
                <p className="panel-heading">Profile</p>
                <div className="panel-block">
                  <p className="title is-4">
                    {props.user?.name.first} {props.user?.name.last}
                  </p>
                </div>
                <p className="panel-tabs">
                  <a className="is-active">Posts</a>
                  <a>Following</a>
                  <a>Followers</a>
                </p>
                <div className="panel-block">
                  <div>
                    <PostList userId={props.user?.id} />
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
