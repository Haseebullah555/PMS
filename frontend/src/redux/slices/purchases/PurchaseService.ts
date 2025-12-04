import axios from 'axios'
const axiosInterceptor = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // ✅ this adds /api automatically
})

const getPurchases = async (params: any) => {
  const response = await axiosInterceptor.get(`/Purchases/list`, { params })
  console.log(response,"fgdgdfgdfgdgdfgdfgdfgdf");
  return response.data
}

const getPurchasesWithSupplierLoanPayment = async (params: any) => {
  const response = await axiosInterceptor.get(`/Purchases/purchase-list-with-loan-payments`, { params })
  return response.data
}

const storePurchases = async (formData: any) => {
  const response = await axiosInterceptor.post('/Purchases/create', formData)
  return response.data
}

const storePurchasePayment = async (formData: any) => {
  const response = await axiosInterceptor.post('/Purchases/purchase-payment', formData)
  return response.data
}

const updatePurchases = async (formData: any) => {
  const response = await axiosInterceptor.post('/Purchases/update', formData)
  return response.data
}

const PurchaseService = {
  getPurchases,
  getPurchasesWithSupplierLoanPayment,
  storePurchases,
  storePurchasePayment,
  updatePurchases,
}

export default PurchaseService
