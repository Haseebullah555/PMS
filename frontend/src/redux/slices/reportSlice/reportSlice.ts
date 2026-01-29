// slices/reportSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import ReportService from './reportService'

type ReportState = {
  fuelSummaryData: any
  loading: boolean
  error: string | null
}

const initialState: ReportState = {
  fuelSummaryData: null,
  loading: false,
  error: null,
}

// Get fuelSummary report from API
export const getFuelSummary = createAsyncThunk(
  'api/getFuelSummaryData',
  async (params: any, thunkAPI) => {
    try {
      return await ReportService.getFuelSummary(params)
    } catch (error: any) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// create the report slice
const reportSlice = createSlice({
  name: 'reportSlice',
  initialState,
  reducers: {
        reset: (state) => initialState,
    },
  extraReducers: (builder) => {
    builder.addCase(getFuelSummary.fulfilled, (state, action) => {
      state.fuelSummaryData = action.payload
      state.loading = false
    })
    builder.addCase(getFuelSummary.rejected, (state, action) => {
      state.error = action.payload as string
      state.loading = false
    })
  },
})

export const { reset } = reportSlice.actions
const reportReducer = reportSlice.reducer
export default reportReducer
