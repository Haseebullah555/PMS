import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useDispatch } from 'react-redux'
import { putEmployeeInformation } from '../../../../../../redux/slices/employeeSlice/employeeSlice'
import SetLang from '../../../../../custom/SetLang'
export default function TazkiraInformation({ handleViewChange, employee_selector, data }) {
  const handleInputChange = (event, formik) => {
    const { name, value } = event.target
    // Remove any existing dashes from the value
    const newValue = value.replace(/-/g, '')
    let formattedValue = ''

    for (let i = 0; i < newValue.length && i<13; i++) {
      if (i === 4 || i === 8 || i === 13) {
        formattedValue += '-'
      }
      formattedValue += newValue[i]
    }

    // Set the field value using Formik's setFieldValue function
    formik.setFieldValue(name, formattedValue)
  }

  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)
  const [validation, setValidation] = useState({
    isPaper: false,
    isElectric: false,
  })
  useEffect(() => {
    if (data.tazkira_type_id == 1) {
      setValidation({ isPaper: true })
      // formik.setFieldValue({
      // 	...formik.values,
      // });
    } else if (data.tazkira_type_id == 2) {
      setValidation({ isElectric: true })
    }
  }, [])

  const electricValidation = yup.object().shape({
    tazkira_type: yup
      .string()
      // .min(4, SetLang("This field can not be less than 4 chracters"))
      .required(SetLang('This field can not be empty')),
    tazkira_number: yup
    .string()
    .trim()
    .matches(/^\d{4}-\d{4}-\d{5}$/, SetLang('Invalid NIC number format'))
    .required(SetLang('This field can not be empty')),
  })

  const paperValidation = yup.object().shape({
    tazkira_type: yup
      .string()
      // .min(4, SetLang("This field can not be less than 4 chracters"))
      .required(SetLang('This field can not be empty')),
    tazkira_number: yup
      .string()
      .min(4, SetLang('This field can not be less than 4 chracters'))
      .required(SetLang('This field can not be empty')),
    book_number: yup
      .string()
      // .min(4, SetLang("This field can not be less than 4 chracters"))
      .required(SetLang('This field can not be empty')),
    page_number: yup
      .string()
      // .min(4, SetLang("This field can not be less than 4 chracters"))
      .required(SetLang('This field can not be empty')),
    registeration_number: yup
      .string()
      // .min(4, SetLang("This field can not be less than 4 chracters"))
      .required(SetLang('This field can not be empty')),
  })

  const validationSchema =
    validation.isPaper === true
      ? paperValidation
      : // validation.isElectric === true
      // ?
      electricValidation

  const handleValidation = (event) => {
    if (event.target.value === '1') {
      setValidation({ isPaper: true })
    } else if (event.target.value === '2') {
      setValidation({ isElectric: true })
    }
  }
  const formik = useFormik({
    initialValues: {
      tazkira_type: employee_selector?.tazkira?.tazkira_type || data.tazkira_type_id,
      tazkira_number: employee_selector?.tazkira?.tazkira_number || data.tazkira_number,
      book_number: employee_selector?.tazkira?.book_number || data.book_number,
      page_number: employee_selector?.tazkira?.page_number || data.page_number,
      registeration_number:
        employee_selector?.tazkira?.registeration_number || data.registeration_number,
    },

    validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true)
      dispatch(putEmployeeInformation({ data: values, type: 'tazkira' }))
      handleViewChange('live', 'next')
    },
  })

  return (
    <form onSubmit={formik.handleSubmit} className=' px-5 py-2 border '>
      <span className='text-center d-flex justify-content-center h3 pb-2'>
        {SetLang('New Employee')}
        {/* New User */}
      </span>
      <div className='d-flex justify-content-center row  '>
        <div className='col-sm-12 col-xl-4  col-xxl-3 '>
          <div className='mt-3'>
            <label className='form-label' htmlFor='tazkira_type'>
              {SetLang('identifecation_type')}
              <i className=' mx-2 text-danger fa fa-asterisk' style={{ fontSize: '7px' }} />
            </label>

            <select
              id='tazkira_type'
              name='tazkira_type'
              className='form-control text-start'
              onChange={(event) => {
                handleValidation(event)
                formik.handleChange(event)
              }}
              onBlur={formik.handleBlur}
              value={formik.values.tazkira_type}
            >
              <option value=''>---</option>
              <option key='1' value='1'>
                {SetLang('Paper')}
              </option>
              <option key='2' value='2'>
                {SetLang('Electronic')}
              </option>
            </select>

            {formik.touched.tazkira_type && formik.errors.tazkira_type ? (
              <div className='text-danger text-sm' style={{ fontSize: '0.850rem' }}>
                {formik.errors.tazkira_type}
              </div>
            ) : null}
          </div>

          {formik.values.tazkira_type != '' && (
            <>
              {formik.values.tazkira_type == '1' && (
                <>
                  <div className='row mt-3'>
                    <div className='col'>
                      <label className='form-label' htmlFor='tazkira_number'>
                        {SetLang('Paper id number')}
                        <i className=' mx-2 text-danger fa fa-asterisk' style={{ fontSize: '7px' }} />
                      </label>
                      <input
                        type='text'
                        name='tazkira_number'
                        placeholder={SetLang('Paper id number')}
                        className='form-control text-start'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.tazkira_number}
                      />
                      {formik.touched.tazkira_number && formik.errors.tazkira_number ? (
                        <div className='text-danger text-sm' style={{ fontSize: '0.850rem' }}>
                          {formik.errors.tazkira_number}
                        </div>
                      ) : null}
                    </div>

                    <div className='col'>
                      <label className='form-label' htmlFor='book_number'>
                        {SetLang('Book')}
                        <i className=' mx-2 text-danger fa fa-asterisk' style={{ fontSize: '7px' }} />
                      </label>
                      <input
                        type='text'
                        name='book_number'
                        placeholder={SetLang('Book')}
                        className='form-control text-start'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.book_number}
                      />
                      {formik.touched.book_number && formik.errors.book_number ? (
                        <div className='text-danger text-sm' style={{ fontSize: '0.850rem' }}>
                          {formik.errors.book_number}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className='row mt-3'>
                    <div className='col'>
                      <label className='form-label' htmlFor='page_number'>
                        {SetLang('Page')}
                        <i className=' mx-2 text-danger fa fa-asterisk' style={{ fontSize: '7px' }} />
                      </label>
                      <input
                        type='text'
                        name='page_number'
                        placeholder={SetLang('Page')}
                        className='form-control text-start'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.page_number}
                      />
                      {formik.touched.page_number && formik.errors.page_number ? (
                        <div className='text-danger text-sm' style={{ fontSize: '0.850rem' }}>
                          {formik.errors.page_number}
                        </div>
                      ) : null}
                    </div>

                    <div className='col'>
                      <label className='form-label' htmlFor='registeration_number'>
                        {SetLang('Register Number')}
                        <i className=' mx-2 text-danger fa fa-asterisk' style={{ fontSize: '7px' }} />
                      </label>

                      <input
                        type='text'
                        name='registeration_number'
                        placeholder={SetLang('Register Number')}
                        className='form-control text-start'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.registeration_number}
                      />
                      {formik.touched.registeration_number && formik.errors.registeration_number ? (
                        <div className='text-danger text-sm' style={{ fontSize: '0.850rem' }}>
                          {formik.errors.registeration_number}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </>
              )}
              {formik.values.tazkira_type == '2' && (
                <div className='mt-3'>
                  <label className='form-label' htmlFor='tazkira_number'>
                    {SetLang('identifecation_number')}
                    <i className=' mx-2 text-danger fa fa-asterisk' style={{ fontSize: '7px' }} />
                  </label>
                  <input
                    type='text'
                    name='tazkira_number'
                    placeholder={SetLang('identifecation_number')}
                    className='form-control text-start'
                    // onChange={formik.handleChange}
                    onChange={(event) => handleInputChange(event, formik)}
                    onBlur={formik.handleBlur}
                    value={formik.values.tazkira_number}
                  />
                  {formik.touched.tazkira_number && formik.errors.tazkira_number ? (
                    <div className='text-danger text-sm' style={{ fontSize: '0.850rem' }}>
                      {formik.errors.tazkira_number}
                    </div>
                  ) : null}
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <div className='row mt-3 d-flex mt-2 justify-content-between'>
        <button
          className='btn btn-success bg-success py-2 h5 text-white col-lg-1 col-xxl-1  '
          type='submit'
          disabled={isLoading}
          onClick={() => {
            handleViewChange('personal', 'back')
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
      </div>
    </form>
  )
}
