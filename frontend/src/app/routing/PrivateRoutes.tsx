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
import SupplierLoanPaymentManagementRoutes from '../modules/apps/supplierLoanPayment/SupplierLoanPaymentManagementRoutes'
import CustomerManagementRoutes from '../modules/apps/customer/CustomerManagementRoutes'
import StaffManagementRoutes from '../modules/apps/staff/StaffManagementRoutes'
import StockManagementRoutes from '../modules/apps/Stock/StockManagementRoutes'
import PurchaseManagementRoutes from '../modules/apps/purchases/PurchasesManagementRoutes'
import PartnerManagementRoutes from '../modules/apps/partner/PartnerManagementRoutes'
import PartnerTransactionManagementRoutes from '../modules/apps/partnerTransaction/PartnerTransactionManagementRoutes'
import ExtraExpenseManagementRoutes from '../modules/apps/extraExpense/ExtraExpensemanagementRoutes'
import FuelTypeManagementRoutes from '../modules/apps/fuelType/FuelTypemanagementRoutes'
import FuelStandManagementRoutes from '../modules/apps/fuelStand/FuelStandmanagementRoutes'
import StaffPaymentManagementRoutes from '../modules/apps/staffPayment/StaffPaymentManagementRoutes'
import DailyFuelSellManagementRoutes from '../modules/apps/dailyFuelSell/DailyFuelSellManagementRoutes'
import CustomerLoanPaymentManagementRoutes from '../modules/apps/customerLoanPayment/CustomerLoanPaymentManagementRoutes'
import CustomerLoanManagementRoutes from '../modules/apps/customerLoan/CustomerLoanManagementRoutes'
import ReportManagmentRoutes from '../modules/apps/report/ReportManagmentRoutes'

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
          path='users/*'
          element={
            <SuspensedView>
              {/* <UserPage /> */}
              <UserNewPage />
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
          path='supplier/*'
          element={
            <SuspensedView>
              <SupplierManagementRoutes />
            </SuspensedView>
          }
        />
        <Route
          path='supplier-loan-payment/*'
          element={
            <SuspensedView>
              <SupplierLoanPaymentManagementRoutes />
            </SuspensedView>
          }
        />
        <Route
          path='customer-loan-payment/*'
          element={
            <SuspensedView>
              <CustomerLoanPaymentManagementRoutes />
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
          path='customerLoan/*'
          element={
            <SuspensedView>
              <CustomerLoanManagementRoutes />
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
          path='purchase/*'
          element={
            <SuspensedView>
              <PurchaseManagementRoutes />
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
          path='stock/*'
          element={
            <SuspensedView>
              <StockManagementRoutes />
            </SuspensedView>
          }
        />
        <Route
          path='fuelType/*'
          element={
            <SuspensedView>
              <FuelTypeManagementRoutes />
            </SuspensedView>
          }
        />
        <Route
          path='fuelStand/*'
          element={
            <SuspensedView>
              <FuelStandManagementRoutes />
            </SuspensedView>
          }
        />
        <Route
          path='dailyFuelSell/*'
          element={
            <SuspensedView>
              <DailyFuelSellManagementRoutes />
            </SuspensedView>
          }
        />
        <Route
          path='report/*'
          element={
            <SuspensedView>
              <ReportManagmentRoutes />
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
