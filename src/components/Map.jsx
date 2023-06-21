import { useEffect, useState } from "react";

import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
// import { useMapEvents } from "react-leaflet-control";

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
  const { coordinates, setLocation } = props;

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

  const handleDoubleClick = (e) => {
    const { latlng } = e;
    const { lat, lng } = latlng;

    // Hacer la llamada a la API de geocodificación inversa
    // para obtener el nombre de la ciudad más cercana
    const reverseGeocodeUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=10&addressdetails=1`;

    fetch(reverseGeocodeUrl)
      .then((response) => response.json())
      .then((data) => {
        const city =
          data.address.city ||
          data.address.town ||
          data.address.village ||
          data.address.hamlet;

        // Actualizar el estado con el nombre de la ciudad
        // console.log("Ciudad más cercana:", city);
        if (city) {
          setLocation(city);
        }
      })
      .catch((error) => {
        console.error("Error al obtener la ciudad:", error);
      });
  };

  const MapUpdater2 = () => {
    const map = useMap();

    map.on("dblclick", handleDoubleClick);

    return null;
  };

  return (
    // This code creates a map with a marker at the center of the map.
    // It is used to display the location of the user input.
    <div className="container">
      {/* This code renders a map with a marker at the specified latitude and longitude. */}
      <div id="map"></div>
      <MapContainer
        style={{ height: "300px" }}
        center={mapCenter}
        zoom={8}
        scrollWheelZoom={false}
        zoomControl={false}
        doubleClickZoom={false}
        // dragging={false}
        attributionControl={false}
      >
        {/* Quisiera seleccionar en el mapa una ubicación y obtener datos de ese lugar*/}

        {/* This code creates a map layer using the OpenStreetMap tile server. */}
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* Renders a marker at the center of the map. */}
        <Marker position={mapCenter} />

        {/*Necesito actualizar la posición del mapa cuando cambien las coordenadas*/}
        <MapUpdater mapCenter={mapCenter} />
        {/* Manejar el evento de doble clic */}
        <MapUpdater2 />
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
  setLocation: PropTypes.func.isRequired,
};

MapUpdater.propTypes = {
  mapCenter: PropTypes.arrayOf(PropTypes.number).isRequired,
};
