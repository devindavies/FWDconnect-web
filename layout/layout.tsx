import React from "react";
import Head from "next/head";
import Header from "../components/Header";
import { renderMetaTags } from "react-datocms";

const faviconMetaTags = [
  {
    attributes: {
      sizes: "16x16",
      type: "image/png",
      rel: "icon",
      href:
        "https://www.datocms-assets.com/11579/1556942732-default.png?h=16&w=16",
    },
    content: null,
    tag: "link",
  },
  {
    attributes: {
      sizes: "32x32",
      type: "image/png",
      rel: "icon",
      href:
        "https://www.datocms-assets.com/11579/1556942732-default.png?h=32&w=32",
    },
    content: null,
    tag: "link",
  },
  {
    attributes: {
      sizes: "96x96",
      type: "image/png",
      rel: "icon",
      href:
        "https://www.datocms-assets.com/11579/1556942732-default.png?h=96&w=96",
    },
    content: null,
    tag: "link",
  },
  {
    attributes: {
      sizes: "192x192",
      type: "image/png",
      rel: "icon",
      href:
        "https://www.datocms-assets.com/11579/1556942732-default.png?h=192&w=192",
    },
    content: null,
    tag: "link",
  },
];

interface LayoutProps {
  isLoggedIn?: boolean;
}

const Layout: React.FC<LayoutProps> = (props) => {
  return (
    <div>
      <Head>
        <>
          <title>FWDConnect</title>
          <meta name="description" content="FWDconnect" />
          <link
            rel="shortcut icon"
            type="image/x-icon"
            href="https://www.datocms-assets.com/11579/1556942732-default.png"
          />
          {renderMetaTags(faviconMetaTags)}
        </>
      </Head>
      <Header isLoggedIn={props.isLoggedIn} />
      {props.children}
    </div>
  );
};

export default Layout;
