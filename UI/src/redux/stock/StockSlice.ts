// -- name: roleSlice.
// -- date: 01-21-2024.
// -- desc: redux toolkit slice for the roles components.
// -- author: Abdul Rafi Muhammadi.
// -- email: ab.rafimuhammadi@gmail.com

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import stockService from './StockService'

type stockSate = {
  stocks: any
}

const initialState: stockSate = {
  stocks: {
    data: [],
  },
}

//get stock from server
export const getStock = createAsyncThunk('api/stock/list', async (params: any, thunkAPI) => {
  try {
    return await stockService.getStocks(params)
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const stockSlice = createSlice({
  name: 'stock',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(getStock.fulfilled, (state, action: PayloadAction) => {
      state.stocks = action.payload
    })
  },
})

export const { reset } = stockSlice.actions
export default stockSlice.reducer
