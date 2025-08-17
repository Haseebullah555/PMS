// slices/userSlice.js
import {toast} from 'react-toastify'
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axiosInterceptor from '../../axios/axiosInterceptor'

const initialState = {
  items: null,
  points: null,
  point: null,
}

export const post_department = createAsyncThunk(
  'post-department',
  async (payload, {rejectWithValue, getState, dispatch}) => {
    try {
      // const res = await axios.post(`${apiUrl}user`, payload, config);
      const res = await axiosInterceptor.post('post-department', payload)

      return res.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
) 

export const get_departments = createAsyncThunk(
  'get-departments',
  async (payload, {rejectWithValue, getState, dispatch}) => {
    try {
      // const res = await axios.get(`${apiUrl}get-employees`);
      const res = await axiosInterceptor.get('get-departments')
      return res.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const put_department = createAsyncThunk(
  'put-department',
  async (payload, {rejectWithValue, getState, dispatch}) => {
    try {
      // const res = await axios.put(`${apiUrl}employee/${payload.id}`, {
      const res = await axiosInterceptor.put(`put-department`, payload)
      return res.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const delete_department = createAsyncThunk(
  'delete-department',
  async (payload, {rejectWithValue, getState, dispatch}) => {
    try {
      // const res = await axios.delete(`${apiUrl}user/${payload}`);
      const res = await axiosInterceptor.delete('department', payload)
      return res.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const get_points = createAsyncThunk(
  'get-points',
  async (payload, {rejectWithValue, getState, dispatch}) => {
    try {
      // const res = await axios.get(`${apiUrl}role-permissions/${payload}`);
      const res = await axiosInterceptor.get(`get-points`)
      return res.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const assign_points_to_department = createAsyncThunk(
  'assgin-points-to-department',
  async (payload, {rejectWithValue, getState, dispatch}) => {
    try {
      const res = await axiosInterceptor.post('assgin-points-to-department', payload)
      // const res = await axios.post(`${apiUrl}role/${payload.id}`, {
      // 	permissions: payload.permissions,
      // });
      return res.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const get_department_points = createAsyncThunk(
  'get-department-points',
  async (payload, {rejectWithValue, getState, dispatch}) => {
    try {
      // const res = await axios.get(`${apiUrl}role-permissions/${payload}`);
      const res = await axiosInterceptor.get(`get-department-points/${payload}`)
      return res.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const create_archive_department = createAsyncThunk(
  'create-archive-department',
  async (payload, {rejectWithValue, getState, dispatch}) => {
    try {
      // const res = await axios.post(`${apiUrl}user`, payload, config);
      const res = await axiosInterceptor.post('create-archive-department', payload)

      return res.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const update_archive_department = createAsyncThunk(
  'update-archive-department',
  async (payload, {rejectWithValue, getState, dispatch}) => {
    try {
      // const res = await axios.put(`${apiUrl}employee/${payload.id}`, {
      const res = await axiosInterceptor.post(`update-archive-department`, payload)
      return res.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

const departmentSlice = createSlice({
  name: 'departmentSlice',
  initialState,

  extraReducers: (builder) => {
    builder.addCase(post_department.fulfilled, (state, action) => {})
    builder.addCase(post_department.rejected, (state, action) => {})

    builder.addCase(get_departments.fulfilled, (state, action) => {
      state.items = action.payload
    })
    builder.addCase(get_departments.rejected, (state, action) => {})

    builder.addCase(put_department.fulfilled, (state, action) => {})
    builder.addCase(put_department.rejected, (state, action) => {})

    builder.addCase(delete_department.fulfilled, (state, action) => {
      toast.success('Deleted')
    })
    builder.addCase(delete_department.rejected, (state, action) => {
      toast.warning('Error')
    })

    builder.addCase(get_points.fulfilled, (state, action) => {
      state.points = action.payload
    })
    builder.addCase(get_points.rejected, (state, action) => {
      toast.warning('Error')
    })

    builder.addCase(assign_points_to_department.fulfilled, (state, action) => {})
    builder.addCase(assign_points_to_department.rejected, (state, action) => {})

    builder.addCase(get_department_points.fulfilled, (state, action) => {
      state.point = action.payload
    })
    builder.addCase(get_department_points.rejected, (state, action) => {})
  },
})

const departmentReducer = departmentSlice.reducer
export default departmentReducer
