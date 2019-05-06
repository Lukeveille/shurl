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
          error? "Error occurred" :
          <div>
            <a href={'/' + hash} target={"_blank"}>http://shurl.tk/{hash}</a> - {allLinks[0].stats? allLinks[0].stats.clicks : 0}
          </div>
        }
        <div>
          <a href={'../'}>Shorten another URL</a>
        </div>
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