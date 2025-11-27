import {Routes, Route, Outlet} from 'react-router-dom'
import FuelStandList from './components/FuelStandList'

const FuelStandManagementRoutes = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        {/* User Routes */}
        <Route path='/list' element={<FuelStandList />} />
        {/* Role Routes */}
      </Route>
    </Routes>
  )
}
export default FuelStandManagementRoutes
