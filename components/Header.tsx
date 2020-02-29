import React from 'react';
import Link from 'next/link';

const Header = () => {
  const [state, setState] = React.useState({
    isActive: false
  });

  return (
    <nav
      className="navbar is-fixed-top"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <Link href="/">
          <a href="/" className="navbar-item">
            {
              //<Logo height="44" alt="New Hope Christian Chapel" />
            }
            <span style={{ visibility: 'hidden' }}>Home</span>
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

      <div className={state.isActive ? 'navbar-menu is-active' : 'navbar-menu'}>
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
          <Link href="/ministries">
            <a className="menu-item navbar-item">MINISTRIES</a>
          </Link>
          <Link href="/media">
            <a className="menu-item navbar-item">MEDIA</a>
          </Link>
          <Link href="/serve-home">
            <a className="menu-item navbar-item">SERVE HOME</a>
          </Link>
          <Link href="/give">
            <a className="menu-item navbar-item">GIVE</a>
          </Link>
          <Link href="/contact">
            <a className="menu-item navbar-item">CONTACT</a>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
