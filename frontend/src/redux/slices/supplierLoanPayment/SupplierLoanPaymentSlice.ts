// -- name: roleSlice.
// -- date: 01-21-2024.
// -- desc: redux toolkit slice for the roles components.

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import supplierLoanPaymentService from './SupplierLoanPaymentService'

type supplierSate = {
  suppliersWithDetials: any
  supplierLoanPayments: any
}

const initialState: supplierSate = {
  suppliersWithDetials: null,
  supplierLoanPayments : null,
}


//get supplier from server
export const getSupplierWithDetials = createAsyncThunk('/Supplier/supplierWithDetials', async (params: any, thunkAPI) => {
  try {
    return await supplierLoanPaymentService.getSuppliersWithDetials(params)
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

//get supplier from server
export const getSupplierLoanPayments = createAsyncThunk('/SupplierLaonPayment/loanPayments', async (params: any, thunkAPI) => {
  try {
    return await supplierLoanPaymentService.getSupplierLoanPayments(params)
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// Store Supplier Loan payment
export const storeSupplierLoanPayment = createAsyncThunk(
  'api/SupplierLoanPayment/createSupplierLoanPayment',
  async (formData: any, thunkAPI) => {
    try {
      return await supplierLoanPaymentService.store(formData)
    } catch (error: any) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)
export const supplierLoanPaymentSlice = createSlice({
  name: 'supplierLoanPayment',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(getSupplierWithDetials.fulfilled, (state, action) => {
      console.log('Supplier with details fetched:', action);
      state.suppliersWithDetials = action.payload;
    });
    builder.addCase(getSupplierLoanPayments.fulfilled, (state, action) => {
      console.log('Supplier with details fetched:', action);
      state.  supplierLoanPayments = action.payload;
    });
    builder.addCase(getSupplierWithDetials.rejected, (state, action) => {
      console.log('rejecttttttt:', state, action);
    });
    builder.addCase(storeSupplierLoanPayment.fulfilled, (state, action) => {
      console.log('rejecttttttt:', state, action);
    });
  },
})

export const { reset } = supplierLoanPaymentSlice.actions
export default supplierLoanPaymentSlice.reducer
