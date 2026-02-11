/* eslint-disable react/jsx-no-target-blank */
import { useIntl } from 'react-intl'
import { SidebarMenuItem } from './SidebarMenuItem'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { SidebarMenuItemWithSub } from './SidebarMenuItemWithSub'
import UserCan from '../../../../../app/custom/UserCan'

const SidebarMenuMain = () => {

  const { t } = useTranslation()

  const userPermissions = useSelector((state: any) => {
    return state?.authentication?.userDetail?.user?.permissions
  })
  const intl = useIntl()
  return (
    <>
      <SidebarMenuItem
        to='/dashboard'
        title={intl.formatMessage({ id: 'MENU.DASHBOARD' })}
        icon='element-11'
        fontIcon='bi-app-indicator'
      />
      <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>
            {t('global.SYSTEM.PART')}
          </span>
        </div>
      </div>
      <SidebarMenuItem
        to='/supplier/list'
        title={t('supplier.suppliers')}
        icon='element-11'
        fontIcon='bi-app-indicator'
      />
      <SidebarMenuItem
        to='/purchase/list'
        title={t('purchase.purchases')}
        icon='element-11'
        fontIcon='bi-app-indicator'
      />
      <SidebarMenuItem
        to='/supplier-loan-payment/list'
        title={t('supplierLoanPayment.list')}
        icon='element-11'
        fontIcon='bi-app-indicator'
      />
      <SidebarMenuItem
        to='/fuelStand/details'
        title={t('fuelDistribution.fuelStandWithDetial')}
        icon='element-11'
        fontIcon='bi-app-indicator'
      />
      <SidebarMenuItem
        to='/customer/list'
        title={t('customer.customers')}
        icon='element-11'
        fontIcon='bi-app-indicator'
      />
      <SidebarMenuItem
        to='/customer-loan-payment/customerLoanPaymentsList'
        title={t('customerLoan.customerLoans')}
        icon='element-11'
        fontIcon='bi-app-indicator'
      />
      <SidebarMenuItem
        to='/partner/list'
        title={t('partner.partners')}
        icon='element-11'
        fontIcon='bi-app-indicator'
      />
      <SidebarMenuItem
        to='/partnerTransaction/list'
        title={t('partnerTransaction.partnerTransactions')}
        icon='element-11'
        fontIcon='bi-app-indicator'
      />
      <SidebarMenuItem
        to='/staff/list'
        title={t('staff.staffs')}
        icon='element-11'
        fontIcon='bi-app-indicator'
      />
      <SidebarMenuItem
        to='/staffPayment/list'
        title={t("staffPayment.staffPayments")}
        icon='element-11'
        fontIcon='bi-app-indicator'
      />
      <SidebarMenuItem
        to='/stock/list'
        title={t("stock.aviliableStock")}
        icon='element-11'
        fontIcon='bi-app-indicator'
      />
      <SidebarMenuItem
        to='/extraExpense/list'
        title={t("extraExpense.extraExpenses")}
        icon='element-11'
        fontIcon='bi-app-indicator'
      />
      <SidebarMenuItem
        to='/dailyFuelSell/list'
        title={t("dailyFuelSell.dailyFuelSells")}
        icon='element-11'
        fontIcon='bi-app-indicator'
      />

      {/* report part  */}
      <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>
            {t('global.SYSTEM.REPROT')}
          </span>
        </div>
      </div>
      <SidebarMenuItem
        to='/report/fuel-summary'
        title={t("report.fuelSummaryReport")}
        icon='element-11'
        fontIcon='bi-app-indicator'
      />

      <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>
            {t('global.SYSTEM.PART')}
          </span>
        </div>
      </div>
      <SidebarMenuItemWithSub
        to='/fuelType/list'
        title={t('global.SYSTEM.MANAGEMENT.PART')}
        fontIcon='bi-archive'
        icon='element-plus'
      >
        <SidebarMenuItem
          to='/fuelType/list'
          title={t("fuelType.fuelTypes")}
          hasBullet={true}
        />
        <SidebarMenuItem
          to='/fuelStand/list'
          title={t("fuelStand.fuelStands")}
          icon='element-11'
          fontIcon='bi-app-indicator'
        />

      </SidebarMenuItemWithSub>

      {/* User Management   */}
      <SidebarMenuItemWithSub
        to='/user-management'
        title={intl.formatMessage({ id: 'MENU.SETTING' })}
        fontIcon='bi-layers'
        icon='switch'
      >
        <SidebarMenuItem
          to='/users/list'
          title={intl.formatMessage({ id: 'MENU.USER.USER_LIST' })}
          hasBullet={true}
        />
        <SidebarMenuItem
          to='/users/create'
          title={intl.formatMessage({ id: 'MENU.USER.USER_CREATE' })}
          hasBullet={true}
        />
        <SidebarMenuItem
          to='/settings/role/list'
          title={intl.formatMessage({ id: 'MENU.SETTING.ROLE' })}
          hasBullet={true}
        />
      </SidebarMenuItemWithSub>
    </>
  )
}

export { SidebarMenuMain }
