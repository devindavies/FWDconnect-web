export const createAuthUser = (firebaseUser?: firebase.User | null) => {
  if (!firebaseUser || !firebaseUser.uid) {
    return null;
  }
  return {
    id: firebaseUser.uid,
    email: firebaseUser.email,
    emailVerified: firebaseUser.emailVerified,
    displayName: firebaseUser.displayName
  };
};

export const createAuthUserInfo = ({
  firebaseUser = null,
  token = null
}: {
  firebaseUser?: firebase.User | null;
  token?: string | null;
} = {}) => {
  return {
    AuthUser: createAuthUser(firebaseUser),
    token
  };
};
