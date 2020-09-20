import React from "react";
import Link from "next/link";
import { useUser } from "../utils/auth/useUser";
import Logo from "../public/FWDconnect.svg";

const Header: React.FC = () => {
  const { user, logout } = useUser();
  const [state, setState] = React.useState({
    isActive: false,
  });

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link href="/">
          <a href="/" className="navbar-item">
            <img alt="FWD logo" src={Logo} />
          </a>
        </Link>
        <button
          className="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          onClick={() => setState({ isActive: !state.isActive })}
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>
      </div>

      <div className={state.isActive ? "navbar-menu is-active" : "navbar-menu"}>
        <div className="navbar-end">
          {!user ? (
            <div className="navbar-item">
              <div className="field is-grouped">
                <p className="control">
                  <Link href="/signup">
                    <a className="menu-item navbar-item button is-link">
                      Sign Up
                    </a>
                  </Link>
                </p>
                <p className="control">
                  <Link href="/login">
                    <a className="menu-item navbar-item button is-primary">
                      Login
                    </a>
                  </Link>
                </p>
              </div>
            </div>
          ) : (
            <div className="navbar-item">
              <div className="field is-grouped">
                <p className="control">
                  <Link href={`/${user.id}`}>
                    <a className="button is-link">Profile</a>
                  </Link>
                </p>
                <p className="control">
                  <button
                    onClick={async () => {
                      try {
                        await logout();
                      } catch (e) {
                        console.error(e);
                      }
                    }}
                    className="button is-link"
                  >
                    Log Out
                  </button>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
