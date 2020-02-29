import React, { useState, useEffect } from "react";
import "firebase/auth";
import "firebase/functions";
import Link from "next/link";
import Router from "next/router";
import withAuthUser from "../services/pageWrappers/withAuthUser";
import withAuthUserInfo from "../services/pageWrappers/withAuthUserInfo";
import initFirebase from "../services/auth/initFirebase";
import logout from "../services/auth/logout";

initFirebase();

const Account = (props: any) => {
  const { AuthUserInfo } = props;
  const authUser = AuthUserInfo.AuthUser;

  useEffect(() => {
    console.log(authUser);
    !authUser && Router.push("/");
  }, [authUser]);

  return (
    <>
      {!authUser ? (
        <></>
      ) : (
        <>
          <div>
            <label htmlFor="displayName">display name</label>{" "}
            <Link href="/account/update-name">
              <a>[ update ]</a>
            </Link>
            <p>{authUser.displayName}</p>
          </div>
          <p>
            <button
              onClick={async () => {
                try {
                  await logout();
                  Router.push("/login");
                } catch (e) {
                  console.error(e);
                }
              }}
            >
              [ log out ]
            </button>
          </p>
        </>
      )}
    </>
  );
};

export default withAuthUser(withAuthUserInfo(Account));
