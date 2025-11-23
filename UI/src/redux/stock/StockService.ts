import axios from 'axios'

// Get users
const getStocks = async (params: any) => {
  const response = await axios.get(`/Stock/list`, {params})
  console.log('StockService response:', response.data)
  return response.data
}


const supplierService = {
  getStocks,
}

export default supplierService
