import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import App from './App';
import ShortLinkRedirect from './components/ShortLinkRedirect'
import Stats from './components/Stats'
import LinkList from './components/LinkList';

const AppRouter = () => (
  <BrowserRouter>
    <Route exact path="/" component={App} />
    <Route exact path="/full/list" component={LinkList} />
    <Route exact path="/:hash/stats" render={props => (
      <Stats hash={props.match.params.hash} />
    )} />
    <Route exact path="/:hash" render={props => (
      <ShortLinkRedirect hash={props.match.params.hash} />
    )} />
  </BrowserRouter>
);

export default AppRouter;