import {lazy, FC, Suspense} from 'react'
import {Route, Routes, Navigate} from 'react-router-dom'
import MasterLayout from '../../_metronic/layout/MasterLayout'
import TopBarProgress from 'react-topbar-progress-indicator'
import DashboardWrapper from '../pages/dashboard/DashboardWrapper'
import {getCSSVariableValue} from '../../_metronic/assets/ts/_utils'
import {WithChildren} from '../../_metronic/helpers'
import LibraryManagementRoutes from 'app/modules/system/library/LibraryManagementRoutes'
import SupplierManagementRoutes from 'app/modules/system/supplier/SupplierManagementRoutes'
import CustomerManagementRoutes from 'app/modules/system/customer/CustomerManagementRoutes'
import GoodManagementRoutes from 'app/modules/system/good/GoodManagementRoutes'
import ExtraExpenseManagementRoutes from 'app/modules/system/extraExpense/ExtraExpensemanagementRoutes'
import PartnerManagementRoutes from 'app/modules/system/partner/PartnerManagementRoutes'
import StaffManagementRoutes from 'app/modules/system/staff/StaffManagementRoutes'
import StaffPaymentManagementRoutes from 'app/modules/system/staffPayment/StaffPaymentManagementRoutes'
import PartnerTransactionManagementRoutes from 'app/modules/system/partnerRransaction/PartnerTransactionManagementRoutes'
import PurchasesManagementRoutes from 'app/modules/system/purchases/PurchasesManagementRoutes'
const PrivateRoutes = () => {
  const AccountPage = lazy(() => import('../modules/accounts/AccountPage'))
  const AuthPage = lazy(() => import('../modules/authentication/AuthPage'))

  return (
    <Routes>
      <Route element={<MasterLayout />}>
        <Route path='auth/*' element={<Navigate to='/library/book/list' />} />
        {/* Pages */}
        <Route path='dashboard' element={<DashboardWrapper />} />
        {/* Lazy Modules */}
        <Route
          path='authentication/*'
          element={
            <SuspensedView>
              <AuthPage />
            </SuspensedView>
          }
        />
        <Route
          path='library/*'
          element={
            <SuspensedView>
              <LibraryManagementRoutes />
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
        <Route
          path='good/*'
          element={
            <SuspensedView>
              <GoodManagementRoutes />
            </SuspensedView>
          }
        />
        <Route
          path='extraExpense/*'
          element={
            <SuspensedView>
              <ExtraExpenseManagementRoutes />
            </SuspensedView>
          }
        />
        <Route
          path='partner/*'
          element={
            <SuspensedView>
              <PartnerManagementRoutes />
            </SuspensedView>
          }
        />
        <Route
          path='partnerTransaction/*'
          element={
            <SuspensedView>
              <PartnerTransactionManagementRoutes />
            </SuspensedView>
          }
        />
        <Route
          path='staff/*'
          element={
            <SuspensedView>
              <StaffManagementRoutes />
            </SuspensedView>
          }
        />
        <Route
          path='staffPayment/*'
          element={
            <SuspensedView>
              <StaffPaymentManagementRoutes />
            </SuspensedView>
          }
        />
        <Route
          path='purchases/*'
          element={
            <SuspensedView>
              <PurchasesManagementRoutes />
            </SuspensedView>
          }
        />

        <Route
          path='crafted/account/*'
          element={
            <SuspensedView>
              <AccountPage />
            </SuspensedView>
          }
        />
        {/* Page Not Found */}
        <Route path='*' element={<Navigate to='/error/404' />} />
      </Route>
    </Routes>
  )
}

const SuspensedView: FC<WithChildren> = ({children}) => {
  const baseColor = getCSSVariableValue('--kt-primary')
  TopBarProgress.config({
    barColors: {
      '0': baseColor,
    },
    barThickness: 1,
    shadowBlur: 5,
  })
  return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>
}

export {PrivateRoutes}
