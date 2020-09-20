import React from "react";
import { NextPage } from "next";
import firebase from "firebase/app";
import "firebase/firestore";

import Layout from "../layout/layout";
import initFirebase from "../utils/auth/initFirebase";
import PostList from "../components/PostList";
import { useUser } from "../utils/auth/useUser";

initFirebase();

interface FeedState {
  postInput: string;
  [x: string]: string;
}

const Home: NextPage = () => {
  const { user } = useUser();
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
      user: db.collection("users").doc(user?.id),
      content: content,
      datePosted: firebase.firestore.Timestamp.now(),
    });
  };

  return (
    <Layout>
      <section className="section">
        <div className="container">
          {user && (
            <>
              <article className="media">
                <figure className="media-left">
                  <p className="image is-64x64">
                    <img
                      alt=""
                      src="https://bulma.io/images/placeholders/128x128.png"
                    />
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
                        <button onClick={submitPost} className="button is-link">
                          Submit
                        </button>
                      </div>
                    </div>
                  </nav>
                </div>
              </article>
            </>
          )}
        </div>
      </section>
      <section className="section">
        <div className="container">
          <h2 className="title">Recent Posts</h2>
          <PostList />
        </div>
      </section>
    </Layout>
  );
};

export default Home;
