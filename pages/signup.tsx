import React, { useState, FormEvent } from "react";
import Router from "next/router";
import Layout from "../layout/layout";

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

    const fname = userData.fname.value;
    const lname = userData.lname.value;
    const email = userData.email.value;
    const password = userData.email.value;

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fname, lname, email, password })
      });

      if (response.status !== 200) {
        throw new Error(await response.text());
      }

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
