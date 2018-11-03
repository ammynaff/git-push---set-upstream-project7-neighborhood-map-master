import React, { Component } from 'react';

import './App.css';
import Map from './components/Map.js';
import FourSquareAPI from "./API"

class App extends Component {
  constructor() {
    super()
    this.state ={
      venues: [],
      markers: [],
      center: [],
      zoom: 11
    };
  }

  componentDidMount(){
    FourSquareAPI.search({
      near: "San Luis Obispo", 
      query: "coffee",
      limit: 5 
    }).then(results => {
      const { venues } = results.response;
      const { center } = results.response.geocode.feature.geometry;
      const markers = venues.map(venue => { 
        return {
          lat: venue.location.lat,
          lng: venue.location.lng, 
          isOpen: false,
          inVisible: true
          
        };
      });
      this.setState({ venues, center, markers });
      console.log(results);
  });
}
  render() {
    return (
      <div className="App">
       <Map {...this.state} />
      </div>
    );
  }
}

export default App;
