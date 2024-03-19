// import React, { useState } from "react";
// import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

// const LocationPicker = () => {
//   const [selectedLocations, setSelectedLocations] = useState([]);

//   // Function to handle location selection
//   const handleLocationSelect = (location) => {
//     setSelectedLocations((prevLocations) => [...prevLocations, location]);
//   };

//   // Function to get coordinates for selected locations
//   const getCoordinates = async () => {
//     const geocoder = new window.google.maps.Geocoder();
//     const coordinates = [];

//     for (const location of selectedLocations) {
//       await new Promise((resolve) => {
//         geocoder.geocode({ address: location }, (results, status) => {
//           if (status === "OK" && results[0]) {
//             const { lat, lng } = results[0].geometry.location;
//             coordinates.push({ location, lat, lng });
//           }
//           resolve();
//         });
//       });
//     }

//     console.log(coordinates);
//   };

//   return (
//     <div>
//       <p
//         style={{
//           cursor: "pointer",
//           padding: "10px",
//           border: "1px solid #000",
//           borderRadius: "5px",
//           width: "25%",
//         }}
//         onClick={getCoordinates}
//       >
//         Get Coordinates
//       </p>

//       {/* Render the Google Map */}
//       <LoadScript googleMapsApiKey="YOUR_API_KEY">
//         <GoogleMap
//           mapContainerStyle={{ height: "400px", width: "100%" }}
//           center={{ lat: 0, lng: 0 }}
//           zoom={2}
//         >
//           {/* Render markers for selected locations */}
//           {selectedLocations.map((location, index) => (
//             <Marker key={index} position={{ lat: 0, lng: 0 }} />
//           ))}
//         </GoogleMap>
//       </LoadScript>
//     </div>
//   );
// };

// export default LocationPicker;
