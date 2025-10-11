import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import extraExpenseService from "./ExtraExpenseService/ExtraExpenseService"
import { actions } from "react-table"

type extraExpenseState = {
    extraExpenses: any
}
const initialState: extraExpenseState = {
    extraExpenses: {
        data: [],
    },
}
export const getExtraExpenses = createAsyncThunk('api/extraExpense/list', async (params: any, thunkAPI) => {
    try {
        return await extraExpenseService.getExtraExpenses(params)
    } catch (error: any) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

export const storeExtraExpense = createAsyncThunk('api/extraExpense/store', async (formData: any, thunkAPI) => {
    try {
        return await extraExpenseService.store(formData);
    } catch (error: any) {
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const updateExtraExpense = createAsyncThunk('api/extraExpense/update', async (formData: any, thunkAPI) => {
    try {
        return await extraExpenseService.update(formData)
    } catch (error: any) {
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})
export const extraExpenseSlice = createSlice({
    name: 'extraExpense',
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder.addCase(getExtraExpenses.fulfilled, (state, action: PayloadAction) => {
            state.extraExpenses = action.payload
        })
    },
})

export const { reset } = extraExpenseSlice.actions
export default extraExpenseSlice.reducer