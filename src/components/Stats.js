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
        os
        location
        device
        browser
        time
      }
    }
  }
`;

const Stats = ({
  hash,
  data: { loading, error, allLinks }
}) => {

  const stats = allLinks? allLinks[0].stats : null;
  const uniqueCheck = []

  let ipArray = stats ? stats.map(stat => {
    uniqueCheck.push(stat.ip)
    
    const count = uniqueCheck.reduce((n, val) => {
      return n + (val === stat.ip)
    }, 0)
    
    stat.unique = count === 1? true : false
    return stat
  }) : null

  ipArray = ipArray? ipArray.reverse() : ''

  let uniqueSet = new Set(uniqueCheck);
  uniqueSet = [...uniqueSet]


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
            <h4>Total clicks: {allLinks[0] && allLinks[0].stats? allLinks[0].stats.length : 0} ({uniqueSet? uniqueSet.length : 0} unique)</h4>
            {allLinks[0] && allLinks[0].stats && allLinks[0].stats.length > 0? 
              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Unique?</th>
                    <th>IP Address</th>
                    <th>Device</th>
                    <th>OS</th>
                    <th>Browser</th>
                    <th>Location</th>
                  </tr>
                </thead>
                <tbody>
                  {ipArray.map(stat => {
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