import {configureStore} from '@reduxjs/toolkit'
import departmentSlice from './authentication/department/departmentSlice'
import roleSlice from './authentication/roles/roleSlice'
import userManagementSlice from './authentication/user/userManagementSlice'
import provinceSlice from './authentication/province/provinceSlice'
import bookSlice from './library/book/bookSlice'

export const store = configureStore({
  reducer: {
    departments: departmentSlice,
    role: roleSlice,
    systems: roleSlice,
    permissions: roleSlice,
    userManagement: userManagementSlice,
    province: provinceSlice,
    book: bookSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
