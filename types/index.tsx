export type FirebaseUser = {
  id: string;
  email: string;
  name: {
    first: string;
    last: string;
  };
};

export type FirebasePost = {
  id: string;
  user: firebase.firestore.DocumentReference;
  content: string;
  datePosted: firebase.firestore.Timestamp;
};

export type FirebaseComment = {
  id: string;
  user: firebase.firestore.DocumentReference;
  content: string;
  datePosted: firebase.firestore.Timestamp;
};

export type FirebaseLike = {
  id: string;
  user: firebase.firestore.DocumentReference;
};
