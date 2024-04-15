import React, { useEffect, useState } from 'react';

const Location = ({ singleRoom }) => {
  const [address, setAddress] = useState('');

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

  return (
    <div className='roomdetails'>
      <h5>Address: {address}</h5>
    </div>
  );
};

export default Location;





