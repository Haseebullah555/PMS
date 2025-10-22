// -- name: roleSlice.
// -- date: 01-21-2024.
// -- desc: redux toolkit slice for the roles components.
// -- author: Abdul Rafi Muhammadi.
// -- email: ab.rafimuhammadi@gmail.com

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import staffSalaryService from './StaffPaymentService'

type staffSalarySate = {
  staffSalaries: any
}

const initialState: staffSalarySate = {
  staffSalaries: {
    data: [],
  },
}

//get staffSalaries from server
export const getStaffSalaries = createAsyncThunk('api/staffSalary/fgh', async (params: any, thunkAPI) => {
  try {
    return await staffSalaryService.getStaffSalaries(params)
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})


// store staffSalary
export const storeStaffSalary = createAsyncThunk('api/staffSalary/store', async (formData: any, thunkAPI) => {
  try {
    return await staffSalaryService.store(formData)
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// update user
export const updateStaffSalary = createAsyncThunk('api/staffSalary/update', async (formData: any, thunkAPI) => {
  try {
    return await staffSalaryService.update(formData)
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const staffSalarySlice = createSlice({
  name: 'staffSalary',
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

export const { reset } = staffSalarySlice.actions
export default staffSalarySlice.reducer
