import {Routes, Route, Outlet} from 'react-router-dom'
import GoodList from './components/GoodList'

const GoodManagementRoutes = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        {/* User Routes */}
        <Route path='/list' element={<GoodList />} />
        {/* Role Routes */}
      </Route>
    </Routes>
  )
}
export default GoodManagementRoutes
