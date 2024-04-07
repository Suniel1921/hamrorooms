import React from 'react'
import '../dashboard/adminDashboard.css'
import SideMenu from '../sidemenu/SideMenu'
import AdminChart from '../adminChart/AdminChart'

const AdminDashboard = () => {
  return (
    <>
        <div className='sideMenuContainer'>
            <div className='sidemenu'><SideMenu/></div>
            <div className='adminchart'><AdminChart/></div>
        </div>
    </>
  )
}

export default AdminDashboard