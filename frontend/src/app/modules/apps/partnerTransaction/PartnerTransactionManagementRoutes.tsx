import {Routes, Route, Outlet} from 'react-router-dom'
import PartnerTransactionList from './components/PartnerTransactionList'

const PartnerTransactionManagementRoutes = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        {/* User Routes */}
        <Route path='/list' element={<PartnerTransactionList />} />
        {/* Role Routes */}
      </Route>
    </Routes>
  )
}
export default PartnerTransactionManagementRoutes
