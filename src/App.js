import React, { Component } from 'react';

import './App.css';
import DisplayMap from './components/DisplayMap.js';
import SquareAPI from "./API"

class App extends Component {

  componentDidMount(){
    SquareAPI.search({
      query: "winery",
      intent:"browse",
      radius:"50000",
      near: "Cambria", 
      limit: 10  
    }).then(results => console.log(results));
  }
  render() {
    return (
      <div className="App">
       <DisplayMap/>
      </div>
    );
  }
}

export default App;
