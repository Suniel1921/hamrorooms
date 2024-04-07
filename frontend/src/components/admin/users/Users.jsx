import React, { useEffect, useState } from 'react';
import SideMenu from '../sidemenu/SideMenu';
import { Table } from 'antd';
import '../users/user.css';
import { toast } from 'react-toastify';
import axios from 'axios';
import moment from 'moment';
import Loading from '../../auth/signup/Loading';

const Users = () => {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState([]);

  const allUsers = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_REACT_APP_URL}/api/v1/auth/getAllUsers`);
      if (response && response.data.success) {
        setUserData(response.data.allUsers.map(user => ({
          ...user,
          key: user._id,
          createdAt: moment(user.createdAt).format('YYYY-MM-DD')
        })));
      }

    } catch (error) {
      console.log(error);
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.success("something went wrong");
      }

    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    allUsers();
  }, []);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'date',
    },
    {
      title: 'Is Verified',
      dataIndex: 'isVerified',
      key: 'isVerified',
      render: (isVerified) => (isVerified ? 'Yes' : 'No'),
    },
  ];

  return (
    <>
      <div className='sideMenuContainer'>
        <div className='sidemenu'><SideMenu /></div>

        <div className='adminchart'>
          {loading ? <Loading/> : (
            <Table dataSource={userData} columns={columns} />
          )}
        </div>
      </div>
    </>
  );
};

export default Users;



