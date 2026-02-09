// slices/userSlice.js
import {toast} from 'react-toastify'
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axiosInterceptor from '../axios/axiosInterceptor'

const initialState = {
  roles: null,
  permissions: null,
}


// get all roles
export const getRoles = createAsyncThunk(
  'get/roles',
  async (payload, {rejectWithValue, getState, dispatch}) => {
    try {
      // const res = await axios.get(`${apiUrl}role`);
      const res = await axiosInterceptor.get('role')
      return res.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

// get all permissions
export const getPermissions = createAsyncThunk(
  'get/permissions',
  async (payload, {rejectWithValue, getState, dispatch}) => {
    try {
      // const res = await axios.get(`${apiUrl}permission`);
      const res = await axiosInterceptor.get('permission')
      return res.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

// create the new 
export const postRole = createAsyncThunk(
  'post/role',
  async (payload, {rejectWithValue, getState, dispatch}) => {
    try {
      // const res = await axios.post(`${apiUrl}role`, {
      console.log(payload, '===========');
      const res = await axiosInterceptor.post('role', {
        name: payload.name,
      })
      return res.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const putRole = createAsyncThunk(
  'put/role',
  async (payload, {rejectWithValue, getState, dispatch}) => {
    try {
      // const res = await axios.put(`${apiUrl}role/${payload.id}`, {
      const res = await axiosInterceptor.put(`role/${payload.id}`, {
        name: payload.name,
      })
      return res.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const deleteRole = createAsyncThunk(
  'delete/role',
  async (payload, {rejectWithValue, getState, dispatch}) => {
    try {
      // const res = await axios.delete(`${apiUrl}role/${payload}`);
      const res = await axiosInterceptor.delete(`role/${payload}`)
      return res.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const assignPermissionsToRole = createAsyncThunk(
  'assgin-permissions-to-role',
  async (payload, {rejectWithValue, getState, dispatch}) => {
    try {
      const res = await axiosInterceptor.post(`role/${payload.id}`, {
        permissions: payload.permissions,
      })
      //   const res = await axiosInterceptor.get("roles");
      return res.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const get_role_permissions = createAsyncThunk(
  'get-role-permissions',
  async (payload, {rejectWithValue, getState, dispatch}) => {
    try {
      // const res = await axios.get(`${apiUrl}role-permissions/${payload}`);
      const res = await axiosInterceptor.get(`role-permissions/${payload}`)
      return res.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)


export const postPermission = createAsyncThunk(
  'post/permission',
  async (payload, {rejectWithValue, getState, dispatch}) => {
    try {
      // const res = await axios.post(`${apiUrl}permission`, {
      const res = await axiosInterceptor.post('permission', {
        name: payload.name,
      })
      return res.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const putPermission = createAsyncThunk(
  'put/permission',
  async (payload, {rejectWithValue, getState, dispatch}) => {
    try {
      // const res = await axios.put(`${apiUrl}permission/${payload.id}`, {
      const res = await axiosInterceptor.put(`permission/${payload.id}`, {
        name: payload.name,
      })

      return res.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const deletePermission = createAsyncThunk(
  'delete/permission',
  async (payload, {rejectWithValue, getState, dispatch}) => {
    try {
      // const res = await axios.delete(`${apiUrl}permission/${payload}`);
      const res = await axiosInterceptor.delete(`permission/${payload}`)
      return res.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

const authorizationSlice = createSlice({
  name: 'authorizationSlice',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getRoles.fulfilled, (state, action) => {
      state.roles = action.payload
    })

    builder.addCase(getRoles.rejected, (state, action) => {})

    builder.addCase(postRole.fulfilled, (state, action) => {
      toast.success('Added')
    })

    builder.addCase(postRole.rejected, (state, action) => {
      toast.warning('Error')
    })

    builder.addCase(putRole.fulfilled, (state, action) => {
      toast.success('Updated')
    })

    builder.addCase(putRole.rejected, (state, action) => {
      toast.warning('Error')
    })

    builder.addCase(deleteRole.fulfilled, (state, action) => {
      toast.success('Deleted')
    })

    builder.addCase(deleteRole.rejected, (state, action) => {
      toast.warning('Error')
    })

    builder.addCase(assignPermissionsToRole.fulfilled, (state, action) => {
      toast.success('Added')
    })

    builder.addCase(assignPermissionsToRole.rejected, (state, action) => {
      toast.warning('Error')
    })

    builder.addCase(get_role_permissions.fulfilled, (state, action) => {})

    builder.addCase(get_role_permissions.rejected, (state, action) => {
      toast.warning('Error')
    })

    builder.addCase(getPermissions.fulfilled, (state, action) => {
      state.permissions = action.payload
    })

    builder.addCase(getPermissions.rejected, (state, action) => {})

    builder.addCase(postPermission.fulfilled, (state, action) => {
      toast.success('Added')
    })

    builder.addCase(postPermission.rejected, (state, action) => {
      toast.warning('Error')
    })

    builder.addCase(putPermission.fulfilled, (state, action) => {
      toast.success('Updated')
    })

    builder.addCase(putPermission.rejected, (state, action) => {
      toast.warning('Error')
    })

    builder.addCase(deletePermission.fulfilled, (state, action) => {
      toast.success('Deleted')
    })

    builder.addCase(deletePermission.rejected, (state, action) => {
      toast.warning('Error')
    })
  },
})
// export const { clearingState } = authSlice.actions;
const authorizationReducer = authorizationSlice.reducer
export default authorizationReducer
