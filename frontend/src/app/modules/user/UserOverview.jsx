/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'

import {useDispatch, useSelector} from 'react-redux'
import CustomLoader from '../../custom/loader/CustomLoader'
import {useIntl} from 'react-intl'
import moment from 'moment'
import {
  get_department_generals,
  get_genders,
  getDistricts,
  getProvinces,
} from '../../../redux/slices/generalSlices/generalSlice'
import AllPermissionsAndRoles from './components/AllPermissionsAndRoles'

export function UserOverview() {
  const intl = useIntl()
  const dispatch = useDispatch()
  const data = useSelector((state) => {
    return state.user.item
  })

  const provincecSelector = useSelector((state) => {
    return state.general.provinces
  })

  const districtsSelector = useSelector((state) => {
    return state.general.districts
  })

  const department_generals_selector = useSelector((state) => {
    return state.general.department_generals
  })

  const genders_selector = useSelector((state) => {
    return state.general.genders
  })

  useEffect(() => {
    if (!provincecSelector) {
      dispatch(getProvinces())
        .then((res) => {})
        .catch((err) => {
          console.log(err)
        })
    }

    if (!districtsSelector) {
      dispatch(getDistricts())
        .then((res) => {})
        .catch((err) => {
          console.log(err)
        })
    }

    if (!department_generals_selector) {
      dispatch(get_department_generals())
        .then((res) => {})
        .catch((err) => {
          console.log(err)
        })
    }

    if (!genders_selector) {
      dispatch(get_genders())
        .then((res) => {})
        .catch((err) => {
          console.log(err)
        })
    }
  }, [])

  if (!data) {
    return <></>
  }
  const {permissions_by_roles, user} = data
  const {
    birth_date,
    birth_place,
    created_at,
    district,
    father_name,
    g_father_name,
    gender,
    identification_number,
    profile_image,
    province,
    updated_at,
    name_da,
    last_name_da,
    last_name_en,
    department_generals_id,
  } = user.profile

  if (!data.user.profile) {
    return <CustomLoader />
  }
  return (
    <>
      <div className='card mb-5 mb-xl-10' id='kt_profile_details_view'>
        <div className='card-header cursor-pointer'>
          <div className='card-title m-0'>
            <h3 className='fw-bolder m-0'>{intl.formatMessage({id: 'ACCOUNT.PROFILE.DETAIL'})}</h3>
          </div>

          <Link to={`/users/update/${user.id}`} className='btn btn-primary align-self-center'>
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
                {user.name} {last_name_en}
              </span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>
              {intl.formatMessage({id: 'ACCOUNT.PROFILE.FULL_NAME_DA'})}
            </label>

            <div className='col-lg-8'>
              <span className='fw-bolder fs-6 text-dark'>
                {name_da} {last_name_da}
              </span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>
              {intl.formatMessage({id: 'ACCOUNT.PROFILE.FATHER_NAME'})}
            </label>

            <div className='col-lg-8 fv-row'>
              <span className='fw-bold fs-6'>{father_name}</span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>
              {intl.formatMessage({id: 'ACCOUNT.PROFILE.G_FATHER_NAME'})}
            </label>

            <div className='col-lg-8 fv-row'>
              <span className='fw-bold fs-6'>{g_father_name}</span>
            </div>
          </div>
          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>
              {intl.formatMessage({id: 'ACCOUNT.PROFILE.GENDER'})}
            </label>

            <div className='col-lg-8 fv-row'>
              <span className='fw-bold fs-6'>
                {genders_selector?.map((row) => {
                  if (row.id == gender) {
                    return row.name_da
                  }
                })}
              </span>
            </div>
          </div>
          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>
              {intl.formatMessage({id: 'ACCOUNT.PROFILE.BIRTH_DATE'})}
            </label>

            <div className='col-lg-8 fv-row'>
              <span className='fw-bold fs-6'>{birth_date}</span>
            </div>
          </div>
          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>
              {intl.formatMessage({id: 'ACCOUNT.PROFILE.BIRTH_PLACE'})}
            </label>

            <div className='col-lg-8 fv-row'>
              <span className='fw-bold fs-6'>{birth_place}</span>
            </div>
          </div>
          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>
              {intl.formatMessage({id: 'ACCOUNT.PROFILE.BIRTH_DISTRICT'})}
            </label>

            <div className='col-lg-8 fv-row'>
              <span className='fw-bold fs-6'>
                {districtsSelector?.map((row) => {
                  if (row.id == district) {
                    return row.name_da
                  }
                })}
              </span>
            </div>
          </div>
          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>
              {intl.formatMessage({id: 'ACCOUNT.PROFILE.BIRTH_PROVINCE'})}
            </label>

            <div className='col-lg-8 fv-row'>
              <span className='fw-bold fs-6'>
                {provincecSelector?.map((row) => {
                  if (row.id == province) {
                    return row.name_da
                  }
                })}
              </span>
            </div>
          </div>
          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>
              {intl.formatMessage({id: 'ACCOUNT.PROFILE.CARD_NUMBER'})}
            </label>

            <div className='col-lg-8 fv-row'>
              <span className='fw-bold fs-6'>{identification_number}</span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>
              {intl.formatMessage({id: 'ACCOUNT.PROFILE.DEPARTMENT'})}
            </label>

            <div className='col-lg-8 fv-row'>
              <span className='fw-bold fs-6'>
                {department_generals_selector?.map((row) => {
                  if (row.id == department_generals_id) {
                    return row.name_da
                  }
                })}
              </span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>
              {intl.formatMessage({id: 'ACCOUNT.PROFILE.EMAIL'})}
            </label>

            <div className='col-lg-8 d-flex align-items-center'>
              <span className='fw-bolder fs-6 me-2'>{user.email}</span>

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
                {moment(created_at).format('y-m-d')}
              </a>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>
              {intl.formatMessage({id: 'ACCOUNT.PROFILE.UPDATED_AT'})}
            </label>

            <div className='col-lg-8'>
              <span className='fw-bolder fs-6 text-dark'>{moment(updated_at).format('y-m-d')}</span>
            </div>
          </div>
          <AllPermissionsAndRoles user={user} permissions_by_roles={permissions_by_roles} />
        </div>
      </div>
    </>
  )
}
