import React from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";

import { FirebasePost } from "../types";
import Post from "./Post";

const PostList = () => {
  const [posts, loading, error] = useCollectionData<FirebasePost>(
    firebase.firestore().collection("posts").orderBy("datePosted", "desc"),
    {
      idField: "id",
    }
  );
  return (
    <>
      {posts?.map((post) => (
        <Post key={post.id} postRef={post} />
      ))}
    </>
  );
};

export default PostList;
