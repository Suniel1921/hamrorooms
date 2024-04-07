// Importing necessary React and library components
import React, { useState } from "react";
import { NavLink, redirect, useNavigate } from "react-router-dom";
import "../navbar/navbar.css";
import Search from "../search/Search";
import { Modal } from "antd";
import { FaUserCircle } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import Login from "../auth/login/Login";
import Singup from "../auth/signup/Singup";
import { useAuthGloabally } from "../../context/AuthContext";
import { toast } from "react-toastify";
import { CiSquarePlus } from "react-icons/ci";
import { useSearchGlobally } from "../../context/SearchContext";
import PostYourRoom from "../../pages/postRoom/PostYourRoom";
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';

// Functional component for the Navbar
const Navbar = () => {


  // Style for the modal
  const modalStyle = {
    top: 80,
    left: 463,
    transform: "none",
    width: '3%',
  };

  // Adjusting modal style based on window width
  if (window.innerWidth <= 1178) {
    modalStyle.top = "80px";
    modalStyle.left = "350px";
    modalStyle.width = "20%";
  }
  if (window.innerWidth <= 915) {
    modalStyle.top = "80px";
    modalStyle.left = "250px";
    modalStyle.width = "50%";
  }
  if (window.innerWidth <= 750) {
    modalStyle.top = "80px";
    modalStyle.left = "220px";
    modalStyle.width = "20%";
  }
  if (window.innerWidth <= 580) {
    modalStyle.top = "80px";
    modalStyle.left = "120px";
    modalStyle.width = "20%";
  }
  if (window.innerWidth <= 370) {
    modalStyle.top = "80px";
    modalStyle.left = "10px";
    modalStyle.width = "100%";
  }

  // Using global state for authentication and search
  const [auth, setAuth] = useAuthGloabally();
  const { searchQuery, setSearchQuery } = useSearchGlobally();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModelOpen, setIsSignupModelOpen] = useState(false);
  const [isPostYourRoomModalOpen, setIsPostYourRoomModalOpen] = useState(false);
  const navigate = useNavigate();

  // Function to open the main modal
  const openModal = () => {
    setIsModalOpen(true);
    setIsLoginModalOpen(false);
    setIsSignupModelOpen(false);
  };

  // Function to open the login modal
  const openLoginModal = () => {
    setIsModalOpen(false);
    setIsLoginModalOpen(true);
  };

  // Function to open the signup modal
  const openSignupModal = () => {
    setIsModalOpen(false);
    setIsSignupModelOpen(true);
  };

  // Function to open the "Post Your Room" modal
  const openPostYourRoomModel = () => {
    if (auth.user) {
      setIsPostYourRoomModalOpen(true);
    } else {
      toast.error("Please Login First");
    }
  }

  // Function to close the "Post Your Room" modal
  const closePostYourRoomModal = () => {
    setIsPostYourRoomModalOpen(false);
  };

  // Function to handle user logout
  const handleLogout = () => {
    setAuth({ ...auth, user: null, token: "" });
    localStorage.removeItem("token");
    toast.success("Logged Out Successfully");
    navigate("/")
  };


  return (
    <>
      <div className="navbarContainer">
        <nav className="navbar">
          {/* Logo */}
          <div className="logo">
            <NavLink to={"/"}>
              <img className="mainLogo" src="/logo/hamrorooms.png" alt="" />
            </NavLink>
          </div>

          {/* Search bar */}
          <div className="searchBar">
            <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          </div>

          {/* "Post Your Room" button */}
          <div className="postYourRoom" onClick={openPostYourRoomModel}>
            <NavLink > <div className="plusicon"><CiSquarePlus size={20} /><span className="postYourRoomText">Post Your Room</span></div></NavLink>
          </div>

          {/* User icon and menu */}
          <div className="userIcon">
            <i onClick={openModal}>
              <div className="allIcons">
                <IoMenu size={20} className='hamburgurMenu' />
                {
                  auth.user ? (
                    <div className="user_initial">{auth.user.name.charAt(0).toUpperCase()}</div>
                  ) : (<FaUserCircle size={32} color={"#717171"} />)
                }
              </div>
            </i>
          </div>
        </nav>
  

        {/* Main modal for user actions */}
        <Modal
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          footer={null}
          style={modalStyle}
          mask={false}
          className="modalCustomWidth"
        >
          <div className="popUp_login_singup">
            {auth.user ? (
              <>
                <h2 style={{ textAlign: 'center' }}>Hi ! {auth.user.name}</h2> <hr /> <br />
                <NavLink to={'/account'} onClick={() => setIsModalOpen(false)}><p>Your Account</p></NavLink>

                <p>Help Center</p>
                <p>Contact</p>
                <p onClick={handleLogout}>Logout</p>
              </>
            ) : (
              <>
                <p onClick={openLoginModal}>Login</p>
                <p onClick={openSignupModal}>Sign up</p>
              </>
            )}
          </div>
        </Modal>
      </div>

      {/* Modals for login, signup, and "Post Your Room"*/}
      <Modal
        open={isLoginModalOpen}
        onCancel={() => setIsLoginModalOpen(false)}
        footer={null}
      >
        <Login onCloseModal={() => setIsLoginModalOpen(false)} /> {/* Pass prop onCloseModal */}
      </Modal>


      <Modal
        open={isSignupModelOpen}
        onCancel={() => setIsSignupModelOpen(false)}
        footer={null}
      >
        <Singup onClose={() => setIsSignupModelOpen(false)} />
      </Modal>
      {/* <hr /> */}

      {/* Modal for "Post Your Room" */}
      <Modal open={isPostYourRoomModalOpen} onCancel={() => setIsPostYourRoomModalOpen(false)} footer={null}>
        <h3 style={{ textAlign: 'center' }}>Post Your Room From Here</h3>
        <PostYourRoom onClose={closePostYourRoomModal} />
      </Modal>
    </>
  );
};

export default Navbar;
