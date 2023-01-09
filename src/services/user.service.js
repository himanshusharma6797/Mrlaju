// data service
// Now we define a service for accessing data


import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://182.239.43.161:8089/api/mrLaju/";

const getPublicContent = () => {
  return axios.get(API_URL + "all");
};

const postOperatorRegister = () => {
  return axios.post(API_URL + "operator/register", { headers: authHeader() });
};

const postMerchantRegister = () => {
  return axios.post(API_URL + "merchant/registerMerchant", { headers: authHeader() });
};

const services = {
  getPublicContent,
  postOperatorRegister,
  postMerchantRegister
};

export default services


// You can see that we add a HTTP header with the help of authHeader() function when requesting authorized resource.