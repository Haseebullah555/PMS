import React, {useEffect} from 'react'
import {useIntl} from 'react-intl'

export default function GetAllPermission({
  handleChange,
  permissionSelector,
  currentPermissions = [],
}) {
  const intl = useIntl()

  const isPermissionChecked = (generalPermissionId, currentPermissions) => {
    let temp
    currentPermissions.map((yrow) => {
      if (yrow == generalPermissionId) {
        temp = true
      }
    })
    return temp
  }

  return (
    <div
      className='modal fade'
      id='permissionModal'
      tabIndex={-1}
      aria-labelledby='permissionModalLabel'
      aria-hidden='true'
    >
      <div className='modal-dialog modal-xl modal-center'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h1 className='modal-title fs-5' id='permissionModalLabel'>
              {intl.formatMessage({id: 'SETTING.PERMISSION.PERMISSION_LIST'})}
            </h1>
            <button
              type='button'
              className='btn-close'
              data-bs-dismiss='modal'
              aria-label='Close'
            />
          </div>
          <div className='modal-body border '>
            <ul className='m-2 row' data-columns='1'>
              {permissionSelector.map((row) => (
                <div key={row.id} className='col-sm-12 col-md-3'>
                  <input
                    checked={isPermissionChecked(row.id, currentPermissions)}
                    type='checkbox'
                    name='permission'
                    onChange={(event) => {
                      handleChange(row.id, event, 'permission')
                    }}
                  />
                  <span className='px-1'>{row.name}</span>
                </div>
              ))}
            </ul>
          </div>

          <div className='modal-footer'>
            <button type='button' className='btn btn-danger' data-bs-dismiss='modal'>
              {intl.formatMessage({id: 'CLOSE'})}
            </button>
            <button type='button' className='btn btn-primary ' data-bs-dismiss='modal'>
              {intl.formatMessage({id: 'SAVE'})}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
