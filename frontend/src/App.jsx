
import React from 'react';
import Layout from './components/layout/Layout';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Account from './components/yourAccount/Account';
import ProtectRoute from './components/yourAccount/ProtectRoute';
import PostYourRoom from './pages/postRoom/PostYourRoom';
import RoomDetails from './pages/roomDetails/RoomDetails';
import Navbar from './components/navbar/Navbar';
import Features from './pages/roomDetails/Features';
import Location from './pages/roomDetails/Location';
import OTPModal from './pages/OTPmodal/OTPModel';
import NotFound from './pages/notfound/NotFound';
import UserRoom from './components/yourAccount/userRoom/UserRoom';
import AdminDashboard from './components/admin/dashboard/AdminDashboard';
import Users from './components/admin/users/Users';
import AdminRoute from './components/admin/adminProtectedRoute/AdminRoute';
import Room from './components/admin/rooms/Room';
import Category from './components/admin/category/Category';
import ResetPassword from './components/auth/resetPassword/ResetPassword';



const App = () => {
  return (
    <>

      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
              <Route path='/roomDetails/:slug' element={<RoomDetails />} />
              {/* <Route path='/roomDetails/:id' element={<RoomDetails />} /> */}
              <Route path='/roomDetails/features' element={<Features/>}/>
              <Route path='/roomDetails/location' element={<Location/>}/>
              <Route path='/verifyOTP' element={<OTPModal/>}/>
              <Route path='*' element={<NotFound/>}/>

            {/*protected routes */}
            <Route path='/account' element={<ProtectRoute />}>
              <Route path='/account/postYourRoom' element={<PostYourRoom />} />
              <Route index element={<Account />} />
              <Route path='/account/UserRoom' element={<UserRoom/>}/>
            </Route>
             {/*protected Admin routes */}
           <Route path='/dashboard' element={<AdminRoute/>}>
           <Route path='admin' element={<AdminDashboard/>}/>
            <Route path='admin/users' element={<Users/>}/>
            <Route path='admin/rooms' element={<Room/>}/>
            <Route path='admin/category' element={<Category/>}/>
           </Route>
           
          </Route>
        </Routes>
        <ToastContainer />
      </Router>
    </>
  );
};

export default App;


