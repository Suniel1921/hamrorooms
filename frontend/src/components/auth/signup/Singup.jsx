import React, { useState } from 'react';
import '../signup/signup.css';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import axios from "axios";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { FaRegEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import OTPModal from '../../../pages/OTPmodal/OTPModel';
import Loading from './Loading';

// Functional component for Signup form
const Signup = ({ onClose }) => {
  // React Router's navigation hook
  const navigate = useNavigate();

  // State variables
  const [showPassword, setShowPassword] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [loading, setLoading] = useState(false); // Added loading state

  // Toggle show/hide password
  const handleShowHidePassword = () => {
    setShowPassword(!showPassword);
  }

  // Validation schema using Yup
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
        .email("Invalid Email")
        .required("Email is required")
        .matches(/@gmail\.com$/, "Email must contain @gmail.com"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required")
});


  // Formik hook for form management
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true); // Set loading to true when submitting the form
        const response = await axios.post(`${import.meta.env.VITE_REACT_APP_URL}/api/v1/auth/signup`, values);
        if (response.data.success) {
          toast.success(response.data.message);
          setUserEmail(values.email);
          setIsOTPModalOpen(true);
          onClose(); // Close the signup modal
        }
      } catch (error) {
        if (error.response) {
          toast.error(error.response.data.message);
        }
        // } else {
        //   toast.error("Something went wrong !");
        // }
      } finally {
        setLoading(false); // Set loading back to false regardless of success or failure
      }
    },
  });

  // JSX for the Signup form
  return (
    <>
      <div className='signup'>
        <h2 className='signupTextCenter'>Signup Here</h2>
        <form className='form' onSubmit={formik.handleSubmit}>
          <input onChange={formik.handleChange} value={formik.values.name} onBlur={formik.handleBlur} type="text" name="name" placeholder='Name' />
          {formik.touched.name && formik.errors.name && <p className='errors'>{formik.errors.name}</p>}
          <input onChange={formik.handleChange} value={formik.values.email} onBlur={formik.handleBlur} type="email" name="email" placeholder='Email' />
          {formik.touched.email && formik.errors.email && <p className='errors'>{formik.errors.email}</p>}
          <input onChange={formik.handleChange} value={formik.values.password} onBlur={formik.handleBlur} type={showPassword ? 'text' : 'password'} name="password" placeholder='Password' />
          <i className='eyesIcon' onClick={handleShowHidePassword}>
            {showPassword ? <FaEyeSlash size={18} /> : <FaRegEye size={18} />}
          </i>
          {formik.touched.password && formik.errors.password && <p className='errors'>{formik.errors.password}</p>}
          <button type='submit' className='btn'>
            {/* {loading ? <Loading/> : 'Sign up'} */}
            {loading ? 'Signup...' : 'Sign up'}
          </button>
        </form>
      </div>
      {userEmail && <OTPModal email={userEmail} onClose={() => { onClose(); setUserEmail(''); }} />}
    </>
  );
}

export default Signup;
