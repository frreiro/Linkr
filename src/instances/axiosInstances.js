import axios from "axios";


const axiosInstance = axios.create({
    baseURL: 'http://linkr-back-end.herokuapp.com/'
})


export default axiosInstance;