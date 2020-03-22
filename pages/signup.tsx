import React, { useState } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import Router from "next/router";
import initFirebase from "../services/auth/initFirebase";
import Layout from "../layout/layout";

initFirebase();

interface State {
  fname: {
    display: string;
    value: string;
    error: boolean;
  };
  lname: {
    display: string;
    value: string;
    error: boolean;
  };
  email: {
    display: string;
    value: string;
    error: boolean;
  };
  password: {
    display: string;
    value: string;
    error: boolean;
  };
  [x: string]: {
    display: string;
    value: string;
    error: boolean;
  };
}

function Signup() {
  const db = firebase.firestore();
  const [userData, setUserData] = useState<State>({
    fname: {
      display: "First Name",
      value: "",
      error: false
    },
    lname: {
      display: "Last Name",
      value: "",
      error: false
    },
    email: {
      display: "Email Address",
      value: "",
      error: false
    },
    password: {
      display: "Password",
      value: "",
      error: false
    }
  });

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = async event => {
    event.preventDefault();
    const { name, value } = event.target;
    setUserData({
      ...userData,
      [name]: {
        ...userData[name],
        value: value
      }
    });
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async event => {
    event.preventDefault();
    for (const field in userData) {
      if (userData[field].value === "") {
        setUserData({
          ...userData,
          [name]: {
            ...userData[name],
            error: true
          }
        });
        throw new Error(`${userData[field].display} is required`);
      }
    }

    try {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(
          userData.email.value,
          userData.password.value
        );
      const user = firebase.auth().currentUser;
      await db
        .collection("users")
        .doc(user?.uid)
        .set({
          name: {
            first: userData.fname.value,
            last: userData.lname.value
          },
          email: userData.email.value
        });
      Router.push("/profile");
    } catch (error) {
      console.error(error);
      setUserData({ ...userData, error: error.message });
    }
  };

  return (
    <Layout>
      <div className="section">
        <div className="container content">
          <h1>Sign Up</h1>
          <form onSubmit={handleSubmit}>
            <div className="field is-grouped is-grouped-centered">
              <div className="control is-expanded">
                <input
                  type="text"
                  id="fname"
                  name="fname"
                  value={userData.fname.value}
                  autoComplete="given-name"
                  placeholder="First Name"
                  onChange={handleInputChange}
                  className="input"
                />
              </div>
              <div className="control is-expanded">
                <input
                  type="text"
                  id="lname"
                  name="lname"
                  value={userData.lname.value}
                  autoComplete="family-name"
                  placeholder="Last Name"
                  onChange={handleInputChange}
                  className="input"
                />
              </div>
            </div>

            <div className="field">
              <div className="control">
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={userData.email.value}
                  placeholder="Email Address"
                  autoComplete="email"
                  onChange={handleInputChange}
                  className="input"
                />
              </div>
            </div>

            <div className="field">
              <div className="control">
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={userData.password.value}
                  placeholder="Password"
                  autoComplete="new-password"
                  onChange={handleInputChange}
                  className="input"
                />
              </div>
            </div>

            <button type="submit" className="button is-link">
              Sign up
            </button>

            {userData.error && <p className="error">Error: {userData.error}</p>}
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default Signup;
