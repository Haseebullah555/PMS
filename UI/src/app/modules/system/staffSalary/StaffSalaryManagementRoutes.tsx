import {Routes, Route, Outlet} from 'react-router-dom'
import StaffSalaryList from './components/StaffSalaryList'

const StaffSalaryManagementRoutes = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        {/* User Routes */}
        <Route path='/list' element={<StaffSalaryList />} />
        {/* Role Routes */}
    </Route>
    </Routes>
  )
}
export default StaffSalaryManagementRoutes
