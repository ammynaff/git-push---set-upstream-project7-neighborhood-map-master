import React, {Component} from 'react';
import './App.css';
import Map from './components/Map.js';
import FourSquareAPI from './API';
import SideBar from './components/ListView';

/*contributions for my code, Forrest Walker(youtube walkthrough, 
plus many more, chech contributions github)*/

class App extends Component {
  constructor () {
    super ();
    this.state = {
      venues: [],
      markers: [],
      center: [],
      zoom: 11,
      updateSuperState: obj => {
        this.setState (obj);
      },
    };
  }
  //markers close when a marker is clicked, handleMarkerClick
  closeAllMarkers = () => {
    const markers = this.state.markers.map (marker => {
      marker.isOpen = false;
      return marker;
    });
    this.setState ({markers: Object.assign (this.state.markers, markers)});
  };
  //handleMarkerClick will find correct marker for VenueList name clicked
  handleMarkerClick = marker => {
    this.closeAllMarkers ();
    marker.isOpen = true;
    this.setState ({markers: Object.assign (this.state.markers, marker)});
    const venue = this.state.venues.find (venue => venue.id === marker.id);

    FourSquareAPI.getVenueDetails (marker.id).then (res => {
      const newVenue = Object.assign (venue, res.response.venue);
      this.setState ({venues: Object.assign (this.state.venues, newVenue)});
    });
  };
  handleListItemClick = venue => {
    //handles InfoWindow ListView click
    const marker = this.state.markers.find (marker => marker.id === venue.id);
    this.handleMarkerClick (marker);
  };
  componentDidMount () {
    FourSquareAPI.search ({
      near: 'San Luis Obispo',
      query: 'wineries',
      limit: 8,
    }).then (results => {
      const {venues} = results.response;
      const {center} = results.response.geocode.feature.geometry;
      const markers = venues.map (venue => {
        return {
          lat: venue.location.lat,
          lng: venue.location.lng,
          isOpen: false,
          isVisible: true,
          id: venue.id,
        };
      });
      this.setState ({venues, center, markers});
    });
  }

  render () {
    return (
      <div className="App">
        <div>
          <button aria-label="search" onClick={this.handleMarkerClick} />

        </div>
        <SideBar
          {...this.state}
          handleListItemClick={this.handleListItemClick}
        />
        <Map {...this.state} handleMarkerClick={this.handleMarkerClick} />
      </div>
    );
  }
}

export default App;
