import {Routes, Route, Outlet} from 'react-router-dom'
import StaffList from './components/StaffList'

const StaffManagementRoutes = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        {/* User Routes */}
        <Route path='/list' element={<StaffList />} />
        {/* Role Routes */}
    </Route>
    </Routes>
  )
}
export default StaffManagementRoutes
