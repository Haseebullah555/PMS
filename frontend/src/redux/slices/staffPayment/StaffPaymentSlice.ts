// -- name: roleSlice.
// -- date: 01-21-2024.
// -- desc: redux toolkit slice for the roles components.

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import staffPaymentService from './StaffPaymentService'

type staffPaymentSate = {
  staffSalaries: any
}

const initialState: staffPaymentSate = {
  staffSalaries: {
    data: [],
  },
}

//get staffSalaries from server
export const getStaffSalaries = createAsyncThunk('api/staffPayment/fgh', async (params: any, thunkAPI) => {
  try {
    return await staffPaymentService.getStaffSalaries(params)
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})


// store staffPayment
export const storeStaffPayment = createAsyncThunk('api/staffPayment/store', async (formData: any, thunkAPI) => {
  try {
    return await staffPaymentService.store(formData)
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// update user
export const updateStaffPayment = createAsyncThunk('api/staffPayment/update', async (formData: any, thunkAPI) => {
  try {
    return await staffPaymentService.update(formData)
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const staffPaymentSlice = createSlice({
  name: 'staffPayment',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(getStaffSalaries.fulfilled, (state, action: PayloadAction) => {
      console.log('action.payload', action.payload)
      state.staffSalaries = action.payload
    })
  },
})

export const { reset } = staffPaymentSlice.actions
export default staffPaymentSlice.reducer
