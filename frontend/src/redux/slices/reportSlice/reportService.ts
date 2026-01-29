import axios from 'axios'
const axiosInterceptor = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // ✅ this adds /api automatically
})

// get the fuel summary report data through fromDate - toDate range
const getFuelSummary = async (params: any) => {
  const response = await axiosInterceptor.get(`api/Report/fuel-summary`, { params })
  return response.data
}

const ReportService = {
  getFuelSummary,
}

export default ReportService
