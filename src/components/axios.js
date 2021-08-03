import axios from 'axios';


const baseURL="https://localhost:44362/api";
console.log("BaseUrl",baseURL)


const axiosInstance=axios.create({
    baseURL:baseURL,
    
  
});

  // Set the AUTH token for any request
  axiosInstance.interceptors.request.use(function (config) {
      
    const token = localStorage.getItem('token');
    config.headers.Authorization =  token ? `Bearer ${token}` : '';
    return config;
    
  });
console.log('axiosCreate')

export default axiosInstance;