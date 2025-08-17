
// slices/BranchSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axiosInterceptor from '../../axios/axiosInterceptor'

const initialState = {
    branchs: null,
}

console.log(axiosInterceptor, 'ssssssssss')
export const post_branch = createAsyncThunk(
    'BranchApi/create',
    async (payload, { rejectWithValue, getState, dispatch }) => {
        try {
            // const res = await axios.post(`${apiUrl}user`, payload, config);
            console.log('helllllllllllll')
            const res = await axiosInterceptor.post('BranchApi/create', payload)
            return res.data
        } catch (error) {
            return rejectWithValue(
                error.response?.data || error.message || 'Something went wrong'
            )    //   return rejectWithValue(error.response.data)
        }
    }
)

export const get_branchs = createAsyncThunk(
    'BranchApi',
    async (payload, { rejectWithValue, getState, dispatch }) => {
        try {
            // const res = await axios.get(`${apiUrl}get-employees`);
            const res = await axiosInterceptor.get('BranchApi')
            return res.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)


const branchSlice = createSlice({
    name: 'branchSlice',
    initialState,

    extraReducers: (builder) => {
        builder.addCase(post_branch.fulfilled, (state, action) => { })
        builder.addCase(post_branch.rejected, (state, action) => { })
        // builder.addCase(get_branchs.fulfilled, (state, action) => {
        //     state.branchs = action.payload
        // })
        // builder.addCase(get_branchs.rejected, (state, action) => { })

    },
})

const branchReducer = branchSlice.reducer
export default branchReducer
