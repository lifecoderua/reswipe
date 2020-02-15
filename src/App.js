import React from 'react';
import './App.css';
import List from './components/list';

// TODO: reddit post link
// TODO: "download original" button
// TODO: dimensions display
// TODO: select optimal dimensions from the preview list
// TODO: video control
// TODO: autoplay mode
// TODO: select communities to browse; pre-defined list; store preferences (localStorage)
// TODO: preload next batch of slides
// TODO: catch keyboard control on load
// TODO: lazy load images

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <List/>
      </header>
    </div>
  );
}

export default App;
