import React from "react";
import { AuthUserInfoContext } from "../auth/hooks";
import { NextPageContext } from "next";

// Provides an AuthUserInfo prop to the composed component.
export default (ComposedComponent: any) => {
  const WithAuthUserInfoComp = (props: any) => {
    const { AuthUserInfo: AuthUserInfoFromSession, ...otherProps } = props;
    return (
      <AuthUserInfoContext.Consumer>
        {AuthUserInfo => (
          <ComposedComponent
            {...otherProps}
            AuthUserInfo={AuthUserInfo || AuthUserInfoFromSession}
          />
        )}
      </AuthUserInfoContext.Consumer>
    );
  };

  WithAuthUserInfoComp.getInitialProps = async (ctx: NextPageContext | any) => {
    const AuthUserInfo = ctx.myCustomData.AuthUserInfo ? ctx.myCustomData.AuthUserInfo: null

    // Evaluate the composed component's getInitialProps().
    let composedInitialProps = {};
    if (ComposedComponent.getInitialProps) {
      composedInitialProps = await ComposedComponent.getInitialProps(ctx);
    }

    return {
      ...composedInitialProps,
      AuthUserInfo
    };
  };

  WithAuthUserInfoComp.displayName = `WithAuthUserInfo(${ComposedComponent.displayName})`;

  WithAuthUserInfoComp.defaultProps = {};

  return WithAuthUserInfoComp;
};