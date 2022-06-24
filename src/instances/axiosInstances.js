import axios from "axios";


const axiosInstance = axios.create({
    baseURL: 'https://linkr-back-end.herokuapp.com/'
    // baseURL: "http://localhost:5000"
})


export default axiosInstance;