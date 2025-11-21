import axios from "axios";

console.log('=======env url', import.meta.env.API_BASE_URL)

const axiosInstance = axios.create({
    baseURL: import.meta.env.API_BASE_URL
})


export default axiosInstance