/* eslint-disable react/jsx-no-target-blank */
import React from 'react'
import { useIntl } from 'react-intl'
import { KTIcon } from '../../../../helpers'
import { SidebarMenuItemWithSub } from './SidebarMenuItemWithSub'
import { SidebarMenuItem } from './SidebarMenuItem'
import UserCan from './../../../../../app/custom/UserCan'
import { useSelector } from 'react-redux'
import SetLang from '../../../../../app/custom/SetLang'

const SidebarMenuMain = () => {
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
            {SetLang('Setting Part')}
          </span>
        </div>
      </div>
      <SidebarMenuItemWithSub
        to='/branchs'
        title={SetLang('Setting')}
        fontIcon='bi-archive'
        icon='element-plus'
      >
        <SidebarMenuItem
          to='/branchs/lists'
          title={SetLang('Branch')}
          hasBullet={true}
        />
      </SidebarMenuItemWithSub>

      <SidebarMenuItem
        to='/account'
        title={intl.formatMessage({ id: 'MENU.USER.MY_PROFILE' })}
        icon='profile-circle'
        fontIcon='bi-person'
      // hasBullet={true}
      />




      {/* {UserCan(['create document', 'list document', 'report document'], userPermissions) && (
        <>
          <div className='menu-item'>
            <div className='menu-content pt-8 pb-2'>
              <span className='menu-section text-muted text-uppercase fs-8 ls-1'>
                {intl.formatMessage({ id: 'MENU.SECRETARY' })}
              </span>
            </div>
          </div>
          <SidebarMenuItemWithSub
            to='/documents'
            title={intl.formatMessage({ id: 'MENU.DOCUMENT.ARCHEIVE' })}
            fontIcon='bi-archive'
            icon='element-plus'
          >
            {UserCan(['create document'], userPermissions) && (
              <SidebarMenuItem
                to='/documents/create'
                title={intl.formatMessage({ id: 'MENU.DOCUMENT.SAVE_DOCUMENTS' })}
                hasBullet={true}
              />
            )}
            {UserCan(['list document'], userPermissions) && (
              <SidebarMenuItem
                to='/documents/list'
                title={intl.formatMessage({ id: 'MENU.DOCUMENT.LIST' })}
                hasBullet={true}
              />
            )}
            {UserCan(['report document'], userPermissions) && (
              <SidebarMenuItem
                to='/documents/report'
                title={intl.formatMessage({ id: 'MENU.DOCUMENT.DOCUMENT_REPORT' })}
                hasBullet={true}
              />
            )}
          </SidebarMenuItemWithSub>
        </>
      )} */}


    </>
  )
}

export { SidebarMenuMain }
