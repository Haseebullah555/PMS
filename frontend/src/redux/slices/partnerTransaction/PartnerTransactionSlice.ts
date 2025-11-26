import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import partnerTransactionService from './PartnerTransactionService'

type partnerTransactionSate = {
  partnerTransactions: any
}

const initialState: partnerTransactionSate = {
  partnerTransactions: {
    data: [],
  },
}

//get partnerTransaction from server
export const getPartnerTransaction = createAsyncThunk('api/partnerTransaction/fgh', async (params: any, thunkAPI) => {
  try {
    return await partnerTransactionService.getPartnerTransactions(params)
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// store partnerTransaction
export const storePartnerTransaction = createAsyncThunk('api/partnerTransaction/store', async (formData: any, thunkAPI) => {
  try {
    return await partnerTransactionService.store(formData)
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// update user
export const updatePartnerTransaction = createAsyncThunk('api/partnerTransaction/update', async (formData: any, thunkAPI) => {
  try {
    return await partnerTransactionService.update(formData)
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const partnerTransactionSlice = createSlice({
  name: 'partnerTransaction',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(getPartnerTransaction.fulfilled, (state, action: PayloadAction) => {
      console.log('action.payload', action.payload)
      state.partnerTransactions = action.payload
    })
  },
})

export const { reset } = partnerTransactionSlice.actions
export default partnerTransactionSlice.reducer
