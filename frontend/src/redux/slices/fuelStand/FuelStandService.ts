import axios from "axios"
const axiosInterceptor = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // ✅ this adds /api automatically
})

const getFuelStands = async (params: any) => {
    const response = await axiosInterceptor.get(`/FuelStand/list`, {params})
    return response.data
}

const store = async (formData : any) => {
    const response = await axiosInterceptor.post('/FuelStand/create', formData)
    return response.data;
}

const update = async (formData : any) => {
    const response = await axiosInterceptor.post('/FuelStand/update', formData);
    return response.data
}
const fuelStandService = {
    getFuelStands,
    store,
    update,
}
export default fuelStandService