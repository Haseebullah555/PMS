import React, {useRef, useState} from 'react'
import {useEffect, forwardRef, useImperativeHandle} from 'react'
import {useFormik} from 'formik'
import * as yup from 'yup'
import {useDispatch, useSelector} from 'react-redux'
import persian from 'react-date-object/calendars/persian'
import DatePicker from 'react-multi-date-picker'
import SetLang from '../../../../../custom/SetLang'
import {employeeInformation} from '../../../../../../redux/slices/generalSlices/generalSlice'
import persian_fa from '../../../../../custom/persian_fa'
import {
  getEmployees,
  transfer_employee,
} from '../../../../../../redux/slices/employeeSlice/employeeSlice'
import {toast} from 'react-toastify'
import Select from 'react-select'
import {get_department_generals} from './../../../../../../redux/slices/generalSlices/generalSlice'
const EnrollInformationForEmployeeChange = forwardRef(({selectedObj, closeModal}, ref) => {
  useImperativeHandle(ref, () => ({
    handleSubmit: formik.handleSubmit,
  }))
  const modalRef = useRef(null)
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)
  const [validation, setValidation] = useState({
    civilian: false,
    military: false,
    nta: false,
    contractual: false,
  })

  const department_generals_selector = useSelector((state) => {
    return state.general.department_generals
  })

  const military_grade_category_selector = useSelector((state) => {
    return state.general.military_grade_category
  })

  const civilian_grade_categor_selector = useSelector((state) => {
    return state.general.civilian_grade_category
  })

  const civilian_step_category_selector = useSelector((state) => {
    return state.general.civilian_step_category
  })

  const nta_grade_categor_selector = useSelector((state) => {
    return state.general.nta_grade_category
  })

  const nta_step_category_selector = useSelector((state) => {
    return state.general.nta_step_category
  })

  const civilianValidationSchema = yup.object().shape({
    department_id: yup
      .string()
      // .min(4, SetLang("This field can not be less than 4 chracters"))
      .required(SetLang('This field can not be empty')),
    nature_of_employeement_id: yup
      .string()
      // .min(4, SetLang("This field can not be less than 4 chracters"))
      .required(SetLang('This field can not be empty')),
    civilian_general_category_id: yup
      .string()
      // .min(4, SetLang("This field can not be less than 4 chracters"))
      .required(SetLang('This field can not be empty')),
    civilian_grade_category_id: yup
      .string()
      // .min(4, SetLang("This field can not be less than 4 chracters"))
      .required(SetLang('This field can not be empty')),
    fastening_determination: yup
      .string()
      .min(4, SetLang('This field can not be less than 4 chracters'))
      .required(SetLang('This field can not be empty')),
    job_title: yup
      .string()
      .min(4, SetLang('This field can not be less than 4 chracters'))
      .required(SetLang('This field can not be empty')),
  })

  const militaryValidationSchema = yup.object().shape({
    department_id: yup
      .string()
      // .min(4, SetLang("This field can not be less than 4 chracters"))
      .required(SetLang('This field can not be empty')),
    nature_of_employeement_id: yup
      .string()
      // .min(4, SetLang("This field can not be less than 4 chracters"))
      .required(SetLang('This field can not be empty')),

    military_general_category_id: yup
      .string()
      // .min(4, SetLang("This field can not be less than 4 chracters"))
      .required(SetLang('This field can not be empty')),
    military_grade_category_id: yup
      .string()
      // .min(4, SetLang("This field can not be less than 4 chracters"))
      .required(SetLang('This field can not be empty')),
    stabilization_of_rank: yup
      .string()
      .min(4, SetLang('This field can not be less than 4 chracters'))
      .required(SetLang('This field can not be empty')),
    job_title: yup
      .string()
      .min(4, SetLang('This field can not be less than 4 chracters'))
      .required(SetLang('This field can not be empty')),
  })

  const ntaValidationSchema = yup.object().shape({
    department_id: yup
      .string()
      // .min(4, SetLang("This field can not be less than 4 chracters"))
      .required(SetLang('This field can not be empty')),
    nature_of_employeement_id: yup
      .string()
      // .min(4, SetLang("This field can not be less than 4 chracters"))
      .required(SetLang('This field can not be empty')),

    nta_general_category_id: yup
      .string()
      // .min(4, SetLang("This field can not be less than 4 chracters"))
      .required(SetLang('This field can not be empty')),
    nta_grade_category_id: yup
      .string()
      // .min(4, SetLang("This field can not be less than 4 chracters"))
      .required(SetLang('This field can not be empty')),
    nta_start_contract: yup
      .string()
      .min(4, SetLang('This field can not be less than 4 chracters'))
      .required(SetLang('This field can not be empty')),
    nta_end_contract: yup
      .string()
      .min(4, SetLang('This field can not be less than 4 chracters'))
      .required(SetLang('This field can not be empty')),
    job_title: yup
      .string()
      .min(4, SetLang('This field can not be less than 4 chracters'))
      .required(SetLang('This field can not be empty')),
  })

  const contracualValidationSchema = yup.object().shape({
    department_id: yup
      .string()
      // .min(4, SetLang("This field can not be less than 4 chracters"))
      .required(SetLang('This field can not be empty')),
    nature_of_employeement_id: yup
      .string()
      // .min(4, SetLang("This field can not be less than 4 chracters"))
      .required(SetLang('This field can not be empty')),
    salary: yup
      .string()
      // .min(4, SetLang("This field can not be less than 4 chracters"))
      .required(SetLang('This field can not be empty')),
    contracual_start_contract: yup
      .string()
      .min(4, SetLang('This field can not be less than 4 chracters'))
      .required(SetLang('This field can not be empty')),
    contracual_end_contract: yup
      .string()
      .min(4, SetLang('This field can not be less than 4 chracters'))
      .required(SetLang('This field can not be empty')),
    job_title: yup
      .string()
      .min(4, SetLang('This field can not be less than 4 chracters'))
      .required(SetLang('This field can not be empty')),
  })

  const validationSchema =
    validation.civilian === true
      ? civilianValidationSchema
      : validation.military === true
      ? militaryValidationSchema
      : validation.nta === true
      ? ntaValidationSchema
      : // validation.contractual === true
        // ?
        contracualValidationSchema

  const en_type = [
    {id: 1, name: 'ملکی'},
    {id: 2, name: 'نظامی'},
    {id: 3, name: 'NTA'},
    {id: 4, name: '(بلمقطع) قراردادی'},
  ]

  const formik = useFormik({
    initialValues: {
      employee_id: '',
      department_id: '',
      nature_of_employeement_id: '',
      civilian_general_category_id: '',
      civilian_grade_category_id: '',
      fastening_determination: '',

      military_general_category_id: '',
      military_grade_category_id: '',
      stabilization_of_rank: '',

      nta_general_category_id: '',
      nta_grade_category_id: '',
      nta_start_contract: '',
      nta_end_contract: '',
      contracual_start_contract: '',
      contracual_end_contract: '',

      salary: '',
      job_title: '',

      especial_force_point_id: '',
      mine_clearance_point_id: '',
      cadre_point_id: '',
      medical_specialist_point_id: '',
      education_degree_point_id: '',
      regional_point_id: '',
      right_to_risk_point_id: '',
      satanman_arshad_point: '',
      provincial_point_id: '',
    },

    validationSchema,

    onSubmit: async (values) => {
      setIsLoading(true)
      dispatch(transfer_employee(values))
        .then((res) => {
          if (res.meta.requestStatus === 'fulfilled') {
            dispatch(getEmployees())
            formik.resetForm()

            setIsLoading(false)
            toast.success(SetLang('Successfuly Done'))
            closeModal()
          }
        })
        .catch((error) => {
          setIsLoading(false)
          toast.warning(SetLang('Error in performing the action'))
        })
    },
  })

  useEffect(() => {
    if (formik.values.nature_of_employeement_id == 1) {
      setValidation({civilian: true})
      formik.setValues({
        ...formik.values,
        military_general_category_id: '',
        military_grade_category_id: '',
        stabilization_of_rank: '',
        nta_general_category_id: '',
        nta_grade_category_id: '',
        nta_start_contract: '',
        nta_end_contract: '',
        contracual_start_contract: '',
        contracual_end_contract: '',
        salary: '',
      })
    } else if (formik.values.nature_of_employeement_id == 2) {
      setValidation({military: true})
      formik.setValues({
        ...formik.values,
        civilian_general_category_id: '',
        civilian_grade_category_id: '',
        fastening_determination: '',
        nta_general_category_id: '',
        nta_grade_category_id: '',
        nta_start_contract: '',
        nta_end_contract: '',
        contracual_start_contract: '',
        contracual_end_contract: '',
        salary: '',
      })
    } else if (formik.values.nature_of_employeement_id == 3) {
      setValidation({nta: true})
      formik.setValues({
        ...formik.values,
        civilian_general_category_id: '',
        civilian_grade_category_id: '',
        fastening_determination: '',
        military_general_category_id: '',
        military_grade_category_id: '',
        stabilization_of_rank: '',
        contracual_start_contract: '',
        contracual_end_contract: '',
        salary: '',
      })
    } else if (formik.values.nature_of_employeement_id == 4) {
      setValidation({contractual: true})
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
        nta_start_contract: '',
        nta_end_contract: '',
      })
    }
  }, [formik.values.nature_of_employeement_id])

  useEffect(() => {
    formik.setValues({
      ...formik.values,
      employee_id: selectedObj?.id,
    })
  }, [selectedObj?.id])
  let has_point = false

  useEffect(() => {
    if (!department_generals_selector) {
      dispatch(get_department_generals())
        .then((res) => {})
        .catch((err) => {
          console.log(err)
        })
    }
  }, [])
  return (
    <>
      <form className='row'>
        <div className='mt-3'>
          <label className='form-label' htmlFor='department_id'>
            {SetLang('Department')}
            <i className=' mx-2 text-danger fa fa-asterisk' style={{fontSize: '7px'}} />
          </label>

          <Select
            id='department_id'
            name='department_id'
            placeholder='---'
            isClearable
            onBlur={formik.handleBlur}
            value={department_generals_selector?.find(
              (option) => option.id.toString() === formik.values.department_id
            )}
            options={department_generals_selector?.map((mapRow) => ({
              id: mapRow.id,
              name_da: mapRow.name_da,
            }))}
            getOptionLabel={(option) => option.name_da}
            getOptionValue={(option) => option.id}
            onChange={(selectedOption) => {
              formik.setFieldValue('department_id', selectedOption ? selectedOption.id : '')
            }}
          />

          {formik.touched.department_id && formik.errors.department_id ? (
            <div className='text-danger text-sm' style={{fontSize: '0.850rem'}}>
              {formik.errors.department_id}
            </div>
          ) : null}
        </div>

        <div className='mt-2'>
          <label className='form-label' htmlFor='nature_of_employeement_id'>
            {SetLang('Enroll Type')}
            <i className=' mx-2 text-danger fa fa-asterisk' style={{fontSize: '7px'}} />
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
          {formik.touched.nature_of_employeement_id && formik.errors.nature_of_employeement_id ? (
            <div className='text-danger text-sm' style={{fontSize: '0.850rem'}}>
              {formik.errors.nature_of_employeement_id}
            </div>
          ) : null}
        </div>

        <div className='mt-2'>
          <label className='form-label' htmlFor='job_title'>
            {SetLang('Job')}
            <i className=' mx-2 text-danger fa fa-asterisk' style={{fontSize: '7px'}} />
          </label>
          <input
            type='text'
            name='job_title'
            placeholder={SetLang('Job')}
            className='form-control text-start'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.job_title}
          />
          {formik.touched.job_title && formik.errors.job_title ? (
            <div className='text-danger text-sm' style={{fontSize: '0.850rem'}}>
              {formik.errors.job_title}
            </div>
          ) : null}
        </div>

        {formik.values.nature_of_employeement_id === '1' ? (
          <>
            <div className='col-sm-12 col-md-6 mt-2'>
              <label className='form-label' htmlFor='civilian_general_category_id'>
                {SetLang('Bast')}
                <i className=' mx-2 text-danger fa fa-asterisk' style={{fontSize: '7px'}} />
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
              {formik.touched.civilian_general_category_id &&
              formik.errors.civilian_general_category_id ? (
                <div className='text-danger text-sm' style={{fontSize: '0.850rem'}}>
                  {formik.errors.civilian_general_category_id}
                </div>
              ) : null}
            </div>

            <div className='col-sm-12 col-md-6 mt-2'>
              <label className='form-label' htmlFor='civilian_grade_category_id'>
                {SetLang('Stip')}
                <i className=' mx-2 text-danger fa fa-asterisk' style={{fontSize: '7px'}} />
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
              {formik.touched.civilian_grade_category_id &&
              formik.errors.civilian_grade_category_id ? (
                <div className='text-danger text-sm' style={{fontSize: '0.850rem'}}>
                  {formik.errors.civilian_grade_category_id}
                </div>
              ) : null}
            </div>

            <div className='mt-2'>
              <label className='form-label' htmlFor='fastening_determination'>
                {SetLang('Initail Date')}
                <i className=' mx-2 text-danger fa fa-asterisk' style={{fontSize: '7px'}} />
              </label>

              <DatePicker
                calendar={persian}
                locale={persian_fa}
                containerStyle={{width: '100%', direction: 'rtl'}}
                value={formik.values.fastening_determination}
                name='fastening_determination'
                placeholder={SetLang('Initail Date')}
                style={{
                  width: '100%',
                  height: '38px',
                  boxSizing: 'border-box',
                }}
                onChange={(e) => {
                  formik.setFieldValue(
                    'fastening_determination',
                    e ? e.year + '-' + e.month.number + '-' + e.day : ''
                  )
                }}
              />
              {formik.touched.fastening_determination && formik.errors.fastening_determination ? (
                <div className='text-danger text-sm' style={{fontSize: '0.850rem'}}>
                  {formik.errors.fastening_determination}
                </div>
              ) : null}
            </div>
          </>
        ) : formik.values.nature_of_employeement_id === '2' ? (
          <>
            <div className='col-sm-12 col-md-6 mt-2'>
              <label className='form-label' htmlFor='military_general_category_id'>
                {SetLang('Bast')}
                <i className=' mx-2 text-danger fa fa-asterisk' style={{fontSize: '7px'}} />
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
              {formik.touched.military_general_category_id &&
              formik.errors.military_general_category_id ? (
                <div className='text-danger text-sm' style={{fontSize: '0.850rem'}}>
                  {formik.errors.military_general_category_id}
                </div>
              ) : null}
            </div>

            <div className='col-sm-12 col-md-6 mt-2'>
              <label className='form-label' htmlFor='military_grade_category_id'>
                {SetLang('Rotba')}
                <i className=' mx-2 text-danger fa fa-asterisk' style={{fontSize: '7px'}} />
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
              {formik.touched.military_grade_category_id &&
              formik.errors.military_grade_category_id ? (
                <div className='text-danger text-sm' style={{fontSize: '0.850rem'}}>
                  {formik.errors.military_grade_category_id}
                </div>
              ) : null}
            </div>

            <div className='mt-2'>
              <label className='form-label' htmlFor='stabilization_of_rank'>
                {SetLang('Initail Date')}
                <i className=' mx-2 text-danger fa fa-asterisk' style={{fontSize: '7px'}} />
              </label>

              <DatePicker
                calendar={persian}
                locale={persian_fa}
                containerStyle={{width: '100%', direction: 'rtl'}}
                value={formik.values.stabilization_of_rank}
                name='stabilization_of_rank'
                placeholder={SetLang('Initail Date')}
                style={{
                  width: '100%',
                  height: '38px',
                  boxSizing: 'border-box',
                }}
                onChange={(e) => {
                  formik.setFieldValue(
                    'stabilization_of_rank',
                    e ? e.year + '-' + e.month.number + '-' + e.day : ''
                  )
                }}
              />

              {formik.touched.stabilization_of_rank && formik.errors.stabilization_of_rank ? (
                <div className='text-danger text-sm' style={{fontSize: '0.850rem'}}>
                  {formik.errors.stabilization_of_rank}
                </div>
              ) : null}
            </div>
          </>
        ) : formik.values.nature_of_employeement_id === '3' ? (
          <>
            <div className='col-sm-12 col-md-6 mt-2'>
              <label className='form-label' htmlFor='nta_general_category_id'>
                {SetLang('Grade')}
                <i className=' mx-2 text-danger fa fa-asterisk' style={{fontSize: '7px'}} />
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
              {formik.touched.nta_general_category_id && formik.errors.nta_general_category_id ? (
                <div className='text-danger text-sm' style={{fontSize: '0.850rem'}}>
                  {formik.errors.nta_general_category_id}
                </div>
              ) : null}
            </div>

            <div className='col-sm-12 col-md-6 mt-2'>
              <label className='form-label' htmlFor='nta_grade_category_id'>
                {SetLang('Stip')}
                <i className=' mx-2 text-danger fa fa-asterisk' style={{fontSize: '7px'}} />
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
                  if (mapRow.nta_general_category_id == formik.values.nta_general_category_id)
                    return (
                      <option key={mapRow.id} value={mapRow.id}>
                        {mapRow.grade}
                      </option>
                    )
                })}
              </select>
              {formik.touched.nta_grade_category_id && formik.errors.nta_grade_category_id ? (
                <div className='text-danger text-sm' style={{fontSize: '0.850rem'}}>
                  {formik.errors.nta_grade_category_id}
                </div>
              ) : null}
            </div>

            <div className='col-sm-12 col-md-6 mt-2'>
              <label className='form-label' htmlFor='nta_start_contract'>
                {SetLang('Start Date')}
                <i className=' mx-2 text-danger fa fa-asterisk' style={{fontSize: '7px'}} />
              </label>

              <DatePicker
                calendar={persian}
                locale={persian_fa}
                containerStyle={{width: '100%', direction: 'rtl'}}
                value={formik.values.nta_start_contract}
                name='nta_start_contract'
                placeholder={SetLang('Start Date')}
                style={{
                  width: '100%',
                  height: '38px',
                  boxSizing: 'border-box',
                }}
                onChange={(e) => {
                  formik.setFieldValue(
                    'nta_start_contract',
                    e ? e.year + '-' + e.month.number + '-' + e.day : ''
                  )
                }}
              />

              {formik.touched.nta_start_contract && formik.errors.nta_start_contract ? (
                <div className='text-danger text-sm' style={{fontSize: '0.850rem'}}>
                  {formik.errors.nta_start_contract}
                </div>
              ) : null}
            </div>

            <div className='col-sm-12 col-md-6 mt-2'>
              <label className='form-label' htmlFor='nta_end_contract'>
                {SetLang('End Date')}
                <i className=' mx-2 text-danger fa fa-asterisk' style={{fontSize: '7px'}} />
              </label>

              <DatePicker
                calendar={persian}
                locale={persian_fa}
                containerStyle={{width: '100%', direction: 'rtl'}}
                value={formik.values.nta_end_contract}
                name='nta_end_contract'
                placeholder={SetLang('End Date')}
                style={{
                  width: '100%',
                  height: '38px',
                  boxSizing: 'border-box',
                }}
                onChange={(e) => {
                  formik.setFieldValue(
                    'nta_end_contract',
                    e ? e.year + '-' + e.month.number + '-' + e.day : ''
                  )
                }}
              />

              {formik.touched.nta_end_contract && formik.errors.nta_end_contract ? (
                <div className='text-danger text-sm' style={{fontSize: '0.850rem'}}>
                  {formik.errors.nta_end_contract}
                </div>
              ) : null}
            </div>
          </>
        ) : formik.values.nature_of_employeement_id === '4' ? (
          <>
            <div className='col-sm-12 col-md-6 mt-2'>
              <label className='form-label' htmlFor='contracual_start_contract'>
                {SetLang('Start Date')}
                {/* <i
											className=" mx-2 text-danger fa fa-asterisk"
											style={{ fontSize: "7px" }}
										/> */}
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

              {formik.touched.contracual_start_contract &&
              formik.errors.contracual_start_contract ? (
                <div className='text-danger text-sm' style={{fontSize: '0.850rem'}}>
                  {formik.errors.contracual_start_contract}
                </div>
              ) : null}
            </div>

            <div className='col-sm-12 col-md-6 mt-2'>
              <label className='form-label' htmlFor='contracual_end_contract'>
                {SetLang('End Date')}
                {/* <i
											className=" mx-2 text-danger fa fa-asterisk"
											style={{ fontSize: "7px" }}
										/> */}
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

              {formik.touched.contracual_end_contract && formik.errors.contracual_end_contract ? (
                <div className='text-danger text-sm' style={{fontSize: '0.850rem'}}>
                  {formik.errors.contracual_end_contract}
                </div>
              ) : null}
            </div>

            <div className='mt-2'>
              <div className=''>
                <label className='form-label' htmlFor='salary'>
                  {SetLang('Salary Amount')}
                  <i className=' mx-2 text-danger fa fa-asterisk' style={{fontSize: '7px'}} />
                </label>
                <input
                  type='text'
                  name='salary'
                  placeholder={SetLang('Salary Amount')}
                  className='form-control text-start'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.salary}
                />
                {formik.touched.salary && formik.errors.salary ? (
                  <div className='text-danger text-sm' style={{fontSize: '0.850rem'}}>
                    {formik.errors.salary}
                  </div>
                ) : null}
              </div>
            </div>
          </>
        ) : null}
      </form>
    </>
  )
})
export default EnrollInformationForEmployeeChange
