import axios from 'axios'
import * as jwt_decode from 'jwt-decode'
import {logOutUserAction} from '../slices/authenticationSlices/authenticationSlice'
import {apiUrl} from '../../apiUrl'

// import { store } from "../store/store";

const axiosInterceptor = axios.create({
  baseURL: apiUrl, // Replace with your API base URL
})

console.log('Base URL:', apiUrl);


// const axiosInterceptor = axios.create({
//   baseURL: process.env.REACT_APP_API_URL, // ✅ this adds /api automatically
// })


 
function tokenIsNotValid(token) {
  if (!token) {
    return true // Token does not exist
  }

  try {
    const decoded = jwt_decode(token)
    const currentTime = Date.now() / 1000
    return decoded.exp < currentTime // Token is expired
  } catch (error) {
    return true // Token is not valid
  }
}

// Request interceptor
axiosInterceptor.interceptors.request.use(
  (request) => {
    const {contentType} = request.headers

    // Modify the request config here (e.g., add headers, authentication tokens)
    const userDetail = JSON.parse(localStorage.getItem('kt-auth-react-v'))
    // ** If token is present add it to request's Authorization Header
    if (!userDetail.api_token && tokenIsNotValid(userDetail.api_token)) {
      // localStorage.removeItem("userDetail");
      const store = require('../store/store').default
      store.dispatch(logOutUserAction())
      window.location.href = '/login'
    } else {
      // if (request.headers) {
      request.headers.Authorization = 'Bearer ' + userDetail.api_token
      // request.headers['Content-Type'] = 'application/json'
      // request.headers['Content-Type'] = contentType || 'multipart/form-data'
      request.headers['Content-Type'] = contentType || 'application/json'
      // }
    }
    return request
  },
  (error) => {
    // Handle request errors here

    return Promise.reject(error)
  }
)

// Response interceptor
// axiosInstance.interceptors.response.use(
//   (response) => {
//     // Modify the response data here (e.g., parse, transform)

//     return response;
//   },
//   (error) => {
//     // Handle response errors here

//     return Promise.reject(error);
//   }
// );

export default axiosInterceptor

// import axios from "axios";
// import { apiUrl } from "../../general/apiUrl";
// import * as jwt_decode from "jwt-decode";
// import { logOutUserAction } from "../slices/authSlices/authSlice";

// const axiosInterceptor = axios.create({
//   baseURL: apiUrl, // Replace with your API base URL
// });

// function tokenIsNotValid(token) {
//   if (!token) {
//     return true; // Token does not exist
//   }

//   try {
//     const decoded = jwt_decode(token);
//     const currentTime = Date.now() / 1000;
//     return decoded.exp < currentTime; // Token is expired
//   } catch (error) {
//     return true; // Token is not valid
//   }
// }

// // Function to refresh the api_token token
// async function refreshAccessToken() {
//   // const refreshToken = localStorage.getItem("refreshToken");
//   try {
//     const response = await axios.post(
//       apiUrl + "refresh"

//       // , {
//       //   refreshToken: refreshToken,
//       // }
//     );
//     const { api_token } = response.data;
//     // Update the api_token token in local storage
//     localStorage.setItem(
//       "userDetail",
//       // JSON.stringify({ api_token, refreshToken })
//       JSON.stringify({ api_token })
//     );
//     return api_token;
//   } catch (error) {
//     throw error;
//   }
// }

// // Request interceptor
// axiosInterceptor.interceptors.request.use(
//   async (request) => {
//     // Modify the request config here (e.g., add headers, authentication tokens)
//     const userDetail = JSON.parse(localStorage.getItem("userDetail"));
//     // ** If token is present add it to request's Authorization Header
//     if (!userDetail.api_token || tokenIsNotValid(userDetail.api_token)) {
//       try {
//         const newAccessToken = await refreshAccessToken();
//         userDetail.api_token = newAccessToken;
//         request.headers.Authorization = "Bearer " + newAccessToken;
//         request.headers["Content-Type"] = "application/json";
//       } catch (error) {
//         const store = require("../store/store").default;
//         store.dispatch(logOutUserAction());
//         window.location.href = "/login";
//         return Promise.reject(error);
//       }
//     } else {
//       request.headers.Authorization = "Bearer " + userDetail.api_token;
//       request.headers["Content-Type"] = "application/json";
//     }
//     return request;
//   },
//   (error) => {
//     // Handle request errors here
//     return Promise.reject(error);
//   }
// );

// export default axiosInterceptor;
