import axios from 'axios'

// Get users
const getGoods = async (params: any) => {
  const response = await axios.get(`/Good/list`, {params})
  return response.data
}

const store = async (formData: any) => {
  console.log('formData', formData);
  const response = await axios.post('/Good/create', formData)
  return response.data
}

const update = async (formData: any) => {
  const response = await axios.post('/Good/update', formData)
  return response.data
}

const GoodService = {
  getGoods,
  store,
  update,
}

export default GoodService
