import axios from 'axios'

const getPurchases = async (params: any) => {
  const response = await axios.get(`/Purchase/list`, { params })
  return response.data
}

const store = async (formData: any) => {
  const response = await axios.post('/Purchase/create', formData)
  return response.data
}

const update = async (formData: any) => {
  const response = await axios.post('/Purchase/update', formData)
  return response.data
}

const PurchaseService = {
  getPurchases,
  store,
  update,
}

export default PurchaseService
