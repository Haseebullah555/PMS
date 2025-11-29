import axios from "axios"

const axiosInterceptor = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // ✅ this adds /api automatically
})

const getFuelTypes = async (params: any) => {
    const response = await axiosInterceptor.get(`/FuelType/list`, {params})
    return response.data
}
const getAllFuelType = async () => {
  const response = await axiosInterceptor.get(`FuelType/listAll`)
  return response.data
}
const storeFuelType = async (formData : any) => {
    console.log(formData, 'dddddddd');
    const response = await axiosInterceptor.post('/FuelType/create', formData)
    return response.data;
}

const updateFuelType = async (formData : any) => {
    const response = await axiosInterceptor.post('/FuelType/update', formData);
    return response.data
}
const fuelTypeService = {
    getFuelTypes,
    getAllFuelType, 
    storeFuelType,
    updateFuelType,
}
export default fuelTypeService