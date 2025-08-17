import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import {
  putEmployee,
  putEmployeeInformation,
  resetPutEmployeeInformation,
} from '../../../../../../redux/slices/employeeSlice/employeeSlice'
import SetLang from '../../../../../custom/SetLang'
export default function BankInformation({ handleViewChange, employee_selector, data }) {
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmited, setIsSubmited] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const bank = [
    { id: 1, name: 'نوی کابل بانک' },
    { id: 2, name: 'AIB بانک' },
    { id: 3, name: 'میوند بانک' },
    { id: 4, name: 'پشتنی بانک' },
    { id: 5, name: 'غضنفر بانک' },
    { id: 6, name: 'عزیزی بانک' },
  ]

  const formik = useFormik({
    initialValues: {
      bank_id: employee_selector?.bank?.bank_id || data.bank_id,
      account_name: employee_selector?.bank?.account_name || data.account_name,
      account_number: employee_selector?.bank?.account_number || data.account_number,
    },

    validationSchema: yup.object().shape({
      bank_id: yup
        .string()
        // .min(4, SetLang("This field can not be less than 4 chracters"))
        .required(SetLang('This field can not be empty')),
      account_name: yup
        .string()
        .matches(/^[A-Za-z\s]+$/, SetLang('Only English characters are allowed'))
        .min(3, SetLang('This field can not be less than 3 chracters'))
        .required(SetLang('This field can not be empty')),
      account_number: yup
        .string()
        .min(4, SetLang('This field can not be less than 4 chracters'))
        .required(SetLang('This field can not be empty')),
    }),

    onSubmit: async (values) => {
      setIsLoading(true)
      dispatch(putEmployeeInformation({ data: values, type: 'bank' }))
      setIsLoading(false)
    },
  })

  return (
    <form onSubmit={formik.handleSubmit} className=' px-5 py-2 border '>
      <span className='text-center d-flex justify-content-center h3 pb-2'>
        {SetLang('New Employee')}
        {/* New User */}
      </span>
      <div className='d-flex justify-content-center row  '>
        <div className='col-sm-12 col-xl-4 col-xl-3 '>
          <div className=''>
            <label className='form-label' htmlFor='bank_id'>
              {SetLang('Bank')}
              <i className=' mx-2 text-danger fa fa-asterisk' style={{ fontSize: '7px' }} />
            </label>

            <select
              id='bank_id'
              name='bank_id'
              className='form-control text-start'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.bank_id}
            >
              <option>---</option>

              {bank?.map((mapBankRow) => {
                return (
                  <option key={mapBankRow.id} value={mapBankRow.id}>
                    {mapBankRow.name}
                  </option>
                )
              })}
            </select>

            {formik.touched.bank_id && formik.errors.bank_id ? (
              <div className='text-danger text-sm' style={{ fontSize: '0.850rem' }}>
                {formik.errors.bank_id}
              </div>
            ) : null}
          </div>
          <div className=''>
            <label className='form-label' htmlFor='account_name'>
              {SetLang('Account Name')}
              <i className=' mx-2 text-danger fa fa-asterisk' style={{ fontSize: '7px' }} />
            </label>
            <input
              type='text'
              name='account_name'
              placeholder={SetLang('Account Name')}
              className='form-control text-start'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.account_name}
            />
            {formik.touched.account_name && formik.errors.account_name ? (
              <div className='text-danger text-sm' style={{ fontSize: '0.850rem' }}>
                {formik.errors.account_name}
              </div>
            ) : null}
          </div>

          <div className=''>
            <label className='form-label' htmlFor='account_number'>
              {SetLang('Account Number')}
              <i className=' mx-2 text-danger fa fa-asterisk' style={{ fontSize: '7px' }} />
            </label>
            <input
              type='text'
              name='account_number'
              placeholder={SetLang('Account Number')}
              className='form-control text-start'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.account_number}
            />
            {formik.touched.account_number && formik.errors.account_number ? (
              <div className='text-danger text-sm' style={{ fontSize: '0.850rem' }}>
                {formik.errors.account_number}
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <div className='row d-flex mt-4 justify-content-between'>
        {!isSubmited && (
          <button
            className='btn btn-success bg-success py-2 h5 text-white col-lg-1 col-xxl-1  '
            type='submit'
            disabled={isLoading}
            onClick={() => {
              handleViewChange('enroll', 'back')
            }}
          >
            {isLoading ? (
              <span className='indicator-progress' style={{ display: 'block' }}>
                {/* {intl.formatMessage({id: 'LOGIN_PAGE.PLEASE_WAIT'})} */}
                <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
              </span>
            ) : (
              <span className='fa fa-arrow-right h3'>
                {/* {SetLang("Back")} */}
                {/* Save */}
              </span>
            )}
          </button>
        )}
        {employee_selector.bank == null && (
          <button
            className='btn btn-success bg-success py-2 h5 text-white col-lg-1 col-xxl-1  '
            type='submit'
            disabled={isLoading}
          >
            {isLoading ? (
              <span className='indicator-progress' style={{ display: 'block' }}>
                {/* {intl.formatMessage({id: 'LOGIN_PAGE.PLEASE_WAIT'})} */}
                <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
              </span>
            ) : (
              <span className='fa fa-arrow-left h3'>
                {/* {SetLang("Next")} */}
                {/* Save */}
              </span>
            )}
          </button>
        )}

        {employee_selector.bank != null && isSubmited != true && (
          <button
            className='btn btn-success bg-success py-2 h5 text-white col-lg-1 col-xxl-1   '
            onClick={() => {
              setIsLoading(true)
              dispatch(putEmployee(employee_selector))
                .then((res) => {
                  if (res.meta.requestStatus === 'fulfilled') {
                    toast.success(SetLang('Successfuly Done'))
                    setIsSubmited(true)
                  }
                })
                .then((err) => {
                  if (err?.meta?.requestStatus === 'rejected') {
                    toast.warning(SetLang('Error in performing the action'))
                  }
                })
              setIsLoading(false)
            }}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className='indicator-progress' style={{ display: 'block' }}>
                {/* {intl.formatMessage({id: 'LOGIN_PAGE.PLEASE_WAIT'})} */}
                <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
              </span>
            ) : (
              <span className='fa fa-save h3'>
                {/* {SetLang("Save")} */}
                {/* Save */}
              </span>
            )}
          </button>
        )}

        {isSubmited && (
          <>
            <button
              className='btn btn-success bg-success py-2 h5 text-white col-lg-1 col-xxl-1   '
              onClick={() => {
                formik.handleReset()
                dispatch(resetPutEmployeeInformation())
                handleViewChange('personal', 'reset')
              }}
              disabled={isLoading}
            >
              {isLoading ? (
                <span className='indicator-progress' style={{ display: 'block' }}>
                  {/* {intl.formatMessage({id: 'LOGIN_PAGE.PLEASE_WAIT'})} */}
                  <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                </span>
              ) : (
                <span className='fa fa-undo h3'>
                  {/* {SetLang("Save")} */}
                  {/* Save */}
                </span>
              )}
            </button>
            <button
              className='btn btn-success bg-success py-2 h5 text-white col-lg-1 col-xxl-1   '
              onClick={() => {
                formik.handleReset()
                dispatch(resetPutEmployeeInformation())
                navigate('/apps/employee/employee-list')
              }}
              disabled={isLoading}
            >
              {isLoading ? (
                <span className='indicator-progress' style={{ display: 'block' }}>
                  {/* {intl.formatMessage({id: 'LOGIN_PAGE.PLEASE_WAIT'})} */}
                  <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                </span>
              ) : (
                <span className='fa fa-list h3'>
                  {/* {SetLang("Save")} */}
                  {/* Save */}
                </span>
              )}
            </button>
          </>
        )}
      </div>
    </form>
  )
}
