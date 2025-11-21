import axios from "axios";

console.log('=======env url', import.meta.env.VITE_API_BASE_URL)

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL
})


export default axiosInstance