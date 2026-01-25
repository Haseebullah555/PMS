import axios from 'axios'
const axiosInterceptor = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // ✅ this adds /api automatically
})

// Get customers list
const getAllMonthlySalesList = async () => {
  const response = await axiosInterceptor.get(`/DashBoard/annual-fuel-sales`)
  return response.data
}


const DashboardService = {
  getAllMonthlySalesList,
}

export default DashboardService
