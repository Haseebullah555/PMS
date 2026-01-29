import {Routes, Route, Outlet} from 'react-router-dom'
import FuelSummaryReport from './components/FuelSummaryReport'

const ReportManagmentRoutes = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        {/* Report Routes */}
        <Route path='/fuel-summary' element={<FuelSummaryReport />} />
      </Route>
    </Routes>
  )
}
export default ReportManagmentRoutes
