import { Tooltip } from 'antd'
import React from 'react'
import { FaHospitalUser } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, XAxis, YAxis } from 'recharts'

const UniqueVisitor = () => {
    const data = [
        {
          name: 'Page A',
          uv: 4000,
          pv: 2400,
          amt: 2400,
        },
        {
          name: 'Page B',
          uv: 3000,
          pv: 1398,
          amt: 2210,
        },
        {
          name: 'Page C',
          uv: 2000,
          pv: 9800,
          amt: 2290,
        },
        {
          name: 'Page D',
          uv: 2780,
          pv: 3908,
          amt: 2000,
        },
        {
          name: 'Page E',
          uv: 1890,
          pv: 4800,
          amt: 2181,
        },
        {
          name: 'Page F',
          uv: 2390,
          pv: 3800,
          amt: 2500,
        },
        {
          name: 'Page G',
          uv: 3490,
          pv: 4300,
          amt: 2100,
        },
      ];


    return (
        <>
            <div className="chartBoxContainers">
                <div className="boxInfos">
                    <div className='chartTitle'>
                        <p><FaHospitalUser /></p>
                        <sUnpan style={{ fontWeight: 'bold' }}>Total Unique Visitors </sUnpan>
                    </div>
                    {/* <h2 style={{ color: userCount > 50 ? '#00BF8D' : '#FF3B59' }}> <FaHospitalUser /> {userCount}</h2> */}
                    
                </div>
                <div className="chartInfo">
                    <div className='chart'>
                    <ResponsiveContainer width="100%" height={150}>
        <BarChart width={150} height={500} data={data}>
          <Bar dataKey="uv" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UniqueVisitor