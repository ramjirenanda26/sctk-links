import React, { useState } from 'react';
import Map, { NavigationControl, ScaleControl, GeolocateControl, Marker, Popup } from 'react-map-gl';
const token = 'pk.eyJ1IjoicmVuYW5kYTI2IiwiYSI6ImNsaHgxMTkzdzBsZWkzbW4wMnZ5cDd0OTgifQ.ubLqseZPFD3Ym8ENEzvbCw';

const MapComponent = () => {
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [viewport, setViewPort] = useState({
    longitude: 106.33834462741254,
    latitude: -6.199113200732568,
    zoom: 11,
  });

  const handleMapClick = () => {
    setSelectedMarker(null);
  };

  return (
    <Map initialViewState={viewport} mapboxAccessToken={token} mapStyle="mapbox://styles/renanda26/cli49zhib02nc01qyaka1dq8w" width="100%" height="100%" onViewportChange={setViewPort} onMouseDown={handleMapClick}>
      <GeolocateControl position="bottom-right" />
      <NavigationControl position="bottom-right" />
      <ScaleControl />
    </Map>
  );
};

export default MapComponent;
