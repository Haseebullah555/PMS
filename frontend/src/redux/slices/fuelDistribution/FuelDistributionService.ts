import axios from "axios"
const axiosInterceptor = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // ✅ this adds /api automatically
})

const getFuelStandWithDetials = async () => {
  const response = await axiosInterceptor.get(`/FuelDistribution/StandFuelWithDetials`)
  console.log(response);
    return response.data
}
//get list of fuel distributions
const getFuelDistributions = async (params: any) => {
  const response = await axiosInterceptor.get('/FuelDistribution/list', {params});
  return response.data;
}

const store = async (formData: any) => {
  console.log('formData', formData);
  const response = await axiosInterceptor.post('/FuelDistribution/create', formData)
  return response.data
}
const update = async (formData: any) => {
  console.log('formData', formData);
  const response = await axiosInterceptor.post('/FuelDistribution/update', formData)
  return response.data
}

const fuelDistributionService = {
    getFuelStandWithDetials,
    getFuelDistributions,
    store,
    update
}
export default fuelDistributionService