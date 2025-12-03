import { Routes, Route, Outlet } from 'react-router-dom'
import PurchasesList from './components/SupplierLoanPaymentList'

const SupplierLoanPaymentManagementRoutes = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        {/* User Routes */}
        <Route path='/list' element={<PurchasesList />} />
        {/* Role Routes */}
      </Route>
    </Routes>
  )
}
export default SupplierLoanPaymentManagementRoutes
