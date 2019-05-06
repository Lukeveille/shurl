import React from 'react';
import CreateShortLink from './components/CreateShortLink';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <div>
        <div>
          <h1>Shorten a URL</h1>
          <CreateShortLink />
        </div>
      </div>
    );
  }
}

export default App;
