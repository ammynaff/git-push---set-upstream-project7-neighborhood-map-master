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
      zoom: 13
    };
  }
  closeAllMarkers = () => {
    const markers = this.state.markers.map(marker => {
      marker.isOpen = false;
      return marker;
    });
    this.setState({ markers: Object.assign(this.state.markers, markers) });
  };

  handleMarkerClick = marker => {
    this.closeAllMarkers();
    marker.isOpen = true;
    this.setState({markers: Object.assign(this.state.markers, marker) });
    const venue = this.state.venues.find(venue => venue.id === marker.id);

    FourSquareAPI.getVenueDetails(marker.id).then(res => {
      const newVenue = Object.assign(venue, res.response.venue);
      this.setState({ venues: Object.assign(this.state.venues,newVenue) });

      console.log(newVenue);
    });
  };

  componentDidMount(){
    FourSquareAPI.search({
      near: "San Luis Obispo", 
      query: "coffee",
      limit: 10 
    }).then(results => {
      const { venues } = results.response;
      const { center } = results.response.geocode.feature.geometry;
      const markers = venues.map(venue => { 
        return {
          lat: venue.location.lat,
          lng: venue.location.lng, 
          isOpen: false,
          isVisible: true,
          id: venue.id
        };
      });
      this.setState({ venues, center, markers });
      console.log(results);
  });
}
  render() {
    return (
      <div className="App">
       <Map {...this.state} handleMarkerClick={this.handleMarkerClick}/>
      </div>
    );
  }
}

export default App;
