import React, { useState } from "react";
import { NextPage } from "next";
import firebase from "firebase/app";
import "firebase/firestore";

import Layout from "../layout/layout";
import withDato from "../data/datoCms";
import withAuthUserInfo from "../services/pageWrappers/withAuthUserInfo";
import withAuthUser, {
  AuthUserInfo,
} from "../services/pageWrappers/withAuthUser";
import initFirebase from "../services/auth/initFirebase";
import PostList from "../components/PostList";

initFirebase();

interface Props {
  AuthUserInfo?: AuthUserInfo;
}

interface FeedState {
  postInput: string;
  [x: string]: string;
}

const Home: NextPage<Props> = (props) => {
  const { AuthUserInfo } = props;
  const authUser = AuthUserInfo?.AuthUser;
  const db = firebase.firestore();

  const [state, setState] = React.useState<FeedState>({
    postInput: "",
  });

  const handleTextAreaChange: React.ChangeEventHandler<HTMLTextAreaElement> = async (
    event
  ) => {
    event.preventDefault();
    const { name, value } = event.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  const submitPost: React.MouseEventHandler<HTMLButtonElement> = async (
    event
  ) => {
    event.preventDefault();
    const content = state.postInput;
    setState({
      ...state,
      postInput: "",
    });
    await db.collection("posts").add({
      user: db.collection("users").doc(authUser?.id),
      content: content,
      datePosted: firebase.firestore.Timestamp.now(),
    });
  };

  return (
    <Layout isLoggedIn={authUser ? true : false}>
      <div className="section">
        <div className="container">
          <h1 className="title">FWDconnect</h1>
          <h1>
            A simple social media app built using NextJS, Firebase, deployed on
            Now.sh
          </h1>
          {authUser && (
            <article className="media">
              <figure className="media-left">
                <p className="image is-64x64">
                  <img src="https://bulma.io/images/placeholders/128x128.png" />
                </p>
              </figure>
              <div className="media-content">
                <div className="field">
                  <p className="control">
                    <textarea
                      name="postInput"
                      placeholder="Write something..."
                      value={state?.postInput}
                      onChange={handleTextAreaChange}
                      className="textarea"
                    ></textarea>
                  </p>
                </div>
                <nav className="level">
                  <div className="level-left">
                    <div className="level-item">
                      <button onClick={submitPost} className="button is-info">
                        Submit
                      </button>
                    </div>
                  </div>
                </nav>
              </div>
            </article>
          )}
          {authUser && <PostList user={authUser} />}
        </div>
      </div>
    </Layout>
  );
};

export default withDato(withAuthUser(withAuthUserInfo(Home)));
