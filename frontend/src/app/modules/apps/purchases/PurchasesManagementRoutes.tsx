import {Routes, Route, Outlet} from 'react-router-dom'
import PurchasesList from './components/PurchasesList'

const PurchaseManagementRoutes = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        {/* User Routes */}
        <Route path='/list' element={<PurchasesList />} />
        {/* Role Routes */}
      </Route>
    </Routes>
  )
}
export default PurchaseManagementRoutes
