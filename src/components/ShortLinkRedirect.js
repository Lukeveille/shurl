import React from 'react';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import PropTypes from 'prop-types';
import * as deviceCheck from 'react-device-detect';

const GET_FULL_LINK_QUERY = gql`
  query GetFullLink($hash: String!) {
    allLinks(filter: { hash: $hash }) {
      id
      url
      stats {
        id
      }
    }
  }
`;

const CREATE_LINK_STATS_MUTATION = gql`
  mutation CreateLinkStats($linkId: ID!, $time: Float!) {
    createLinkStats(linkId: $linkId, time: $time) {
      id
    }
  }
`;

const ShortLinkRedirect = ({
  createLinkStats,
  hash,
  data: { loading, error, allLinks }
}) => {
  const model = deviceCheck.isMobileOnly? 'Mobile' : deviceCheck.isTablet? 'Tablet' : deviceCheck.isWearable? 'Wearable Device' : deviceCheck.isConsole? 'Console' : deviceCheck.isSmartTV? 'Smart TV' : 'Desktop';
  const platform = model === 'Desktop'? 'Desktop' : model + deviceCheck.isAndroid? 'Android' : deviceCheck.isIOS? 'iOS' : deviceCheck.isWinPhone? 'Windows Phone' : model
  const device = deviceCheck.isMobile? platform + ' ' + deviceCheck.mobileVendor + ' ' + deviceCheck.mobileModel : platform
  const browserName = deviceCheck.browserName;
  const os = deviceCheck.osName + ' ' + deviceCheck.osVersion;

  fetch('http://ip-api.com/json/')
  .then(res => res.json())
  .then(res => res.query);

  if (error) {
    return <div>Error occurred</div>;
  }
  
  if (loading) {
    return <div>Loading...</div>;
  }

  if (!allLinks || allLinks.length !== 1) {
    return <div>No redirect found for '{hash}'</div>;
  }

  const linkInfo = allLinks[0];
  const time = Date.now();

  createLinkStats({
    variables: {
      linkId: linkInfo.id,
      time,
    },
  });

  window.location = allLinks[0].url;
  return null;
};

ShortLinkRedirect.propTypes = {
  hash: PropTypes.string,
};

export default compose(
  graphql(CREATE_LINK_STATS_MUTATION, { name: 'createLinkStats' }),
  graphql(GET_FULL_LINK_QUERY, {
    options: ({ hash }) => ({ variables: { hash } }),
  }),
)(ShortLinkRedirect);