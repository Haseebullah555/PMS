/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {KTIcon} from '../../../../_metronic/helpers'

import {useSelector} from 'react-redux'
import {useIntl} from 'react-intl'
import moment from 'moment'

export function Overview() {
  const intl = useIntl()

  const data = useSelector((state) => {
    return state.authentication.profile
  })
  if (!data) {
    return <></>
  }

  return (
    <>
      <div className='card mb-5 mb-xl-10' id='kt_profile_details_view'>
        <div className='card-header cursor-pointer'>
          <div className='card-title m-0'>
            <h3 className='fw-bolder m-0'>{intl.formatMessage({id: 'ACCOUNT.PROFILE.DETAIL'})}</h3>
          </div>

          <Link to='/account/change' className='btn btn-primary align-self-center'>
            {intl.formatMessage({id: 'ACCOUNT.PROFILE.CHANGE'})}
          </Link>
        </div>

        <div className='card-body p-9'>
          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>
              {intl.formatMessage({id: 'ACCOUNT.PROFILE.FULL_NAME_EN'})}
            </label>

            <div className='col-lg-8'>
              <span className='fw-bolder fs-6 text-dark'>
                {data.first_name_en} {data.last_name_en}
              </span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>
              {intl.formatMessage({id: 'ACCOUNT.PROFILE.FULL_NAME_DA'})}
            </label>

            <div className='col-lg-8'>
              <span className='fw-bolder fs-6 text-dark'>
                {data.name_da} {data.last_name_da}
              </span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>
              {intl.formatMessage({id: 'ACCOUNT.PROFILE.FATHER_NAME'})}
            </label>

            <div className='col-lg-8 fv-row'>
              <span className='fw-bold fs-6'>{data.father_name}</span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>
              {intl.formatMessage({id: 'ACCOUNT.PROFILE.G_FATHER_NAME'})}
            </label>

            <div className='col-lg-8 fv-row'>
              <span className='fw-bold fs-6'>{data.g_father_name}</span>
            </div>
          </div>
          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>
              {intl.formatMessage({id: 'ACCOUNT.PROFILE.GENDER'})}
            </label>

            <div className='col-lg-8 fv-row'>
              <span className='fw-bold fs-6'>{data.gender_name}</span>
            </div>
          </div>
          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>
              {intl.formatMessage({id: 'ACCOUNT.PROFILE.BIRTH_DATE'})}
            </label>

            <div className='col-lg-8 fv-row'>
              <span className='fw-bold fs-6'>{data.birth_date}</span>
            </div>
          </div>
          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>
              {intl.formatMessage({id: 'ACCOUNT.PROFILE.BIRTH_PLACE'})}
            </label>

            <div className='col-lg-8 fv-row'>
              <span className='fw-bold fs-6'>{data.birth_place}</span>
            </div>
          </div>
          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>
              {intl.formatMessage({id: 'ACCOUNT.PROFILE.BIRTH_DISTRICT'})}
            </label>

            <div className='col-lg-8 fv-row'>
              <span className='fw-bold fs-6'>{data.district_name}</span>
            </div>
          </div>
          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>
              {intl.formatMessage({id: 'ACCOUNT.PROFILE.BIRTH_PROVINCE'})}
            </label>

            <div className='col-lg-8 fv-row'>
              <span className='fw-bold fs-6'>{data.province_name}</span>
            </div>
          </div>
          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>
              {intl.formatMessage({id: 'ACCOUNT.PROFILE.CARD_NUMBER'})}
            </label>

            <div className='col-lg-8 fv-row'>
              <span className='fw-bold fs-6'>{data.identification_number}</span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>
              {intl.formatMessage({id: 'ACCOUNT.PROFILE.DEPARTMENT'})}
            </label>

            <div className='col-lg-8 fv-row'>
              <span className='fw-bold fs-6'>{data.department_generals_name}</span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>
              {intl.formatMessage({id: 'ACCOUNT.PROFILE.EMAIL'})}

              {/* <i
                className='fas fa-exclamation-circle ms-1 fs-7'
                data-bs-toggle='tooltip'
                title='Phone number must be active'
              ></i> */}
            </label>

            <div className='col-lg-8 d-flex align-items-center'>
              <span className='fw-bolder fs-6 me-2'>{data.email}</span>

              <span className='badge badge-success'>
                {intl.formatMessage({id: 'ACCOUNT.PROFILE.VERYFIED'})}
              </span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>
              {intl.formatMessage({id: 'ACCOUNT.PROFILE.CREATED_AT'})}
            </label>

            <div className='col-lg-8'>
              <a href='#' className='fw-bold fs-6 text-dark text-hover-primary'>
                {moment(data.created_at).format('y-m-d')}
              </a>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>
              {intl.formatMessage({id: 'ACCOUNT.PROFILE.UPDATED_AT'})}

              {/* <i
                className='fas fa-exclamation-circle ms-1 fs-7'
                data-bs-toggle='tooltip'
                title='Country of origination'
              ></i> */}
            </label>

            <div className='col-lg-8'>
              <span className='fw-bolder fs-6 text-dark'>
                {moment(data.updated_at).format('y-m-d')}
              </span>
            </div>
          </div>

          {/* <div className='row mb-10'>
            <label className='col-lg-4 fw-bold text-muted'>Allow Changes</label>

            <div className='col-lg-8'>
              <span className='fw-bold fs-6'>Yes</span>
            </div>
          </div>

          <div className='notice d-flex bg-light-warning rounded border-warning border border-dashed p-6'>
            <KTIcon iconName='information-5' className='fs-2tx text-warning me-4' />
            <div className='d-flex flex-stack flex-grow-1'>
              <div className='fw-bold'>
                <h4 className='text-gray-800 fw-bolder'>We need your attention!</h4>
                <div className='fs-6 text-gray-600'>
                  Your payment was declined. To start using tools, please
                  <Link className='fw-bolder' to='/crafted/account/settings'>
                    {' '}
                    Add Payment Method
                  </Link>
                  .
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>

      {/* <div className='row gy-10 gx-xl-10'>
        <div className='col-xl-6'>
          <ChartsWidget1 className='card-xxl-stretch mb-5 mb-xl-10' />
        </div>

        <div className='col-xl-6'>
          <TablesWidget1 className='card-xxl-stretch mb-5 mb-xl-10' />
        </div>
      </div>

      <div className='row gy-10 gx-xl-10'>
        <div className='col-xl-6'>
          <ListsWidget5 className='card-xxl-stretch mb-5 mb-xl-10' />
        </div>

        <div className='col-xl-6'>
          <TablesWidget5 className='card-xxl-stretch mb-5 mb-xl-10' />
        </div>
      </div> */}
    </>
  )
}
