import authenticationReducer from '../slices/authenticationSlices/authenticationSlice'
import userReducer from '../slices/userSlice/userSlice'
import generalReducer from '../slices/generalSlices/generalSlice'
import employeeReducer from '../slices/employeeSlice/employeeSlice'
import authorizationReducer from '../slices/authorizationSlice/authorizationSlice'
import supplierSlice from '../slices/supplier/SupplierSlice'
import { configureStore } from '@reduxjs/toolkit'
import customerSlice from '../slices/customer/CustomerSlice'
import extraExpenseSlice from '../slices/extraExpense/ExtraExpenseSlice'
import stockSlice from '../slices/stock/StockSlice'
import purchaseSlice from '../slices/purchases/PurchaseSlice'
import staffPaymentSlice from '../slices/staffPayment/StaffPaymentSlice'
import staffSlice from '../slices/staff/StaffSlice'
import partnerSlice from '../slices/partner/PartnerSlice'
import partnerTransactionSlice from '../slices/partnerTransaction/PartnerTransactionSlice'
import fuelTypeSlice from '../slices/fuelType/FuelTypeSlice'
import fuelStandSlice from '../slices/fuelStand/FuelStandSlice'
import supplierLoanPaymentSlice from '../slices/supplierLoanPayment/SupplierLoanPaymentSlice'
import fuelDistributionSlice from '../slices/fuelDistribution/FuelDistributionSlice'

export const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
    authorization: authorizationReducer,
    user: userReducer,
    general: generalReducer,
    employee: employeeReducer,
    supplier: supplierSlice,
    customer: customerSlice,
    extraExpense: extraExpenseSlice,
    ExtraExpenses: extraExpenseSlice,
    partners: partnerSlice,
    staffs: staffSlice,
    staffPayments: staffPaymentSlice,
    partnerTransactions: partnerTransactionSlice,
    purchases: purchaseSlice,
    stock: stockSlice,
    fuelType: fuelTypeSlice,
    fuelStand: fuelStandSlice,
    supplierLoanPayment: supplierLoanPaymentSlice,
    fuelDistribution: fuelDistributionSlice,

  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
