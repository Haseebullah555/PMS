import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
import DashboardService from './DashboardService'

type customerSate = {
  annualSales: any
}

const initialState: customerSate = {
  annualSales: {
    data: [],
  },
}

//get Dashboards list
export const getAnnualSales = createAsyncThunk('/Dashboard/list', async (_, thunkAPI) => {
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
  },
})

export const {reset} = customerSlice.actions
export default customerSlice.reducer
