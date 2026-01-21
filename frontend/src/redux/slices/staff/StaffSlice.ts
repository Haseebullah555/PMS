// -- name: roleSlice.
// -- date: 01-21-2024.
// -- desc: redux toolkit slice for the roles components.
// -- author: Abdul Rafi Muhammadi.
// -- email: ab.rafimuhammadi@gmail.com

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import staffService from './StaffService'

type staffSate = {
  staffs: any
  allStaffs : any
}

const initialState: staffSate = {
  staffs: {
    data: [],
  },
  allStaffs : null
}

//get staff from server
export const getStaff = createAsyncThunk('api/staff/fgh', async (params: any, thunkAPI) => {
  try {
    return await staffService.getStaffs(params)
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// get staffs list
export const getStaffsList = createAsyncThunk('api/staff/list', async (_, thunkAPI) => {debugger
  try {
    return await staffService.getStaffsList()
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// store staff
export const storeStaff = createAsyncThunk('api/staff/store', async (formData: any, thunkAPI) => {
  try {
    console.log('formDataaaaaaaaaaaa', formData);
    return await staffService.store(formData)
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// update user
export const updateStaff = createAsyncThunk('api/staff/update', async (formData: any, thunkAPI) => {
  try {
    return await staffService.update(formData)
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const staffSlice = createSlice({
  name: 'staff',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(getStaff.fulfilled, (state, action: PayloadAction) => {
      console.log('action.payload', action.payload)
      state.staffs = action.payload
    })
    builder.addCase(getStaffsList.fulfilled, (state, action: PayloadAction) => {
      console.log('action.payload', action.payload)
      state.allStaffs = action.payload
    })
  },
})

export const { reset } = staffSlice.actions
export default staffSlice.reducer
