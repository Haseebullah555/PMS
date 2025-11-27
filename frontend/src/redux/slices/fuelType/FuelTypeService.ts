import axios from "axios"
const axiosInterceptor = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // ✅ this adds /api automatically
})

const getFuelTypes = async (params: any) => {
    const response = await axiosInterceptor.get(`/FuelType/list`, {params})
    return response.data
}

const store = async (formData : any) => {
    const response = await axiosInterceptor.post('/FuelType/create', formData)
    return response.data;
}

const update = async (formData : any) => {
    const response = await axiosInterceptor.post('/FuelType/update', formData);
    return response.data
}
const fuelTypeService = {
    getFuelTypes,
    store,
    update,
}
export default fuelTypeService