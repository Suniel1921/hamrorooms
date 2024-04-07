import React from 'react'
import Navbar from '../navbar/Navbar'
import Footer from '../footer/Footer'
import {Outlet} from 'react-router-dom'
import '../layout/layout.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Layout = () => {
  return (
    <>
        <div className='layoutContainer'>
        <div className='container'>
        <Navbar/>
        <Outlet/>
        <Footer/>
        <ToastContainer />
        </div>
        </div>
    </>
  )
}

export default Layout