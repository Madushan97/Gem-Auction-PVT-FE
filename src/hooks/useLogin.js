
import { useState } from "react";
import axios from "axios";

const useLogin = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const login = async (username, password, onSuccess, onError) => {
        if (isSubmitting) return;
        setIsSubmitting(true);

        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_BASE_URL}/user/login`,
                { username, password }
            );

            const token = response.data.token;

            if (token) {
                sessionStorage.setItem("token", token);
                console.log("Token stored in session storage");
                setIsLoggedIn(true); // Update login state
                if (onSuccess) onSuccess(); // Call success callback if provided
            } else {
                console.error("Token not received");
                if (onError) onError(new Error("Token not received"));
            }
        } catch (error) {
            console.error("Login failed:", error);
            if (onError) onError(error); // Call error callback if provided
        } finally {
            setIsSubmitting(false);
        }
    };

    const logout = () => {
        setIsLoggedIn(false);
        sessionStorage.removeItem("token");
        console.log("Logged out and token cleared");
    };

    return { isSubmitting, isLoggedIn, login, logout };
};

export default useLogin;
