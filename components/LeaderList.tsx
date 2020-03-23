import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { Image } from 'react-datocms';

const GET_LEADERS = gql`
  query allLeaders {
    allLeaders(orderBy: position_DESC) {
      firstName
      lastName
      title
      emailAddress
      photo {
        responsiveImage(imgixParams: { w: "300" }) {
          srcSet
          webpSrcSet
          sizes
          src
          width
          height
          aspectRatio
          alt
          title
          bgColor
          base64
        }
      }
    }
  }
`;

export default function LeaderList() {
  const { loading, error, data, fetchMore } = useQuery(GET_LEADERS, {
    notifyOnNetworkStatusChange: true
  });
  if (data?.allLeaders) {
    return (
      <div className="container content">
        <h1>Leaders</h1>
        {data.allLeaders.map((leader: any) => (
          <div key={leader.firstName}>
            <Image data={leader.photo.responsiveImage} />
            <h2>{leader.firstName + ' ' + leader.lastName}</h2>
          </div>
        ))}
      </div>
    );
  }
  return <div>Loading...</div>;
}
