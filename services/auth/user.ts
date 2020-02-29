import { User } from "firebase";
import { auth } from "firebase-admin";

export const createAuthUser = (
  firebaseUser?: User | auth.UserRecord | null
) => {
  return !firebaseUser || !firebaseUser.uid
    ? null
    : {
        id: firebaseUser.uid,
        email: firebaseUser.email,
        emailVerified: firebaseUser.emailVerified,
        displayName: firebaseUser.displayName
      };
};

export const createAuthUserInfo = ({
  firebaseUser = null,
  token = null
} = {}) => {
  return {
    AuthUser: createAuthUser(firebaseUser),
    token
  };
};
