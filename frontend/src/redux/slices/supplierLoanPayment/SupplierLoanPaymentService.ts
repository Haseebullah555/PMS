import axios from 'axios'

const axiosInterceptor = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // ✅ this adds /api automatically
})
console.log('Base URL:', process.env.REACT_APP_API_URL);



// Get suppliers with details (suppliers, purchases, purchase detials, supplier loan payments)
const getSuppliersWithDetials = async (params: any) => {
  const response = await axiosInterceptor.get(`/SupplierLoanPayment/getSuppliersWithDetials`, {params})
  return response.data
}
const getSupplierLoanPayments = async (params: any) => {
  const response = await axiosInterceptor.get(`/SupplierLoanPayment/getSuppliersWithSupplierLoanPayments`, {params})
  return response.data
}
const store = async (formData: any) => {debugger
  console.log('formData', formData);
  const response = await axiosInterceptor.post('/SupplierLoanPayment/createSupplierLoanPayment', formData)
  return response.data
}


const supplierLoanPaymentService = {
  getSuppliersWithDetials,
  store,
  getSupplierLoanPayments,
}

export default supplierLoanPaymentService
