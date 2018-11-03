import React, { Component } from 'react';
import { 
    withScriptjs, 
    withGoogleMap, 
    GoogleMap, 
    Marker,
    InfoWindow
}   from "react-google-maps";

/*Used documentation step 4 for installing map*/

const MyMapComponent = withScriptjs(
withGoogleMap(props => (
  <GoogleMap 
  defaultZoom={15} 
  zoom={props.zoom}
  defaultCenter={{ lat: 35.2828, lng: -120.6596}}
   
>

    {props.markers &&
    props.markers
    .filter(marker => marker.isVisible)
    .map((marker, index) => (
    <Marker 
        key={index}
        position={{ lat: marker.lat, lng: marker.lng }} 
        onClick={() => props.handleMarkerClick(marker)}
        >
        {marker.isOpen && (
            <InfoWindow>
                <p>Hello</p>
            </InfoWindow>
        )} 
            </Marker>   
    ))}

  </GoogleMap>
))
);

export default class Map extends Component {
    render() {
        return (
        <MyMapComponent {...this.props}
  googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyAZza9rMmbxlj0Nod_Dh5ofewPaZOLTcW4"
  loadingElement={<div style={{ height: `100%` }} />}
  containerElement={<div style={{ height: `100%`, width: `100%` }} />}
  mapElement={<div style={{ height: `100%` }} />}
/>
        );
    }
}