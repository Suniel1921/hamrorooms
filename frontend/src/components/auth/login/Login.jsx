// import React, { useState } from "react";
// import "../login/login.css";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import { toast } from "react-toastify";
// import axios from "axios";
// import { useAuthGloabally } from "../../../context/AuthContext";
// import { FaRegEye } from "react-icons/fa";
// import { FaEyeSlash } from "react-icons/fa";

// const Login = ({ onCloseModal }) => { //accessing prop for close login modal (onCloseModal)
//   const [auth, setAuth] = useAuthGloabally();
//   //form validation
//   const validationSchema = Yup.object({
//     email : Yup.string().email("Invalid Email").required("Email is required"),
//     password : Yup.string().required("Password is required"),
//   })
//   const [showPassword, setShowPassword] = useState(false);
//    // Toggle show/hide password
//    const handleShowHidePassword = () => {
//     setShowPassword(!showPassword);
//   }
 
//   const formik = useFormik({
//     initialValues:{
//       email: '',
//       password: '',
//     },
//     validationSchema: validationSchema,
//     onSubmit : async (values)=>{
//       try {
//         const response = await axios.post(`${import.meta.env.VITE_REACT_APP_URL}/api/v1/auth/login`,(values));
//         if(response && response?.data?.success){
//           toast.success(response?.data?.message);
//           setAuth({...auth,
//           user : response?.data?.userExit,
//           token : response?.data?.token
//         })
//         //saving token in localstorage
//         localStorage.setItem('token', JSON.stringify(response.data))
//         onCloseModal(); // Close login modal
//         formik.resetForm(); //once form is submitted then form will be empty
//         }
        
//       } catch (error) {
//         if(error.response){
//           toast.error(error.response.data.message);
//         }
//         else{
//           toast.error("Something went wrong !")
//         }
        
//       }

//     }
//   })

//   return (
//     <>
//       <div className="login">
//         <h2 className="signupTextCenter">Login Here</h2>
//         <form className="form" onSubmit={formik.handleSubmit}>
//           <input onChange={formik.handleChange} value={formik.values.email} onBlur={formik.handleBlur} type="email" name="email" placeholder="Email" />
//           {formik.touched.email && formik.errors.email && <p className="errors">{formik.errors.email}</p>}
//           <input onChange={formik.handleChange} value={formik.values.password} onBlur={formik.handleBlur} type={showPassword ? 'text' : 'password'} name="password" placeholder='Password' />
//           <i className='eyesIcon' onClick={handleShowHidePassword}>
//             {showPassword ? <FaEyeSlash size={18} /> : <FaRegEye size={18} />}
//           </i>
//           {formik.touched.password && formik.errors.password && <p className="errors">{formik.errors.password}</p>}
//           <button type="submit" className="btn">Login</button>
//         </form>
//       </div>
//     </>
//   );
// };

// export default Login;







import React, { useState } from "react";
import "../login/login.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import axios from "axios";
import { useAuthGloabally } from "../../../context/AuthContext";
import { FaRegEye, FaEyeSlash } from "react-icons/fa";

const Login = ({ onCloseModal }) => {
  const [auth, setAuth] = useAuthGloabally();
  const [showPassword, setShowPassword] = useState(false);

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid Email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleShowHidePassword = () => {
    setShowPassword(!showPassword);
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log('Form submitted'); // Debug log
      try {
        const response = await axios.post(`${import.meta.env.VITE_REACT_APP_URL}/api/v1/auth/login`, values);
        if (response && response.data.success) {
          console.log('Success toast'); // Debug log
          toast.success(response.data.message); // Show success toast
          setAuth({
            ...auth,
            user: response.data.userExit,
            token: response.data.token,
          });
          localStorage.setItem('token', JSON.stringify(response.data)); // Save token in localStorage
          onCloseModal(); // Close login modal
          formik.resetForm(); // Reset form
        } else {
          // Handle non-successful response
          console.log('Error toast'); // Debug log
          toast.error(response.data.message || "Login failed");
        }
      } catch (error) {
        console.log('Error catch block'); // Debug log
        if (error.response) {
          console.log('Error toast'); // Debug log
          toast.error(error.response.data.message); // Show error toast with server message
        } else {
          console.log('Error toast'); // Debug log
          toast.error("Something went wrong!"); // Show generic error toast
        }
      }
    },
  });

  return (
    <div className="login">
      <h2 className="signupTextCenter">Login Here</h2>
      <form className="form" onSubmit={formik.handleSubmit}>
        <input
          onChange={formik.handleChange}
          value={formik.values.email}
          onBlur={formik.handleBlur}
          type="email"
          name="email"
          placeholder="Email"
        />
        {formik.touched.email && formik.errors.email && (
          <p className="errors">{formik.errors.email}</p>
        )}
        <input
          onChange={formik.handleChange}
          value={formik.values.password}
          onBlur={formik.handleBlur}
          type={showPassword ? 'text' : 'password'}
          name="password"
          placeholder="Password"
        />
        <i className="eyesIcon" onClick={handleShowHidePassword}>
          {showPassword ? <FaEyeSlash size={18} /> : <FaRegEye size={18} />}
        </i>
        {formik.touched.password && formik.errors.password && (
          <p className="errors">{formik.errors.password}</p>
        )}
        <button type="submit" className="btn">Login</button>
      </form>
    </div>
  );
};

export default Login;
