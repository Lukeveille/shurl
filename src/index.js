import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { ApolloProvider } from 'react-apollo';
import { split, ApolloClient } from 'apollo-client-preset';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';

const wsLink = new WebSocketLink({
  uri: `wss://subscriptions.us-west-2.graph.cool/v1/cjv8v7z280dhl0110c9zxm7gw`,
  options: {
    reconnect: true
  }
});

const httpLink = new HttpLink({ uri: 'https://api.graph.cool/simple/v1/cjv8v7z280dhl0110c9zxm7gw' });

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLink,
);

const client = new ApolloClient({
  link,
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
