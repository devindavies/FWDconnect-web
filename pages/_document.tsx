import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";
import React from "react";
import { get } from "lodash";
//import { ServerStyleSheet } from 'styled-components'
//import removeCommentsAndSpacing from '../lib/removeCommentsAndSpacing'

interface CustomDocumentProps extends Document {
  AuthUserInfo: {
    AuthUser: {
      id: string;
      email: string;
      emailVerified: string;
    };
    token: string;
  };
}
export default class CustomDocument extends Document<CustomDocumentProps> {
  public static getInitialProps = async (ctx: DocumentContext) => {
    // Get the AuthUserInfo object. This is set if the server-rendered page
    // is wrapped in the `withAuthUser` higher-order component.
    const AuthUserInfo = get(ctx, "myCustomData.AuthUserInfo", null);

    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps, AuthUserInfo };
  };

  render() {
    const { AuthUserInfo } = this.props;
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <link rel="preconnect" href="https://www.google-analytics.com" />
          <script
            id="__MY_AUTH_USER_INFO"
            type="application/json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(AuthUserInfo, null, 2),
            }}
          />
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
            sizes="57x57"
            href="/favicon/apple-icon-57x57.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="60x60"
            href="/favicon/apple-icon-60x60.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="72x72"
            href="/favicon/apple-icon-72x72.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="76x76"
            href="/favicon/apple-icon-76x76.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="114x114"
            href="/favicon/apple-icon-114x114.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="120x120"
            href="/favicon/apple-icon-120x120.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="144x144"
            href="/favicon/apple-icon-144x144.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="152x152"
            href="/favicon/apple-icon-152x152.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/favicon/apple-icon-180x180.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="192x192"
            href="/favicon/android-icon-192x192.png"
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
            sizes="96x96"
            href="/favicon/favicon-96x96.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon/favicon-16x16.png"
          />
          <link rel="manifest" href="/manifest.json" />
          <meta name="msapplication-TileColor" content="#ffffff" />
          <meta
            name="msapplication-TileImage"
            content="/favicon/ms-icon-144x144.png"
          />
          <meta name="theme-color" content="#ffffff" />
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
