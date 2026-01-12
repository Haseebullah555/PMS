import axios from 'axios'

const axiosInterceptor = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // ✅ this adds /api automatically
})
console.log('Base URL:', process.env.REACT_APP_API_URL);



// Get users
// console.log(api, 'axioxxxxxxxxxxxxulr')
const getSuppliers = async (params: any) => {
  const response = await axiosInterceptor.get(`/Supplier/list`, {params})
  return response.data
}
const getAllSuppliers = async () => {
  const response = await axiosInterceptor.get(`Supplier/listAll`)
  return response.data
}
// Get roles by system id.
const getRolesBySystemId = async (systems_id: any) => {
  const response = await axiosInterceptor.post(`api/role/get-roles-by-system-id`, {systems_id: systems_id})
  return response.data
}

const store = async (formData: any) => {
  console.log('formData', formData);
  const response = await axiosInterceptor.post('/Supplier/create', formData)
  return response.data
}

const update = async (formData: any) => {
  console.log(formData,"1231313135");
  const response = await axiosInterceptor.post('/Supplier/update', formData)
  return response.data
}

const supplierService = {
  getSuppliers,
  getAllSuppliers,
  getRolesBySystemId,
  store,
  update,
}

export default supplierService
