import { useEffect, useState } from "react";

import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";

import "leaflet/dist/leaflet.css";

import PropTypes from "prop-types";

// This component is a wrapper around Leaflet's `Map` component
// that automatically centers the map on a given location.
// It also adds a marker to the map.

// Necesito crear un componente que actualice el mapa con un MapUpdater
const MapUpdater = (props) => {
  const { mapCenter } = props;
  const map = useMap();

  useEffect(() => {
    // El mapa debe posicionarse en el centro de las coordenadas y colocar un marcador en el centro de las coordenadas
    const marker = window.L.marker(mapCenter).addTo(map);
    marker.setLatLng(mapCenter);
    map.setView(mapCenter);

    return () => {
      map.removeLayer(marker);
    };
  }, [mapCenter, map]);

  return null;
};

const Map = (props) => {
  const { coordinates } = props;

  // Obtener la ubicación del usuario en latitud y longitud
  const [mapCenter, setMapCenter] = useState([
    coordinates.lat,
    coordinates.lon,
  ]);

  useEffect(() => {
    if (coordinates.lat && coordinates.lon) {
      setMapCenter([coordinates.lat, coordinates.lon]);
    }
  }, [coordinates]);

  return (
    // This code creates a map with a marker at the center of the map.
    // It is used to display the location of the user input.
    <div className="container">
      {/* This code renders a map with a marker at the specified latitude and longitude. */}
      <div id="map"></div>
      <MapContainer
        style={{ height: "300px" }}
        center={mapCenter}
        zoom={10}
        scrollWheelZoom={false}
        zoomControl={false}
        doubleClickZoom={false}
        dragging={false}
        attributionControl={false}
      >
        {/* This code creates a map layer using the OpenStreetMap tile server. */}
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* Renders a marker at the center of the map. */}
        <Marker position={mapCenter} />

        {/*Necesito actualizar la posición del mapa cuando cambien las coordenadas*/}
        <MapUpdater mapCenter={mapCenter} />
      </MapContainer>
    </div>
  );
};

export default Map;

// Prop types validation
Map.propTypes = {
  coordinates: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lon: PropTypes.number.isRequired,
  }).isRequired,
};

MapUpdater.propTypes = {
  mapCenter: PropTypes.arrayOf(PropTypes.number).isRequired,
};
