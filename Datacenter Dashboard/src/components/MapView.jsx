import {
  MapContainer,
  TileLayer,
  Marker,
  Popup
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

const cities = [
  {
    city: "Mumbai",
    lat: 19.076,
    lng: 72.8777,
    risk: 74
  },
  {
    city: "Chennai",
    lat: 13.0827,
    lng: 80.2707,
    risk: 63
  },
  {
    city: "Hyderabad",
    lat: 17.385,
    lng: 78.4867,
    risk: 58
  },
  {
    city: "Bengaluru",
    lat: 12.9716,
    lng: 77.5946,
    risk: 52
  },
  {
    city: "Noida",
    lat: 28.5355,
    lng: 77.391
  }
];

function MapView() {
  return (
    <MapContainer
      center={[22.5, 80]}
      zoom={6}
      minZoom={5}
      style={{ height: "600px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {cities.map((city) => (
        <Marker
          key={city.city}
          position={[city.lat, city.lng]}
        >
          <Popup>
            <h3>{city.city}</h3>
            <p>Overall Risk: {city.risk}</p>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default MapView;