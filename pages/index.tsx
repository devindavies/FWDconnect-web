import React from 'react';
import { gql } from 'apollo-boost';
import { renderMetaTags } from 'react-datocms';
import { useQuery } from '@apollo/react-hooks';
import { NextPage } from 'next';

import Layout from '../layout/layout';
import LeaderList from '../components/LeaderList';
import withDato from '../data/datoCms';

const Blog: NextPage = () => {
  return (
    <Layout>
      <h1 className="title">FWDchat</h1>
      {
        //<LeaderList />
      }
    </Layout>
  );
};

export default withDato(Blog);
