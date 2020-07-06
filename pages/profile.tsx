import React from "react";
import Router from "next/router";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

import Layout from "../layout/layout";
import { useUser } from "../utils/auth/useUser";

interface UserData {
  fname: string;
  lname: string;
  email: string;
}

function Profile() {
  const { user } = useUser();

  const db = firebase.firestore();

  const [userData, setUserData] = React.useState<UserData>({
    fname: "",
    lname: "",
    email: "",
  });

  React.useEffect(() => {
    console.log(user);
    if (user) {
      const unsubscribe = db
        .collection("users")
        .doc(user.id)
        .onSnapshot((snap) => {
          const newUserdata = snap.data();
          newUserdata && setUserData(newUserdata as UserData);
        });

      return () => unsubscribe();
    }
  }, [db, user]);

  return (
    <Layout>
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

export default Profile;
