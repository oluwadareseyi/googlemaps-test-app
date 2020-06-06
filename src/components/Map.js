import React, { useState, useCallback } from "react";
import { useLoadScript, GoogleMap, Marker } from "@react-google-maps/api";
import mapStyles from "./mapStyles";
import "./Map.scss";

const libraries = ["places"];
const mapContainerStyle = {
  width: "100vw",
  height: "100vh",
};
const center = {
  lat: 7.77038,
  lng: 6.10853,
};

const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};
const Map = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const [markers, setMarkers] = useState([]);

  const onMapClick = useCallback((e) => {
    setMarkers((current) => [
      ...current,
      {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
        time: new Date(),
      },
    ]);
  }, []);

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Maps";

  return (
    <div style={{ position: "relative" }}>
      <h1>
        Bears{" "}
        <span role="img" aria-label="tent">
          ⛺
        </span>
      </h1>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={8}
        center={center}
        options={options}
        onClick={onMapClick}
      >
        {markers.map((marker) => (
          <Marker
            key={marker.time.toISOString()}
            position={{ lat: marker.lat, lng: marker.lng }}
            icon={{
              url: "/bear.svg",
              scaledSize: new window.google.maps.Size(30, 30),
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(15, 15),
            }}
          />
        ))}
      </GoogleMap>
    </div>
  );
};

export default Map;
