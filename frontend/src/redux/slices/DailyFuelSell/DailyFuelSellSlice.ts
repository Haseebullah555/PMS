import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import dailyFuelSellService from "./DailyFuelSellService"

type dailyFuelSellState = {
    fuelStandWithDetials: any
}
const initialState: dailyFuelSellState = {
    fuelStandWithDetials: null,
}

// get fuelStands, fuelGun with dailyFuelSell data
// export const getFuelStandWithDetials = createAsyncThunk('api/fuelStandWithDetials', async (params: any, thunkAPI) => {
//     try {
//         return await dailyFuelSellService.getFuelStandWithDetials(params)
//     } catch (error: any) {
//         const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
//         return thunkAPI.rejectWithValue(message);
//     }
// })
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

export const dailyFuelSellSlice = createSlice({
    name: 'dailyFuelSell',
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        // builder.addCase(getFuelStandWithDetials.fulfilled, (state, action: PayloadAction) => {
        //     state.fuelStandWithDetials = action.payload
        // })
    },
})

export const { reset } = dailyFuelSellSlice.actions
export default dailyFuelSellSlice.reducer