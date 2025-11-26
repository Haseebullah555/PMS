/* eslint-disable react/jsx-no-target-blank */
import React from 'react'
import { useIntl } from 'react-intl'
import { KTIcon } from '../../../../helpers'
import { SidebarMenuItemWithSub } from './SidebarMenuItemWithSub'
import { SidebarMenuItem } from './SidebarMenuItem'
import UserCan from './../../../../../app/custom/UserCan'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

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
    </>
  )
}

export { SidebarMenuMain }
