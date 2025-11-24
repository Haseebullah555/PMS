// -- name: roleSlice.
// -- date: 01-21-2024.
// -- desc: redux toolkit slice for the roles components.
// -- author: Abdul Rafi Muhammadi.
// -- email: ab.rafimuhammadi@gmail.com

import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
import FuelTypeService from './FuelTypeService'

type goodSate = {
  goods: any
}

const initialState: goodSate = {
  goods: {
    data: [],
  },
}

//get FuelType from server
export const getFuelType = createAsyncThunk('api/FuelType/fgh', async (params: any, thunkAPI) => {
  try {
    return await FuelTypeService.getFuelTypes(params)
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// store FuelType
export const storeFuelType = createAsyncThunk('api/FuelType/store', async (formData: any, thunkAPI) => {
  try {
    console.log('formDataaaaaaaaaaaa', formData);
    return await FuelTypeService.store(formData)
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// update user
export const updateFuelType = createAsyncThunk('api/FuelType/update', async (formData: any, thunkAPI) => {
  try {
    console.log(formData);
    return await FuelTypeService.update(formData)
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const goodSlice = createSlice({
  name: 'FuelType',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(getFuelType.fulfilled, (state, action: PayloadAction) => {
        console.log('action.payload', action.payload)
      state.goods = action.payload
    })
  },
})

export const {reset} = goodSlice.actions
export default goodSlice.reducer
