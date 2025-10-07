// -- name: roleSlice.
// -- date: 01-21-2024.
// -- desc: redux toolkit slice for the roles components.
// -- author: Abdul Rafi Muhammadi.
// -- email: ab.rafimuhammadi@gmail.com

import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
import GoodService from './GoodService'

type goodSate = {
  goods: any
}

const initialState: goodSate = {
  goods: {
    data: [],
  },
}

//get Good from server
export const getGood = createAsyncThunk('api/Good/fgh', async (params: any, thunkAPI) => {
  try {
    return await GoodService.getGoods(params)
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// store Good
export const storeGood = createAsyncThunk('api/Good/store', async (formData: any, thunkAPI) => {
  try {
    console.log('formDataaaaaaaaaaaa', formData);
    return await GoodService.store(formData)
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// update user
export const updateGood = createAsyncThunk('api/Good/update', async (formData: any, thunkAPI) => {
  try {
    console.log(formData);
    return await GoodService.update(formData)
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const goodSlice = createSlice({
  name: 'Good',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(getGood.fulfilled, (state, action: PayloadAction) => {
        console.log('action.payload', action.payload)
      state.goods = action.payload
    })
  },
})

export const {reset} = goodSlice.actions
export default goodSlice.reducer
