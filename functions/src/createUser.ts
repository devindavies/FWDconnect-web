import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();

export const createUser = functions.auth.user().onCreate(async (user) => {
  console.log("A new user signed in for the first time.");
  const { email, uid, displayName } = user;
  await admin.firestore().collection("users").add({
    id: uid,
    name: displayName,
    email: email,
  });
  console.log("User added to Firestore");
});
