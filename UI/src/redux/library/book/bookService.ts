import axios from 'axios'

// Get users
const getBooks = async (params: any) => {
  const response = await axios.get(`api/book/index`, {params})
  return response.data
}
// Get roles by system id.
const getRolesBySystemId = async (systems_id: any) => {
  const response = await axios.post(`api/role/get-roles-by-system-id`, {systems_id: systems_id})
  return response.data
}

const store = async (formData: any) => {
  const response = await axios.post('api/book/store', formData)
  return response.data
}

const update = async (formData: any) => {
  const response = await axios.post(`api/book/update`, formData)
  return response.data
}

const bookService = {
  getBooks,
  getRolesBySystemId,
  store,
  update,
}

export default bookService
