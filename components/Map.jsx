import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet-draw/dist/leaflet.draw.css";
import "leaflet/dist/leaflet.css";

const Map = () => {
  return (
    <div>
      <MapContainer
        center={[15.1394, 76.9214]}
        zoom={7}
        style={{
          height: "80vh",
          width: "80vw",
          borderRadius: "10px",
          zIndex: -1,
        }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution={
            '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          }
          url={"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}
        />
      </MapContainer>
    </div>
  );
};

export default Map;
