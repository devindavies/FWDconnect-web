import React from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import dynamic from "next/dynamic";

import { FirebaseComment } from "../types";
//import Comment from "./Comment";
const Comment = dynamic(() => import("../components/Comment"));

interface CommentListProps {
  post: string;
}

const CommentList = (props: CommentListProps) => {
  const [comments, loading, error] = useCollectionData<FirebaseComment>(
    firebase
      .firestore()
      .collection("posts")
      .doc(props.post)
      .collection("comments")
      .orderBy("datePosted", "desc"),
    {
      idField: "id",
    }
  );
  return (
    <>
      {comments?.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </>
  );
};

export default CommentList;
