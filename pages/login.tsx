import React, { useState } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import Router from "next/router";
import initFirebase from "../services/auth/initFirebase";
import Layout from "../layout/layout";

initFirebase();

interface LoginFormState {
  email: string;
  password: string;
  error: string;
  [x: string]: string;
}

function Login() {
  const [userData, setUserData] = useState<LoginFormState>({
    email: "",
    password: "",
    error: ""
  });

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async event => {
    event.preventDefault();
    setUserData({ ...userData, error: "" });

    try {
      await firebase
        .auth()
        .signInWithEmailAndPassword(userData.email, userData.password);
      Router.push("/profile");
    } catch (error) {
      console.error(error);
      setUserData({ ...userData, error: error.message });
    }
  };

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = async event => {
    event.preventDefault();
    const { name, value } = event.target;
    setUserData({
      ...userData,
      [name]: value
    });
  };

  return (
    <Layout>
      <div className="section">
        <div className="container content">
          <h1>Login</h1>
          <form onSubmit={handleSubmit}>
            <div className="field">
              <div className="control">
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={userData.email}
                  placeholder="Email"
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
                  value={userData.password}
                  placeholder="Password"
                  autoComplete="current-password"
                  onChange={handleInputChange}
                  className="input"
                />
              </div>
            </div>

            <button type="submit" className="button is-link">
              Login
            </button>

            {userData.error && <p className="error">Error: {userData.error}</p>}
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default Login;
