import axios from 'axios'
const axiosInterceptor = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // ✅ this adds /api automatically
})

// Get users
const getStaffs = async (params: any) => {
  const response = await axiosInterceptor.get(`/Staff/list`, {params})
  return response.data
}
// Get Staff List
const getStaffsList = async () => {
  const response = await axiosInterceptor.get(`/Staff/listAll`)
  return response.data
}
// Get roles by system id.
const getRolesBySystemId = async (systems_id: any) => {
  const response = await axiosInterceptor.post(`api/role/get-roles-by-system-id`, {systems_id: systems_id})
  return response.data
}

const store = async (formData: any) => {
  console.log('formData', formData);
  const response = await axiosInterceptor.post('/Staff/create', formData)
  return response.data
}

const update = async (formData: any) => {
  const response = await axiosInterceptor.post('/Staff/update', formData)
  return response.data
}

const staffService = {
  getStaffs,
  getRolesBySystemId,
  getStaffsList,
  store,
  update,
}

export default staffService
