import React from "react";
import Layout from "../layout/layout";
import FirebaseAuth from "../components/FirebaseAuth";

export default function Login() {
  return (
    <Layout>
      <div className="section">
        <div className="container content">
          <h1>Login</h1>
          <FirebaseAuth />
        </div>
      </div>
    </Layout>
  );
}
