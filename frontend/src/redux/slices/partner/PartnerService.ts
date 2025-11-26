import axios from 'axios'
const axiosInterceptor = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // ✅ this adds /api automatically
})

// Get partners
const getPartners = async (params: any) => {
  const response = await axiosInterceptor.get(`/Partner/list`, {params})
  return response.data
}
// Get list of partners
const getPartnersList = async () => {
  const response = await axiosInterceptor.get(`/Partner/listAll`)
  return response.data
}
// Get roles by system id.
const getRolesBySystemId = async (systems_id: any) => {
  const response = await axiosInterceptor.post(`api/role/get-roles-by-system-id`, {systems_id: systems_id})
  return response.data
}

const store = async (formData: any) => {
  console.log('formData', formData);
  const response = await axiosInterceptor.post('/Partner/create', formData)
  return response.data
}

const update = async (formData: any) => {
  const response = await axiosInterceptor.post('/Partner/update', formData)
  return response.data
}

const partnerService = {
  getPartners,
  getPartnersList,
  getRolesBySystemId,
  store,
  update,
}

export default partnerService
