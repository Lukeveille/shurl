import React, { Component } from 'react';

import gql from 'graphql-tag';
import { graphql, withApollo } from 'react-apollo';

const CREATE_SHORT_LINK_MUTATION = gql`
  mutation CreateLinkMutation($url: String!, $hash: String!) {
    createLink(
      url: $url,
      hash: $hash) {
      id
    }
  }
`;

const GET_LINK_COUNT_QUERY = gql`
  query GetLinkCountQuery {
    links: _allLinksMeta {
      count
    }
  }
`;

const createHash = itemCount => {
  let hashDigits = [];  
  let dividend = itemCount + 1;
  let remainder = 0;

  while (dividend > 0) {
    remainder = dividend % 62;
    dividend = Math.floor(dividend / 62);
    hashDigits.unshift(remainder);
  }

  const alphabetArray = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789`.split('');
  
  let hashString = '';  
  for (let i = 0; i < hashDigits.length; i++) {
    hashString += alphabetArray[hashDigits[i]];
  }

  return hashString;
}

class CreateShortLink extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
      hash: '',
    };
  };

  createShortLink = async () => {
    const linkCountQuery = await this.props.client.query({
      query: GET_LINK_COUNT_QUERY,
      fetchPolicy: 'network-only',
    });

    const linkCount = linkCountQuery.data.links.count;
    const hash = createHash(linkCount+1);
  
    const { url } = this.state;
    await this.props.createShortLinkMutation({
      variables: {
        url,
        hash,
      },
    });
    this.setState({
      url: '',
      hash: hash,
    });
    window.location.href = '/' + this.state.hash + '/stats'
  };

  render() {
    return (
      <div>
        <input
          id="url"
          type="text"
          value={this.state.url}
          placeholder="Long URL"
          onChange={e =>
            this.setState({ url: e.target.value })
          }
        />
        <button onClick={() => {
          this.createShortLink()
        }}>Create</button>
      </div>
    )
  }
};

export default graphql(CREATE_SHORT_LINK_MUTATION, {
  name: 'createShortLinkMutation'
})(withApollo(CreateShortLink));