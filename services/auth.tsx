import { useEffect } from "react";
import Router from "next/router";
import { NextComponentType } from "next";

export const login = ({ email }: { email: string }) => {
  Router.push("/profile");
};

export const logout = async () => {
  await fetch("/api/logout");

  window.localStorage.setItem("logout", Date.now().toString());

  Router.push("/login");
};

export const withAuthSync = (Component: NextComponentType) => {
  const Wrapper: NextComponentType = props => {
    const syncLogout = (event: StorageEvent) => {
      if (event.key === "logout") {
        console.log("logged out from storage!");
        Router.push("/login");
      }
    };

    useEffect(() => {
      window.addEventListener("storage", syncLogout);

      return () => {
        window.removeEventListener("storage", syncLogout);
        window.localStorage.removeItem("logout");
      };
    }, []);

    return <Component {...props} />;
  };

  if (Component.getInitialProps) {
    Wrapper.getInitialProps = Component.getInitialProps;
  }

  return Wrapper;
};
