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
            {SetLang('sppliers')}
          </span>
        </div>
      </div>
      <SidebarMenuItemWithSub
        to='/supplier/list'
        title={SetLang('sppliers')}
        fontIcon='bi-archive'
        icon='element-plus'
      >
        <SidebarMenuItem
          to='/supplier/list'
          fontIcon='bi-archive'
          title={intl.formatMessage({ id: 'MENU.CREATE.HELPDESK' })}
          hasBullet={true}
        />

      </SidebarMenuItemWithSub>
      <SidebarMenuItemWithSub
        to='/helpdesk'
        title={intl.formatMessage({ id: 'MENU.Helpdesk_Department' })}
        fontIcon='bi-archive'
        icon='element-plus'
      >
        <SidebarMenuItem
          to='/helpdesk/create'
          title={intl.formatMessage({ id: 'MENU.CREATE.HELPDESK' })}
          hasBullet={true}
        />

      </SidebarMenuItemWithSub>


      {/* <SidebarMenuItemWithSub
        to='/apps/employee'
        title={intl.formatMessage({id: 'MENU.APPS.EMPLOYEE'})}
        fontIcon='bi-archive'
        icon='element-plus'
      >
        {UserCan(['list employee'], userPermissions) && (
          <SidebarMenuItem
            to='/apps/employee/employee-list'
            title={intl.formatMessage({id: 'MENU.APPS.EMPLOYEE_LIST'})}
            hasBullet={true}
          />
        )}

        {UserCan(['create employee'], userPermissions) && (
          <SidebarMenuItem
            to='/apps/employee/employee-create'
            title={intl.formatMessage({id: 'MENU.APPS.CREATE_EMPLOYEE'})}
            hasBullet={true}
          />
        )}
      </SidebarMenuItemWithSub> */}

      {UserCan(['create document', 'list document', 'report document'], userPermissions) && (
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
      )}
      {UserCan(
        ['create archive', 'update archive', 'read archive', 'list archive', 'report archive'],
        userPermissions
      ) && (
          <>
            <div className='menu-item'>
              <div className='menu-content pt-8 pb-2'>
                <span className='menu-section text-muted text-uppercase fs-8 ls-1'>
                  {intl.formatMessage({ id: 'MENU.ORGANIZATION' })}
                </span>
              </div>
            </div>

            <SidebarMenuItemWithSub
              to='/archive'
              title={intl.formatMessage({ id: 'MENU.ORGANIZATION.ARCHEIVE' })}
              fontIcon='bi-archive'
              icon='element-plus'
            >
              {UserCan(['create archive'], userPermissions) && (
                <SidebarMenuItem
                  to='/archive/create'
                  title={intl.formatMessage({ id: 'MENU.DOCUMENT.SAVE_DOCUMENTS' })}
                  hasBullet={true}
                />
              )}
              {UserCan(['list archive'], userPermissions) && (
                <SidebarMenuItem
                  to='/archive/list'
                  title={intl.formatMessage({ id: 'MENU.DOCUMENT.LIST' })}
                  hasBullet={true}
                />
              )}

              {/* {UserCan(['list organization department'], userPermissions) && ( */}
              {UserCan(['list department'], userPermissions) && (
                <SidebarMenuItem
                  to='/archive/department/list'
                  title={intl.formatMessage({ id: 'MENU.SETTING.DEPARTMENT' })}
                  hasBullet={true}
                />
              )}

              {/* {UserCan(['report archive'], userPermissions) && (
              <SidebarMenuItem
                to='/archive/report'
                title={intl.formatMessage({id: 'MENU.DOCUMENT.DOCUMENT_REPORT'})}
                hasBullet={true}
              />
            )} */}
            </SidebarMenuItemWithSub>
          </>
        )}
      {UserCan(
        ['create contact', 'update contact', 'read contact', 'list contact'],
        userPermissions
      ) && (
          <>
            <SidebarMenuItemWithSub
              to='/contact'
              title={intl.formatMessage({ id: 'MENU.ORGANIZATION.CONTACTS_INFORMATION' })}
              fontIcon='bi-contact'
              icon='element-plus'
            >
              {UserCan(['create contact'], userPermissions) && (
                <SidebarMenuItem
                  to='/contact/create'
                  title={intl.formatMessage({ id: 'MENU.CONTACT.SAVE_CONTACTS' })}
                  hasBullet={true}
                />
              )}
              {UserCan(['list contact'], userPermissions) && (
                <SidebarMenuItem
                  to='/contact/list'
                  title={intl.formatMessage({ id: 'MENU.CONTACT.LIST' })}
                  hasBullet={true}
                />
              )}
            </SidebarMenuItemWithSub>
          </>
        )}
      {/* {UserCan(['user management'], userPermissions) && (
        <SidebarMenuItemWithSub
          to='/users'
          title={intl.formatMessage({id: 'MENU.USER_MANAGEMENT'})}
          fontIcon='bi-chat-left'
          icon='message-text-2'
        >
          {UserCan(['list user'], userPermissions) && (
            <SidebarMenuItem
              to='/users/list'
              title={intl.formatMessage({id: 'MENU.USER.USER_LIST'})}
              hasBullet={true}
            />
          )}

          {UserCan(['create user'], userPermissions) && (
            <SidebarMenuItem
              to='/users/create'
              title={intl.formatMessage({id: 'MENU.USER.USER_CREATE'})}
              hasBullet={true}
            />
          )}
        </SidebarMenuItemWithSub>
      )} */}

      {UserCan(['list user', 'create user', 'list department', 'list role'], userPermissions) && (
        <>
          <SidebarMenuItemWithSub
            to='/'
            title={intl.formatMessage({ id: 'MENU.SETTING' })}
            fontIcon='bi-layers'
            icon='switch'
          >
            {UserCan(['list user'], userPermissions) && (
              <SidebarMenuItem
                to='/users/list'
                title={intl.formatMessage({ id: 'MENU.USER.USER_LIST' })}
                hasBullet={true}
              />
            )}

            {UserCan(['create user'], userPermissions) && (
              <SidebarMenuItem
                to='/users/create'
                title={intl.formatMessage({ id: 'MENU.USER.USER_CREATE' })}
                hasBullet={true}
              />
            )}

            {UserCan(['list department'], userPermissions) && (
              <SidebarMenuItem
                to='/settings/department/list'
                title={intl.formatMessage({ id: 'MENU.SETTING.DEPARTMENT' })}
                hasBullet={true}
              />
            )}

            {/* {UserCan(['user management'], userPermissions) && (
          <SidebarMenuItem
            to='/settings/permission/list'
            title={intl.formatMessage({id: 'MENU.SETTING.PERMISSION'})}
            hasBullet={true}
          />
        )} */}

            {UserCan(['list role'], userPermissions) && (
              <SidebarMenuItem
                to='/settings/role/list'
                title={intl.formatMessage({ id: 'MENU.SETTING.ROLE' })}
                hasBullet={true}
              />
            )}
          </SidebarMenuItemWithSub>
        </>
      )}

      <SidebarMenuItem
        to='/account'
        title={intl.formatMessage({ id: 'MENU.USER.MY_PROFILE' })}
        icon='profile-circle'
        fontIcon='bi-person'
      // hasBullet={true}
      />

      {/* Example Code  */}

      <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>
            معلوماتو برخه
          </span>
        </div>
      </div>
      <SidebarMenuItemWithSub
        to='/documents'
        title="معلومات"
        fontIcon='bi-archive'
        icon='element-plus'
      >
        <SidebarMenuItem
          to='/example/create'
          title="ثبت معلومات"
          hasBullet={true}
        />
      </SidebarMenuItemWithSub>

      <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>
            پریکتیس
          </span>
        </div>
      </div>
      <SidebarMenuItemWithSub
        to='/tests'
        title="test-sub"
        fontIcon='bi-archive'
        icon='element-plus'
      >
        <SidebarMenuItem
          to='/tests/create'
          title="test-create"
          hasBullet={true}
        />
      </SidebarMenuItemWithSub>


      {/* <SidebarMenuItemWithSub
        to='/accounts'
        title={intl.formatMessage({id: 'MENU.USER.MY_PROFILE'})}
        icon='profile-circle'
        fontIcon='bi-person'
      >

        <SidebarMenuItem
          to='/account/change'
          title={intl.formatMessage({id: 'MENU.USER.SETTING'})}
          hasBullet={true}
        />
      </SidebarMenuItemWithSub> */}

      {/* <SidebarMenuItem
          to='/reports/attendance/attendance-create'
          title={intl.formatMessage({id: 'MENU.REPORTS.ATTENDACE_REPORT_CREATE'})}
          hasBullet={true}
        />
        <SidebarMenuItem
          to='/reports/attendance/attendance-list'
          title={intl.formatMessage({id: 'MENU.REPORTS.ATTENDACE_REPORT_LIST'})}
          hasBullet={true}
        />
        <SidebarMenuItem
          to='/reports/m41/m41-list'
          title={intl.formatMessage({id: 'MENU.REPORTS.M41_LIST'})}
          hasBullet={true}
        />
        <SidebarMenuItem
          to='/reports/tawheed/tawheed-list'
          title={intl.formatMessage({id: 'MENU.REPORTS.TAWHEED_LIST'})}
          hasBullet={true}
        />
        <SidebarMenuItem
          to='/reports/m16/m16-list'
          title={intl.formatMessage({id: 'MENU.REPORTS.M16_LIST'})}
          hasBullet={true}
        />
      </SidebarMenuItemWithSub> */}

      {/* <SidebarMenuItem
        to='/profile'
        title={intl.formatMessage({id: 'MENU.USER.MY_PROFILE'})}
        hasBullet={true}
      /> */}
      {/* <SidebarMenuItemWithSub
        to='/apps/chat'
        title='Chat'
        fontIcon='bi-chat-left'
        icon='message-text-2'
      >
        <SidebarMenuItem to='/apps/chat/private-chat' title='Private Chat' hasBullet={true} />
        <SidebarMenuItem to='/apps/chat/group-chat' title='Group Chart' hasBullet={true} />
        <SidebarMenuItem to='/apps/chat/drawer-chat' title='Drawer Chart' hasBullet={true} />
      </SidebarMenuItemWithSub> */}

      {/* <SidebarMenuItem to='/builder' icon='switch' title='Layout Builder' fontIcon='bi-layers' /> */}
      {/* <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Crafted</span>
        </div>
      </div> */}
      {/* <SidebarMenuItemWithSub
        to='/crafted/pages'
        title={intl.formatMessage({id: 'MENU.PAGES'})}
        // title='Pages'
        fontIcon='bi-archive'
        icon='element-plus'
        >


        <SidebarMenuItemWithSub to='/crafted/pages/profile' title='Profile' hasBullet={true}>
          <SidebarMenuItem to='/crafted/pages/profile/overview' title='Overview' hasBullet={true} />
          <SidebarMenuItem to='/crafted/pages/profile/projects' title='Projects' hasBullet={true} />
          <SidebarMenuItem
            to='/crafted/pages/profile/campaigns'
            title='Campaigns'
            hasBullet={true}
          />
          <SidebarMenuItem
            to='/crafted/pages/profile/documents'
            title='Documents'
            hasBullet={true}
          />
          <SidebarMenuItem
            to='/crafted/pages/profile/connections'
            title='Connections'
            hasBullet={true}
          />
        </SidebarMenuItemWithSub>

        <SidebarMenuItemWithSub to='/crafted/pages/wizards' title='Wizards' hasBullet={true}>
          <SidebarMenuItem
            to='/crafted/pages/wizards/horizontal'
            title='Horizontal'
            hasBullet={true}
          />
          <SidebarMenuItem to='/crafted/pages/wizards/vertical' title='Vertical' hasBullet={true} />
        </SidebarMenuItemWithSub>
      </SidebarMenuItemWithSub> */}

      {/* <SidebarMenuItemWithSub
        to='/crafted/accounts'
        title='Accounts'
        icon='profile-circle'
        fontIcon='bi-person'
      >
        <SidebarMenuItem to='/crafted/account/overview' title='Overview' hasBullet={true} />
        <SidebarMenuItem to='/crafted/account/settings' title='Settings' hasBullet={true} />
      </SidebarMenuItemWithSub> */}

      {/* <SidebarMenuItemWithSub to='/error' title='Errors' fontIcon='bi-sticky' icon='cross-circle'>
        <SidebarMenuItem to='/error/404' title='Error 404' hasBullet={true} />
        <SidebarMenuItem to='/error/500' title='Error 500' hasBullet={true} />
      </SidebarMenuItemWithSub> */}

      {/* <SidebarMenuItemWithSub
        to='/crafted/widgets'
        title='Widgets'
        icon='element-7'
        fontIcon='bi-layers'
      >
        <SidebarMenuItem to='/crafted/widgets/lists' title='Lists' hasBullet={true} />
        <SidebarMenuItem to='/crafted/widgets/statistics' title='Statistics' hasBullet={true} />
        <SidebarMenuItem to='/crafted/widgets/charts' title='Charts' hasBullet={true} />
        <SidebarMenuItem to='/crafted/widgets/mixed' title='Mixed' hasBullet={true} />
        <SidebarMenuItem to='/crafted/widgets/tables' title='Tables' hasBullet={true} />
        <SidebarMenuItem to='/crafted/widgets/feeds' title='Feeds' hasBullet={true} />
      </SidebarMenuItemWithSub> */}

      {/* <SidebarMenuItem
        to='/apps/user-management/users'
        icon='abstract-28'
        title='User management'
        fontIcon='bi-layers'
      /> */}
      {/* <div className='menu-item'>
        <a
          target='_blank'
          className='menu-link'
          href={process.env.REACT_APP_PREVIEW_DOCS_URL + '/docs/changelog'}
        >
          <span className='menu-icon'>
            <KTIcon iconName='code' className='fs-2' />
          </span>
          <span className='menu-title'>Changelog {process.env.REACT_APP_VERSION}</span>
        </a>
      </div> */}
    </>
  )
}

export { SidebarMenuMain }
