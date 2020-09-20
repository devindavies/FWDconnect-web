import React from "react";
import Head from "next/head";
import Header from "../components/Header";

const Layout: React.FC = (props) => {
  return (
    <React.StrictMode>
      <div>
        <Head>
          <>
            <title>FWDConnect</title>
            <meta name="description" content="FWDconnect" />
          </>
        </Head>
        <Header />
        {props.children}
      </div>
    </React.StrictMode>
  );
};

export default Layout;
