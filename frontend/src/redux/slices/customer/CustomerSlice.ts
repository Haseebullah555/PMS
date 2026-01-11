// -- name: roleSlice.
// -- date: 01-21-2024.
// -- desc: redux toolkit slice for the roles components.

import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
import CustomerService from './CustomerService'

type customerSate = {
  customers: any
  customerDetails: any
  allCustomers: any
}

const initialState: customerSate = {
  customers: {
    data: [],
  },
  customerDetails: null,
  allCustomers: null
}

//get Customers Param base from server
export const getCustomersList = createAsyncThunk('/Customer/listAll', async (_, thunkAPI) => {
  try {
    return await CustomerService.getCustomersList()
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

//get Customer Param base from server
export const getCustomer = createAsyncThunk('/Customer/fgh', async (params: any, thunkAPI) => {
  try {
    return await CustomerService.getCustomers(params)
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})
//get Customers With Details 
export const getCustomerWithDetails = createAsyncThunk('/Customer/customerDetails', async (params: any, thunkAPI) => {
  try {
    return await CustomerService.getCustomersWithDetails(params)
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// store Customer
export const storeCustomer = createAsyncThunk('/Customer/store', async (formData: any, thunkAPI) => {
  try {
    console.log('formDataaaaaaaaaaaa', formData);
    return await CustomerService.store(formData)
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// update user
export const updateCustomer = createAsyncThunk('/Customer/update', async (formData: any, thunkAPI) => {
  try {
    return await CustomerService.update(formData)
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
    builder.addCase(getCustomer.fulfilled, (state, action: PayloadAction) => {
        console.log('action.payload', action.payload)
      state.customers = action.payload
    })
    builder.addCase(getCustomerWithDetails.fulfilled, (state, action: PayloadAction) => {
        console.log('action.payload', action.payload)
      state.customerDetails = action.payload
    })
    builder.addCase(getCustomersList.fulfilled, (state, action: PayloadAction) => {
        console.log('action.payload', action.payload)
      state.allCustomers = action.payload
    })
  },
})

export const {reset} = customerSlice.actions
export default customerSlice.reducer
