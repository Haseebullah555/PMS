// slices/userSlice.js
import {toast} from 'react-toastify'
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'
// import {dari} from './../../../general/localization/da/da'
import axiosInterceptor from '../../axios/axiosInterceptor'
import {apiUrl} from '../../../apiUrl'

const initialState = {
  userDetail: localStorage.getItem('userDetail')
    ? JSON.parse(localStorage.getItem('userDetail'))
    : null,
  profile: null,
}

console.log(apiUrl, '----------------')
export const loginUserAction = createAsyncThunk(
  'user/login',
  async (payload, {rejectWithValue, getState, dispatch}) => {
    try {
      console.log('hhhhhhhhhhhhhhhhhh')
      const res = await axios.post(`${apiUrl}/Auth/login/`, {
        username: payload.email,
        password: payload.password,
      })
      if (typeof window !== 'undefined') {
        localStorage.setItem('userDetail', JSON.stringify(res.data))
      }
      return res.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const getProfile = createAsyncThunk(
  'get-profile-info',
  async (payload, {rejectWithValue, getState, dispatch}) => {
    try {
      // const res = await axios.post(`${apiUrl}user`, payload, config);
      const res = await axiosInterceptor.get('get-profile-info', payload)
      return res.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

// export const logOutUserAction = createAsyncThunk("user/logout", async () => {
//   localStorage.removeItem("userDetail");
//   return null;
// });

const authenticationSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logOutUserAction: (state) => {
      localStorage.removeItem('userDetail')
      state.userDetail = null
    },

    setAuthUser: (state, action) => {
      state.userDetail = action.payload
    },

    reset_list: (state) => {
      state.employeeItems = null
    },
  },

  extraReducers: (builder) => {
    builder.addCase(loginUserAction.fulfilled, (state, action) => {
      state.userDetail = action.payload
    })

    builder.addCase(loginUserAction.rejected, (state, action) => {
      if (action?.payload?.detail === 'No active account found with the given credentials') {
        // toast.warning(dari.No_active_account_found)
      } else {
        // toast.warning(dari.error)
      }
    })

    builder.addCase(getProfile.fulfilled, (state, action) => {
      state.profile = action.payload.personal_information[0]
    })
    builder.addCase(getProfile.rejected, (state, action) => {})
    //logout
    // builder.addCase(logOutUserAction.fulfilled, (state, action) => {
    //   state.userDetail = null;
    // });
  },
})
export const {logOutUserAction, setAuthUser, reset_list} = authenticationSlice.actions
const authenticationReducer = authenticationSlice.reducer
export default authenticationReducer
