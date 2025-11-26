import axios from 'axios'
const axiosInterceptor = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // ✅ this adds /api automatically
})

// Get users
const getStocks = async (params: any) => {
  const response = await axiosInterceptor.get(`/Stock/list`, {params})
  console.log('StockService response:', response.data)
  return response.data
}


const supplierService = {
  getStocks,
}

export default supplierService
