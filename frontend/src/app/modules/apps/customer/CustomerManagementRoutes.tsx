import {Routes, Route, Outlet} from 'react-router-dom'
import CustomerList from './components/CustomerList'

const CustomerManagementRoutes = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        {/* User Routes */}
        <Route path='/list' element={<CustomerList />} />
        {/* Role Routes */}
      </Route>
    </Routes>
  )
}
export default CustomerManagementRoutes
