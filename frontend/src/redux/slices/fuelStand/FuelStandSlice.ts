import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import fuelStandService from "./FuelStandService"

type fuelStandState = {
    fuelStands: any
}
const initialState: fuelStandState = {
    fuelStands: {
        data: [],
    },
}
export const getFuelStands = createAsyncThunk('api/fuelStand/list', async (params: any, thunkAPI) => {
    try {
        return await fuelStandService.getFuelStands(params)
    } catch (error: any) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

export const storeFuelStand = createAsyncThunk('api/fuelStand/store', async (formData: any, thunkAPI) => {
    try {
        return await fuelStandService.store(formData);
    } catch (error: any) {
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const updateFuelStand = createAsyncThunk('api/fuelStand/update', async (formData: any, thunkAPI) => {
    try {
        return await fuelStandService.update(formData)
    } catch (error: any) {
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})
export const fuelStandSlice = createSlice({
    name: 'fuelStand',
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder.addCase(getFuelStands.fulfilled, (state, action: PayloadAction) => {
            state.fuelStands = action.payload
        })
    },
})

export const { reset } = fuelStandSlice.actions
export default fuelStandSlice.reducer