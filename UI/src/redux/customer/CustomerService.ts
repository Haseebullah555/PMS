import axios from 'axios'

// Get users
const getCustomers = async (params: any) => {
  const response = await axios.get(`/Customer/list`, {params})
  return response.data
}
// Get roles by system id.
const getRolesBySystemId = async (systems_id: any) => {
  const response = await axios.post(`api/role/get-roles-by-system-id`, {systems_id: systems_id})
  return response.data
}

const store = async (formData: any) => {
  console.log('formData', formData);
  const response = await axios.post('/Customer/create', formData)
  return response.data
}

const update = async (formData: any) => {
  const response = await axios.post('/Customer/update', formData)
  return response.data
}

const CustomerService = {
  getCustomers,
  getRolesBySystemId,
  store,
  update,
}

export default CustomerService
