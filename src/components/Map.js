import React, { Component } from 'react';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,
} from 'react-google-maps';

/* Used documentation step 4 for installing map */

const MyMapComponent = withScriptjs(
  withGoogleMap(props => (
    <GoogleMap
      defaultZoom={15}
      zoom={props.zoom}
      defaultCenter={{ lat: 35.2828, lng: -120.6596 }}
    >

      {props.markers
        && props.markers
          .filter(marker => marker.isVisible)
          .map((marker, index) => {
            const venueInfo = props.venues.find(
              venue => venue.id === marker.id,
            );
            return (
              <Marker
                key={index}
                position={{ lat: marker.lat, lng: marker.lng }}
                onClick={() => props.handleMarkerClick(marker)}
              >
                {marker.isOpen
                  && venueInfo.bestPhoto
                  && <InfoWindow>
                    <React.Fragment>
                      <img
                        src={`${venueInfo.bestPhoto.prefix}200x200${venueInfo.bestPhoto.suffix}`}
                        alt="Venue"
                      />
                      <p>{venueInfo.name}</p>
                    </React.Fragment>
                  </InfoWindow>}
              </Marker>
            );
          })}

    </GoogleMap>
  )),
);

export default class Map extends Component {
  render() {
    return (
      <MyMapComponent
        {...this.props}
        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyAZza9rMmbxlj0Nod_Dh5ofewPaZOLTcW4"
        loadingElement={<div style={{ height: '100%' }} />}
        containerElement={<div style={{ height: '100%', width: '100%' }} />}
        mapElement={<div style={{ height: '100%' }} />}
      />
    );
  }
}
