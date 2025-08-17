import React, {useEffect, useState} from 'react'
import {useFormik} from 'formik'
import {useDispatch, useSelector} from 'react-redux'

import DatePicker from 'react-multi-date-picker'
import persian from 'react-date-object/calendars/persian'
import persian_fa from '../../../../custom/persian_fa'
import {
  civilian_grade_category,
  civilian_step_category,
  military_grade_category,
  nta_grade_category,
  nta_step_category,
} from '../../../../../redux/slices/generalSlices/generalSlice'
import SetLang from '../../../../custom/SetLang'
import {
  filter_employee,
  getEmployees,
} from '../../../../../redux/slices/employeeSlice/employeeSlice'

export default function EmployeeFilter({showComponent, employee_type_id, month}) {
  const [isLoading, setIsLoading] = useState(false)

  const civilian_grade_categor_selector = useSelector((state) => {
    return state.general.civilian_grade_category
  })

  const civilian_step_category_selector = useSelector((state) => {
    return state.general.civilian_step_category
  })
  const military_grade_category_selector = useSelector((state) => {
    return state.general.military_grade_category
  })
  const nta_grade_categor_selector = useSelector((state) => {
    return state.general.nta_grade_category
  })
  const nta_step_category_selector = useSelector((state) => {
    return state.general.nta_step_category
  })

  const dispatch = useDispatch()
  const en_type = [
    {id: 1, name: 'ملکی'},
    {id: 2, name: 'نظامی'},
    {id: 3, name: 'NTA'},
    {id: 4, name: '(بلمقطع) قراردادی'},
  ]

  useEffect(() => {
    if (!civilian_grade_categor_selector) {
      dispatch(civilian_grade_category())
        .then((res) => {})
        .catch((err) => {
          console.log(err)
        })
    }

    if (!civilian_step_category_selector) {
      dispatch(civilian_step_category())
        .then((res) => {})
        .catch((err) => {
          console.log(err)
        })
    }

    if (!military_grade_category_selector) {
      dispatch(military_grade_category())
        .then((res) => {})
        .catch((err) => {
          console.log(err)
        })
    }
    if (!nta_grade_categor_selector) {
      dispatch(nta_grade_category())
        .then((res) => {})
        .catch((err) => {
          console.log(err)
        })
    }

    if (!nta_step_category_selector) {
      dispatch(nta_step_category())
        .then((res) => {})
        .catch((err) => {
          console.log(err)
        })
    }
  }, [])

  const formik = useFormik({
    initialValues: {
      nature_of_employeement_id: '2',
      civilian_general_category_id: '',
      civilian_grade_category_id: '',
      fastening_determination: '',
      military_general_category_id: '',
      military_grade_category_id: '',
      stabilization_of_rank: '',
      nta_general_category_id: '',
      nta_grade_category_id: '',

      name_da: '',
      father_name: '',
      moi_card_number: '',
      tazkira_number: '',
      account_number: '',
      month: '',
    },

    onSubmit: async (values) => {
      setIsLoading(true)

      dispatch(filter_employee(values))
      setIsLoading(false)

      // dispatch(employeeInformation({ data: values, type: "personal" }));
    },
  })

  useEffect(() => {
    formik.setValues({
      ...formik.values,
      civilian_general_category_id: '',
      civilian_grade_category_id: '',
      fastening_determination: '',
      military_general_category_id: '',
      military_grade_category_id: '',
      stabilization_of_rank: '',
      nta_general_category_id: '',
      nta_grade_category_id: '',
      name_da: '',
      father_name: '',
      moi_card_number: '',
      tazkira_number: '',
      account_number: '',
    })
  }, [formik.values.nature_of_employeement_id])

  useEffect(() => {
    formik.setFieldValue('nature_of_employeement_id', employee_type_id)
    formik.setFieldValue('month', month)
  }, [employee_type_id, month])
  return (
    <>
      {showComponent && (
        <form onSubmit={formik.handleSubmit} className='border px-1 rounded mt-2 '>
          <div className='row px-2 justify-content-center'>
            <div className=' bg bg-primary p-2 h5 text-white text-center'></div>
            <div className='col-sm-12 col-md-10'>
              <div className='row justify-content-between'>
                <div className='col-sm-12 col-md-3'>
                  <div className=''>
                    <label className='form-label' htmlFor='nature_of_employeement_id'>
                      {SetLang('Enroll Type')}
                    </label>

                    <select
                      id='nature_of_employeement_id'
                      name='nature_of_employeement_id'
                      className='form-control text-start'
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.nature_of_employeement_id}
                    >
                      <option value=''>---</option>

                      {en_type?.map((mapEnTypeRow) => {
                        return (
                          <option key={mapEnTypeRow.id} value={mapEnTypeRow.id}>
                            {mapEnTypeRow.name}
                          </option>
                        )
                      })}
                    </select>
                  </div>
                </div>

                {formik.values.nature_of_employeement_id === '1' ? (
                  <>
                    <div className='col-sm-12 col-md-3'>
                      <label className='form-label' htmlFor='civilian_general_category_id'>
                        {SetLang('Bast')}
                      </label>

                      <select
                        id='civilian_general_category_id'
                        name='civilian_general_category_id'
                        className='form-control text-start'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.civilian_general_category_id}
                      >
                        <option value=''>---</option>

                        {civilian_grade_categor_selector?.map((mapCategory) => {
                          return (
                            <option key={mapCategory.id} value={mapCategory.id}>
                              {mapCategory.name_da}
                            </option>
                          )
                        })}
                      </select>
                    </div>

                    <div className='col-sm-12 col-md-3'>
                      <label className='form-label' htmlFor='civilian_grade_category_id'>
                        {SetLang('Stip')}
                      </label>

                      <select
                        id='civilian_grade_category_id'
                        name='civilian_grade_category_id'
                        className='form-control text-start'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.civilian_grade_category_id}
                      >
                        <option value=''>---</option>

                        {civilian_step_category_selector?.map((mapStepCategory) => {
                          if (
                            mapStepCategory.civilian_general_category_id ==
                            formik.values.civilian_general_category_id
                          )
                            return (
                              <option key={mapStepCategory.id} value={mapStepCategory.id}>
                                {mapStepCategory.step}
                              </option>
                            )
                        })}
                      </select>
                    </div>
                  </>
                ) : formik.values.nature_of_employeement_id === '2' ? (
                  <>
                    <div className='col-sm-12 col-md-3'>
                      <label className='form-label' htmlFor='military_general_category_id'>
                        {SetLang('Bast')}
                      </label>

                      <select
                        id='military_general_category_id'
                        name='military_general_category_id'
                        className='form-control text-start'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.military_general_category_id}
                      >
                        <option value=''>---</option>

                        {military_grade_category_selector?.map((mapRow) => {
                          return (
                            <option key={mapRow.id} value={mapRow.id}>
                              {mapRow.grade_name_da}
                            </option>
                          )
                        })}
                      </select>
                    </div>

                    <div className='col-sm-12 col-md-3'>
                      <label className='form-label' htmlFor='military_grade_category_id'>
                        {SetLang('Rotba')}
                      </label>

                      <select
                        id='military_grade_category_id'
                        name='military_grade_category_id'
                        className='form-control text-start'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.military_grade_category_id}
                      >
                        <option value=''>---</option>

                        {military_grade_category_selector?.map((mapRow) => {
                          return (
                            <option key={mapRow.id} value={mapRow.id}>
                              {mapRow.grade_name_da}
                            </option>
                          )
                        })}
                      </select>
                    </div>
                  </>
                ) : formik.values.nature_of_employeement_id === '3' ? (
                  <>
                    <div className='col-sm-12 col-md-3'>
                      <label className='form-label' htmlFor='nta_general_category_id'>
                        {SetLang('Grade')}
                      </label>

                      <select
                        id='nta_general_category_id'
                        name='nta_general_category_id'
                        className='form-control text-start'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.nta_general_category_id}
                      >
                        <option value=''>---</option>

                        {nta_grade_categor_selector?.map((mapRow) => {
                          return (
                            <option key={mapRow.id} value={mapRow.id}>
                              {mapRow.name_da}
                            </option>
                          )
                        })}
                      </select>
                    </div>

                    <div className='col-sm-12 col-md-3'>
                      <label className='form-label' htmlFor='nta_grade_category_id'>
                        {SetLang('Stip')}
                      </label>

                      <select
                        id='nta_grade_category_id'
                        name='nta_grade_category_id'
                        className='form-control text-start'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.nta_grade_category_id}
                      >
                        <option value=''>---</option>

                        {nta_step_category_selector?.map((mapRow) => {
                          if (
                            mapRow.nta_general_category_id == formik.values.nta_general_category_id
                          )
                            return (
                              <option key={mapRow.id} value={mapRow.id}>
                                {mapRow.grade}
                              </option>
                            )
                        })}
                      </select>
                    </div>
                  </>
                ) : formik.values.nature_of_employeement_id === '4' ? (
                  <>
                    <div className='col-sm-12 col-md-3'>
                      <label className='form-label' htmlFor='contracual_start_contract'>
                        {SetLang('Start Date')}
                      </label>

                      <DatePicker
                        calendar={persian}
                        locale={persian_fa}
                        containerStyle={{width: '100%', direction: 'rtl'}}
                        value={formik.values.contracual_start_contract}
                        name='contracual_start_contract'
                        placeholder={SetLang('Start Date')}
                        style={{
                          width: '100%',
                          height: '38px',
                          boxSizing: 'border-box',
                        }}
                        onChange={(e) => {
                          formik.setFieldValue(
                            'contracual_start_contract',
                            e ? e.year + '-' + e.month.number + '-' + e.day : ''
                          )
                        }}
                      />
                    </div>

                    <div className='col-sm-12 col-md-3'>
                      <label className='form-label' htmlFor='contracual_end_contract'>
                        {SetLang('End Date')}
                      </label>

                      <DatePicker
                        calendar={persian}
                        locale={persian_fa}
                        containerStyle={{width: '100%', direction: 'rtl'}}
                        value={formik.values.contracual_end_contract}
                        name='contracual_end_contract'
                        placeholder={SetLang('End Date')}
                        style={{
                          width: '100%',
                          height: '38px',
                          boxSizing: 'border-box',
                        }}
                        onChange={(e) => {
                          formik.setFieldValue(
                            'contracual_end_contract',
                            e ? e.year + '-' + e.month.number + '-' + e.day : ''
                          )
                        }}
                      />
                    </div>
                  </>
                ) : null}
                <div className='col-sm-12 col-md-3'>
                  <label className='form-label' htmlFor='account_number'>
                    {SetLang('Account Number')}
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
                </div>

                <div className='col-sm-12 col-md-3'>
                  <label className='form-label  ' htmlFor='name_da'>
                    {SetLang('Name')}
                  </label>
                  <input
                    type='text'
                    name='name_da'
                    placeholder={SetLang('Name')}
                    className='form-control text-start'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name_da}
                  />
                </div>

                <div className='col-sm-12 col-md-3'>
                  <label className='form-label' htmlFor='father_name'>
                    {SetLang('Father Name')}
                  </label>
                  <input
                    type='text'
                    name='father_name'
                    placeholder={SetLang('Father Name')}
                    className='form-control text-start'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.father_name}
                  />
                </div>

                <div className='col-sm-12 col-md-3'>
                  <label className='form-label' htmlFor='moi_card_number'>
                    {SetLang('Card ID Number')}
                  </label>
                  <input
                    type='text'
                    name='moi_card_number'
                    placeholder={SetLang('Card ID Number')}
                    className='form-control text-start'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.moi_card_number}
                  />
                </div>

                <div className='col-sm-12 col-md-3'>
                  <label className='form-label' htmlFor='tazkira_number'>
                    {SetLang('identifecation_number')}
                  </label>
                  <input
                    type='text'
                    name='tazkira_number'
                    placeholder={SetLang('identifecation_number')}
                    className='form-control text-start'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.tazkira_number}
                  />
                </div>

                <div className='my-3'>
                  <button
                    className='btn btn-primary text-white '
                    type='submit'
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className='indicator-progress' style={{display: 'block'}}>
                        {/* {intl.formatMessage({id: 'LOGIN_PAGE.PLEASE_WAIT'})} */}
                        <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                      </span>
                    ) : (
                      <>
                        <i className='fa fa-search' />
                        <span className=''>{SetLang('Filter')}</span>
                      </>
                    )}
                  </button>
                  <button
                    className='btn btn-danger text-white '
                    type='button'
                    disabled={isLoading}
                    onClick={() => {
                      dispatch(getEmployees())
                      formik.resetForm()
                    }}
                  >
                    <i className='fa fa-remove' />
                    <span className=''>{SetLang('Reset')}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      )}
    </>
  )
}
