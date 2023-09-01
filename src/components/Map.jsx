import React, { useRef, useState } from "react";
import { MapContainer, TileLayer, FeatureGroup, GeoJSON } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import "leaflet-draw/dist/leaflet.draw.css";
import "leaflet/dist/leaflet.css";
import karnatakaMapData from "../data/karnataka.json";
import { polygon, booleanOverlap } from "@turf/turf";
import DeleteIcon from "../icons/DeleteIcon";
import HelpIcon from "../icons/HelpIcon";
import HelpModal from "./HelpModal";
import { Tooltip } from "@chakra-ui/react";

const Map = () => {
  const [intersectingGeoData, setIntersectingGeoData] = useState();
  const mapRef = useRef();
  const fgRef = useRef();
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);

  const handleShapeCreated = (e) => {
    const { layer } = e;

    const layerJSON = layer.toGeoJSON();

    const filteredFeatures = karnatakaMapData.features.filter((feature) => {
      const featurePolygon = polygon(feature.geometry.coordinates);
      return booleanOverlap(layerJSON, featurePolygon);
    });

    const dataToShow = {
      type: "FeatureCollection",
      features: filteredFeatures,
    };

    setIntersectingGeoData(dataToShow);
  };

  const handleShapeDeleted = (e) => {
    setIntersectingGeoData("");
  };

  function clearFeatureGroup() {
    const fg = fgRef.current;
    fg.clearLayers();
    setIntersectingGeoData("");
  }

  return (
    <div className="flex items-center justify-center mx-auto h-screen w-screen">
      <HelpModal isOpen={isHelpModalOpen} setIsOpen={setIsHelpModalOpen} />
      <MapContainer
        center={[15.1394, 76.9214]}
        zoom={7}
        style={{
          height: "95vh",
          width: "95vw",
          margin: "auto",
          borderRadius: "8px",
          // zIndex: -1,
        }}
        scrollWheelZoom={true}
        ref={mapRef}
      >
        <TileLayer
          attribution={
            '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          }
          url={"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}
        />
        <FeatureGroup ref={fgRef}>
          <EditControl
            onCreated={handleShapeCreated}
            onDeleted={handleShapeDeleted}
            onDeleteStart={handleShapeDeleted}
            draw={{
              circlemarker: false,
              marker: false,
              rectangle: false,
              polyline: false,
              circle: false,
              polygon: intersectingGeoData
                ? false
                : { allowIntersection: false },
            }}
            edit={{ remove: intersectingGeoData, edit: false }}
          />
          {intersectingGeoData && (
            <button
              onClick={clearFeatureGroup}
              className="absolute float-left ml-[10px] mt-[84px] z-[1000] h-[35px] w-[35px] bg-white border-[2px] border-[#ccc] rounded-[4px] flex items-center justify-center"
            >
              <DeleteIcon />
            </button>
          )}
          {
            <Tooltip
              label="Click here to know about AOI or click on polygon icon to draw polygon"
              placement="left"
              hasArrow
              defaultIsOpen
            >
              <button
                onClick={() => setIsHelpModalOpen(true)}
                className="absolute float-left ml-[10px] mt-[124px] z-[1000] h-[35px] w-[35px] bg-[white] border-[2px] border-[#ccc] rounded-full flex items-center justify-center"
              >
                <HelpIcon />
              </button>
            </Tooltip>
          }
        </FeatureGroup>
        {intersectingGeoData && (
          <GeoJSON
            data={intersectingGeoData}
            style={() => ({ color: "red", outline: "none" })}
            onEachFeature={(feature, leafletLayer) => {
              leafletLayer.addEventListener("mouseover", () => {
                leafletLayer
                  .bindTooltip(`<b>Area of Interest (AOI)</b>`, {
                    className: "outline-none focus:outline-none",
                  })
                  .openTooltip();
              });
            }}
          />
        )}
      </MapContainer>
    </div>
  );
};

export default Map;
