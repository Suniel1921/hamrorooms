import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({children})=>{
    const [auth, setAuth] = useState({
        user: null,
        token : '',
    });

    //adding header for private route (default axios)
    axios.defaults.headers.common['Authorization'] = auth?.token

    //fetching user token from localstorage (already save token in localstorage)
    useEffect(()=>{
        const data = localStorage.getItem('token');
        if(data){
            const parseData = JSON.parse(data);
            setAuth({...auth, 
            user: parseData.userExit,
            token : parseData.token,
            })
        }

    },[])

    

    return <AuthContext.Provider value={[auth,setAuth]}>
        {children}
    </AuthContext.Provider>
}

//custom hook
const useAuthGloabally = ()=>{
    return useContext(AuthContext);
}

export {AuthProvider, AuthContext, useAuthGloabally}