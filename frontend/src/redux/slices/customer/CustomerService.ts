import axios from 'axios'
const axiosInterceptor = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // ✅ this adds /api automatically
})
// Get list of All customers
const getCustomersList = async () => {
  const response = await axiosInterceptor.get(`/Customer/listAll`)
  return response.data
}
// Get customers
const getCustomers = async (params: any) => {
  const response = await axiosInterceptor.get(`/Customer/list`, {params})
  return response.data
}
// Get customers with Details
const getCustomersWithDetails = async (params: any) => {
  const response = await axiosInterceptor.get(`/Customer/getCustomersWithDetials`, {params})
  return response.data
}

const store = async (formData: any) => {
  console.log('formData', formData);
  const response = await axiosInterceptor.post('/Customer/create', formData)
  return response.data
}

const update = async (formData: any) => {
  const response = await axiosInterceptor.post('/Customer/update', formData)
  return response.data
}

const CustomerService = {
  getCustomers,
  getCustomersList,
  getCustomersWithDetails,
  store,
  update,
}

export default CustomerService
