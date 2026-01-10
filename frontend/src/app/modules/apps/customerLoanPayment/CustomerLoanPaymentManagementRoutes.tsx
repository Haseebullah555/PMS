import { Routes, Route, Outlet } from 'react-router-dom'
import CustomerLoanPayments from './components/CustomerLoanPaymentList'

const CustomerLoanPaymentManagementRoutes = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        {/* User Routes */}
        <Route path='/list' element={<CustomerLoanPayments />} />
        <Route path='/customerLoanPaymentsList' element={<CustomerLoanPayments />} />
        {/* Role Routes */}
      </Route>
    </Routes>
  )
}
export default CustomerLoanPaymentManagementRoutes
