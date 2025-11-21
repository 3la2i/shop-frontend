import axios from "axios";

console.log('=======env urldsd', process.env.API_BASE_URL)

const axiosInstance = axios.create({
    baseURL: process.env.API_BASE_URL
})


export default axiosInstance