import React from "react";
import "../sidemenu/sidemenu.css";
import { FaHome, FaUserPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { MdOutlineAddHomeWork } from "react-icons/md";
import { TbCategoryFilled } from "react-icons/tb";
const SideMenu = () => {
  return (
    <>
      <div className="sideMenu">
        <div className="sideItems">
          {/* <h2 style={{textAlign: 'center'}}>Hamro Rooms</h2> */}
          <Link to={"/dashboard/admin"} className="listItems">
            <FaHome />
            <span>Home</span>
          </Link>
          <Link to={"/dashboard/admin/users"} className="listItems">
            <FaUserPlus />
            <span>Manage Users</span>
          </Link>
          <Link to={"/dashboard/admin/rooms"} className="listItems">
            <MdOutlineAddHomeWork />
            <span>Manage Rooms</span>
          </Link>
          <Link to={"/dashboard/admin/category"} className="listItems">
            <TbCategoryFilled />
            <span>Manage Category</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default SideMenu;
