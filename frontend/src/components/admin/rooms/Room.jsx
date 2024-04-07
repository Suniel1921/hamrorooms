import React, { useEffect, useState } from "react";
import SideMenu from "../sidemenu/SideMenu";
import { Table, Tag, Button, Modal, Input, Space, Select } from "antd";
import { toast } from "react-toastify";
import axios from "axios";

const Room = () => {
    const [roomData, setRoomData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const { Option } = Select;

    const getAllRooms = async () => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_REACT_APP_URL}/api/v1/upload/getAllRoomByAdmin`
            );
            if (response?.data?.success) {
                setRoomData(response?.data?.allRoomByAdmin);
            }
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message);
            } else {
                toast.error("something went wrong");
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getAllRooms();
    }, []);

    const handleEditClick = (room) => {
        setSelectedRoom(room);
        setIsEditModalVisible(true);
    };

    const handleDeleteClick = (room) => {
        setSelectedRoom(room);
        setIsDeleteModalVisible(true);
    };

    const handleEditModalOk = async () => {
        try {
            // Make an API call to update the room
            await axios.put(
                `${import.meta.env.VITE_REACT_APP_URL
                }/api/v1/upload/updateRoomByAdmin/${selectedRoom._id}`,
                {
                    address: selectedRoom.address,
                    phone: selectedRoom.phone,
                    rent: selectedRoom.rent,
                    parking: selectedRoom.parking,
                    water: selectedRoom.water,
                    floor: selectedRoom.floor,
                    roomType: selectedRoom.roomType,
                    verified: selectedRoom.verified,
                }
            );

            // Update the room data in the state
            const updatedRoomData = roomData.map((room) =>
                room._id === selectedRoom._id ? selectedRoom : room
            );
            setRoomData(updatedRoomData);

            // Close the edit modal
            setIsEditModalVisible(false);
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message);
            } else {
                toast.error("something went wrong");
            }
        }
    };

    const handleDeleteModalOk = async () => {
        try {
            // Make an API call to delete the room
            await axios.delete(`${import.meta.env.VITE_REACT_APP_URL}/api/v1/upload/deleteRoom/${selectedRoom._id}`
            );

            // Remove the room from the room data in the state
            const updatedRoomData = roomData.filter(
                (room) => room._id !== selectedRoom._id
            );
            setRoomData(updatedRoomData);

            // Close the delete modal
            setIsDeleteModalVisible(false);
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message);
            } else {
                toast.error("something went wrong");
            }
        }
    };

    const handleEditModalCancel = () => {
        // Close the edit modal
        setIsEditModalVisible(false);
    };

    const handleDeleteModalCancel = () => {
        // Close the delete modal
        setIsDeleteModalVisible(false);
    };

    const columns = [
        {
            title: "Image",
            dataIndex: "imageUrl",
            key: "imageUrl",
            render: (imageUrl) => (
                <img
                    src={imageUrl}
                    alt="Room"
                    style={{ width: "100%", height: "auto" }}
                />
            ),
            width: "10%",
        },
        {
            title: "Address",
            dataIndex: "address",
            key: "address",
        },
        {
            title: "Phone",
            dataIndex: "phone",
            key: "phone",
        },
        {
            title: "Rent",
            dataIndex: "rent",
            key: "rent",
        },
        {
            title: "Verified",
            dataIndex: "verified",
            key: "verified",
            render: (verified) => (
                <Tag color={verified ? "green" : "red"}>
                    {verified ? "Verified" : "Not Verified"}
                </Tag>
            ),
        },
        {
            title: "Actions",
            key: "actions",
            render: (text, room) => (
                <Space size="middle">
                    <Button style={{ backgroundColor: '#00BF8D', color: '#ffff' }} onClick={() => handleEditClick(room)}>
                        Edit
                    </Button>

                    <Button style={{ backgroundColor: '#FF3B59', color: '#ffff' }} onClick={() => handleDeleteClick(room)}>
                        Delete
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <>
            <div className="sideMenuContainer">
                <div className="sidemenu">
                    <SideMenu />
                </div>

                <div className="adminchart">
                    <Table
                        dataSource={roomData}
                        columns={columns}
                        loading={loading}
                        rowKey="_id"
                    />
                </div>
            </div>

            <Modal
                title="Edit Room Details"
    open={isEditModalVisible}
    onOk={handleEditModalOk}
    onCancel={handleEditModalCancel}
    okButtonProps={{ style: { backgroundColor: '#7371f9', color: 'white' } }}
    cancelButtonProps={{ style: { borderColor: '#7371f9', color: 'black' } }}
             >
                <div className="editRoomForm">
                    <div className="formRow">
                        <div className="formColumn">
                            <label htmlFor="address">address</label>
                            <Input
                                placeholder="Address"
                                value={selectedRoom?.address}
                                onChange={(e) =>
                                    setSelectedRoom({ ...selectedRoom, address: e.target.value })
                                }
                            />
                        </div>

                        <div className="formColumn">
                            <label htmlFor="phone">Phone</label>
                            <Input
                                placeholder="Phone"
                                value={selectedRoom?.phone}
                                onChange={(e) =>
                                    setSelectedRoom({ ...selectedRoom, phone: e.target.value })
                                }
                            />
                        </div>
                    </div>

                    <div className="formRow">
                        <div className="formColumn">
                            <label htmlFor="rent">Rent</label>
                            <Input
                                placeholder="Rent"
                                value={selectedRoom?.rent}
                                onChange={(e) =>
                                    setSelectedRoom({ ...selectedRoom, rent: e.target.value })
                                }
                            />
                        </div>
                        <div className="formColumn">
                            <label htmlFor="parking">Parking</label>
                            <Input
                                placeholder="Parking"
                                value={selectedRoom?.parking}
                                onChange={(e) =>
                                    setSelectedRoom({ ...selectedRoom, parking: e.target.value })
                                }
                            />
                        </div>
                    </div>

                    <div className="formRow">
                        <div className="formColumn">
                            <label htmlFor="Water">Water</label>
                            <Input
                                placeholder="Water"
                                value={selectedRoom?.water}
                                onChange={(e) =>
                                    setSelectedRoom({ ...selectedRoom, water: e.target.value })
                                }
                            />
                        </div>
                        <div className="formColumn">
                            <label htmlFor="floor">Floor</label>
                            <Input
                                placeholder="Floor"
                                value={selectedRoom?.floor}
                                onChange={(e) =>
                                    setSelectedRoom({ ...selectedRoom, floor: e.target.value })
                                }
                            />
                        </div>
                    </div>

                    <div className="formRow">
                        <div className="formColumn">
                            <label htmlFor="roomtype">Room Type</label>
                            <Input
                                placeholder="Room Type"
                                value={selectedRoom?.roomType}
                                onChange={(e) =>
                                    setSelectedRoom({ ...selectedRoom, roomType: e.target.value })
                                }
                            />
                        </div>

                        <div className="formColumn">
                            <label htmlFor="verified">Verified</label>
                            <Select
                                value={selectedRoom?.verified ? "True" : "False"}
                                style={{ width: 200, height: 45 }} 
                                onChange={(value) =>
                                    setSelectedRoom({ ...selectedRoom, verified: value === "True" })
                                }
                            >
                                <Option value="True">Verified</Option>
                                <Option value="False">Not Verified</Option>
                            </Select>
                        </div>






                    </div>
                </div>
            </Modal>

            <Modal
                title="Delete Room"
                open={isDeleteModalVisible}
                onOk={handleDeleteModalOk}
                onCancel={handleDeleteModalCancel}
            >
                <p>Are you sure you want to delete this room?</p>
            </Modal>
        </>
    );
};

export default Room;
[]