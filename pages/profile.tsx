import React from "react";
import Router from "next/router";
//import useSwr from "swr";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

import Layout from "../layout/layout";
import withAuthUser, {
  AuthUserInfo
} from "../services/pageWrappers/withAuthUser";
import withAuthUserInfo from "../services/pageWrappers/withAuthUserInfo";

interface ProfileProps {
  AuthUserInfo?: AuthUserInfo;
}

interface UserData {
  fname: string;
  lname: string;
  email: string;
}

function Profile(props: ProfileProps) {
  const { AuthUserInfo } = props;
  const authUser = AuthUserInfo?.AuthUser;
  const db = firebase.firestore();

  const [userData, setUserData] = React.useState<UserData>({
    fname: "",
    lname: "",
    email: ""
  });

  React.useEffect(() => {
    if (!authUser) {
      Router.push("/");
    } else {
      const unsubscribe = db
        .collection("users")
        .doc(authUser.id)
        .onSnapshot(snap => {
          const newUserdata = snap.data();
          newUserdata && setUserData(newUserdata as UserData);
        });

      return () => unsubscribe();
    }
  }, [db, authUser]);

  return (
    <Layout isLoggedIn={authUser ? true : false}>
      <div className="section">
        <h1 className="title">Profile</h1>
        <div className="container content">
          <div className="columns">
            <div className="column is-one-third">
              <div className="card">
                <div className="card-image">
                  <figure className="image is-4by3">
                    <img
                      src="https://bulma.io/images/placeholders/1280x960.png"
                      alt="Placeholder"
                    />
                  </figure>
                </div>
                <div className="card-content">
                  <div className="media">
                    <div className="media-left">
                      <figure className="image is-48x48">
                        <img
                          src="https://bulma.io/images/placeholders/96x96.png"
                          alt="Placeholder"
                        />
                      </figure>
                    </div>
                    <div className="media-content">
                      <p className="title is-4">
                        {userData.fname} {userData.lname}
                      </p>
                      <p className="subtitle is-6">{userData.email}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default withAuthUser(withAuthUserInfo(Profile));
