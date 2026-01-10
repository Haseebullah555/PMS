import {Routes, Route, Outlet} from 'react-router-dom'
import CustomerLoanList from './components/CustomerLoanList'

const CustomerLoanManagementRoutes = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        {/* User Routes */}
        <Route path='/list' element={<CustomerLoanList />} />
        {/* Role Routes */}
      </Route>
    </Routes>
  )
}
export default CustomerLoanManagementRoutes
