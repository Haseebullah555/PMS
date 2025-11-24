import axios from 'axios'

// Get users
const getFuelTypes = async (params: any) => {
  const response = await axios.get(`/FuelType/list`, {params})
  return response.data
}

const store = async (formData: any) => {
  console.log('formData', formData);
  const response = await axios.post('/FuelType/create', formData)
  return response.data
}

const update = async (formData: any) => {
  const response = await axios.post('/FuelType/update', formData)
  return response.data
}

const FuelTypeService = {
  getFuelTypes,
  store,
  update,
}

export default FuelTypeService
