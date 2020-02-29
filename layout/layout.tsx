import React from 'react';
import './styles.scss';
import Head from 'next/head';
import Header from '../components/Header';
import { renderMetaTags } from 'react-datocms';

const faviconMetaTags = [
  {
    attributes: {
      sizes: '16x16',
      type: 'image/png',
      rel: 'icon',
      href:
        'https://www.datocms-assets.com/11579/1556942732-default.png?h=16&w=16'
    },
    content: null,
    tag: 'link'
  },
  {
    attributes: {
      sizes: '32x32',
      type: 'image/png',
      rel: 'icon',
      href:
        'https://www.datocms-assets.com/11579/1556942732-default.png?h=32&w=32'
    },
    content: null,
    tag: 'link'
  },
  {
    attributes: {
      sizes: '96x96',
      type: 'image/png',
      rel: 'icon',
      href:
        'https://www.datocms-assets.com/11579/1556942732-default.png?h=96&w=96'
    },
    content: null,
    tag: 'link'
  },
  {
    attributes: {
      sizes: '192x192',
      type: 'image/png',
      rel: 'icon',
      href:
        'https://www.datocms-assets.com/11579/1556942732-default.png?h=192&w=192'
    },
    content: null,
    tag: 'link'
  }
];

const Layout: React.FC = props => {
  return (
    <div>
      <Head>
        <>
          <title>New Hope Christian Chapel</title>
          <meta
            name="description"
            content="New Hope Christian Chapel is an independent, inter-denominational, Bible based church about 30min south of Boston, MA."
          />
          <link
            rel="shortcut icon"
            type="image/x-icon"
            href="https://www.datocms-assets.com/11579/1556942732-default.png"
          />
          {renderMetaTags(faviconMetaTags)}
        </>
      </Head>
      <Header />
      {props.children}
    </div>
  );
};

export default Layout;