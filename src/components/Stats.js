import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import PropTypes from 'prop-types';

import Stat from './Stat'

const GET_FULL_LINK_QUERY = gql`
  query GetFullLink($hash: String!) {
    allLinks(filter: { hash: $hash }) {
      id
      url
      stats {
        id
        ip
        device
        time
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
            <h4>Total clicks: {allLinks[0] && allLinks[0].stats? allLinks[0].stats.length : 0}</h4>
            {allLinks[0] && allLinks[0].stats && allLinks[0].stats.length > 0? 
              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>IP Address</th>
                    {/* <th>Unique IP?</th> */}
                    <th>Device</th>
                  </tr>
                </thead>
                <tbody>
                  {allLinks[0].stats.map(stat => {
                    // stat.ip = '192.167.99.1'
                    // stat.unique = 'false'
                    // stat.device = 'iPhone'
                    return (<Stat stat={stat} key={stat.id} />)
                  })}
                </tbody>
              </table>
            : ''}
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