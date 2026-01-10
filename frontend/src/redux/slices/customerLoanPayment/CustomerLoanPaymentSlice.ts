// -- name: roleSlice.
// -- date: 01-21-2024.
// -- desc: redux toolkit slice for the roles components.

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import customerLoanPaymentService from './CustomerLoanPaymentService'

type customerSate = {
  customersWithDetials: any
  customerLoanPayments: any
}

const initialState: customerSate = {
  customersWithDetials: null,
  customerLoanPayments : null,
}


//get customer from server
export const getCustomerWithDetials = createAsyncThunk('/Customer/customerWithDetials', async (params: any, thunkAPI) => {
  try {
    return await customerLoanPaymentService.getCustomersWithDetials(params)
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

//get customer from server
export const getCustomerLoanPayments = createAsyncThunk('/CustomerLaonPayment/loanPayments', async (params: any, thunkAPI) => {
  try {
    return await customerLoanPaymentService.getCustomerLoanPayments(params)
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// Store Customer Loan payment
export const storeCustomerLoanPayment = createAsyncThunk(
  'api/CustomerLoanPayment/createCustomerLoanPayment',
  async (formData: any, thunkAPI) => {
    try {
      return await customerLoanPaymentService.store(formData)
    } catch (error: any) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)
export const customerLoanPaymentSlice = createSlice({
  name: 'customerLoanPayment',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(getCustomerWithDetials.fulfilled, (state, action) => {
      console.log('Customer with details fetched:', action);
      state.customersWithDetials = action.payload;
    });
    builder.addCase(getCustomerLoanPayments.fulfilled, (state, action) => {
      console.log('Customer with details fetched:', action);
      state.  customerLoanPayments = action.payload;
    });
    builder.addCase(getCustomerWithDetials.rejected, (state, action) => {
      console.log('rejecttttttt:', state, action);
    });
    builder.addCase(storeCustomerLoanPayment.fulfilled, (state, action) => {
      console.log('rejecttttttt:', state, action);
    });
  },
})

export const { reset } = customerLoanPaymentSlice.actions
export default customerLoanPaymentSlice.reducer
