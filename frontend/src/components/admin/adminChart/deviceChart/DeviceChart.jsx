import React from 'react';
import '../deviceChart/deviceChart.css';
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';

const DeviceChart = () => {
    let deviceData = [];
    if (navigator.userAgent.includes('Mobile')) {
        deviceData = [
            { name: 'Mobile', value: 100 },
            { name: 'Computer', value: 0 },
            { name: 'Tablet', value: 0 },
        ];
    } else if (navigator.userAgent.includes('Tablet')) {
        deviceData = [
            { name: 'Mobile', value: 0 },
            { name: 'Computer', value: 0 },
            { name: 'Tablet', value: 100 },
        ];
    } else {
        deviceData = [
            { name: 'Mobile', value: 0 },
            { name: 'Computer', value: 100 },
            { name: 'Tablet', value: 0 },
        ];
    }

    const COLORS = ['#0088FE', '#FFBB28', '#00C49F'];

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    return (
        <>
            <div className='deviceChartContainer'>
                <h2>Devices Sessions</h2>
                <div className='deviceChart'>
                    <ResponsiveContainer width="99%" height={200}>
                        <PieChart width={400} height={400}>
                            <Pie
                                data={deviceData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={renderCustomizedLabel}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {deviceData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div className='deviceContent'>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                        <div style={{ width: '10px', height: '10px', backgroundColor: COLORS[0], marginRight: '5px' }}></div>
                        <p>Mobile</p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                        <div style={{ width: '10px', height: '10px', backgroundColor: COLORS[1], marginRight: '5px' }}></div>
                        <p>Computer</p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                        <div style={{ width: '10px', height: '10px', backgroundColor: COLORS[2], marginRight: '5px' }}></div>
                        <p>Tablet</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DeviceChart;
