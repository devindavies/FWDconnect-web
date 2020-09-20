import React from "react";
import Layout from "../layout/layout";
import FirebaseAuth from "../components/FirebaseAuth";

// Types
import type { NextPage } from "next";

const Login: NextPage = () => {
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
};

export default Login;
