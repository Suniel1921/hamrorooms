// import React, { useEffect, useState } from 'react';
// import '../../yourAccount/account.css';
// import { FaUserCircle } from 'react-icons/fa';
// import { redirect, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import { Modal, Select, Tag } from 'antd';
// import { MdDeleteForever } from 'react-icons/md';
// import { FaEdit } from 'react-icons/fa';
// import Menu from '../sideMenu/Menu';
// import '../userRoom/userroom.css';
// import Loading from '../../auth/signup/Loading';
// import { FaCheck, FaTimes } from 'react-icons/fa';
// import { Helmet } from 'react-helmet';

// const UserRoom = () => {
//   const navigate = useNavigate();
//   const [roomsWithUser, setRoomWithUser] = useState([]);
//   const [isEditModelOpen, setIsEditModelOpen] = useState(false);
//   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
//   const [selectedRoomId, setSelectedRoomId] = useState(null);
//   const [updatedRoomData, setUpdatedRoomData] = useState({
//     address: '',
//     rent: '',
//     phone: '',
//     parking: '',
//     water: '',
//     floor: '',
//   });
//   const [isLoading, setIsLoading] = useState(true);

//   const fetchUserRooms = async () => {
//     try {
//       const response = await axios.get(`${import.meta.env.VITE_REACT_APP_URL}/api/v1/upload/roomCount`);
//       console.log(response);
//       if (response.data.success) {
//         setRoomWithUser(response.data.roomsWithUser);
//         setIsLoading(false);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     fetchUserRooms();
//   }, []);

//   const firstRoom = roomsWithUser[0];
//   const user = firstRoom && firstRoom.authUser;

//   const deleteHandler = async (roomId) => {
//     setSelectedRoomId(roomId);
//     setIsDeleteModalOpen(true);
//   };

//   const confirmDeleteHandler = async () => {
//     try {
//       const response = await axios.delete(`${import.meta.env.VITE_REACT_APP_URL}/api/v1/upload/deleteRoom/${selectedRoomId}`);

//       if (response.data.success) {
//         toast.success(response.data.message);
//         setIsDeleteModalOpen(false);
//         fetchUserRooms();
//       } else {
//         toast.error(response.data.message);
//       }
//     } catch (error) {
//       toast.error('Something went wrong');
//     }
//   };

//   const showModal = (roomId) => {
//     const selectedRoom = roomsWithUser.find((room) => room._id === roomId);
//     setSelectedRoomId(roomId);
//     setUpdatedRoomData({
//       address: selectedRoom.address,
//       rent: selectedRoom.rent,
//       phone: selectedRoom.phone,
//       parking: selectedRoom.parking,
//       water: selectedRoom.water,
//       floor: selectedRoom.floor,
//     });
//     setIsEditModelOpen(true);
//   };

//   const updateHandler = async () => {
//     try {
//       const response = await axios.put(
//         `${import.meta.env.VITE_REACT_APP_URL}/api/v1/upload/updateRoom/${selectedRoomId}`,
//         updatedRoomData
//       );

//       if (response.data.success) {
//         toast.success(response.data.message);
//         setIsEditModelOpen(false);
//         fetchUserRooms();
//       } else {
//         toast.error(response.data.message);
//       }
//     } catch (error) {
//       toast.error('Something went wrong');
//     }
//   };

//   return (
//     <>
//       <Helmet>
//         <title>User Room | Hamro Rooms</title>
//         <meta name="description" content="User room details on Hamro Rooms" />
//       </Helmet>
//       <div className='roomContainer'>
//         <div className="menu"><Menu /></div>
//         <div className='roomChild'>
//           <div className='userRoomsContainer'>
//             {isLoading ? (
//               <div className='loading-container'> {/* Container to center loading */}
//                 <Loading />
//               </div>
//             ) : roomsWithUser.length > 0 ? (
//               roomsWithUser.map((room) => (
//                 <div key={room._id} className='userRoom'>
//                   <div className='userRoomImg'><img src={room.imageUrl} alt='' /></div>
//                   <div className='userRoomData'>
//                     <p>Address: {room.address}</p>
//                     <p>Phone: {room.phone}</p>
//                     <p>Rent: {room.rent}</p>
//                     <p>Views: {room.viewCount}</p>
//                     <div className='icons'>
//                       <span className='deleteIcon' onClick={() => deleteHandler(room._id)}><MdDeleteForever /></span>
//                       <span className='editIcon' onClick={() => showModal(room._id)}><FaEdit /></span>
//                     </div>
//                     {/* Conditional rendering of 'Verified' or 'Not Verified' */}
//                     {/* <p>{room.verified ? 'Verified' : 'Not Verified'}</p> */}
//                     {/* <p className={room.verified ? 'verified' : 'not-verified'}>{room.verified ? 'Verified' : 'Not Verified'}</p> */}
                    
//                     <Tag className='tag'
//                       color={room.verified ? "green" : "red"}
//                     >
//                       {room.verified ? (
//                         <>
//                           <FaCheck style={{ marginRight: "5px" }} />
//                           Verified
//                         </>
//                       ) : (
//                         <>
//                           <FaTimes style={{ marginRight: "5px" }} />
//                           Not Verified
//                         </>
//                       )}
//                     </Tag>


//                   </div>
//                 </div>
//               ))
//             ) : (
//               <p>No rooms posted by the user.</p>
//             )}
//           </div>

//           <Modal
//             open={isEditModelOpen}
//             onCancel={() => setIsEditModelOpen(false)}
//             onOk={updateHandler}
//             footer={null}
//           >
//             <form className='editRoomForm'>
//               <h3>Edit Your Room Details</h3>
//               <div className='formRow'>
//                 <div className='formColumn'>
//                   <label htmlFor='address'>Address:</label>
//                   <input
//                     type='text'
//                     id='address'
//                     value={updatedRoomData.address}
//                     onChange={(e) => setUpdatedRoomData({ ...updatedRoomData, address: e.target.value })}
//                   />
//                 </div>

//                 <div className='formColumn'>
//                   <label htmlFor='rent'>Rent:</label>
//                   <input
//                     type='number'
//                     id='rent'
//                     value={updatedRoomData.rent}
//                     onChange={(e) => setUpdatedRoomData({ ...updatedRoomData, rent: e.target.value })}
//                   />
//                 </div>
//               </div>

//               <div className='formRow'>
//                 <div className='formColumn'>
//                   <label htmlFor='phone'>Phone:</label>
//                   <input
//                     type='text'
//                     id='phone'
//                     value={updatedRoomData.phone}
//                     onChange={(e) => setUpdatedRoomData({ ...updatedRoomData, phone: e.target.value })}
//                   />
//                 </div>

//                 <div className='formColum'>
//                   <label htmlFor='phone'>Parking</label>
//                   <select
//                     className='selectOption'
//                     id='parking'
//                     name='parking'
//                     onChange={(e) => setUpdatedRoomData({ ...updatedRoomData, parking: e.target.value })}
//                     value={updatedRoomData.parking}
//                   >
//                     <option value='' label='Parking Availability' />
//                     <option value='yes'>Yes</option>
//                     <option value='no'>No</option>
//                   </select>
//                 </div>
//                 <div className='formColum'>
//                   <label htmlFor='water'>Water</label>
//                   <select
//                     className='selectOption'
//                     id='water'
//                     name='water'
//                     onChange={(e) => setUpdatedRoomData({ ...updatedRoomData, water: e.target.value })}
//                     value={updatedRoomData.water}
//                   >
//                     <option value='' label='water' />
//                     <option value='yes'>Yes</option>
//                     <option value='no'>No</option>
//                   </select>
//                 </div>
//                 <div className='formColum'>
//                   <label htmlFor='floor'>Floor</label>
//                   <select
//                     className='selectOption'
//                     id='floor'
//                     name='floor'
//                     onChange={(e) => setUpdatedRoomData({ ...updatedRoomData, floor: e.target.value })}
//                     value={updatedRoomData.floor}
//                   >
//                     <option value='' label='Floor ' />
//                     <option value='1st' label='1st' />
//                     <option value='2nd' label='2nd' />
//                     <option value='3rd' label='3rd' />
//                     <option value='4th' label='4th' />
//                     <option value='5th' label='5th' />
//                   </select>
//                 </div>
//               </div>

//               <button type='button' onClick={updateHandler} className='updateBtn'>
//                 Update
//               </button>
//             </form>
//           </Modal>

//           <Modal
//             open={isDeleteModalOpen}
//             onCancel={() => setIsDeleteModalOpen(false)}
//             onOk={confirmDeleteHandler}
//             okText='Yes'
//             cancelText='No'
//             okButtonProps={{ style: { backgroundColor: '#7371F9', color: '#fff' } }}
//           >
//             <h3>Are you sure you want to delete this room?</h3>
//             <p>This action cannot be undone.</p>
//           </Modal>
//         </div>
//       </div>
//     </>
//   );
// };

// export default UserRoom;




import React, { useEffect, useState } from 'react';
import '../../yourAccount/account.css';
import { FaUserCircle } from 'react-icons/fa';
import { redirect, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Modal, Select, Tag } from 'antd';
import { MdDeleteForever } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';
import Menu from '../sideMenu/Menu';
import '../userRoom/userroom.css';
import Loading from '../../auth/signup/Loading';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { Helmet } from 'react-helmet';
import { Pagination } from 'antd';

const { Option } = Select;

const UserRoom = () => {
  const navigate = useNavigate();
  const [roomsWithUser, setRoomWithUser] = useState([]);
  const [isEditModelOpen, setIsEditModelOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  const [updatedRoomData, setUpdatedRoomData] = useState({
    address: '',
    rent: '',
    phone: '',
    parking: '',
    water: '',
    floor: '',
  });
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [roomsPerPage] = useState(8);

  const fetchUserRooms = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_REACT_APP_URL}/api/v1/upload/roomCount`);
      console.log(response);
      if (response.data.success) {
        setRoomWithUser(response.data.roomsWithUser);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserRooms();
  }, []);

  const indexOfLastRoom = currentPage * roomsPerPage;
  const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
  const currentRooms = roomsWithUser.slice(indexOfFirstRoom, indexOfLastRoom);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const deleteHandler = async (roomId) => {
    setSelectedRoomId(roomId);
    setIsDeleteModalOpen(true);
  };

  const confirmDeleteHandler = async () => {
    try {
      const response = await axios.delete(`${import.meta.env.VITE_REACT_APP_URL}/api/v1/upload/deleteRoom/${selectedRoomId}`);

      if (response.data.success) {
        toast.success(response.data.message);
        setIsDeleteModalOpen(false);
        fetchUserRooms();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error('Something went wrong');
    }
  };

  const showModal = (roomId) => {
    const selectedRoom = roomsWithUser.find((room) => room._id === roomId);
    setSelectedRoomId(roomId);
    setUpdatedRoomData({
      address: selectedRoom.address,
      rent: selectedRoom.rent,
      phone: selectedRoom.phone,
      parking: selectedRoom.parking,
      water: selectedRoom.water,
      floor: selectedRoom.floor,
    });
    setIsEditModelOpen(true);
  };

  const updateHandler = async () => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_REACT_APP_URL}/api/v1/upload/updateRoom/${selectedRoomId}`,
        updatedRoomData
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setIsEditModelOpen(false);
        fetchUserRooms();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error('Something went wrong');
    }
  };

  return (
    <>
      <Helmet>
        <title>User Room | Hamro Rooms</title>
        <meta name="description" content="User room details on Hamro Rooms" />
      </Helmet>
      <div className='roomContainer'>
        <div className="menu"><Menu /></div>
        <div className='roomChild'>
          <div className='userRoomsContainer'>
            {isLoading ? (
              <div className='loading-container'> {/* Container to center loading */}
                <Loading />
              </div>
            ) : currentRooms.length > 0 ? (
              currentRooms.map((room) => (
                <div key={room._id} className='userRoom'>
                  <div className='userRoomImg'><img src={room.imageUrl} alt='' /></div>
                  <div className='userRoomData'>
                    <p>Address: {room.address}</p>
                    <p>Phone: {room.phone}</p>
                    <p>Rent: {room.rent}</p>
                    <p>Views: {room.viewCount}</p>
                    <div className='icons'>
                      <span className='deleteIcon' onClick={() => deleteHandler(room._id)}><MdDeleteForever /></span>
                      <span className='editIcon' onClick={() => showModal(room._id)}><FaEdit /></span>
                    </div>
                    {/* Conditional rendering of 'Verified' or 'Not Verified' */}
                    {/* <p>{room.verified ? 'Verified' : 'Not Verified'}</p> */}
                    {/* <p className={room.verified ? 'verified' : 'not-verified'}>{room.verified ? 'Verified' : 'Not Verified'}</p> */}
                    
                    <Tag className='tag'
                      color={room.verified ? "green" : "red"}
                    >
                      {room.verified ? (
                        <>
                          <FaCheck style={{ marginRight: "5px" }} />
                          Verified
                        </>
                      ) : (
                        <>
                          <FaTimes style={{ marginRight: "5px" }} />
                          Not Verified
                        </>
                      )}
                    </Tag>
                  </div>
                </div>
              ))
            ) : (
              <p>No rooms posted by the user.</p>
            )}
          </div>

          <Modal
            open={isEditModelOpen}
            onCancel={() => setIsEditModelOpen(false)}
            onOk={updateHandler}
            footer={null}
          >
            <form className='editRoomForm'>
              <h3>Edit Your Room Details</h3>
              <div className='formRow'>
                <div className='formColumn'>
                  <label htmlFor='address'>Address:</label>
                  <input
                    type='text'
                    id='address'
                    value={updatedRoomData.address}
                    onChange={(e) => setUpdatedRoomData({ ...updatedRoomData, address: e.target.value })}
                  />
                </div>

                <div className='formColumn'>
                  <label htmlFor='rent'>Rent:</label>
                  <input
                    type='number'
                    id='rent'
                    value={updatedRoomData.rent}
                    onChange={(e) => setUpdatedRoomData({ ...updatedRoomData, rent: e.target.value })}
                  />
                </div>
              </div>

              <div className='formRow'>
                <div className='formColumn'>
                  <label htmlFor='phone'>Phone:</label>
                  <input
                    type='text'
                    id='phone'
                    value={updatedRoomData.phone}
                    onChange={(e) => setUpdatedRoomData({ ...updatedRoomData, phone: e.target.value })}
                  />
                </div>

                <div className='formColum'>
                  <label htmlFor='phone'>Parking</label>
                  <select
                    className='selectOption'
                    id='parking'
                    name='parking'
                    onChange={(e) => setUpdatedRoomData({ ...updatedRoomData, parking: e.target.value })}
                    value={updatedRoomData.parking}
                  >
                    <option value='' label='Parking Availability' />
                    <option value='yes'>Yes</option>
                    <option value='no'>No</option>
                  </select>
                </div>
                <div className='formColum'>
                  <label htmlFor='water'>Water</label>
                  <select
                    className='selectOption'
                    id='water'
                    name='water'
                    onChange={(e) => setUpdatedRoomData({ ...updatedRoomData, water: e.target.value })}
                    value={updatedRoomData.water}
                  >
                    <option value='' label='water' />
                    <option value='yes'>Yes</option>
                    <option value='no'>No</option>
                  </select>
                </div>
                <div className='formColum'>
                  <label htmlFor='floor'>Floor</label>
                  <select
                    className='selectOption'
                    id='floor'
                    name='floor'
                    onChange={(e) => setUpdatedRoomData({ ...updatedRoomData, floor: e.target.value })}
                    value={updatedRoomData.floor}
                  >
                    <option value='' label='Floor ' />
                    <option value='1st' label='1st' />
                    <option value='2nd' label='2nd' />
                    <option value='3rd' label='3rd' />
                    <option value='4th' label='4th' />
                    <option value='5th' label='5th' />
                  </select>
                </div>
              </div>

              <button type='button' onClick={updateHandler} className='updateBtn'>
                Update
              </button>
            </form>
          </Modal>

          <Modal
            open={isDeleteModalOpen}
            onCancel={() => setIsDeleteModalOpen(false)}
            onOk={confirmDeleteHandler}
            okText='Yes'
            cancelText='No'
            okButtonProps={{ style: { backgroundColor: '#7371F9', color: '#fff' } }}
          >
            <h3>Are you sure you want to delete this room?</h3>
            <p>This action cannot be undone.</p>
          </Modal>
        </div>
      </div>
      <Pagination
        defaultCurrent={1}
        total={roomsWithUser.length}
        defaultPageSize={roomsPerPage}
        pageSize={roomsPerPage}
        onChange={paginate}
        style={{ marginLeft: '1120px', marginTop: '34px' }} 
      />
    </>
  );
};

export default UserRoom;

