import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import {Icon} from 'leaflet'

const Map = ({lat,long,circuit}) => {
  const popUpText = `${circuit} Race Track`;

  return (
    <div className="container">
      <MapContainer className="map"
        center={[lat,long]}
        zoom={15}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[lat,long]} icon={new Icon({iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41]})}>
          <Popup>
           {popUpText}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Map;