import React from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { FirebaseComment } from "../types";

type FirebaseUser = {
  id: string;
  email: string;
  name: {
    first: string;
    last: string;
  };
};

interface CommentProps {
  comment: FirebaseComment;
}

const Comment = (props: CommentProps) => {
  const [user, loading, error] = useDocumentData<FirebaseUser>(
    firebase.firestore().collection("users").doc(props.comment.user.id),
    {
      idField: "id",
    }
  );

  return (
    <article className="media">
      <figure className="media-left">
        <p className="image is-48x48">
          <img src="https://bulma.io/images/placeholders/96x96.png" />
        </p>
      </figure>
      <div className="media-content">
        <div className="content">
          <p>
            <strong>{user?.name.first}</strong>{" "}
            <small>{props.comment.datePosted.toDate().toUTCString()}</small>
            <br />
            {props.comment.content}
            <br />
          </p>
        </div>
      </div>
    </article>
  );
};

export default Comment;
