/*global google*/ //corrects error google not defined
import React, {Component} from 'react';

import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,
} from 'react-google-maps';

/* Used documentation step 4 for installing map, 
source: https://tomchentw.github.io/react-google-maps/#installation */

const MyMapComponent = withScriptjs (
  withGoogleMap (props => (
    <GoogleMap
      role="application"
      aria-label="map"
      defaultZoom={8}
      zoom={props.zoom}
      defaultCenter={{lat: 35.2828, lng: -120.6596}}
    >
      {/*render markers to map and filter*/}
      {props.markers &&
        props.markers
          .filter (marker => marker.isVisible)
          .map ((marker, index, Array) => {
            const venueInfo = props.venues.find (
              venue => venue.id === marker.id
            );
            return (
              <Marker
                key={index}
                position={{lat: marker.lat, lng: marker.lng}}
                onClick={() => props.handleMarkerClick (marker)}
                animation={
                  Array.length === 1
                    ? google.maps.Animation.BOUNCE //animated markers
                    : google.maps.Animation.DROP
                }
              >
                {/*adding info windows*/}
                {marker.isOpen &&
                  venueInfo.bestPhoto &&
                  <InfoWindow>
                    <React.Fragment>
                      <img
                        src={`${venueInfo.bestPhoto.prefix}150x150${venueInfo.bestPhoto.suffix}`}
                        alt="Venue{venueInfo.name}"
                      />
                      <p>{venueInfo.name}</p>

                    </React.Fragment>
                  </InfoWindow>}
              </Marker>
            );
          })}

    </GoogleMap>
  ))
);

export default class Map extends Component {
  componentDidMount () {
    window.gm_authFailure = () => {
      alert ('Error: Failed to get Google map.');
      console.log ('Error: Failed to get Google map.');
    };
  }

  /* Used documentation step 4 for installing map, 
source: https://tomchentw.github.io/react-google-maps/#installation */
  render () {
    return (
      <MyMapComponent
        {...this.props}
        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyDiAyK25x1IFUIF8Ro2oylvsTuj8wCwfRI"
        loadingElement={<div style={{height: '100%'}} />}
        containerElement={<div style={{height: '100%', width: '75%'}} />}
        mapElement={<div style={{height: '100%'}} />}
      />
    );
  }
}
