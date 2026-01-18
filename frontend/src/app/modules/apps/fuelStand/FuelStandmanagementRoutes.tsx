import {Routes, Route, Outlet} from 'react-router-dom'
import FuelStandList from './components/FuelStandList'
import FuelStandWithDetials from './components/FuelStandWithDetials'

const FuelStandManagementRoutes = () => {
  console.log("---------------")
  return (
    <Routes>
      <Route element={<Outlet />}>
        {/* User Routes */}
        <Route path='/list' element={<FuelStandList />} />
        <Route path='/details' element={<FuelStandWithDetials />} />
        {/* Role Routes */}
      </Route>
    </Routes>
  )
}
export default FuelStandManagementRoutes
