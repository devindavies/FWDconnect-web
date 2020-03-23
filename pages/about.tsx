import React from 'react';
import Layout from '../layout/layout';
import { NextPage } from 'next';
import withDato from '../data/datoCms';

const AboutPage: NextPage = () => (
  <Layout>
    <section className="section has-background-light">
      <div className="container is-fluid">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
          </div>
        </div>
        <div className="tile is-ancestor">
          <div className="tile is-parent">
          </div>
        </div>
      </div>
    </section>

    <div className="section">
      <div className="container is-fluid">
        <div className="content">
          <h1 className="has-text-centered has-text-primary">Our Leadership</h1>
        </div>
        <div className="columns top-padded is-multiline">
        </div>
      </div>
    </div>
  </Layout>
);

export default withDato(AboutPage);