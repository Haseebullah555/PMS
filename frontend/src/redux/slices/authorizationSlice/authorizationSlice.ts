// authenticationSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import AuthenticationService from './authorizationService'

/* ===============================
   TYPES
================================ */

type AuthState = {
  roles: any[]
  permissions: any[]
  loading: boolean
  error: string | null
}

const initialState: AuthState = {
  roles: [],
  permissions: [],
  loading: false,
  error: null,
}

/* ===============================
   THUNKS
================================ */

const getErrorMessage = (error: any) =>
  (error.response?.data?.message ||
    error.message ||
    'Something went wrong') as string

// roles
// export const getRoles = createAsyncThunk('auth/getRoles', async (_, thunkAPI) => {
//   try {
//     return await AuthenticationService.getRoles()
//   } catch (error: any) {
//     return thunkAPI.rejectWithValue(getErrorMessage(error))
//   }
// })

export const getRoles = createAsyncThunk(
  'api/role/list',
  async (params: any, thunkAPI) => {
    try {
      return await AuthenticationService.getRoles(params)
    } catch (error: any) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const postRole = createAsyncThunk(
  'auth/postRole',
  async (data: { name: string }, thunkAPI) => {
    try {
      return await AuthenticationService.postRole(data)
    } catch (error: any) {
      return thunkAPI.rejectWithValue(getErrorMessage(error))
    }
  }
)

export const putRole = createAsyncThunk(
  'auth/putRole',
  async (data: { id: number; name: string }, thunkAPI) => {
    try {
      return await AuthenticationService.putRole(data)
    } catch (error: any) {
      return thunkAPI.rejectWithValue(getErrorMessage(error))
    }
  }
)

export const deleteRole = createAsyncThunk(
  'auth/deleteRole',
  async (id: number, thunkAPI) => {
    try {
      return await AuthenticationService.deleteRole(id)
    } catch (error: any) {
      return thunkAPI.rejectWithValue(getErrorMessage(error))
    }
  }
)

export const assignPermissionsToRole = createAsyncThunk(
  'auth/assignPermissionsToRole',
  async (data: { roleId: number; permissionIds: number[] }, thunkAPI) => {
    try {
      return await AuthenticationService.assignPermissionsToRole(data)
    } catch (error: any) {
      return thunkAPI.rejectWithValue(getErrorMessage(error))
    }
  }
)

// permissions
export const getPermissions = createAsyncThunk(
  'auth/getPermissions',
  async (_, thunkAPI) => {
    try {
      return await AuthenticationService.getPermissions()
    } catch (error: any) {
      return thunkAPI.rejectWithValue(getErrorMessage(error))
    }
  }
)

export const postPermission = createAsyncThunk(
  'auth/postPermission',
  async (data: { name: string }, thunkAPI) => {
    try {
      return await AuthenticationService.postPermission(data)
    } catch (error: any) {
      return thunkAPI.rejectWithValue(getErrorMessage(error))
    }
  }
)

export const putPermission = createAsyncThunk(
  'auth/putPermission',
  async (data: { id: number; name: string }, thunkAPI) => {
    try {
      return await AuthenticationService.putPermission(data)
    } catch (error: any) {
      return thunkAPI.rejectWithValue(getErrorMessage(error))
    }
  }
)

export const deletePermission = createAsyncThunk(
  'auth/deletePermission',
  async (id: number, thunkAPI) => {
    try {
      return await AuthenticationService.deletePermission(id)
    } catch (error: any) {
      return thunkAPI.rejectWithValue(getErrorMessage(error))
    }
  }
)

/* ===============================
   SLICE
================================ */

const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      // roles
      .addCase(getRoles.pending, (state) => {
        state.loading = true
      })
      .addCase(getRoles.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false
        console.log(action.payload, 'payloadddd');
        state.roles = action.payload
      })
      .addCase(getRoles.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false
            console.log('reject');
        state.error = action.payload
      })
      .addCase(postRole.fulfilled, () => {
        toast.success('Added')
      })
      .addCase(putRole.fulfilled, () => {
        toast.success('Updated')
      })
      .addCase(deleteRole.fulfilled, () => {
        toast.success('Deleted')
      })
      .addCase(assignPermissionsToRole.fulfilled, () => {
        toast.success('Permissions Updated')
      })
      // permissions
      .addCase(getPermissions.fulfilled, (state, action) => {
        state.permissions = action.payload
      })
      .addCase(postPermission.fulfilled, () => {
        toast.success('Added')
      })
      .addCase(putPermission.fulfilled, () => {
       toast.success('Updated')
      })
      .addCase(deletePermission.fulfilled, () => {
        toast.success('Deleted')
      })
  },
})

export const { reset } = authenticationSlice.actions
export default authenticationSlice.reducer
