import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client-preset';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

const client = new ApolloClient({
  link: new HttpLink('https://api.graph.cool/simple/v1/[SERVICE_ID]'),
  cache: new InMemoryCache(),
});

const withApolloProvider = Comp => (
  <ApolloProvider client={client}>{Comp}</ApolloProvider>
)

ReactDOM.render(
  withApolloProvider(<App />),
  document.getElementById('root')
);

serviceWorker.unregister();
