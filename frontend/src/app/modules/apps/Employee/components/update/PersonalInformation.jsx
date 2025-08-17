import React, {useState} from 'react'
import {useFormik} from 'formik'
import * as yup from 'yup'
import {useDispatch} from 'react-redux'
import persian from 'react-date-object/calendars/persian'
import DatePicker from 'react-multi-date-picker'
import {putEmployeeInformation} from '../../../../../../redux/slices/employeeSlice/employeeSlice'
import SetLang from '../../../../../custom/SetLang'
import persian_fa from '../../../../../custom/persian_fa'
import {useNavigate} from 'react-router-dom'
export default function PersonalInformation({
  genders_selector,
  handleViewChange,
  employee_selector,
  data,
}) {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(false)
  const formik = useFormik({
    initialValues: {
      id: employee_selector?.personal?.id || data.id,
      name_da: employee_selector?.personal?.name_da || data.name_da,
      last_name_da: employee_selector?.personal?.last_name_da || data.last_name_da,
      name_en: employee_selector?.personal?.name_en || data.name_en,
      last_name_en: employee_selector?.personal?.last_name_en || data.last_name_en,
      father_name: employee_selector?.personal?.father_name || data.father_name,
      grand_father_name: employee_selector?.personal?.grand_father_name || data.grand_father_name,
      gender_id: employee_selector?.personal?.gender_id || data.gender_id,
      phone: employee_selector?.personal?.phone || data.phone,
      birth_date: employee_selector?.personal?.birth_date || data.birth_date,
      moi_card_number: employee_selector?.personal?.moi_card_number || data.moi_card_number,
    },
    validationSchema: yup.object().shape({
      name_da: yup
        .string()
        .trim()
        .matches(
          /^[\u0600-\u06FF\uFB8A\u067E\u0686\u06AFa-zA-Z\s]*[^\d\u06F0-\u06F9\s][\u0600-\u06FF\uFB8A\u067E\u0686\u06AFa-zA-Z\s]*$/,
          SetLang('Only letters are allowed')
        )
        .test(
          'no-numbers',
          SetLang('Only letters are allowed'),
          (value) => !/[0-9\u06F0-\u06F9]/.test(value)
        )
        .min(3, SetLang('This field can not be less than 3 chracters'))
        .required(SetLang('This field can not be empty')),

      father_name: yup
        .string()
        .trim()
        .matches(
          /^[\u0600-\u06FF\uFB8A\u067E\u0686\u06AFa-zA-Z\s]*[^\d\u06F0-\u06F9\s][\u0600-\u06FF\uFB8A\u067E\u0686\u06AFa-zA-Z\s]*$/,
          SetLang('Only letters are allowed')
        )
        .test(
          'no-numbers',
          SetLang('Only letters are allowed'),
          (value) => !/[0-9\u06F0-\u06F9]/.test(value)
        )
        .min(3, SetLang('This field can not be less than 3 chracters'))
        .required(SetLang('This field can not be empty')),

      grand_father_name: yup
        .string()
        .trim()
        .matches(
          /^[\u0600-\u06FF\uFB8A\u067E\u0686\u06AFa-zA-Z\s]*[^\d\u06F0-\u06F9\s][\u0600-\u06FF\uFB8A\u067E\u0686\u06AFa-zA-Z\s]*$/,
          SetLang('Only letters are allowed')
        )
        .test(
          'no-numbers',
          SetLang('Only letters are allowed'),
          (value) => !/[0-9\u06F0-\u06F9]/.test(value)
        )
        .min(3, SetLang('This field can not be less than 3 chracters'))
        .required(SetLang('This field can not be empty')),

      gender_id: yup
        .string()
        // .min(4, SetLang("This field can not be less than 4 chracters"))
        .required(SetLang('This field can not be empty')),

      phone: yup
        .string()
        .test('is-valid', SetLang('Invalid phone number'), (value) => {
          if (!value) return true
          return /^07\d{8}$/.test(value)
        })
        .required(SetLang('This field can not be empty')),

      birth_date: yup
        .string()
        // .min(4, SetLang("This field can not be less than 4 chracters"))
        .required(SetLang('This field can not be empty')),
    }),

    onSubmit: async (values) => {
      setIsLoading(true)
      dispatch(putEmployeeInformation({data: values, type: 'personal'}))
      handleViewChange('tazkira', 'next')
    },
  })
  return (
    <form onSubmit={formik.handleSubmit} className=' px-5 py-2 border '>
      <span className='text-center d-flex justify-content-center h3 pb-2'>
        {SetLang('New Employee')}
        {/* New User */}
      </span>
      <div className='row d-flex justify-content-center'>
        <div className='col-sm-12 col-md-8 '>
          <div className='row'>
            {/* <div className="col-sm-12 col-lg-6  col-xl-3 "> */}
            <div className='col-sm-12 col-md-6'>
              <label className='form-label  ' htmlFor='name_da'>
                {SetLang('Name')}
                <i className=' mx-2 text-danger fa fa-asterisk' style={{fontSize: '7px'}} />
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
              {formik.touched.name_da && formik.errors.name_da ? (
                <div className='text-danger text-sm' style={{fontSize: '0.850rem'}}>
                  {formik.errors.name_da}
                </div>
              ) : null}
            </div>

            <div className='col-sm-12 col-md-6'>
              <label className='form-label' htmlFor='last_name_da'>
                {SetLang('Last Name')}
                {/* <i
									className=" mx-2 text-danger fa fa-asterisk"
									style={{ fontSize: "7px" }}
								/> */}
              </label>
              <input
                type='text'
                name='last_name_da'
                placeholder={SetLang('Last Name')}
                className='form-control text-start'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.last_name_da}
              />
              {formik.touched.last_name_da && formik.errors.last_name_da ? (
                <div className='text-danger text-sm' style={{fontSize: '0.850rem'}}>
                  {formik.errors.last_name_da}
                </div>
              ) : null}
            </div>
          </div>
          <div className='row mt-3'>
            <div className='col-sm-12 col-md-6 text-end'>
              <label className='form-label' htmlFor='name_en'>
                First Name
              </label>
              <input
                type='text'
                name='name_en'
                placeholder='First Name'
                className='form-control text-end'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name_en}
              />
              {formik.touched.name_en && formik.errors.name_en ? (
                <div className='text-danger text-start'>{formik.errors.name_en}</div>
              ) : null}
            </div>

            <div className=' col-sm-12 col-md-6 text-end'>
              <label className='form-label' htmlFor='last_name_en'>
                {/* {SetLang("English Full Name")} */}
                Last Name
              </label>
              <input
                type='text'
                name='last_name_en'
                placeholder='Last Name'
                className='form-control text-end'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.last_name_en}
              />
              {formik.touched.last_name_en && formik.errors.last_name_en ? (
                <div className='text-danger text-start'>{formik.errors.last_name_en}</div>
              ) : null}
            </div>
          </div>

          <div className='row mt-3'>
            <div className='col-sm-12 col-md-6'>
              <label className='form-label' htmlFor='father_name'>
                {SetLang('Father Name')}
                <i className=' mx-2 text-danger fa fa-asterisk' style={{fontSize: '7px'}} />
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
              {formik.touched.father_name && formik.errors.father_name ? (
                <div className='text-danger text-sm' style={{fontSize: '0.850rem'}}>
                  {formik.errors.father_name}
                </div>
              ) : null}
            </div>

            <div className='col-sm-12 col-md-6'>
              <label className='form-label' htmlFor='grand_father_name'>
                {SetLang('G-Father Name')}
                <i className=' mx-2 text-danger fa fa-asterisk' style={{fontSize: '7px'}} />
              </label>
              <input
                type='text'
                name='grand_father_name'
                placeholder={SetLang('G-Father Name')}
                className='form-control text-start'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.grand_father_name}
              />
              {formik.touched.grand_father_name && formik.errors.grand_father_name ? (
                <div className='text-danger text-sm' style={{fontSize: '0.850rem'}}>
                  {formik.errors.grand_father_name}
                </div>
              ) : null}
            </div>
          </div>
          <div className='row mt-3'>
            <div className='col-sm-12 col-md-6'>
              <label className='form-label' htmlFor='gender_id'>
                {SetLang('Gender')}
                <i className=' mx-2 text-danger fa fa-asterisk' style={{fontSize: '7px'}} />
              </label>

              <select
                id='gender_id'
                name='gender_id'
                className='form-control text-start'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.gender_id}
              >
                <option value=''>---</option>
                {genders_selector?.map((mapGender) => {
                  return (
                    <option
                      key={mapGender.id}
                      value={mapGender.id == formik.values.gender_id ? mapGender.id : mapGender.id}
                    >
                      {mapGender.name_da}
                    </option>
                  )
                })}
              </select>

              {formik.touched.gender_id && formik.errors.gender_id ? (
                <div className='text-danger text-sm' style={{fontSize: '0.850rem'}}>
                  {formik.errors.gender_id}
                </div>
              ) : null}
            </div>
            <div className='col-sm-12 col-md-6'>
              <label className='form-label' htmlFor='phone'>
                {SetLang('Phone')}
                <i className=' mx-2 text-danger fa fa-asterisk' style={{fontSize: '7px'}} />
              </label>
              <input
                type='text'
                name='phone'
                placeholder={SetLang('Phone')}
                className='form-control text-start'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phone}
              />
              {formik.touched.phone && formik.errors.phone ? (
                <div className='text-danger text-sm' style={{fontSize: '0.850rem'}}>
                  {formik.errors.phone}
                </div>
              ) : null}
            </div>
          </div>

          <div className='row mt-3'>
            <div className='col-sm-12 col-md-6'>
              <label className='form-label' htmlFor='birth_date'>
                {SetLang('Birth Date')}
                <i className=' mx-2 text-danger fa fa-asterisk' style={{fontSize: '7px'}} />
              </label>

              <DatePicker
                calendar={persian}
                locale={persian_fa}
                containerStyle={{width: '100%', direction: 'rtl'}}
                value={formik.values.birth_date}
                name='birth_date'
                placeholder={SetLang('Birth Date')}
                style={{
                  width: '100%',
                  height: '38px',
                  boxSizing: 'border-box',
                }}
                onChange={(e) => {
                  formik.setFieldValue(
                    'birth_date',
                    e ? e.year + '-' + e.month.number + '-' + e.day : ''
                  )
                }}
              />
              {formik.touched.birth_date && formik.errors.birth_date ? (
                <div className='text-danger text-sm' style={{fontSize: '0.850rem'}}>
                  {formik.errors.birth_date}
                </div>
              ) : null}
            </div>

            <div className='col-sm-12 col-md-6'>
              <label className='form-label' htmlFor='moi_card_number'>
                {SetLang('Card ID Number')}
                {/* <i
									className=" mx-2 text-danger fa fa-asterisk"
									style={{ fontSize: "7px" }}
								/> */}
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
              {formik.touched.moi_card_number && formik.errors.moi_card_number ? (
                <div className='text-danger text-sm' style={{fontSize: '0.850rem'}}>
                  {formik.errors.moi_card_number}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      <div className='row d-flex mt-4 justify-content-between'>
        <button
          className='btn btn-success bg-success py-2 h5 text-white col-lg-1 col-xxl-1  '
          type='submit'
          disabled={isLoading}
          onClick={() => {
            navigate('/apps/employee/employee-list')
          }}
        >
          {isLoading ? (
            <span className='indicator-progress' style={{display: 'block'}}>
              {/* {intl.formatMessage({id: 'LOGIN_PAGE.PLEASE_WAIT'})} */}
              <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
            </span>
          ) : (
            <span className='fa fa-arrow-right h3'></span>
          )}
        </button>

        <button
          className='btn btn-success bg-success py-2 h4 text-white col-lg-1 col-xxl-1  '
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
