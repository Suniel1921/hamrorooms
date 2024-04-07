import React, { useEffect, useState } from 'react';
import '../chart/chart.css';
import { FaHospitalUser } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { Line, LineChart, ResponsiveContainer, Tooltip } from 'recharts';
import axios from 'axios';
import { MdRemoveRedEye } from "react-icons/md";

const Chart = () => {
  const [roomsWithUser, setRoomWithUser] = useState([]);
  const [totalViews, setTotalViews] = useState(0);

  // Fetch total views of rooms
  const fetchUserRooms = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_REACT_APP_URL}/api/v1/upload/roomCount`);
      if (response.data.success) {
        setRoomWithUser(response.data.roomsWithUser);
        const total = response.data.roomsWithUser.reduce((acc, room) => acc + room.viewCount, 0);
        setTotalViews(total);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserRooms();
  }, []);

  // Constructing data array based on room views
  const data = roomsWithUser.map((room, index) => ({
    name: `Page ${String.fromCharCode(65 + index)}`,
    userView: room.viewCount, // User View metric
    previousView: Math.round(room.viewCount * 0.8), // Previous View metric (example calculation)
    totalView: room.viewCount * 2, // Total View metric (example calculation)
    userViewPercentage: ((room.viewCount / totalViews) * 100).toFixed(2),
    previousViewPercentage: (((Math.round(room.viewCount * 0.8)) / totalViews) * 100).toFixed(2),
    totalViewPercentage: (((room.viewCount * 2) / totalViews) * 100).toFixed(2),
  }));

  return (
    <div className="chartBoxContainer">
      <div className="boxInfo">
        <div className='chartTitle'>
          <p><FaHospitalUser /></p>
          <span style={{fontWeight: 'bold'}}>Total Views</span>
        </div>
        <h2 style={{ color: totalViews > 50 ? '#00BF8D' : '#FF3B59' }}> <MdRemoveRedEye/> {totalViews}</h2>
        <Link to={'/'}> View all</Link>
      </div>
      <div className="chartInfo">
        <div className='chart'>
          <ResponsiveContainer width="99%" height="100%">
            <LineChart data={data}>
              <Tooltip />
              <Line type="monotone" dataKey="userView" stroke="#7572f9" strokeWidth={2} />
              <Line type="monotone" dataKey="previousView" stroke="#82ca9d" strokeWidth={2} />
              <Line type="monotone" dataKey="totalView" stroke="#f7a115" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className='text'>
          <span className='percentage'>{data[0] ? data[0].userViewPercentage : 0}%</span>
          <span className='months'>This Month</span>
        </div>
      </div>
    </div>
  );
};

export default Chart;
