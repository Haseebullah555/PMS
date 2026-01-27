import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
import DashboardService from './DashboardService'

type customerSate = {
  annualSales: any
  dailySales: any
  aviliableStock?: any
}

const initialState: customerSate = {
  dailySales:{
    data: [],
  },
  annualSales: {
    data: [],
  },
  aviliableStock: {
    data: [],
  },
}

//get Dashboards Annual Char Data
export const getAnnualSales = createAsyncThunk('/Dashboard/monthly', async (_, thunkAPI) => {
  try {
    return await DashboardService.getAllMonthlySalesList()
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})
//get Dashboards Daily Cards Data
export const getDailySales = createAsyncThunk('/Dashboard/daily', async (_, thunkAPI) => {
  try {
    return await DashboardService.getAllDailySalesList()
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})
//get Dashboards Available Stock Data
export const getAvailableStock = createAsyncThunk('/Dashboard/available', async (_, thunkAPI) => {
  try {
    return await DashboardService.getAllAvailableStockList()
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})


export const customerSlice = createSlice({
  name: 'Dashboard',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(getAnnualSales.fulfilled, (state, action: PayloadAction) => {
        console.log('action.payload', action.payload)
      state.annualSales = action.payload
    })
    builder.addCase(getDailySales.fulfilled, (state, action: PayloadAction) => {
        console.log('action.payload', action.payload)
      state.dailySales = action.payload
    })
    builder.addCase(getDailySales.fulfilled, (state, action: PayloadAction) => {
        console.log('action.payload', action.payload)
      state.dailySales = action.payload
    })
    builder.addCase(getAvailableStock.fulfilled, (state, action: PayloadAction) => {
        console.log('action.payload', action.payload)
      state.aviliableStock = action.payload
    })
  },
})

export const {reset} = customerSlice.actions
export default customerSlice.reducer
