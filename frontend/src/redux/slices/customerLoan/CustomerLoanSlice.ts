import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import CustomerService from './CustomerLoanService'

type customerLoanSate = {
  customerLoans: any
  loading: boolean
  error: string | null

}

const initialState: customerLoanSate = {
  customerLoans: {
    data: [],
  },
  loading: false,
  error: null,
}

//get Customer from server
export const getCustomerLoan = createAsyncThunk('/Customer/fgh', async (params: any, thunkAPI) => {
  try {
    return await CustomerService.getCustomerLoans(params)
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// store Customer
export const storeCustomerLoan = createAsyncThunk('/Customer/store', async (formData: any, thunkAPI) => {
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
export const updateCustomerLoan = createAsyncThunk('/Customer/update', async (formData: any, thunkAPI) => {
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

export const customerLoanSlice = createSlice({
  name: 'Customer',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(getCustomerLoan.fulfilled, (state, action: PayloadAction) => {
      console.log('action.payload', action.payload)
      state.customerLoans = action.payload
    })
    builder.addCase(storeCustomerLoan.fulfilled, () => {
    })

      // Store customerLoan
      .addCase(storeCustomerLoan.pending, (state) => {
        state.loading = true
      })
      .addCase(storeCustomerLoan.fulfilled, (state) => {
        state.loading = false
      })
      .addCase(storeCustomerLoan.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false
        state.error = action.payload
      })

  },
})

export const { reset } = customerLoanSlice.actions
export default customerLoanSlice.reducer
