import { lazy, FC, Suspense } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import { MasterLayout } from '../../_metronic/layout/MasterLayout'
import TopBarProgress from 'react-topbar-progress-indicator'
import { DashboardWrapper } from '../pages/dashboard/DashboardWrapper'
import { MenuTestPage } from '../pages/MenuTestPage'
import { getCSSVariableValue } from '../../_metronic/assets/ts/_utils'
import { WithChildren } from '../../_metronic/helpers'
import BuilderPageWrapper from '../pages/layout-builder/BuilderPageWrapper'
import SupplierManagementRoutes from '../modules/apps/supplier/SupplierManagementRoutes'
import CustomerManagementRoutes from '../modules/apps/customer/CustomerManagementRoutes'

const PrivateRoutes = () => {

  const WizardsPage = lazy(() => import('../modules/wizards/WizardsPage'))
  const WidgetsPage = lazy(() => import('../modules/widgets/WidgetsPage'))
  const RolePage = lazy(() => import('./../modules/setting/role/components/RolePage'))
  const UserNewPage = lazy(() => import('../modules/user/components/UserNewPage'))
  
  return (
    <Routes>
      <Route element={<MasterLayout />}>
        {/* Redirect to Dashboard after success login/registartion */}
        <Route path='auth/*' element={<Navigate to='/dashboard' />} />
        {/* Pages */}
        <Route path='dashboard' element={<DashboardWrapper />} />
        <Route path='builder' element={<BuilderPageWrapper />} />
        <Route path='menu-test' element={<MenuTestPage />} />
        {/* Lazy Modules */}
        <Route
          path='crafted/pages/profile/*'
          element={<SuspensedView>{/* <ReportPage /> */}</SuspensedView>}
        />
        <Route
          path='crafted/pages/wizards/*'
          element={
            <SuspensedView>
              <WizardsPage />
            </SuspensedView>
          }
        />
        <Route
          path='crafted/widgets/*'
          element={
            <SuspensedView>
              <WidgetsPage />
            </SuspensedView>
          }
        />
        <Route
          path='settings/role/*'
          element={
            <SuspensedView>
              <RolePage />
            </SuspensedView>
          }
        />
        <Route
          path='users/*'
          element={
            <SuspensedView>
              {/* <UserPage /> */}
              <UserNewPage />
            </SuspensedView>
          }
        />
        <Route
          path='supplier/*'
          element={
            <SuspensedView>
              <SupplierManagementRoutes />
            </SuspensedView>
          }
        />
        <Route
          path='customer/*'
          element={
            <SuspensedView>
              <CustomerManagementRoutes />
            </SuspensedView>
          }
        />
        {/* Page Not Found */}
        <Route path='*' element={<Navigate to='/error/404' />} />
      </Route>
    </Routes>
  )
}

const SuspensedView: FC<WithChildren> = ({ children }) => {
  const baseColor = getCSSVariableValue('--bs-primary')
  TopBarProgress.config({
    barColors: {
      '0': baseColor,
    },
    barThickness: 1,
    shadowBlur: 5,
  })
  return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>
}

export { PrivateRoutes }
