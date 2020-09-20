import Document, { Html, Head, Main, NextScript } from "next/document";
import React from "react";

export default class CustomDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <link rel="preconnect" href="https://www.google-analytics.com" />
          <meta
            name="description"
            content="FWDchat is a social media app built with React"
          />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="black-translucent"
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/favicon/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon/favicon-16x16.png"
          />
          <link
            rel="mask-icon"
            href="/favicon/safari-pinned-tab.svg"
            color="#5bbad5"
          />
          <meta name="msapplication-TileColor" content="#da532c" />
          <meta name="theme-color" content="#ffffff" />
          <link rel="manifest" href="/site.webmanifest" />

          <meta
            name="msapplication-TileImage"
            content="/favicon/ms-icon-150x150.png"
          />

          <script
            defer
            src="https://use.fontawesome.com/releases/v5.3.1/js/all.js"
          ></script>
          {/**this.props.gaTrackingId ? (
            <>
              <script
                key="ga1"
                async={true}
                src={`https://www.googletagmanager.com/gtag/js?id=${this.props.gaTrackingId}`}
              />
              <script
                key="ga2"
                dangerouslySetInnerHTML={{
                  __html: removeCommentsAndSpacing(`
window.dataLayer = window.dataLayer || [];
window.gaTrackingId = '${this.props.gaTrackingId}';
function gtag(){
  dataLayer.push(arguments);
}
gtag('js', new Date());
gtag('config', window.gaTrackingId);`)
                }}
              />
            </>
          ) : (
            <script
              dangerouslySetInnerHTML={{
                __html: removeCommentsAndSpacing(`
function gtag(){
  console.log('dummy gtag call', arguments)
}`)
              }}
            />
            )*/}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
