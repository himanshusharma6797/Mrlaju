// authentication service

import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;
axios.defaults.baseURL = BASE_URL;

const register = async (email, password, countryCodeId, mobileNumber, otp, name) => {
    const response = await axios.post(BASE_URL + "auth/register", {
        mobileNumber,
        countryCodeId,
        name,
        email,
        password,
        otp
    });
    console.log('register', response);
    if (response.data.data.accessToken) {
        localStorage.setItem("token", JSON.stringify(response.data.data.accessToken));
    }
    return response.data;
};

const login = async (userId, password, countryCodeId, mobileNumber) => {
    const response = await axios
        .post(BASE_URL + "auth/login", {
            userId,
            countryCodeId,
            mobileNumber,
            password
        });
    console.log('login', response);
    if (response.data.data.accessToken) {
        localStorage.setItem("token", JSON.stringify(response.data.data.accessToken));
    }
    if (response.data.data.data.id) {
        localStorage.setItem("userId", JSON.stringify(response.data.data.data.id));
    }
    return response.data;
};

const forgotPassword = async (password, countryCodeId, mobileNumber, otp) => {
    const response = await axios.post(BASE_URL + "auth/forgetPassword", {
        countryCodeId,
        otp,
        mobileNumber,
        password
    });
    console.log('forgotPassword', response);
    return response.data;
};

const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
};

export const authAxios = axios.create();
authAxios.interceptors.request.use(
    config => {
        const token = JSON.parse(localStorage.getItem('token'));
        if (token) {
            config.headers.Authorization = "Bearer " + token
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
);

authAxios.interceptors.response.use(
    response => response,
    error => {
        const { status } = error.response;
        if (status === 401) {
            logout();
            // window.location.href = '/login'
        }
        return Promise.reject(error)
    }
);

export const unAuthAxios = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
        //   "Client-Name": CLIENT_NAME,
    },
});


const services = {
    register,
    login,
    forgotPassword,
    logout,
    authAxios,
    unAuthAxios
};

export default services