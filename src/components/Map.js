import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

/*Used documentation step 4 for installing map*/

const MyMapComponent = withScriptjs
withGoogleMap((props) =>
  <GoogleMap 
  defaultZoom={13} 
  zoom={props.zoom} 
  defaultCenter={{ lat: 35.5625201, lng: -121.097076}} 
  center={props.center}
  >
    {props.markers && 
    props.markers.filter(marker => marker.isVisible)
    .map((marker, idx) =>  (
        <Marker key={idx} position={{ lat: marker.lat, lng: marker.lng }} />
    ))}
  </GoogleMap>
)

export default class Map extends Component {
    render() {
        return (
        <MyMapComponent {...this.props}
  googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyAZza9rMmbxlj0Nod_Dh5ofewPaZOLTcW4"
  loadingElement={<div style={{ height: `100%` }} />}
  containerElement={<div style={{ height: `400px` }} />}
  mapElement={<div style={{ height: `100%` }} />}
/>
        );
    }
}