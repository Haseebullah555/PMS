// -- name: roleSlice.
// -- date: 01-21-2024.
// -- desc: redux toolkit slice for the roles components.
// -- author: Abdul Rafi Muhammadi.
// -- email: ab.rafimuhammadi@gmail.com

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import supplierService from './SupplierService'

type supplierSate = {
  suppliers: any
}

const initialState: supplierSate = {
  suppliers: {
    data: [],
    meta: {}
  },
}


//get supplier from server
export const getSupplier = createAsyncThunk('/Supplier/list', async (params: any, thunkAPI) => {
  try {

    return await supplierService.getSuppliers(params)
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// store supplier
export const storeSupplier = createAsyncThunk('api/supplier/store', async (formData: any, thunkAPI) => {
  try {
    console.log('formDataaaaaaaaaaaa', formData);
    return await supplierService.store(formData)
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// update user
export const updateSupplier = createAsyncThunk('api/supplier/update', async (formData: any, thunkAPI) => {
  try {
    return await supplierService.update(formData)
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const supplierSlice = createSlice({
  name: 'supplier',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(getSupplier.fulfilled, (state, action) => {
      state.suppliers = action.payload;
    });

    // builder.addCase(getSupplier.fulfilled, (state, action: PayloadAction) => {
    //   state.suppliers = action.payload
    // })
  },
})

export const { reset } = supplierSlice.actions
export default supplierSlice.reducer
