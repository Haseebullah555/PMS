import {Routes, Route, Outlet} from 'react-router-dom'
import DailyFuelSellList from './components/DailyFuelSellList'

const FuelDistributionManagementRoutes = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        {/* Fuel Distribution Routes */}
        <Route path='/list' element={<DailyFuelSellList />} />
      </Route>
    </Routes>
  )
}
export default FuelDistributionManagementRoutes
