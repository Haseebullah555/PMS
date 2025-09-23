import axios from 'axios'

// Get users
const getSuppliers = async (params: any) => {
  const response = await axios.get(`/Supplier/list`, {params})
  return response.data
}
// Get roles by system id.
const getRolesBySystemId = async (systems_id: any) => {
  const response = await axios.post(`api/role/get-roles-by-system-id`, {systems_id: systems_id})
  return response.data
}

const store = async (formData: any) => {
  console.log('formData', formData);
  const response = await axios.post('/Supplier/create', formData)
  return response.data
}

const update = async (formData: any) => {
  const response = await axios.post('/Supplier/update', formData)
  return response.data
}

const supplierService = {
  getSuppliers,
  getRolesBySystemId,
  store,
  update,
}

export default supplierService
