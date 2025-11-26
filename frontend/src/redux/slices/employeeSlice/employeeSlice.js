import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axiosInterceptor from '../../axios/axiosInterceptor'

const initialState = {
  items: [],
  item: {
    personal: null,
    tazkira: null,
    live: null,
    enroll: null,
    bank: null,
  },
}

export const postEmployee = createAsyncThunk(
  'post-employee',
  async (payload, {rejectWithValue, getState, dispatch}) => {
    try {
      // const res = await axios.post(`${apiUrl}user`, payload, config);
      const res = await axiosInterceptor.post('store-employee', payload)

      return res.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const getEmployeeDataTable = createAsyncThunk(
  'get-employee-data',
  async (payload, {rejectWithValue, getState, dispatch}) => {
    try {
      // const res = await axios.get(`${apiUrl}get-employees`);
      // const res = await axios.get(`${apiUrl}get-employee-data`, payload)
      const res = await axiosInterceptor.get('get-employees', {params: payload.params})
      // const res = await axiosInterceptor.get('get-employee-data')
      return res.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const getEmployees = createAsyncThunk(
  'employees/getEmployeeData',
  async (payload, {rejectWithValue, getState, dispatch}) => {
    try {
      // const res = await axiosInterceptor.get('get-employee-data', payload)
      const res = await axiosInterceptor.get('get-employee-data')
      return res.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const putEmployee = createAsyncThunk(
  'put-employee',
  async (payload, {rejectWithValue, getState, dispatch}) => {
    try {
      // const res = await axios.put(`${apiUrl}employee/${payload.id}`, {
      const res = await axiosInterceptor.put(`put-employee`, payload)
      return res.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const verifyEmployee = createAsyncThunk(
  'verify-employee',
  async (payload, {rejectWithValue, getState, dispatch}) => {
    try {
      const res = await axiosInterceptor.post(`verify-employee`, payload)
      //   const res = await axiosInterceptor.get("user");
      return res.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)
export const filter_employee = createAsyncThunk(
  'filter-employee',
  async (payload, {rejectWithValue, getState, dispatch}) => {
    try {
      const res = await axiosInterceptor.post(`filter-employee`, payload)
      //   const res = await axiosInterceptor.get("user");
      return res.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)
export const transfer_employee = createAsyncThunk(
  'transfer-employee',
  async (payload, {rejectWithValue, getState, dispatch}) => {
    try {
      const res = await axiosInterceptor.post(`transfer-employee`, payload)
      //   const res = await axiosInterceptor.get("user");
      return res.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

const employeeSlice = createSlice({
  name: 'employeeSlice',
  initialState,
  reducers: {
    putEmployeeInformation: (state, action) => {
      if (action.payload.type === 'personal') {
        state.item.personal = action.payload.data
      } else if (action.payload.type === 'tazkira') {
        state.item.tazkira = action.payload.data
      } else if (action.payload.type === 'live') {
        state.item.live = action.payload.data
      } else if (action.payload.type === 'enroll') {
        state.item.enroll = action.payload.data
      } else if (action.payload.type === 'bank') {
        state.item.bank = action.payload.data
      }
    },
    resetPutEmployeeInformation: (state) => {
      state.item.personal = null
      state.item.tazkira = null
      state.item.live = null
      state.item.enroll = null
      state.item.bank = null
    },
  },

  extraReducers: (builder) => {
    builder.addCase(postEmployee.fulfilled, (state, action) => {})

    builder.addCase(postEmployee.rejected, (state, action) => {})
    builder.addCase(getEmployees.fulfilled, (state, action) => {
      state.items = action.payload.employees
    })

    builder.addCase(getEmployees.rejected, (state, action) => {})

    builder.addCase(putEmployee.fulfilled, (state, action) => {})

    builder.addCase(putEmployee.rejected, (state, action) => {})

    builder.addCase(verifyEmployee.fulfilled, (state, action) => {})

    builder.addCase(verifyEmployee.rejected, (state, action) => {})
    builder.addCase(filter_employee.fulfilled, (state, action) => {
      state.items = action.payload.employee
    })

    builder.addCase(filter_employee.rejected, (state, action) => {})
  },
})
export const {putEmployeeInformation, resetPutEmployeeInformation} = employeeSlice.actions
const employeeReducer = employeeSlice.reducer
export default employeeReducer
