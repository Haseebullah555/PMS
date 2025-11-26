import authenticationReducer from '../slices/authenticationSlices/authenticationSlice'
import userReducer from '../slices/userSlice/userSlice'
import generalReducer from '../slices/generalSlices/generalSlice'
import employeeReducer from '../slices/employeeSlice/employeeSlice'
import authorizationReducer from '../slices/authorizationSlice/authorizationSlice'
import supplierSlice from '../slices/supplier/SupplierSlice'
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
    authorization: authorizationReducer,
    user: userReducer,
    general: generalReducer,
    employee: employeeReducer,
    supplier: supplierSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
