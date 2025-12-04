import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import PurchaseService from './PurchaseService'

type PurchaseState = {
  purchases: any
  loading: boolean
  error: string | null
  purchasesWithUnPaidAmount: any
}

const initialState: PurchaseState = {
  purchases: {
    data: [],
  },
  purchasesWithUnPaidAmount: null,
  loading: false,
  error: null,
}

// Get purchases from API
export const getPurchases = createAsyncThunk(
  'api/Purchase/list',
  async (params: any, thunkAPI) => {
    try {
      return await PurchaseService.getPurchases(params)
    } catch (error: any) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const getPurchasesWithSupplierLoanPayment = createAsyncThunk(
  'api/Purchase/supplierLoanPayment',
  async (params: any, thunkAPI) => {
    try {
      return await PurchaseService.getPurchasesWithSupplierLoanPayment(params)
    } catch (error: any) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Store new purchase
export const storePurchase = createAsyncThunk(
  'api/Purchase/store',
  async (formData: any, thunkAPI) => {
    try {
      return await PurchaseService.store(formData)
    } catch (error: any) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Update purchase
export const updatePurchase = createAsyncThunk(
  'api/Purchase/update',
  async (formData: any, thunkAPI) => {
    try {
      return await PurchaseService.update(formData)
    } catch (error: any) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const purchaseSlice = createSlice({
  name: 'Purchase',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      // Get Purchases
      .addCase(getPurchases.pending, (state) => {
        state.loading = true
      })
      .addCase(getPurchases.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false
        state.purchases = action.payload
      })
      .addCase(getPurchases.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(getPurchasesWithSupplierLoanPayment.fulfilled, (state, action: PayloadAction<any>) => {
        console.log(action, '--------------')
        state.loading = false
        state.purchasesWithUnPaidAmount = action.payload
      })

      // Store Purchase
      .addCase(storePurchase.pending, (state) => {
        state.loading = true
      })
      .addCase(storePurchase.fulfilled, (state) => {
        state.loading = false
      })
      .addCase(storePurchase.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false
        state.error = action.payload
      })

      // Update Purchase
      .addCase(updatePurchase.pending, (state) => {
        state.loading = true
      })
      .addCase(updatePurchase.fulfilled, (state) => {
        state.loading = false
      })
      .addCase(updatePurchase.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { reset } = purchaseSlice.actions
export default purchaseSlice.reducer
