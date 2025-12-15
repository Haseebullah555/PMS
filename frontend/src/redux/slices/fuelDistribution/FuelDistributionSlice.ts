import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import fuelDistributionService from "./FuelDistributionService"

type fuelDistributionState = {
    fuelStandWithDetials: any
}
const initialState: fuelDistributionState = {
    fuelStandWithDetials: null,
}

// get fuelStands, fuelGun with fuelDistribution data
export const getFuelStandWithDetials = createAsyncThunk('api/fuelStandWithDetials', async (params: any, thunkAPI) => {
    try {
        return await fuelDistributionService.getFuelStandWithDetials(params)
    } catch (error: any) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
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
    },
})

export const { reset } = fuelDistributionSlice.actions
export default fuelDistributionSlice.reducer