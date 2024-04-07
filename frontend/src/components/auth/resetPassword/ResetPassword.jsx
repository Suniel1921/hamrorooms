import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ResetPassword = () => {
    const { token } = useParams();
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleResetPassword = async () => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_REACT_APP_URL}/api/v1/auth/resetPassword/${token}`,
                { newPassword: password }
            );
            if (response.data.success) {
                setMessage('Password reset successfully.');
            } else {
                setMessage('Failed to reset password. Please try again.');
            }
        } catch (error) {
            setMessage('An error occurred while resetting password.');
            console.error('Error resetting password:', error);
        }
    };

    return (
        <>
            <div>
                <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button onClick={handleResetPassword}>Reset Password</button>
            </div>
            {message && <p>{message}</p>}
        </>
    );
};

export default ResetPassword;
