import React from 'react';
import LinkList from './components/LinkList';
import CreateShortLink from './components/CreateShortLink';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <div>
        <div>
          <h2>All links</h2>
          <LinkList />
        </div>
        <div>
          <h2>Create a short link</h2>
          <CreateShortLink />
        </div>
      </div>
    );
  }
}

export default App;
