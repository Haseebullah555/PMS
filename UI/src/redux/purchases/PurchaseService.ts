import axios from 'axios'

const getPurchases = async (params: any) => {
  const response = await axios.get(`/Purchases/list`, { params })
  return response.data
}

const store = async (formData: any) => {
  const response = await axios.post('/Purchases/create', formData)
  return response.data
}

const update = async (formData: any) => {
  const response = await axios.post('/Purchases/update', formData)
  return response.data
}

const PurchaseService = {
  getPurchases,
  store,
  update,
}

export default PurchaseService
