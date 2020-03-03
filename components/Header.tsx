import React from "react";
import Link from "next/link";
import { logout } from "../services/auth";

interface HeaderProps {
  isLoggedIn?: boolean;
}

const Header: React.FC<HeaderProps> = props => {
  const { isLoggedIn } = props;
  const [state, setState] = React.useState({
    isActive: false
  });

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link href="/">
          <a href="/" className="navbar-item">
            {
              //<Logo height="44" alt="New Hope Christian Chapel" />
            }
            <span style={{ visibility: "hidden" }}>Home</span>
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
          <Link href="/">
            <a className="menu-item navbar-item" href="/">
              HOME
            </a>
          </Link>
          <Link href="/about">
            <a href="/about" className="menu-item navbar-item">
              ABOUT
            </a>
          </Link>
          {!isLoggedIn ? (
            <div className="navbar-item">
              <div className="field is-grouped">
                <p className="control">
                  <Link href="/signup">
                    <a className="menu-item navbar-item button is-primary">
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
                  <Link href="/profile">
                    <a className="button is-primary">Profile</a>
                  </Link>
                </p>
                <p className="control">
                  <button className="button is-primary" onClick={logout}>
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
