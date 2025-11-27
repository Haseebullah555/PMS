import {Routes, Route, Outlet} from 'react-router-dom'
import FuelTypeList from './components/FuelTypeList'

const FuelTypeManagementRoutes = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        {/* User Routes */}
        <Route path='/list' element={<FuelTypeList />} />
        {/* Role Routes */}
      </Route>
    </Routes>
  )
}
export default FuelTypeManagementRoutes
