import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Outlet, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuthGloabally } from '../../../context/AuthContext';
import Spinner from '../../spinner/Spinner';
import Loading from '../../auth/signup/Loading';

const AdminRoute = () => {
    const [ok, setOk] = useState(false);
    const [auth, setAuth] = useAuthGloabally();
    const navigate = useNavigate();

    useEffect(() => {
        const authCheck = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_REACT_APP_URL}/api/v1/auth/admin`);
                if (response.data.ok) {
                    setOk(true);
                } else {
                    setOk(false);
                }
            } catch (error) {
                console.error('Error checking authentication:', error);
                setOk(false);
            }
        };

        if (auth?.token) {
            authCheck();
        }
    }, [auth?.token]);

    return ok ? <Outlet/> : <Loading /> 
};

export default AdminRoute;



