
import React, { useEffect } from 'react';
import axios from "axios";
import server from "../environment.js";
import { useNavigate } from "react-router-dom";

const withAuth = (WrappedComponent) => {
    const AuthComponent = (props) => {
        const navigate = useNavigate();

        useEffect(() => {
            const checkAuth = async () => {
                try {
                    let result = await axios.get(`${server}/api/v1/miteo/user/getCookie`, { withCredentials: true });
                    if (!result.data.success) {
                        navigate("/auth");
                    }
                } catch (error) {
                    console.error("Error checking cookie:", error);
                    navigate("/auth");
                }
            };

            checkAuth(); // Function ko call karna zaroori hai
        }, []); 

        return <WrappedComponent {...props} />
    }

    return AuthComponent;
} 

export default withAuth;