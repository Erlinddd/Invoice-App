import axios from 'axios';


const baseURL="https://localhost:44362/api";
console.log("BaseUrl",baseURL)


const axiosInstance=axios.create({
    baseURL:baseURL,
  
});

export default axiosInstance;