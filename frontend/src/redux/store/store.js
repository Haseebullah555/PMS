import { configureStore } from '@reduxjs/toolkit'
import authenticationReducer from '../slices/authenticationSlices/authenticationSlice'
import userReducer from '../slices/userSlice/userSlice'
import generalReducer from '../slices/generalSlices/generalSlice'
import departmentReducer from '../slices/departmentSlice/departmentSlice'
import authorizationReducer from '../slices/authorizationSlice/authorizationSlice'
import branchReducer from '../slices/branchSlice/branchSlice'

export const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
    authorization: authorizationReducer,
    user: userReducer,
    general: generalReducer,
    department: departmentReducer,
    branch: branchReducer,
  },
})
