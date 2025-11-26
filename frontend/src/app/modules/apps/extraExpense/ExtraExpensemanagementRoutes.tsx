import {Routes, Route, Outlet} from 'react-router-dom'
import ExtraExpenseList from './components/ExtraExpenseList'

const ExtraExpenseManagementRoutes = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        {/* User Routes */}
        <Route path='/list' element={<ExtraExpenseList />} />
        {/* Role Routes */}
      </Route>
    </Routes>
  )
}
export default ExtraExpenseManagementRoutes
