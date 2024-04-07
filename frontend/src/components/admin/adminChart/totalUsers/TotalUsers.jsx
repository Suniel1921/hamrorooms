import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaHospitalUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Line, LineChart, ResponsiveContainer } from 'recharts';

const TotalUsers = () => {
    const [userCount, setUserCount] = useState(0);
    const [chartData, setChartData] = useState([]);

    const getAllUsers = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_REACT_APP_URL}/api/v1/auth/totalUsers`);

            if (response.data.success) {
                setUserCount(response.data.count);
            }
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message);
            } else {
                toast.error('Something went wrong');
            }
        }
    };

    useEffect(() => {
        getAllUsers();
    }, []);

    useEffect(() => {
        const generateData = () => {
            const data = [];
            for (let i = 0; i < userCount; i++) {
                data.push({ name: `User ${i + 1}`, value: Math.floor(Math.random() * 100) });
            }
            setChartData(data);
        };

        generateData();
    }, [userCount]);

    return (
        <>
            <div className="chartBoxContainer">
                <div className="boxInfo">
                    <div className='chartTitle'>
                        <p><FaHospitalUser /></p>
                        <span style={{ fontWeight: 'bold' }}>Total Users</span>
                    </div>
                    <h2 style={{ color: userCount > 50 ? '#00BF8D' : '#FF3B59' }}> <FaHospitalUser /> {userCount}</h2>
                    <Link to={'/'}> View all</Link>
                </div>
                <div className="chartInfo">
                    <div className='chart'>
                        <ResponsiveContainer width="100%" height={150}>
                            <LineChart width={200} height={100} data={chartData}>
                                <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                    <div className='text'>
                        <span className='percentage'>50%</span>
                        <span className='months'>This Month</span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TotalUsers;
