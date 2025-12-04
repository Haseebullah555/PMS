import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import PurchaseService from './PurchaseService'

type PurchaseState = {
  purchases: any
  loading: boolean
  error: string | null
  purchaseWithSupplierLoanPayment: any
}

const initialState: PurchaseState = {
  purchases: {
    data: [],
  },
  purchaseWithSupplierLoanPayment: null,
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
// Get purchases with supplierLoanPayment from API
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
      return await PurchaseService.storePurchases(formData)
    } catch (error: any) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Store purchase payment
export const storePuchasePayment = createAsyncThunk(
  'api/Purchase/purchasePayment',
  async (formData: any, thunkAPI) => {
    try {
      return await PurchaseService.storePurchasePayment(formData)
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
      return await PurchaseService.updatePurchases(formData)
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
        state.loading = false
        state.purchaseWithSupplierLoanPayment = action.payload
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
      
      // Store purchase payment
      .addCase(storePuchasePayment.pending, (state) => {
        state.loading = true
      })
      .addCase(storePuchasePayment.fulfilled, (state) => {
        state.loading = false
      })
      .addCase(storePuchasePayment.rejected, (state, action: PayloadAction<any>) => {
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
