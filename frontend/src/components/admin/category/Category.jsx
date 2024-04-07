import React, { useEffect, useState } from "react";
import { Table, Modal, Button, Input, Space, Tag } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import "../category/category.css";
import SideMenu from "../sidemenu/SideMenu";
import axios from "axios";
import { toast } from "react-toastify";

const Category = () => {
    const [categoryData, setCategoryData] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
    });
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Actions",
            key: "actions",
            render: (text, record) => (
                <Space size="middle">
                    <Button style={{backgroundColor: '#00BF8D', color: '#ffff'}} onClick={() => handleEditClick(record)}>
                        Edit
                    </Button>
                    <Button style={{backgroundColor:'#FF3B59', color: '#ffff'}} onClick={() => handleDeleteClick(record)}>
                        Delete
                    </Button>
                </Space>
            ),
        },
    ];

    const getAllCategory = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_REACT_APP_URL}/api/v1/category/allCategory`);
            if (response.data.success) {
                setCategoryData(response.data.allCategory);
            }
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message);
            } else {
                toast.error("something went wrong");
            }
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const trimmedName = formData.name.trim(); // Trim the whitespace
            const response = await axios.post(`${import.meta.env.VITE_REACT_APP_URL}/api/v1/category/createCategory`, {
                name: trimmedName,
            });
            if (response.data.success) {
                toast.success(response.data.message);
                setFormData({
                    name: "",
                });
                getAllCategory(); // Refresh the category data
            }
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message);
            } else {
                toast.error("something went wrong");
            }
        }
    };

    const handleEditClick = (category) => {
        setSelectedCategory(category);
        setIsEditModalVisible(true);
    };

    const handleDeleteClick = (category) => {
        setSelectedCategory(category);
        setIsDeleteModalVisible(true);
    };

    const handleEditModalOk = async () => {
        try {
            const response = await axios.put(`${import.meta.env.VITE_REACT_APP_URL}/api/v1/category/updateCategory/${selectedCategory._id}`, selectedCategory);
            if (response.data.success) {
                toast.success(response.data.message);
                setIsEditModalVisible(false);
                getAllCategory(); // Refresh the category data
            }
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
            const response = await axios.delete(`${import.meta.env.VITE_REACT_APP_URL}/api/v1/category/deleteCategory/${selectedCategory._id}`);
            if (response.data.success) {
                toast.success(response.data.message);
                setIsDeleteModalVisible(false);
                getAllCategory(); // Refresh the category data
            }
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message);
            } else {
                toast.error("something went wrong");
            }
        }
    };

    const handleEditModalCancel = () => {
        setIsEditModalVisible(false);
    };

    const handleDeleteModalCancel = () => {
        setIsDeleteModalVisible(false);
    };

    useEffect(() => {
        getAllCategory();
    }, []);

    return (
        <>
            <div className="sideMenuContainer">
                <div className="sidemenu">
                    <SideMenu />
                </div>

                <div className="adminchart">
                    <form onSubmit={submitHandler}>
                        <input className="categoryInput"
                            onChange={(e) => setFormData({ ...formData, name: e.currentTarget.value })}
                            value={formData.name}
                            type="text"
                            name="name"
                            id="category"
                            placeholder="Enter Category Name"
                        />
                        <button className="categoryBtn" type="submit">Create Category</button>
                    </form>

                    <Table dataSource={categoryData} columns={columns} rowKey="_id" />
                </div>
            </div>

            <Modal
                title="Edit Category"
                open={isEditModalVisible}
                onOk={handleEditModalOk}
                onCancel={handleEditModalCancel}
            >
                <Input
                    placeholder="Enter Category Name"
                    value={selectedCategory?.name}
                    onChange={(e) => setSelectedCategory({ ...selectedCategory, name: e.target.value })}
                />
            </Modal>

            <Modal
                title="Delete Category"
                open={isDeleteModalVisible}
                onOk={handleDeleteModalOk}
                onCancel={handleDeleteModalCancel}
            >
                <p>Are you sure you want to delete this category?</p>
            </Modal>
        </>
    );
};

export default Category;
