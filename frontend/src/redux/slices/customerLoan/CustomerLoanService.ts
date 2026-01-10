import axios from 'axios'
const axiosInterceptor = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // ✅ this adds /api automatically
})
// Get users
const getCustomerLoans = async (params: any) => {
  const response = await axiosInterceptor.get(`/CustomerLoan/list`, {params})
  return response.data
}

const store = async (formData: any) => {
  console.log('formData', formData);
  const response = await axiosInterceptor.post('/CustomerLoan/create', formData)
  return response.data
}

const update = async (formData: any) => {
  const response = await axiosInterceptor.post('/CustomerLoan/update', formData)
  return response.data
}

const CustomerLoanService = {
  getCustomerLoans,
  // getRolesBySystemId,
  store,
  update,
}

export default CustomerLoanService
