import React, {useEffect, useState} from 'react'
import {useRef} from 'react'
import {useImperativeHandle} from 'react'
import {forwardRef} from 'react'
import {Modal} from 'bootstrap'
import { useTranslation } from 'react-i18next'

const AssignPermissionToRole = forwardRef(
  ({permissionSelector, currentPermissions = [], handleChange, handleSave, isLoading}, ref) => {
    const modalRef = useRef(null)
    const {t} = useTranslation()

    
    useImperativeHandle(ref, () => ({
      dismissModal() {
        const modalElement = modalRef.current
        const modal = Modal.getInstance(modalElement)
        if (modal) {
          modal.hide()
          const backdrop = document.getElementsByClassName('modal-backdrop')[0]
          if (backdrop) {
            backdrop.remove()
          }
        }
      },
    }))

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
        ref={modalRef}
        className='modal fade'
        id='permissionsForRoleModal'
        tabIndex={-1}
        aria-labelledby='permissionModalLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog modal-xl modal-center'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h1 className='modal-title fs-5' id='permissionModalLabel'>
                {t('Permissions List')}
              </h1>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'
              />
            </div>
            <div className='modal-body border '>
              <ul className='m-2 row' data-columns='4'>
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
                {t('Close')}
              </button>
              <button
                onClick={() => handleSave()}
                type='button'
                disabled={isLoading}
                className='btn btn-primary'
                //   data-bs-dismiss="modal"
              >
                {isLoading ? (
                  <span className='indicator-progress' style={{display: 'block'}}>
                    {/* {intl.formatMessage({id: 'LOGIN_PAGE.PLEASE_WAIT'})} */}
                    <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                  </span>
                ) : (
                  <span>{t('Save')}</span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
)
export default AssignPermissionToRole
