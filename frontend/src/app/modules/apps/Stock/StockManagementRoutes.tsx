import {Routes, Route, Outlet} from 'react-router-dom'
import StockList from './components/StockList'

const StockManagementRoutes = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        {/* User Routes */}
        <Route path='/list' element={<StockList />} />
        {/* Role Routes */}
      </Route>
    </Routes>
  )
}
export default StockManagementRoutes
