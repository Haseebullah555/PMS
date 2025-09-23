import {Routes, Route, Outlet} from 'react-router-dom'
import SupplierList from './components/SupplierList'

const SupplierManagementRoutes = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        {/* User Routes */}
        <Route path='/list' element={<SupplierList />} />
        {/* Role Routes */}
      </Route>
    </Routes>
  )
}
export default SupplierManagementRoutes
