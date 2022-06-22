import axios from "axios";


const axiosInstance = axios.create({
    baseURL: 'https://linkr-back-end.herokuapp.com/'
})


export default axiosInstance;