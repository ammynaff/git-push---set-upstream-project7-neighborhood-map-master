import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

/*followed Forest and used documentation step 4 for installing map*/

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={13}
    defaultCenter={{ lat: 35.5625201, lng: -121.097076 }}
  >
    {props.isMarkerShown && <Marker position={{ lat: 35.5625201, lng: -121.097076 }} />}
  </GoogleMap>
))

export default class DisplayMay extends Component {
    render() {
        return (
        <MyMapComponent
  isMarkerShown
  googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyAZza9rMmbxlj0Nod_Dh5ofewPaZOLTcW4"
  loadingElement={<div style={{ height: `100%` }} />}
  containerElement={<div style={{ height: `400px` }} />}
  mapElement={<div style={{ height: `100%` }} />}
/>
        );
    }
}