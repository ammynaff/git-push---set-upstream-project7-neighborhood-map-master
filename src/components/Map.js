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
      defaultZoom={8}
      zoom={props.zoom}
      defaultCenter={{lat: 35.2828, lng: -120.6596}}
    >
      {/*Added markers to map, plus animation*/}
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
                    ? google.maps.Animation.BOUNCE
                    : google.maps.Animation.DROP
                }
              >
                {marker.isOpen &&
                  venueInfo.bestPhoto &&
                  <InfoWindow>
                    <React.Fragment>
                      <div>
                        <img
                          src={`${venueInfo.bestPhoto.prefix}150x150${venueInfo.bestPhoto.suffix}`}
                          alt={venueInfo.name + 'venue picture'}
                        />
                        <p>{venueInfo.name}</p>
                      </div>
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
  render () {
    return (
      <MyMapComponent
        {...this.props}
        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyAeqUBx9qm3mLGGjVh56CC9FItEbjZWLyw"
        loadingElement={<div style={{height: '100%'}} />}
        containerElement={<div style={{height: '100%', width: '75%'}} />}
        mapElement={<div style={{height: '100%'}} />}
      />
    );
  }
}
