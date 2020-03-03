import React, { useState, FormEvent } from "react";
import Router from "next/router";
import Layout from "../layout/layout";
import { login } from "../services/auth";

const signin = async (email: string, password: string) => {
  const response = await fetch("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  if (response.status !== 200) {
    throw new Error(await response.text());
  }

  Router.push("/profile");
};

function Login() {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    error: ""
  });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setUserData({ ...userData, error: "" });

    const email = userData.email;
    const password = userData.password;

    try {
      await signin(email, password);
    } catch (error) {
      console.error(error);
      setUserData({ ...userData, error: error.message });
    }
  }

  return (
    <Layout>
      <div className="login">
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>

          <input
            type="text"
            id="email"
            name="email"
            value={userData.email}
            onChange={event =>
              setUserData({ ...userData, email: event.target.value })
            }
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={userData.password}
            onChange={event =>
              setUserData({ ...userData, password: event.target.value })
            }
          />

          <button type="submit">Login</button>

          {userData.error && <p className="error">Error: {userData.error}</p>}
        </form>
      </div>
    </Layout>
  );
}

export default Login;
