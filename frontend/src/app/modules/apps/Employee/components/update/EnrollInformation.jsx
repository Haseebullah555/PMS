import React, {useState} from 'react'
import {useFormik} from 'formik'
import * as yup from 'yup'
import {useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import DatePicker from 'react-multi-date-picker'
import persian from 'react-date-object/calendars/persian'
import {useEffect} from 'react'
import {putEmployeeInformation} from '../../../../../../redux/slices/employeeSlice/employeeSlice'
import persian_fa from '../../../../../custom/persian_fa'
import SetLang from '../../../../../custom/SetLang'
export default function EnrollInformation({
  handleViewChange,
  military_grade_category_selector,

  civilian_grade_categor_selector,
  civilian_step_category_selector,

  nta_grade_categor_selector,
  nta_step_category_selector,

  employee_selector,
  data,
}) {
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)
  const [validation, setValidation] = useState({
    civilian: false,
    military: false,
    nta: false,
    contractual: false,
  })
  const civilianValidationSchema = yup.object().shape({
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
      nature_of_employeement_id:
        employee_selector?.enroll?.nature_of_employeement_id || data.employee_type_id,
      civilian_general_category_id:
        employee_selector?.enroll?.civilian_general_category_id ||
        data.civilian_general_category_id,
      civilian_grade_category_id:
        employee_selector?.enroll?.civilian_grade_category_id || data.civilian_grade_category_id,
      fastening_determination:
        employee_selector?.enroll?.fastening_determination || data.fastening_determination,

      military_general_category_id:
        employee_selector?.enroll?.military_general_category_id ||
        data.military_general_category_id,
      military_grade_category_id:
        employee_selector?.enroll?.military_grade_category_id || data.military_grade_category_id,
      stabilization_of_rank:
        employee_selector?.enroll?.stabilization_of_rank || data.stabilization_of_rank,

      nta_general_category_id:
        employee_selector?.enroll?.nta_general_category_id || data.nta_general_category_id,
      nta_grade_category_id:
        employee_selector?.enroll?.nta_grade_category_id || data.nta_grade_category_id,
      nta_start_contract: employee_selector?.enroll?.nta_start_contract || data.start_contract,
      nta_end_contract: employee_selector?.enroll?.nta_end_contract || data.end_contract,
      contracual_start_contract:
        employee_selector?.enroll?.contracual_start_contract || data.c_start_contract,
      contracual_end_contract:
        employee_selector?.enroll?.contracual_end_contract || data.c_end_contract,
      salary: employee_selector?.enroll?.salary || data.c_salary,

      job_title:
        employee_selector?.enroll?.job_title ||
        (data.employee_type_id == 1
          ? data.civilian_job_title
          : data.employee_type_id == 2
          ? data.militry_job_title
          : data.employee_type_id == 3
          ? data.nta_job_title
          : data.employee_type_id == 4
          ? data.contractual_job_title
          : 'Unknown'),

      especial_force_point_id:
        employee_selector?.enroll?.especial_force_point_id || data.especial_force_point_id,
      mine_clearance_point_id:
        employee_selector?.enroll?.mine_clearance_point_id || data.mine_clearance_point_id,
      cadre_point_id: employee_selector?.enroll?.cadre_point_id || data.cadre_point_id,
      medical_specialist_point_id:
        employee_selector?.enroll?.medical_specialist_point_id || data.medical_specialist_point_id,
      education_degree_point_id:
        employee_selector?.enroll?.education_degree_point_id || data.education_degree_point_id,
      regional_point_id: employee_selector?.enroll?.regional_point_id || data.regional_point_id,
      right_to_risk_point_id:
        employee_selector?.enroll?.right_to_risk_point_id || data.right_to_risk_point_id,
      satanman_arshad_point:
        employee_selector?.enroll?.satanman_arshad_point || data.satanman_arshad_point,
      provincial_point_id:
        employee_selector?.enroll?.provincial_point_id || data.provincial_point_id,
    },

    validationSchema,

    onSubmit: async (values) => {
      setIsLoading(true)
      dispatch(putEmployeeInformation({data: values, type: 'enroll'}))
      handleViewChange('bank', 'next')
    },
  })

  useEffect(() => {
    if (formik.values.nature_of_employeement_id === 1) {
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
    } else if (formik.values.nature_of_employeement_id === 2) {
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
    } else if (formik.values.nature_of_employeement_id === 3) {
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
    } else if (formik.values.nature_of_employeement_id === 4) {
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

  let has_point = false

  return (
    <form onSubmit={formik.handleSubmit} className=' px-5 py-2 border  '>
      <span className='text-center d-flex justify-content-center h3 pb-2'>
        {SetLang('New Employee')}
        {/* New User */}
      </span>
      <div className=' d-flex row justify-content-center'>
        <div className='col-sm-12 col-xl-8 '>
          {/* <div className="mb-2 p-2 bg-success rounded text-white">
            {SetLang("Born Place Information")}
          </div> */}
          <div className='row'>
            <div className='col-sm-12 col-md-6'>
              <div className=''>
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
                {formik.touched.nature_of_employeement_id &&
                formik.errors.nature_of_employeement_id ? (
                  <div className='text-danger text-sm' style={{fontSize: '0.850rem'}}>
                    {formik.errors.nature_of_employeement_id}
                  </div>
                ) : null}
              </div>
            </div>
            <div className='col-sm-12 col-md-6'>
              <div className=''>
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
            </div>
          </div>

          {formik.values.nature_of_employeement_id == 1 ? (
            <div className='row'>
              <div className='col-sm-12 col-md-6'>
                <div className='row mt-3'>
                  <div className='col-sm-12 col-md-6'>
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

                  <div className='col-sm-12 col-md-6'>
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
                </div>
              </div>
              <div className='col-sm-12 col-md-6'>
                <div className='mt-3'>
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
                  {formik.touched.fastening_determination &&
                  formik.errors.fastening_determination ? (
                    <div className='text-danger text-sm' style={{fontSize: '0.850rem'}}>
                      {formik.errors.fastening_determination}
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          ) : formik.values.nature_of_employeement_id == 2 ? (
            <div className='row'>
              <div className='col-sm-12 col-md-6'>
                <div className='row mt-3'>
                  <div className='col-sm-12 col-md-6'>
                    <label className='form-label' htmlFor='military_general_category_id'>
                      {SetLang('Bast')}
                      <i className='mx-2 text-danger fa fa-asterisk' style={{fontSize: '7px'}} />
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

                  <div className='col-sm-12 col-md-6'>
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
                </div>
              </div>
              <div className='col-sm-12 col-md-6'>
                <div className='mt-3'>
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
              </div>
            </div>
          ) : formik.values.nature_of_employeement_id == 3 ? (
            <div className='row mt-3'>
              <div className='col-sm-12 col-md-6'>
                <div className='row mt-3'>
                  <div className='col-sm-12 col-md-6'>
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
                    {formik.touched.nta_general_category_id &&
                    formik.errors.nta_general_category_id ? (
                      <div className='text-danger text-sm' style={{fontSize: '0.850rem'}}>
                        {formik.errors.nta_general_category_id}
                      </div>
                    ) : null}
                  </div>

                  <div className='col-sm-12 col-md-6'>
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
                </div>
              </div>
              <div className='col-sm-12 col-md-6'>
                <div className='row mt-3'>
                  <div className='col-sm-12 col-md-6'>
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

                  <div className='col-sm-12 col-md-6'>
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
                </div>
              </div>
            </div>
          ) : formik.values.nature_of_employeement_id == 4 ? (
            <div className='row mt-3'>
              <div className='col-sm-12 col-md-6'>
                <div className='row'>
                  <div className='col-sm-12 col-md-6'>
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

                  <div className='col-sm-12 col-md-6'>
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

                    {formik.touched.contracual_end_contract &&
                    formik.errors.contracual_end_contract ? (
                      <div className='text-danger text-sm' style={{fontSize: '0.850rem'}}>
                        {formik.errors.contracual_end_contract}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
              <div className='col-sm-12 col-md-6'>
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
            </div>
          ) : null}
        </div>
      </div>
      <div className='row d-flex mt-4 justify-content-between'>
        <button
          className='btn btn-success bg-success py-2 h5 text-white col-lg-1 col-xxl-1  '
          type='submit'
          disabled={isLoading}
          onClick={() => {
            handleViewChange('live', 'back')
          }}
        >
          {isLoading ? (
            <span className='indicator-progress' style={{display: 'block'}}>
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
            <span className='indicator-progress' style={{display: 'block'}}>
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
