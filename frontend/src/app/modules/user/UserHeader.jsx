/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect, useState} from 'react'
import {KTIcon, toAbsoluteUrl} from '../../../_metronic/helpers'
import {Link, useSearchParams} from 'react-router-dom'
import {Dropdown1} from '../../../_metronic/partials'
import {useLocation} from 'react-router'
import {useParams} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import CustomLoader from '../../custom/loader/CustomLoader'
import {useIntl} from 'react-intl'
import {getUser} from '../../../redux/slices/userSlice/userSlice'

const UserHeader = () => {
  const intl = useIntl()
  const location = useLocation()

  const dispatch = useDispatch()
  const params = useParams()
  const data = useSelector((state) => {
    return state.user.item
  })

  useEffect(() => {
    dispatch(getUser(params.id))
      .then((res) => {})
      .catch((err) => {
        console.log(err)
      })
  }, [params?.id])

  if (!data) {
    return <CustomLoader />
  }
  return (
    <div className='card mb-5 mb-xl-10'>
      <div className='card-body pt-9 pb-0'>
        <div className='d-flex flex-wrap flex-sm-nowrap mb-3'>
          <div className='me-7 mb-4'>
            <div className='symbol symbol-100px symbol-lg-160px symbol-fixed position-relative'>
              <img
                src={
                  data.user.profile.profile_image
                    ? `${process.env.REACT_APP_API_PUBLIC_URL}all_images/${data.user.profile.profile_image}`
                    : toAbsoluteUrl('/media/auth/profile.png')
                }
                alt='Metronic'
              />
              <div className='position-absolute translate-middle bottom-0 start-100 mb-6 bg-success rounded-circle border border-4 border-white h-20px w-20px'></div>
            </div>
          </div>

          <div className='flex-grow-1'>
            <div className='d-flex justify-content-between align-items-start flex-wrap mb-2'>
              <div className='d-flex flex-column'>
                <div className='d-flex align-items-center mb-2'>
                  <a href='#' className='text-gray-800 text-hover-primary fs-2 fw-bolder me-1'>
                    {data.user.name} {data.user.profile.last_name_en}
                  </a>
                  <a href='#'>
                    <KTIcon iconName='verify' className='fs-1 text-primary' />
                  </a>
                  <a
                    href='#'
                    className='btn btn-sm btn-light-success fw-bolder ms-2 fs-8 py-1 px-3'
                    data-bs-toggle='modal'
                    data-bs-target='#kt_modal_upgrade_plan'
                  >
                    {intl.formatMessage({id: 'ACCOUNT.PROFILE.VERYFIED'})}
                    {/* Veryfied */}
                  </a>
                </div>

                <div className='d-flex flex-wrap fw-bold fs-6 mb-4 pe-2'>
                  <a
                    href='#'
                    className='d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2'
                  >
                    <KTIcon iconName='profile-circle' className='fs-4 me-1' />
                    {data.user.profile.name_da} {data.user.profile.last_name_da}
                  </a>
                </div>

                <div className='d-flex flex-wrap fw-bold fs-6 mb-4 pe-2'>
                  <a
                    href='#'
                    className='d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2'
                  >
                    <KTIcon iconName='sms' className='fs-4 me-1' />
                    {data.user.email}
                  </a>
                </div>
              </div>

              <div className='d-flex my-4'>
                <div className='me-0'>
                  <button
                    className='btn btn-sm btn-icon btn-bg-light btn-active-color-primary'
                    data-kt-menu-trigger='click'
                    data-kt-menu-placement='bottom-end'
                    data-kt-menu-flip='top-end'
                  >
                    <i className='bi bi-three-dots fs-3'></i>
                  </button>
                  <Dropdown1 />
                </div>
              </div>
            </div>

            <div className='d-flex flex-wrap flex-stack'>
              <div className='d-flex flex-column flex-grow-1 pe-8'></div>
            </div>
          </div>
        </div>

        <div className='d-flex overflow-auto h-55px'>
          <ul className='nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bolder flex-nowrap'>
            <li className='nav-item'>
              <Link
                className={
                  `nav-link text-active-primary me-6 ` +
                  (location.pathname == `{/users/overview/${data.user.id}` && 'active')
                }
                to={`/users/overview/${data.user.id}`}
              >
                {intl.formatMessage({id: 'ACCOUNT.PROFILE.OVERVIEW'})}
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                className={
                  `nav-link text-active-primary me-6 ` +
                  (location.pathname == `{/users/update/${data.user.id}` && 'active')
                }
                to={`/users/update/${data.user.id}`}
              >
                {intl.formatMessage({id: 'ACCOUNT.PROFILE.SETTING'})}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default UserHeader
