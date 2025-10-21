// -- name: roleSlice.
// -- date: 01-21-2024.
// -- desc: redux toolkit slice for the roles components.
// -- author: Abdul Rafi Muhammadi.
// -- email: ab.rafimuhammadi@gmail.com

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import partnerService from './PartnerService'

type partnerSate = {
  partners: any
}

const initialState: partnerSate = {
  partners: {
    data: [],
  },
}

//get partner from server
export const getPartner = createAsyncThunk('api/partner/fgh', async (params: any, thunkAPI) => {
  try {
    return await partnerService.getPartners(params)
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})
//get partners list from server
export const getPartnersList = createAsyncThunk('api/partner/fgh', async (_, thunkAPI) => {
  try {
    return await partnerService.getPartnersList()
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// store partner
export const storePartner = createAsyncThunk('api/partner/store', async (formData: any, thunkAPI) => {
  try {
    return await partnerService.store(formData)
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// update user
export const updatePartner = createAsyncThunk('api/partner/update', async (formData: any, thunkAPI) => {
  try {
    return await partnerService.update(formData)
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const partnerSlice = createSlice({
  name: 'partner',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(getPartner.fulfilled, (state, action: PayloadAction) => {
      console.log('action.payload', action.payload)
      state.partners = action.payload
    })
  },
})

export const { reset } = partnerSlice.actions
export default partnerSlice.reducer
