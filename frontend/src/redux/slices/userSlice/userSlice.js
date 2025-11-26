import {toast} from 'react-toastify'
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axiosInterceptor from '../../axios/axiosInterceptor'

const initialState = {
  items: null,
  item: null,
}

export const getUsers = createAsyncThunk(
  'get/users',
  async (payload, {rejectWithValue, getState, dispatch}) => {
    try {
      // const res = await axios.get(`${apiUrl}users`);
      const res = await axiosInterceptor.get('users')
      return res.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const getUser = createAsyncThunk(
  'get/user',
  async (payload, {rejectWithValue, getState, dispatch}) => {
    try {
      // const res = await axios.get(`${apiUrl}user/${payload}`);
      const res = await axiosInterceptor.get(`user/${payload}`)
      return res.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const postUser = createAsyncThunk(
  'post/user',
  async (payload, {rejectWithValue, getState, dispatch}) => {
    try {
      const config = {
        headers: {
          contentType: 'multipart/form-data',
        },
      }
      const res = await axiosInterceptor.post(`create-user`, payload, config)
      return res.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const putUser = createAsyncThunk(
  'put-user',
  async (payload, {rejectWithValue, getState, dispatch}) => {
    try {
      const config = {
        headers: {
          contentType: 'multipart/form-data',
        },
      }
      const res = await axiosInterceptor.post(`update-user`, payload, config)
      return res.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const deleteUser = createAsyncThunk(
  'delete/user',
  async (payload, {rejectWithValue, getState, dispatch}) => {
    try {
      // const res = await axios.delete(`${apiUrl}user/${payload}`);
      const res = await axiosInterceptor.delete(`user/${payload}`)
      return res.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.items = action.payload
    })

    builder.addCase(getUsers.rejected, (state, action) => {})

    builder.addCase(postUser.fulfilled, (state, action) => {})

    builder.addCase(postUser.rejected, (state, action) => {
      // if (action.payload.message === "The email has already been taken.") {
      toast.warning(action.payload.message)
      // }
      // toast.warning("Error");
    })

    builder.addCase(putUser.fulfilled, (state, action) => {
      toast.success('Updated')
    })

    builder.addCase(putUser.rejected, (state, action) => {
      toast.warning('Error')
    })

    builder.addCase(deleteUser.fulfilled, (state, action) => {
      toast.success('Deleted')
    })

    builder.addCase(deleteUser.rejected, (state, action) => {
      toast.warning('Error')
    })

    builder.addCase(getUser.fulfilled, (state, action) => {
      state.item = action.payload
    })
  },
})
// export const { clearingState } = authSlice.actions;
const userReducer = userSlice.reducer
export default userReducer
