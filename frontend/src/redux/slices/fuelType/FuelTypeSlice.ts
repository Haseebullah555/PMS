import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import fuelTypeService from "./FuelTypeService"

type fuelTypeState = {
    fuelTypes: any
    fuelTypeAllList: any
}
const initialState: fuelTypeState = {
    fuelTypes: {
        data: [],
    },
    fuelTypeAllList: null
}
// get all data with params
export const getFuelTypes = createAsyncThunk('api/fuelType/list', async (params: any, thunkAPI) => {
    try {
        return await fuelTypeService.getFuelTypes(params)
    } catch (error: any) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})
// get all data
export const getAllFuelType = createAsyncThunk('api/fuelType/allList', async (_, thunkAPI) => {
  try {
    return await fuelTypeService.getAllFuelType()
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
}
)
// store the FuelType
export const storeFuelType = createAsyncThunk('api/fuelType/store', async (formData: any, thunkAPI) => {
    try {
        return await fuelTypeService.storeFuelType(formData);
    } catch (error: any) {
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})
// update the FuelType
export const updateFuelType = createAsyncThunk('api/fuelType/update', async (formData: any, thunkAPI) => {
    try {
        return await fuelTypeService.updateFuelType(formData)
    } catch (error: any) {
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// create Slice
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
        builder.addCase(getAllFuelType.fulfilled, (state, action: PayloadAction) => {
            state.fuelTypeAllList = action.payload
        })
    },
})

export const { reset } = fuelTypeSlice.actions
export default fuelTypeSlice.reducer