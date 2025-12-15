import {Routes, Route, Outlet} from 'react-router-dom'
import FuelStandWithDetials from './components/FuelStandWithDetials'

const FuelDistributionManagementRoutes = () => {
    console.log("=============")
  return (
    <Routes>
      <Route element={<Outlet />}>
        {/* Fuel Distribution Routes */}
        <Route path='/fuelStandWithDetials' element={<FuelStandWithDetials />} />
      </Route>
    </Routes>
  )
}
export default FuelDistributionManagementRoutes
