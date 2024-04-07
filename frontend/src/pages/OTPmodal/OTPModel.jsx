import React, { useState } from 'react';
import { Modal, Input, Button } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet';

// Functional component for OTP verification modal
const OTPModal = ({ email, onClose }) => {
  // State variable for OTP
  const [otp, setOTP] = useState('');
  
  // React Router's navigation hook
  const navigate = useNavigate();

  // Function to handle OTP verification
  const handleVerify = async () => {
    if (otp.trim() === '') {
      toast.error('Please enter the OTP');
    } else {
      try {
        // Sending OTP verification request to the server
        const response = await axios.post(`${import.meta.env.VITE_REACT_APP_URL}/api/v1/auth/verifyOTP`, { email, otp });

        if (response.data.success) {
          toast.success(response.data.message);
          // toast.success('OTP verification successful');
          onClose(); 
          navigate('/');
        } else {
          toast.error(`OTP verification failed: ${response.data.message}`);
        }
      } catch (error) {
        if (error.response) {
          toast.error(error.response.data.message);
        } else {
          toast.error('Failed to verify OTP');
        }
      }
    }
  };

  
  return (
    <>
      <Helmet>
        <title>OTP Verification | Hamro Rooms</title>
        <meta name="description" content="Verify OTP for email address on Hamro Rooms" />
      </Helmet>
      <Modal
        open={true}
        title="Enter OTP"
        onCancel={onClose}
        footer={[
          <Button key="verify" type="primary" onClick={handleVerify} style={{ background: '#7371F9'}}>
            Verify OTP
          </Button>,
        ]}
      >
        <p style={{ marginBottom: '14px' }}>
          We have sent an OTP to your Gmail. Please check your email and enter the OTP below to verify your email address.
        </p>
        {/* Input field for entering OTP */}
        <Input 
          type="number"
          value={otp}
          onChange={(e) => setOTP(e.target.value)}
          placeholder="Enter Your OTP"
          style={{height: '38px'}}
        />
      </Modal>
    </>
  );
};

export default OTPModal;
