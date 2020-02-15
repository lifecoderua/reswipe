import React from 'react';
import logo from './logo.svg';
import './App.css';
import Entry from './components/entry';
import Reddit from './models/reddit';

function App() {
  const entries = Reddit.getFeed(['art'])
    .then(entries => console.log(entries));


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Entry/>
      </header>
    </div>
  );
}

export default App;
