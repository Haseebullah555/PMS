import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import fuelTypeService from "./FuelTypeService"

type fuelTypeState = {
    fuelTypes: any
}
const initialState: fuelTypeState = {
    fuelTypes: {
        data: [],
    },
}
export const getFuelTypes = createAsyncThunk('api/fuelType/list', async (params: any, thunkAPI) => {
    try {
        return await fuelTypeService.getFuelTypes(params)
    } catch (error: any) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

export const storeFuelType = createAsyncThunk('api/fuelType/store', async (formData: any, thunkAPI) => {
    try {
        return await fuelTypeService.store(formData);
    } catch (error: any) {
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const updateFuelType = createAsyncThunk('api/fuelType/update', async (formData: any, thunkAPI) => {
    try {
        return await fuelTypeService.update(formData)
    } catch (error: any) {
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})
export const fuelTypeSlice = createSlice({
    name: 'fuelType',
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder.addCase(getFuelTypes.fulfilled, (state, action: PayloadAction) => {
            state.fuelTypes = action.payload
        })
    },
})

export const { reset } = fuelTypeSlice.actions
export default fuelTypeSlice.reducer