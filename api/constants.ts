import axios from "axios";
export const BASE_URL = 'http://192.168.1.174:5000'
export const API_URL = "http://192.168.1.174:5000/api/v1";
// export const BASE_URL = 'http://localhost:5000'
// const API_URL = "http://localhost:5000/api/v1";
// export const BASE_URL = 'https://c944638f3f54.ngrok-free.app'
// const API_URL = "https://c944638f3f54.ngrok-free.app/api/v1";

export const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});


export const darkStyle = [
  {
    elementType: "geometry",
    stylers: [{ color: "#121212" }], // deep dark background
  },
  {
    elementType: "labels.text.fill",
    stylers: [{ color: "#8a8a8a" }], // soft gray labels
  },
  {
    elementType: "labels.text.stroke",
    stylers: [{ color: "#000000" }],
  },
  {
    featureType: "administrative",
    elementType: "labels.text.fill",
    stylers: [{ color: "#9e9e9e" }],
  },
  {
    featureType: "poi",
    elementType: "geometry",
    stylers: [{ color: "#1e1e1e" }],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [{ color: "#666666" }],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [{ color: "#1b2e1b" }], // dark muted green for parks
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [{ color: "#4d754d" }],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#2c2c2c" }], // base roads (dark grey)
  },
  {
    featureType: "road.arterial",
    elementType: "geometry",
    stylers: [{ color: "#c1d687" }], // 🌱 your green for main streets
  },
  {
    featureType: "road.local",
    elementType: "geometry",
    stylers: [{ color: "#3a3a3a" }], // local small roads muted
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [{ color: "#8ea844" }], // highways brighter green
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [{ color: "#8ea844" }],
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [{ color: "#b0b0b0" }], // light gray text for roads
  },
  {
    featureType: "transit",
    elementType: "geometry",
    stylers: [{ color: "#2d2d2d" }],
  },
  {
    featureType: "transit",
    elementType: "labels.text.fill",
    stylers: [{ color: "#666666" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#0a1f33" }], // deep blue/gray water
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [{ color: "#4e6d70" }],
  },
];