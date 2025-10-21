import axios from 'axios'

// Get partner transactions
const getPartnerTransactions = async (params: any) => {
  const response = await axios.get(`/PartnerTransaction/list`, {params})
  return response.data
}
// Get roles by system id.
const getRolesBySystemId = async (systems_id: any) => {
  const response = await axios.post(`api/role/get-roles-by-system-id`, {systems_id: systems_id})
  return response.data
}

const store = async (formData: any) => {
  console.log('formData', formData);
  const response = await axios.post('/PartnerTransaction/create', formData)
  return response.data
}

const update = async (formData: any) => {
  const response = await axios.post('/PartnerTransaction/update', formData)
  return response.data
}

const partnerTransactionService = {
  getPartnerTransactions,
  getRolesBySystemId,
  store,
  update,
}

export default partnerTransactionService
