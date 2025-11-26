// slices/userSlice.js
import {toast} from 'react-toastify'
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axiosInterceptor from '../../axios/axiosInterceptor'

const initialState = {
  items: null,
  isLoading: false,
  item: null,
  employeeItems: null,
  employeePoints: null,
  employeeRemainReport: null,
  holidays: null,
}

export const postReport = createAsyncThunk(
  'post-report',
  async (payload, {rejectWithValue, getState, dispatch}) => {
    try {
      const config = {
        headers: {
          contentType: 'multipart/form-data', // Set the desired 'Content-Type' value
        },
      }
      // const res = await axios.post(`${apiUrl}user`, payload, config);
      const res = await axiosInterceptor.post('post-report', payload, config)

      return res.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)


const reportSlice = createSlice({
  name: 'reportSlice',
  initialState,
  reducers: {
    reset_list: (state) => {
      state.employeeItems = null
      state.employeePoints = null
      state.employeeRemainReport = null
    },
  },

  extraReducers: (builder) => {
    builder.addCase(postReport.fulfilled, (state, action) => {})
    builder.addCase(postReport.rejected, (state, action) => {})

    
  },
})

export const {reset_list} = reportSlice.actions

const reportReducer = reportSlice.reducer
export default reportReducer
