import React from 'react';
import '../chart/areaboxchart.css';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const AreaChartBox = () => {
  const data = [
    {
      category: '1st Month',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      category: '2nd Months',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      category: '3rd Months',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      category: '4th Months',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      category: '5th Months',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      category: '6th Months',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      category: '7th Months',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  return (
    <>
      <div className='areachartbox'>
        <h3>Total Revenue</h3>
        <div className='chart'>
          <ResponsiveContainer width="99%" height={150}>
            <AreaChart
              width={500}
              height={400}
              data={data}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="uv" stackId="1" stroke="#7572f9" fill="#8884d8" />
              <Area type="monotone" dataKey="pv" stackId="1" stroke="#7572f9" fill="#82ca9d" />
              <Area type="monotone" dataKey="amt" stackId="1" stroke="#ffc658" fill="#ffc658" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
};

export default AreaChartBox;
