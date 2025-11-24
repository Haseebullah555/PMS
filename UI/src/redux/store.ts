import {configureStore} from '@reduxjs/toolkit'
import departmentSlice from './authentication/department/departmentSlice'
import roleSlice from './authentication/roles/roleSlice'
import userManagementSlice from './authentication/user/userManagementSlice'
import provinceSlice from './authentication/province/provinceSlice'
import bookSlice from './library/book/bookSlice'
import  supplierSlice from './supplier/SupplierSlice'
import customerSlice  from './customer/CustomerSlice'
import goodSlice from './good/FuelTypeSlice'
import extraExpenseSlice from './extraExpense/ExtraExpenseSlice'
import partnerSlice from './partner/PartnerSlice'
import staffSlice from './staff/StaffSlice'
import staffPaymentSlice from './staffPayment/StaffPaymentSlice'
import partnerTransactionSlice from './partnerTransaction/PartnerTransactionSlice'
import purchaseSlice from './purchases/PurchaseSlice'
import stockSlice from './stock/StockSlice'

export const store = configureStore({
  reducer: {
    departments: departmentSlice,
    role: roleSlice,
    systems: roleSlice,
    permissions: roleSlice,
    userManagement: userManagementSlice,
    province: provinceSlice,
    book: bookSlice,
    supplier: supplierSlice,
    customer: customerSlice,
    good: goodSlice,
    ExtraExpenses : extraExpenseSlice,
    partners : partnerSlice,
    staffs: staffSlice,
    staffPayments: staffPaymentSlice,
    partnerTransactions: partnerTransactionSlice,
    purchases: purchaseSlice,
    stock: stockSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
