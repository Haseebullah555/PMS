import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import dailyFuelSellService from "./DailyFuelSellService"

type dailyFuelSellState = {
  dailyFuelSells: any
}
const initialState: dailyFuelSellState = {
  dailyFuelSells: null
}

// get fuelStands, fuelGun with dailyFuelSell data
export const getDailyFuelSells = createAsyncThunk('api/dailyFuelSell', async (params: any, thunkAPI) => {
  try {
    return await dailyFuelSellService.getDailyFuelSells(params)
  } catch (error: any) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
})
// store dailyFuelSell
export const storeDailyFuelSell = createAsyncThunk('api/dailyFuelSell/store', async (formData: any, thunkAPI) => {

  try {
    return await dailyFuelSellService.store(formData)
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})
// update dailyFuelSell
export const updateDailyFuelSell = createAsyncThunk('api/dailyFuelSell/update', async (formData: any, thunkAPI) => {
  try {
    return await dailyFuelSellService.update(formData)
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const dailyFuelSellSlice = createSlice({
  name: 'dailyFuelSell',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
          builder.addCase(getDailyFuelSells.fulfilled, (state, action: PayloadAction) => {
              state.dailyFuelSells = action.payload
          })
      },
})

export const { reset } = dailyFuelSellSlice.actions
export default dailyFuelSellSlice.reducer