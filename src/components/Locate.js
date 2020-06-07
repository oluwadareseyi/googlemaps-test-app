import React from "react";
import "./Locate.scss";

const Locate = ({ panTo }) => {
  return (
    <button
      className="locate"
      onClick={() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            panTo({
              lat: latitude,
              lng: longitude,
            });
          },
          () => null
        );
      }}
    >
      <img src="compass.svg" alt="compass - locate me" />
    </button>
  );
};

export default Locate;
