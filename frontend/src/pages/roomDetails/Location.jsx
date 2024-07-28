// import React, { useEffect, useState } from 'react';

// const Location = ({ singleRoom }) => {
//   const [address, setAddress] = useState('');

//   useEffect(() => {
//     const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${singleRoom.latitude}&lon=${singleRoom.longitude}`;

//     fetch(url)
//       .then(response => response.json())
//       .then(data => {
//         setAddress(data.display_name);
//       })
//       .catch(error => {
//         console.error('Error fetching address:', error);
//       });
//   }, [singleRoom]);

//   return (
//     <div className='roomdetails'>
//       <h5>Address: {address}</h5>
//     </div>
//   );
// };

// export default Location;








// import React, { useEffect, useState } from 'react';
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
// import L from 'leaflet';

// // Fix for missing marker icons
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
//   iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
//   shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
// });

// const Location = ({ singleRoom }) => {
//   const [address, setAddress] = useState('');

//   useEffect(() => {
//     const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${singleRoom.latitude}&lon=${singleRoom.longitude}`;

//     fetch(url)
//       .then(response => response.json())
//       .then(data => {
//         setAddress(data.display_name);
//       })
//       .catch(error => {
//         console.error('Error fetching address:', error);
//       });
//   }, [singleRoom]);

//   return (
//     <div className='roomdetails'>
//       <h5>Address: {address}</h5>
//       <MapContainer center={[singleRoom.latitude, singleRoom.longitude]} zoom={13} style={{ height: '400px', width: '100%' }}>
//         <TileLayer
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         />
//         <Marker position={[singleRoom.latitude, singleRoom.longitude]}>
//           <Popup>
//             A pretty CSS3 popup. <br /> Easily customizable.
//           </Popup>
//         </Marker>
//       </MapContainer>
//     </div>
//   );
// };

// export default Location;








import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import 'leaflet-routing-machine';
import '../roomDetails/location.css'

// Fix for missing marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const RoutingMachine = ({ start, end }) => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    const routingControl = L.Routing.control({
      waypoints: [L.latLng(start[0], start[1]), L.latLng(end[0], end[1])],
      routeWhileDragging: true,
    }).addTo(map);

    return () => map.removeControl(routingControl);
  }, [map, start, end]);

  return null;
};

const Location = ({ singleRoom }) => {
  const [address, setAddress] = useState('');
  const [userLocation, setUserLocation] = useState([51.505, -0.09]); // Default location
  const [userPosition, setUserPosition] = useState([51.505, -0.09]); // User position for moving marker
  const [locationDenied, setLocationDenied] = useState(false); // Track if location access is denied

  useEffect(() => {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${singleRoom.latitude}&lon=${singleRoom.longitude}`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        setAddress(data.display_name);
      })
      .catch(error => {
        console.error('Error fetching address:', error);
      });
  }, [singleRoom]);

  useEffect(() => {
    // Get the user's current location and track it
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          setUserLocation([position.coords.latitude, position.coords.longitude]);
          setUserPosition([position.coords.latitude, position.coords.longitude]);
          setLocationDenied(false); // Reset location denied status if successful
        },
        error => {
          console.error('Error getting user location:', error);
          setLocationDenied(true); // Set location denied status if there's an error
        }
      );

      const watchId = navigator.geolocation.watchPosition(
        position => {
          setUserPosition([position.coords.latitude, position.coords.longitude]);
        },
        error => {
          console.error('Error watching user location:', error);
          setLocationDenied(true); // Set location denied status if there's an error
        }
      );

      // Cleanup watch position on component unmount
      return () => navigator.geolocation.clearWatch(watchId);
    }
  }, []);

  const end = [singleRoom.latitude, singleRoom.longitude];

  return (
    <div className='roomdetails'>
      <h5>Address: {address}</h5>
      {locationDenied && (
        <div style={{ color: 'red', marginBottom: '10px' }}>
          Location access denied. Please allow location access to see the live route.
        </div>
      )}
      <MapContainer center={end} zoom={13} style={{ height: '400px', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={end}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
        {!locationDenied && (
          <Marker position={userPosition} icon={L.icon({
            iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
            shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
          })}>
            <Popup>
              You are here
            </Popup>
          </Marker>
        )}
        <RoutingMachine start={userLocation} end={end} />
      </MapContainer>
    </div>
  );
};

export default Location;





