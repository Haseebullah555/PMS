import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import fuelDistributionService from "./FuelDistributionService"

type fuelDistributionState = {
    fuelStandWithDetials: any
    allFuelDistributions: any
}
const initialState: fuelDistributionState = {
    fuelStandWithDetials: null,
    allFuelDistributions: null
}

// get fuelStands, fuelGun with fuelDistribution data
export const getFuelStandWithDetials = createAsyncThunk('api/fuelDistributions/fuelStandWithDetials', async ( _, thunkAPI) => {
    try {
        return await fuelDistributionService.getFuelStandWithDetials()
    } catch (error: any) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})
// list fuelDistributions
export const getFuelDistributions = createAsyncThunk('api/fuelDistributions/list', async (params: any, thunkAPI) => {
    try {
        return await fuelDistributionService.getFuelDistributions(params);
    }catch (error: any) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})
// store fuelDistribution
export const storeFuelDistribution = createAsyncThunk('api/fuelDistribution/store', async (formData: any, thunkAPI) => {
  try {
    return await fuelDistributionService.store(formData)
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const fuelDistributionSlice = createSlice({
    name: 'fuelDistribution',
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder.addCase(getFuelStandWithDetials.fulfilled, (state, action: PayloadAction) => {
            state.fuelStandWithDetials = action.payload
        })
        builder.addCase(getFuelDistributions.fulfilled, (state, action: PayloadAction) => {
            state.allFuelDistributions = action.payload
        })
    },
})

export const { reset } = fuelDistributionSlice.actions
export default fuelDistributionSlice.reducer