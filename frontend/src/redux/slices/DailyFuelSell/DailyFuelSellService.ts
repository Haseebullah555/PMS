import axios from "axios"
const axiosInterceptor = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // ✅ this adds /api automatically
})

const getDailyFuelSells = async (params: any) => {
  const response = await axiosInterceptor.get(`/DailyFuelSell/list`, {params})
    return response.data
}

const store = async (formData: any) => {
  console.log('formData', formData);
  const response = await axiosInterceptor.post('/DailyFuelSell/create', formData)
  return response.data
}

const dailyFuelSellService = {
    store,
    getDailyFuelSells
}
export default dailyFuelSellService