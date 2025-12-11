import { Routes, Route, Outlet } from 'react-router-dom'
import SupplierLoanPayments from './components/SupplierLoanPaymentList'

const SupplierLoanPaymentManagementRoutes = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        {/* User Routes */}
        <Route path='/list' element={<SupplierLoanPayments />} />
        <Route path='/supplierLoanPaymentsList' element={<SupplierLoanPayments />} />
        {/* Role Routes */}
      </Route>
    </Routes>
  )
}
export default SupplierLoanPaymentManagementRoutes
