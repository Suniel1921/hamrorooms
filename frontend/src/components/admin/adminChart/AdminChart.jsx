import React from 'react'
import '../adminChart/adminChart.css'
import DeviceChart from './deviceChart/DeviceChart'
import TotalUserChart from './toalRoomChart/TotalRoomChart'
import TotalUsers from './totalUsers/TotalUsers'
import UniqueVisitor from './uniqueVisitor/UniqueVisitor'

const AdminChart = () => {
  return (
    <>
      <div className='admin_Grid_Dashboard'>
        <div className='charts chartBox1'>
        <h2>Congratulations Suniel! 🎉</h2>
          <p>Your website has reached done 72% 🤩 more interactvie today.Check your new raising badge in your profile.</p>
        </div>
        <div className='charts chartBox2'><TotalUserChart/></div>
        <div className='charts chartBox3'><TotalUsers/></div>
        <div className='charts chartBox4'><DeviceChart/></div>
        <div className='charts chartBox5'>box5</div>
        <div className='charts chartBox6'><UniqueVisitor/></div>
        <div className='charts chartBox7'>Report / Feedback </div>
        {/* <div className='chart chartBox8'>box8</div> */}
        {/* <div className='chart chartBox9'>box9</div>
        <div className='chart chartBox10'>box10</div> */}

      </div>
    </>
  )
}

export default AdminChart