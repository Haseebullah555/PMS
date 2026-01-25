import axios from 'axios'
const axiosInterceptor = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // ✅ this adds /api automatically
})

// Get Annual Sales Data
const getAllMonthlySalesList = async () => {
  const response = await axiosInterceptor.get(`/DashBoard/annual-fuel-sales`)
  return response.data
}
// Get Daily Sales Data
const getAllDailySalesList = async () => {
  const response = await axiosInterceptor.get(`/DashBoard/daily-fuel-sales`)
  return response.data
}


const DashboardService = {
  getAllMonthlySalesList,
  getAllDailySalesList,
}

export default DashboardService
