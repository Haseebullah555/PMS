// authenticationService.ts
import axios from 'axios'

const axiosInterceptor = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
})

/* ===============================
   ROLES
================================ */

// get all roles
// const getRoles = async () => {
//   const res = await axiosInterceptor.get('/role')
//   return res.data
// }

const getRoles = async (params: any) => {
  const response = await axiosInterceptor.get(`/Role/role_list`, { params })
  return response.data
}


// create role
const postRole = async (data: { name: string }) => {
  const res = await axiosInterceptor.post('/Role/add_role', data)
  return res.data
}

// update role
const putRole = async (data: { id: number; name: string }) => {
  const res = await axiosInterceptor.put(`Role/update_role`, {
    id: data.id,
    name: data.name,
  })
  return res.data
}

// delete role
const deleteRole = async (id: number) => {
  const res = await axiosInterceptor.delete(`/role/${id}`)
  return res.data
}

// assign permissions
const assignPermissionsToRole = async (data: {
  roleId: number
  permissionIds: number[]
}) => {
  const res = await axiosInterceptor.post(`Role/assign_permissio_to_role`, {
    roleId: data.roleId,    
    permissionIds: data.permissionIds,
  })
  return res.data
}

// role permissions
const getRolePermissions = async (id: number) => {
  const res = await axiosInterceptor.get(`/role-permissions/${id}`)
  return res.data
}

/* ===============================
   PERMISSIONS
================================ */

const getPermissions = async () => {
  const res = await axiosInterceptor.get('/Role/all-permissions')
  return res.data
}

const postPermission = async (data: { name: string }) => {
  const res = await axiosInterceptor.post('/permission', data)
  return res.data
}

const putPermission = async (data: { id: number; name: string }) => {
  const res = await axiosInterceptor.put(`/permission/${data.id}`, {
    name: data.name,
  })
  return res.data
}

const deletePermission = async (id: number) => {
  const res = await axiosInterceptor.delete(`/permission/${id}`)
  return res.data
}

const AuthenticationService = {
  getRoles,
  postRole,
  putRole,
  deleteRole,
  assignPermissionsToRole,
  getRolePermissions,
  getPermissions,
  postPermission,
  putPermission,
  deletePermission,
}

export default AuthenticationService
