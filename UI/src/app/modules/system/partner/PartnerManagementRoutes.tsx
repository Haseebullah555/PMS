import {Routes, Route, Outlet} from 'react-router-dom'
import PartnerList from './components/PartnerList'

const PartnerManagementRoutes = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        {/* User Routes */}
        <Route path='/list' element={<PartnerList />} />
        {/* Role Routes */}
      </Route>
    </Routes>
  )
}
export default PartnerManagementRoutes
