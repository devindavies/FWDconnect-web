/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import {
  useDocumentData,
  useCollectionData,
} from "react-firebase-hooks/firestore";

import { AuthUserInfo } from "../services/pageWrappers/withAuthUser";
import { FirebasePost, FirebaseUser, FirebaseLike } from "../types";
import CommentList from "./CommentList";

interface PostProps {
  postRef: FirebasePost;
  authUser?: AuthUserInfo["AuthUser"];
}

const Post = (props: PostProps) => {
  const db = firebase.firestore();
  const [user, loading, error] = useDocumentData<FirebaseUser>(
    db.collection("users").doc(props.postRef.user.id),
    {
      idField: "id",
    }
  );
  const [likes, likesLoading, likesError] = useCollectionData<FirebaseLike>(
    db.collection("posts").doc(props.postRef.id).collection("likes"),
    {
      idField: "id",
    }
  );

  const [input, setInput] = useState<string>("");

  const handleTextAreaChange: React.ChangeEventHandler<HTMLTextAreaElement> = async (
    event
  ) => {
    event.preventDefault();
    setInput(event.target.value);
  };

  const submitComment: React.MouseEventHandler<HTMLButtonElement> = async (
    event
  ) => {
    event.preventDefault();
    setInput("");
    await db
      .collection("posts")
      .doc(props.postRef.id)
      .collection("comments")
      .add({
        user: db.collection("users").doc(props.authUser?.id),
        content: input,
        datePosted: firebase.firestore.Timestamp.now(),
      });
  };

  const handleLike: React.MouseEventHandler<HTMLButtonElement> = async (
    event
  ) => {
    event.preventDefault();
    const likeRef = likes?.find((like) => like.user.id === props.authUser?.id);
    if (likeRef) {
      await db
        .collection("posts")
        .doc(props.postRef.id)
        .collection("likes")
        .doc(likeRef.id)
        .delete();
    } else {
      await db
        .collection("posts")
        .doc(props.postRef.id)
        .collection("likes")
        .add({
          user: db.collection("users").doc(props.authUser?.id),
        });
    }
  };

  return (
    <article key={props.postRef.id} className="media">
      <figure className="media-left">
        <p className="image is-64x64">
          <img src="https://bulma.io/images/placeholders/128x128.png" />
        </p>
      </figure>
      <div className="media-content">
        <div className="content">
          <p>
            <strong>{user?.name.first}</strong>{" "}
            <small>{props.postRef.datePosted.toDate().toUTCString()}</small>
            <br />
            {props.postRef.content}
            <br />
            <span onClick={handleLike} className="icon">
              <i className="fas fa-heart has-text-link text-link"></i>
            </span>
            <small>{likes?.length}</small>
          </p>
        </div>

        <CommentList post={props.postRef.id} />
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
                  placeholder="Leave a comment..."
                  value={input}
                  onChange={handleTextAreaChange}
                  className="textarea"
                ></textarea>
              </p>
            </div>
            <nav className="level">
              <div className="level-left">
                <div className="level-item">
                  <button onClick={submitComment} className="button is-info">
                    Submit
                  </button>
                </div>
              </div>
            </nav>
          </div>
        </article>
      </div>
    </article>
  );
};

export default Post;
