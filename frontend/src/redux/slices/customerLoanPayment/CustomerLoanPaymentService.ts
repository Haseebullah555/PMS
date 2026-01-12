import axios from 'axios'

const axiosInterceptor = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // ✅ this adds /api automatically
})
console.log('Base URL:', process.env.REACT_APP_API_URL);



// Get customers with details (customers, purchases, purchase detials, customer loan payments)
const getCustomersWithDetials = async (params: any) => {
  const response = await axiosInterceptor.get(`/Customer/getCustomersWithDetials`, {params})
  return response.data
}
const getCustomerLoanPayments = async (params: any) => {
  const response = await axiosInterceptor.get(`/CustomerLoanPayment/getCustomersWithCustomerLoanPayments`, {params})
  return response.data
}
const store = async (formData: any) => {
  console.log('formData', formData);
  const response = await axiosInterceptor.post('/CustomerLoanPayment/createCustomerLoanPayment', formData)
  return response.data
}


const customerLoanPaymentService = {
  getCustomersWithDetials,
  store,
  getCustomerLoanPayments,
}

export default customerLoanPaymentService
