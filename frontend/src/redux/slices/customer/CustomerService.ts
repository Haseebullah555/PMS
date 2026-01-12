import axios from 'axios'
const axiosInterceptor = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // ✅ this adds /api automatically
})

// Get customers list
const getCustomersList = async () => {
  const response = await axiosInterceptor.get(`/Customer/list`)
  return response.data
}
//  Get list with params of All customers
const getCustomersListWithParams = async (params: any) => {
  const response = await axiosInterceptor.get(`/Customer/listWithParams`, { params })
  return response.data
}
// Get customers with Details
const getCustomersWithDetails = async (params: any) => {
  const response = await axiosInterceptor.get(`/Customer/getCustomersWithDetials`, { params })
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
  getCustomersListWithParams,
  getCustomersList,
  getCustomersWithDetails,
  store,
  update,
}

export default CustomerService
