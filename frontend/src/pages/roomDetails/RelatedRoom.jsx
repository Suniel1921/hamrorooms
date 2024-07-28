import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const RelatedRoom = () => {
  const { roomId } = useParams();
  const [relatedRooms, setRelatedRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRelatedRooms = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_URL}/getallrelatedProduct/${roomId}`);
        setRelatedRooms(response.data.relatedProducts);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchRelatedRooms();
  }, [roomId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <div>
        <h3>Related Rooms</h3>
        {relatedRooms.length === 0 ? (
          <p>No related rooms found.</p>
        ) : (
          <ul>
            {relatedRooms.map((room) => (
              <li key={room._id}>
                <h4>{room.address}</h4>
                <p>Rent: {room.rent}</p>
                <p>City: {room.city}</p>
                {/* Add more details as needed */}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default RelatedRoom;
