import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
import CustomerService from './DashboardService'

type customerSate = {
  allSales: any
  allCustomers: any
}

const initialState: customerSate = {
  allSales: {
    data: [],
  },
  allCustomers: null,
}

//get Customers list
export const getCustomersList = createAsyncThunk('/Dashboard/list', async (_, thunkAPI) => {
  try {
    return await CustomerService.getAllMonthlySalesList()
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})


export const customerSlice = createSlice({
  name: 'Customer',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(getCustomersList.fulfilled, (state, action: PayloadAction) => {
        console.log('action.payload', action.payload)
      state.allCustomers = action.payload
    })
  },
})

export const {reset} = customerSlice.actions
export default customerSlice.reducer
