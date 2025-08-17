import React, {useState} from 'react'
import {useFormik} from 'formik'
import * as yup from 'yup'
import {useDispatch, useSelector} from 'react-redux'
import Select from 'react-select'
import SetLang from '../../../../../custom/SetLang'
import {putEmployeeInformation} from '../../../../../../redux/slices/employeeSlice/employeeSlice'
export default function TazkiraInformation({
  provincesSelector,
  districtsSelector,
  handleViewChange,
  employee_selector,
  data,
}) {
  const theme = useSelector((state) => {
    return state.general.theme
  })

  const selectStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: theme, // Set the desired background color for the control container
    }),
    singleValue: (provided) => ({
      ...provided,
      color: theme, // Set the desired text color for the selected value
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? 'green' : 'white', // Set the background color for selected and non-selected options
      color: state.isSelected ? 'white' : 'black', // Set the text color for selected and non-selected options
      '&:hover': {
        backgroundColor: 'lightblue', // Set the background color for option on hover
        color: 'black', // Set the text color for option on hover
      },
    }),
  }

  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)

  const formik = useFormik({
    initialValues: {
      parmanent_province_id:
        employee_selector?.live?.parmanent_province_id || data.parmanent_province_id,
      parmanent_district_id:
        employee_selector?.live?.parmanent_district_id || data.parmanent_district_id,
      parmanent_village: employee_selector?.live?.parmanent_village || data.parmanent_village,

      current_province_id: employee_selector?.live?.current_province_id || data.current_province_id,
      current_district_id: employee_selector?.live?.current_district_id || data.current_district_id,
      current_village: employee_selector?.live?.current_village || data.current_village,
    },

    validationSchema: yup.object().shape({
      parmanent_province_id: yup
        .string()
        // .min(4, SetLang("This field can not be less than 4 chracters"))
        .required(SetLang('This field can not be empty')),
      parmanent_district_id: yup
        .string()
        // .min(4, SetLang("This field can not be less than 4 chracters"))
        .required(SetLang('This field can not be empty')),
      parmanent_village: yup
        .string()
        // .min(4, SetLang("This field can not be less than 4 chracters"))
        .required(SetLang('This field can not be empty')),

      current_province_id: yup
        .string()
        // .min(4, SetLang("This field can not be less than 4 chracters"))
        .required(SetLang('This field can not be empty')),
      current_district_id: yup
        .string()
        // .min(4, SetLang("This field can not be less than 4 chracters"))
        .required(SetLang('This field can not be empty')),
      current_village: yup
        .string()
        // .min(4, SetLang("This field can not be less than 4 chracters"))
        .required(SetLang('This field can not be empty')),
    }),

    onSubmit: async (values) => {
      setIsLoading(true)
      dispatch(putEmployeeInformation({data: values, type: 'live'}))
      handleViewChange('enroll', 'next')
    },
  })

  return (
    <form onSubmit={formik.handleSubmit} className=' px-5 py-2 border  '>
      <span className='text-center d-flex justify-content-center h3 pb-2'>
        {SetLang('New Employee')}
        {/* New User */}
      </span>
      <div className='row justify-content-center'>
        <div className='col-sm-12 col-md-3'>
          <div className='mb-2 p-2 bg-success rounded text-white'>
            {SetLang('Born Place Information')}
          </div>

          <div className='mt-3'>
            <label className='form-label' htmlFor='parmanent_province_id'>
              {SetLang('Province')}
              <i className=' mx-2 text-danger fa fa-asterisk' style={{fontSize: '7px'}} />
            </label>
            <Select
              styles={selectStyles}
              id='parmanent_province_id'
              name='parmanent_province_id'
              placeholder='---'
              isClearable
              onBlur={formik.handleBlur}
              value={provincesSelector.find(
                (option) => option.id == formik.values.parmanent_province_id
              )}
              options={provincesSelector.map((mapRow) => ({
                id: mapRow.id,
                name_da: mapRow.name_da,
              }))}
              getOptionLabel={(option) => option.name_da}
              getOptionValue={(option) => option.id}
              onChange={(selectedOption) => {
                formik.setFieldValue(
                  'parmanent_province_id',
                  selectedOption ? selectedOption.id : ''
                )
              }}
            />
            {formik.touched.parmanent_province_id && formik.errors.parmanent_province_id ? (
              <div className='text-danger text-sm' style={{fontSize: '0.850rem'}}>
                {formik.errors.parmanent_province_id}
              </div>
            ) : null}
          </div>

          <div className='mt-3'>
            <label className='form-label' htmlFor='parmanent_district_id'>
              {SetLang('District')}
              <i className=' mx-2 text-danger fa fa-asterisk' style={{fontSize: '7px'}} />
            </label>

            <Select
              styles={selectStyles}
              id='parmanent_district_id'
              name='parmanent_district_id'
              placeholder='---'
              isClearable
              onBlur={formik.handleBlur}
              value={districtsSelector?.find(
                (option) => option.id == formik.values.parmanent_district_id
              )}
              options={districtsSelector
                ?.filter(
                  (mapDistrict) => mapDistrict.province_id === formik.values.parmanent_province_id
                )
                .map((mapDistrict) => ({
                  id: mapDistrict.id,
                  name_da: mapDistrict.name_da,
                }))}
              getOptionLabel={(option) => option.name_da}
              getOptionValue={(option) => option.id}
              onChange={(selectedOption) =>
                formik.setFieldValue(
                  'parmanent_district_id',
                  selectedOption ? selectedOption.id : ''
                )
              }
            />

            {formik.touched.parmanent_district_id && formik.errors.parmanent_district_id ? (
              <div className='text-danger text-sm' style={{fontSize: '0.850rem'}}>
                {formik.errors.parmanent_district_id}
              </div>
            ) : null}
          </div>
          <div className='mt-3'>
            <label className='form-label' htmlFor='parmanent_village'>
              {SetLang('Village')}
              <i className=' mx-2 text-danger fa fa-asterisk' style={{fontSize: '7px'}} />
            </label>
            <input
              type='text'
              name='parmanent_village'
              placeholder={SetLang('Village')}
              className='form-control text-start'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.parmanent_village}
            />
            {formik.touched.parmanent_village && formik.errors.parmanent_village ? (
              <div className='text-danger text-sm' style={{fontSize: '0.850rem'}}>
                {formik.errors.parmanent_village}
              </div>
            ) : null}
          </div>
        </div>

        <div className='col-sm-12 col-md-1 mt-2'>
          <div className='d-flex justify-content-center align-items-center '>
            <button
              type='button'
              onClick={() => {
                formik.setValues({
                  ...formik.values,
                  current_village: formik.values.parmanent_village,
                  current_province_id: formik.values.parmanent_province_id,
                  current_district_id: formik.values.parmanent_district_id,
                })
              }}
              className='bg bg-success px-3 py-1 h3 text-white border border-success rounded fa fa-arrow-left'
            >
              {/* Copy */}
            </button>
          </div>
        </div>

        <div className='col-sm-12 col-md-3'>
          <div className='mb-2 p-2 bg-success rounded text-white'>
            {SetLang('Current Live Information')}
          </div>

          <div className='mt-3'>
            <label className='form-label' htmlFor='current_province_id'>
              {SetLang('Province')}
              <i className=' mx-2 text-danger fa fa-asterisk' style={{fontSize: '7px'}} />
            </label>
            <Select
              styles={selectStyles}
              id='current_province_id'
              name='current_province_id'
              placeholder='---'
              isClearable
              onBlur={formik.handleBlur}
              value={provincesSelector.find(
                (option) => option.id == formik.values.current_province_id
              )}
              options={provincesSelector.map((mapRow) => ({
                id: mapRow.id,
                name_da: mapRow.name_da,
              }))}
              getOptionLabel={(option) => option.name_da}
              getOptionValue={(option) => option.id}
              onChange={(selectedOption) => {
                formik.setFieldValue('current_province_id', selectedOption ? selectedOption.id : '')
              }}
            />
            {formik.touched.current_province_id && formik.errors.current_province_id ? (
              <div className='text-danger text-sm' style={{fontSize: '0.850rem'}}>
                {formik.errors.current_province_id}
              </div>
            ) : null}
          </div>

          <div className='mt-3'>
            <label className='form-label' htmlFor='current_district_id'>
              {SetLang('District')}
              <i className=' mx-2 text-danger fa fa-asterisk' style={{fontSize: '7px'}} />
            </label>

            <Select
              styles={selectStyles}
              id='current_district_id'
              name='current_district_id'
              placeholder='---'
              isClearable
              onBlur={formik.handleBlur}
              value={districtsSelector.find(
                (option) => option.id == formik.values.current_district_id
              )}
              options={districtsSelector
                ?.filter(
                  (mapDistrict) => mapDistrict.province_id === formik.values.current_province_id
                )
                .map((mapDistrict) => ({
                  id: mapDistrict.id,
                  name_da: mapDistrict.name_da,
                }))}
              getOptionLabel={(option) => option.name_da}
              getOptionValue={(option) => option.id}
              onChange={(selectedOption) =>
                formik.setFieldValue('current_district_id', selectedOption ? selectedOption.id : '')
              }
            />

            {formik.touched.current_district_id && formik.errors.current_district_id ? (
              <div className='text-danger text-sm' style={{fontSize: '0.850rem'}}>
                {formik.errors.current_district_id}
              </div>
            ) : null}
          </div>
          <div className='mt-3'>
            <label className='form-label' htmlFor='current_village'>
              {SetLang('Current Live Place')}
              <i className=' mx-2 text-danger fa fa-asterisk' style={{fontSize: '7px'}} />
            </label>
            <input
              type='text'
              name='current_village'
              placeholder={SetLang('Current Live Place')}
              className='form-control text-start'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.current_village}
            />
            {formik.touched.current_village && formik.errors.current_village ? (
              <div className='text-danger text-sm' style={{fontSize: '0.850rem'}}>
                {formik.errors.current_village}
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <div className='row d-flex mt-4 justify-content-between'>
        <button
          className='btn btn-success bg-success py-2 h5 text-white col-lg-1 col-xxl-1  '
          type='submit'
          disabled={isLoading}
          onClick={() => {
            handleViewChange('tazkira', 'back')
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
