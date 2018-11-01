import React, { Component } from 'react';

import './App.css';
import DisplayMap from './components/DisplayMap.js';

class App extends Component {
  render() {
    return (
      <div className="App">
       <DisplayMap/>
      </div>
    );
  }
}

export default App;
