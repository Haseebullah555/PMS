import {Routes, Route, Outlet} from 'react-router-dom'
import StaffPaymentList from './components/StaffPaymentList'

const StaffPaymentManagementRoutes = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        {/* User Routes */}
        <Route path='/list' element={<StaffPaymentList />} />
        {/* Role Routes */}
    </Route>
    </Routes>
  )
}
export default StaffPaymentManagementRoutes
