import * as admin from "firebase-admin";

export const verifyIdToken = async (token: string) => {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n")
      }),
      databaseURL: process.env.FIREBASE_DATABASE_URL
    });
  }

  try {
    return admin.auth().verifyIdToken(token);
  } catch (error) {
    throw error;
  }
};
