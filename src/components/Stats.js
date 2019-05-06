import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import PropTypes from 'prop-types';

const GET_FULL_LINK_QUERY = gql`
  query GetFullLink($hash: String!) {
    allLinks(filter: { hash: $hash }) {
      id
      url
      stats {
        id
        clicks
      }
    }
  }
`;

const Stats = ({
  hash,
  data: { loading, error, allLinks }
}) => {
  return (
    <div>
      <h1>Your Link</h1>
      <div>
        {
          loading? "Loading..." :
          error || !allLinks[0]? "Error occurred" :
          <div>
            <small>Originally</small>
            <br />
            <small><a href={allLinks[0].url}>{allLinks[0].url}</a></small>
            <h2>-> <a href={'/' + hash} target={"_blank"}>shurl.tk/{hash}</a>{' <-'}</h2>
            <br />
            <a href={'../'}>Shorten another URL</a>
            <br />
            <h4>Total clicks: {allLinks[0] && allLinks[0].stats? allLinks[0].stats.clicks : 0}</h4>
          </div>
        }
      </div>
    </div>
  )

}

Stats.propTypes = {
  hash: PropTypes.string,
  url: PropTypes.string,
};

export default graphql(GET_FULL_LINK_QUERY, {
  options: ({ hash }) => ({ variables: { hash } }),
})(Stats);