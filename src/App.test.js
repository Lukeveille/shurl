import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client-preset';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

const client = new ApolloClient({
  link: new HttpLink('https://api.graph.cool/simple/v1/cjv8v7z280dhl0110c9zxm7gw'),
  cache: new InMemoryCache(),
});

const withApolloProvider = Comp => (
  <ApolloProvider client={client}>{Comp}</ApolloProvider>
)

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(withApolloProvider(<App />), div);
  ReactDOM.unmountComponentAtNode(div);
});
