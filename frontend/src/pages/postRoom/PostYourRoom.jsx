// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { toast } from 'react-toastify';
// import { Select } from 'antd';
// const { Option } = Select;
// import * as Yup from 'yup';
// import { useFormik } from 'formik';
// import '../postRoom/postYourRoom.css'
// import { redirect, useNavigate } from 'react-router-dom';

// const PostYourRoom = ({ onClose }) => {
//     const [category, setCategory] = useState([]);
//     const navigate = useNavigate();

//     const getAllCategory = async () => {
//         try {
//             const response = await axios.get(`${import.meta.env.VITE_REACT_APP_URL}/api/v1/category/allCategory`);

//             if (response.data.success) {
//                 setCategory(response.data.allCategory);
//             }

//         } catch (error) {
//             if (error.response) {
//                 toast.error(error.response.data.message);
//             } else {
//                 toast.error("Something went wrong");
//             }
//         }
//     };

//     useEffect(() => {
//         getAllCategory();
//     }, []);

//     const validationSchema = Yup.object({
//         address: Yup.string().required("Address is required"),
//         phone: Yup.number()
//             .typeError('Invalid Phone Number')
//             .test('is-exactly-ten-digits', 'Phone Number must be exactly 10 digits', (value) => {
//                 if (!value) {
//                     return true;
//                 }
//                 return String(value).length === 10;
//             })
//             .required('Phone Number is required'),
//         imageFile: Yup.string().required("iamge is required"),
//         city: Yup.string().required("City is required"),
//         // rent: Yup.number().required("Rent is required"),
//         rent: Yup.number().required("Rent is required").max(500000, "Room Rent Must be less than 500000"),
//         parking: Yup.string().required("Parking filed is requried"),
//         water: Yup.string().required("Water filed is requried"),
//         floor: Yup.string().required("Floor filed is requried"),
//         roomType: Yup.string().required('Room Types is required'),
//     })

//     const formik = useFormik({
//         initialValues: {
//             city: '',
//             address: '',
//             phone: '',
//             rent: '',
//             imageFile: null,
//             parking: '',
//             water: '',
//             floor: '',
//             roomType: '',
//             latitude : '',
//             longitude : '',

//         },
//         validationSchema: validationSchema,
//         onSubmit: async (values) => {
//             try {
//                 // Display "Uploading..." toast
//                 const uploadingToastId = toast.info("Uploading photo. Please wait...", { autoClose: false });

//                 const formData = new FormData();
//                 formData.append('city', values.city);
//                 formData.append('address', values.address);
//                 formData.append('phone', values.phone);
//                 formData.append('rent', values.rent);
//                 formData.append('imageFile', values.imageFile);
//                 //room key features
//                 formData.append('parking', values.parking);
//                 formData.append('water', values.water);
//                 formData.append('floor', values.floor);
//                 formData.append('roomType', values.roomType);
//                 formData.append('latitude', values.latitude);
//                 formData.append('longitude', values.longitude);


//                 const response = await axios.post(`${import.meta.env.VITE_REACT_APP_URL}/api/v1/upload/uploadimg`, formData);
//                 // console.log(response);

//                 if (response.data.success) {
//                     // Close the "Uploading..." toast
//                     toast.dismiss(uploadingToastId);
//                     // Show "Success" toast
//                     toast.success(response.data.message);
//                     // toast.success("Photo uploaded successfully!");
//                     // Reset the form (including all fields)
//                     // formik.resetForm({ values: { city: '', address: '', phone: '', rent: '', imageFile: null },  });
//                     formik.resetForm();
//                     // After successful post, close the modal
//                     onClose();
//                 }
//             } catch (error) {
//                 if (error.response) {
//                     toast.error(error.response.data.message);
//                 } else {
//                     toast.error("Something went wrong");
//                 }
//             }
//         }
//     });



//     const handleLocationSelection = async () => {
//         try {
//             const position = await new Promise((resolve, reject) => {
//                 navigator.geolocation.getCurrentPosition(resolve, reject);
//             });

//             formik.setFieldValue("latitude", position.coords.latitude);
//             formik.setFieldValue("longitude", position.coords.longitude);
//             toast.success("Location selected successfully!");
//         } catch (error) {
//             if (error.code === 1) {
//                 // User denied geolocation access
//                 toast.error("You've denied access to your location. Please enable geolocation in your browser settings if you wish to proceed.");
//             } else if (error.code === 2) {
//                 toast.error("Location information is currently unavailable. Please try again later.");
//             } else if (error.code === 3) {
//                 toast.error("The request to get your location timed out. Please try again.");
//             } else {
//                 toast.error("Error selecting location. Please try again.");
//             }
//         }
//     };

//     return (
//         <>
//             <div className='postRoom'>
//                 <form className='postRoomForm' onSubmit={(e) => {
//                     e.preventDefault();
//                     formik.handleSubmit();
//                 }}>
//                     <Select
//                         className='custom_select'
//                         onChange={(value) => formik.setFieldValue("city", value)}
//                         placeholder="Select Your City"
//                         showSearch
//                         filterOption={(input, option) =>
//                             option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
//                         }
//                         size='large'>
//                         {Array.isArray(category) &&
//                             category.map((c) => (
//                                 <Option key={c._id} value={c._id}>{c.name}</Option>
//                             ))}
//                         {formik.touched.city && formik.errors.city && <p className='postRoomErrors'>{formik.errors.city}</p>}
//                     </Select>

//                     <div>
//                         <input onChange={formik.handleChange} value={formik.values.address} onBlur={formik.handleBlur} type="text" name="address" placeholder='Enter Your Exact address' />
//                         {formik.touched.address && formik.errors.address && <p className='postRoomErrors'>{formik.errors.address}</p>}
//                     </div>
//                     <div>
//                         <input onChange={formik.handleChange} value={formik.values.phone} onBlur={formik.handleBlur} type="number" name="phone" placeholder='Enter Your Phone Number' />
//                         {formik.touched.phone && formik.errors.phone && <p className='postRoomErrors'>{formik.errors.phone}</p>}
//                     </div>
//                     <div>
//                         <input onChange={formik.handleChange} value={formik.values.rent} onBlur={formik.handleBlur} type="number" name="rent" placeholder='Enter Room Rent' />
//                         {formik.touched.rent && formik.errors.rent && <p className='postRoomErrors'>{formik.errors.rent}</p>}
//                     </div>

//                     <div className='uploadPhoto'>
//                         <input
//                             onChange={(event) => formik.setFieldValue("imageFile", event.currentTarget.files[0])}
//                             type="file"
//                             name="imageFile"
//                             accept="image/*"
//                         />
//                     </div>
//                     {formik.values.imageFile && (
//                         <img src={URL.createObjectURL(formik.values.imageFile)} alt="Preview" height={'100px'} />
//                     )}

//                     {/* ************for room key features************ */}
//                     <div className='parking'>
//                         {/* <label htmlFor="parking">Parking Availability:</label> */}
//                         <select
//                             id="parking"
//                             name="parking"
//                             onChange={formik.handleChange}
//                             onBlur={formik.handleBlur}
//                             value={formik.values.parking}
//                         >
//                             <option value="" label="Parking Availability" />
//                             <option value="yes" label="Yes" />
//                             <option value="no" label="No" />
//                         </select>

//                         {formik.touched.parking && formik.errors.parking && (
//                             <p className="postRoomErrors">{formik.errors.parking}</p>
//                         )}
//                     </div>
//                     <div className='parking'>
//                         {/* <label htmlFor="parking">water available:</label> */}
//                         <select
//                             id="parking"
//                             name="water"
//                             onChange={formik.handleChange}
//                             onBlur={formik.handleBlur}
//                             value={formik.values.water}
//                         >
//                             <option value="" label="water available" />
//                             <option value="yes" label="Yes" />
//                             <option value="no" label="No" />
//                         </select>

//                         {formik.touched.water && formik.errors.water && (
//                             <p className="postRoomErrors">{formik.errors.water}</p>
//                         )}
//                     </div>
//                     <div className='parking'>
//                         {/* <label htmlFor="parking">Floor :</label> */}
//                         <select
//                             id="parking"
//                             name="floor"
//                             onChange={formik.handleChange}
//                             onBlur={formik.handleBlur}
//                             value={formik.values.floor}
//                         >
//                             <option value="" label="Floor " />
//                             <option value="1st" label="1st" />
//                             <option value="2nd" label="2nd" />
//                             <option value="3rd" label="3rd" />
//                             <option value="4th" label="4th" />
//                             <option value="5th" label="5th" />
//                         </select>
//                         {formik.touched.floor && formik.errors.floor && (
//                             <p className="postRoomErrors">{formik.errors.floor}</p>
//                         )}
//                     </div>
//                     <div className='roomType'>
//                         {/* <label htmlFor="room type">Parking Availability:</label> */}
//                         <select
//                             id="parking"
//                             name="roomType"
//                             onChange={formik.handleChange}
//                             onBlur={formik.handleBlur}
//                             value={formik.values.roomType}
//                         >
//                             <option value="" label="Room Type" />
//                             <option value="single room" label="Single Room" />
//                             <option value="double room" label="Double Room" />
//                             <option value="room and kitchen" label="Room and Kitchen" />
//                             <option value="flat" label="Flat" />
//                         </select>

//                         {formik.touched.roomType && formik.errors.roomType && (
//                             <p className="postRoomErrors">{formik.errors.roomType}</p>
//                         )}
//                     </div>

//                     <button type="button" onClick={handleLocationSelection}>Choose Your Location</button>

//                     {/* <button className='postRoomFormBtn' type="submit">Submit</button> */}
//                     <button className='postRoomFormBtn' type="submit" disabled={formik.isSubmitting}>
//                         {formik.isSubmitting ? "Uploading..." : "Submit"}
//                     </button>


//                 </form>
//             </div>
//         </>
//     );
// };

// export default PostYourRoom;













import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Select } from 'antd';
const { Option } = Select;
import * as Yup from 'yup';
import { useFormik } from 'formik';
import '../postRoom/postYourRoom.css'
import { redirect, useNavigate } from 'react-router-dom';

const PostYourRoom = ({ onClose }) => {
    const [category, setCategory] = useState([]);
    const navigate = useNavigate();
    const [locationAccess, setLocationAccess] = useState(null); //for choose your loction button color 


    const getAllCategory = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_REACT_APP_URL}/api/v1/category/allCategory`);

            if (response.data.success) {
                setCategory(response.data.allCategory);
            }

        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message);
            } else {
                toast.error("Something went wrong");
            }
        }
    };

    useEffect(() => {
        getAllCategory();
    }, []);

    const validationSchema = Yup.object({
        address: Yup.string().required("Address is required"),
        phone: Yup.number()
            .typeError('Invalid Phone Number')
            .test('is-exactly-ten-digits', 'Phone Number must be exactly 10 digits', (value) => {
                if (!value) {
                    return true;
                }
                return String(value).length === 10;
            })
            .required('Phone Number is required'),
        imageFile: Yup.string().required("iamge is required"),
        city: Yup.string().required("City is required"),
        // rent: Yup.number().required("Rent is required"),
        rent: Yup.number().required("Rent is required").max(500000, "Room Rent Must be less than 500000"),
        parking: Yup.string().required("Parking filed is requried"),
        water: Yup.string().required("Water filed is requried"),
        floor: Yup.string().required("Floor filed is requried"),
        roomType: Yup.string().required('Room Types is required'),
    })

    const formik = useFormik({
        initialValues: {
            city: '',
            address: '',
            phone: '',
            rent: '',
            imageFile: null,
            parking: '',
            water: '',
            floor: '',
            roomType: '',
            latitude: '',
            longitude: '',

        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                // Display "Uploading..." toast
                const uploadingToastId = toast.info("Uploading photo. Please wait...", { autoClose: false });

                const formData = new FormData();
                formData.append('city', values.city);
                formData.append('address', values.address);
                formData.append('phone', values.phone);
                formData.append('rent', values.rent);
                formData.append('imageFile', values.imageFile);
                //room key features
                formData.append('parking', values.parking);
                formData.append('water', values.water);
                formData.append('floor', values.floor);
                formData.append('roomType', values.roomType);
                formData.append('latitude', values.latitude);
                formData.append('longitude', values.longitude);


                const response = await axios.post(`${import.meta.env.VITE_REACT_APP_URL}/api/v1/upload/uploadimg`, formData);
                // console.log(response);
                console.log("Response:", response)

                if (response.data.success) {
                    // Close the "Uploading..." toast
                    toast.dismiss(uploadingToastId);
                    // Show "Success" toast
                    toast.success(response.data.message);
                    // toast.success("Photo uploaded successfully!");
                    // Reset the form (including all fields)
                    // formik.resetForm({ values: { city: '', address: '', phone: '', rent: '', imageFile: null },  });
                    formik.resetForm();
                    // After successful post, close the modal
                    onClose();
                }
            } catch (error) {
                if (error.response) {
                    toast.error(error.response.data.message);
                } else {
                    toast.error("Something went wrong.");
                    console.log(error)
                }
                
            }
        }
    });


    const handleLocationSelection = async () => {
        try {
            const position = await new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject);
            });

            formik.setFieldValue("latitude", position.coords.latitude);
            formik.setFieldValue("longitude", position.coords.longitude);
            toast.success("Location selected successfully!");
            setLocationAccess(true); // Set location access to true
        } catch (error) {
            if (error.code === 1) {
                toast.error("You've denied access to your location. Please enable location in your browser settings if you wish to proceed.");
            } else if (error.code === 2) {
                toast.error("Location information is currently unavailable. Please try again later.");
            } else if (error.code === 3) {
                toast.error("The request to get your location timed out. Please try again.");
            } else {
                toast.error("Error selecting location. Please try again.");
            }
            setLocationAccess(false); // Set location access to false
        }
    };




    return (
        <>
            <div className='postRoom'>
                <form className='postRoomForm' onSubmit={(e) => {
                    e.preventDefault();
                    formik.handleSubmit();
                }}>
                    <Select
                        className='custom_select'
                        onChange={(value) => formik.setFieldValue("city", value)}
                        placeholder="Select Your City"
                        showSearch
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                        size='large'>
                        {Array.isArray(category) &&
                            category.map((c) => (
                                <Option key={c._id} value={c._id}>{c.name}</Option>
                            ))}
                        {formik.touched.city && formik.errors.city && <p className='postRoomErrors'>{formik.errors.city}</p>}
                    </Select>

                    <div>
                        <input onChange={formik.handleChange} value={formik.values.address} onBlur={formik.handleBlur} type="text" name="address" placeholder='Enter Your Exact address' />
                        {formik.touched.address && formik.errors.address && <p className='postRoomErrors'>{formik.errors.address}</p>}
                    </div>
                    <div>
                        <input onChange={formik.handleChange} value={formik.values.phone} onBlur={formik.handleBlur} type="number" name="phone" placeholder='Enter Your Phone Number' />
                        {formik.touched.phone && formik.errors.phone && <p className='postRoomErrors'>{formik.errors.phone}</p>}
                    </div>
                    <div>
                        <input onChange={formik.handleChange} value={formik.values.rent} onBlur={formik.handleBlur} type="number" name="rent" placeholder='Enter Room Rent' />
                        {formik.touched.rent && formik.errors.rent && <p className='postRoomErrors'>{formik.errors.rent}</p>}
                    </div>

                    <div className='uploadPhoto'>
                        <input
                            onChange={(event) => formik.setFieldValue("imageFile", event.currentTarget.files[0])}
                            type="file"
                            name="imageFile"
                            accept="image/*"
                        />
                    </div>
                    {formik.values.imageFile && (
                        <img src={URL.createObjectURL(formik.values.imageFile)} alt="Preview" height={'100px'} />
                    )}

                    {/* ************for room key features************ */}
                    <div className='parking'>
                        {/* <label htmlFor="parking">Parking Availability:</label> */}
                        <select
                            id="parking"
                            name="parking"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.parking}
                        >
                            <option value="" label="Parking Availability" />
                            <option value="yes" label="Yes" />
                            <option value="no" label="No" />
                        </select>

                        {formik.touched.parking && formik.errors.parking && (
                            <p className="postRoomErrors">{formik.errors.parking}</p>
                        )}
                    </div>
                    <div className='parking'>
                        {/* <label htmlFor="parking">water available:</label> */}
                        <select
                            id="parking"
                            name="water"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.water}
                        >
                            <option value="" label="water available" />
                            <option value="yes" label="Yes" />
                            <option value="no" label="No" />
                        </select>

                        {formik.touched.water && formik.errors.water && (
                            <p className="postRoomErrors">{formik.errors.water}</p>
                        )}
                    </div>
                    <div className='parking'>
                        {/* <label htmlFor="parking">Floor :</label> */}
                        <select
                            id="parking"
                            name="floor"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.floor}
                        >
                            <option value="" label="Floor " />
                            <option value="1st" label="1st" />
                            <option value="2nd" label="2nd" />
                            <option value="3rd" label="3rd" />
                            <option value="4th" label="4th" />
                            <option value="5th" label="5th" />
                        </select>
                        {formik.touched.floor && formik.errors.floor && (
                            <p className="postRoomErrors">{formik.errors.floor}</p>
                        )}
                    </div>
                    <div className='roomType'>
                        {/* <label htmlFor="room type">Parking Availability:</label> */}
                        <select
                            id="parking"
                            name="roomType"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.roomType}
                        >
                            <option value="" label="Room Type" />
                            <option value="single room" label="Single Room" />
                            <option value="double room" label="Double Room" />
                            <option value="room and kitchen" label="Room and Kitchen" />
                            <option value="flat" label="Flat" />
                        </select>

                        {formik.touched.roomType && formik.errors.roomType && (
                            <p className="postRoomErrors">{formik.errors.roomType}</p>
                        )}
                    </div>

                    {/* <button id='parking' type="button" onClick={handleLocationSelection}>Choose Your Location</button> */}
                    <p
                        id='parking'
                        type="button"
                        onClick={handleLocationSelection}
                        className={locationAccess === null ? '' : locationAccess ? 'location-access-allowed' : 'location-access-denied'}
                    >
                        {locationAccess === null ? 'Choose Your Location' : locationAccess ? 'Location Set Successfully' : 'Choose Your Location'}
                    </p>



                    {/* <button className='postRoomFormBtn' type="submit">Submit</button> */}

                    {/* <button className='postRoomFormBtn' type="submit" disabled={formik.isSubmitting}>
                        {formik.isSubmitting ? "Uploading..." : "Submit"}
                    </button> */}


                    <button className='postRoomFormBtn' type="submit" disabled={formik.isSubmitting || !(formik.values.latitude && formik.values.longitude)}>
                        {formik.isSubmitting ? "Uploading..." : "Submit"}
                    </button>



                </form>
            </div>
        </>
    );
};

export default PostYourRoom;



