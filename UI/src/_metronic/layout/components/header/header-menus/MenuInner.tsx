import {MenuItem} from './MenuItem'
import {MenuInnerWithSub} from './MenuInnerWithSub'
import {useTranslation} from 'react-i18next'
import {useAuth} from '../../../../../app/modules/auth'

export function MenuInner() {
  const {t} = useTranslation()
  const {hasPermission} = useAuth()

  const basePath = window.location.pathname.split('/') // Split the pathname into segments
  // Access the first segment (e.g., 'library')
  const currentBasePath = basePath[1] || ''
    return (
      <>
          <MenuInnerWithSub
            title={t('global.SYSTEMANAGEMENT')}
            to={['/authentication/users', '/authentication/departments', '/authentication/roles']}
            menuPlacement='bottom-end'
            menuTrigger='click'
            hasArrow={true}
            fontIcon='fas fa-cogs'
          >
            <MenuItem
              to='/authentication/users'
              title={t('global.users')}
              fontIcon='fas fa-users text-white'
              hasBullet={false}
            />
            <MenuItem
              to='/authentication/departments'
              title={t('user.departments')}
              fontIcon='fas fa-home text-white'
              hasBullet={false}
            />

            <MenuItem
              to='/authentication/roles'
              title={t('user.roles')}
              fontIcon='fas fa-sitemap text-white'
              hasBullet={false}
            />
          </MenuInnerWithSub>
      
          <MenuItem title={t('book.books')} to='/library/book/list' />
          <MenuItem title={t('supplier.suppliers')} to='/supplier/list' />
          <MenuItem title={t('customer.customers')} to='/customer/list' />
          <MenuItem title={t('good.goods')} to='/good/list' />
          <MenuItem title={t('extraExpense.extraExpenses')} to='/extraExpense/list' />
          <MenuItem title={t('partner.partners')} to='/partner/list' />
          <MenuItem title={t('staff.staffs')} to='/staff/list' />
          <MenuItem title={t('staffSalary.staffSalaries')} to='/staffSalary/list' />
      </>
    )
  }
