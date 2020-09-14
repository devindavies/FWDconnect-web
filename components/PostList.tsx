import React from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";

import { FirebasePost } from "../types";
import Post from "./Post";

type PostListProps = {
  userId?: string;
};

const PostList: React.FC<PostListProps> = () => {
  const [posts, loading, error] = useCollectionData<FirebasePost>(
    firebase.firestore().collection("posts").orderBy("datePosted", "desc"),
    {
      idField: "id",
    }
  );

  if (posts) {
    return (
      <>
        {posts.map((post) => (
          <div key={post.id}>
            <Post postRef={post} />
            <hr />
          </div>
        ))}
      </>
    );
  } else return <></>;
};

export default PostList;
