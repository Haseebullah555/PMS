import axios from "axios"
const axiosInterceptor = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // ✅ this adds /api automatically
})

const getFuelStandWithDetials = async (params: any) => {
  const response = await axiosInterceptor.get(`/FuelDistribution/StandFuelWithDetials`, {params})
    return response.data
}

const fuelDistributionService = {
    getFuelStandWithDetials,
}
export default fuelDistributionService