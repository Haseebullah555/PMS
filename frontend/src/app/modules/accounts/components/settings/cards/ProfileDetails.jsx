import React, {useEffect, useState} from 'react'
import {toAbsoluteUrl} from '../../../../../../_metronic/helpers'
// import { IProfileDetails, profileDetailsInitValues as initialValues } from '../SettingsModel'
import * as Yup from 'yup'
import {useFormik} from 'formik'
import {useIntl} from 'react-intl'
import SetLang from '../../../../../custom/SetLang'
import {
  getDistricts,
  getProvinces,
  get_department_generals,
  get_genders,
} from '../../../../../../redux/slices/generalSlices/generalSlice'
import {useDispatch, useSelector} from 'react-redux'
import CustomLoader from '../../../../../custom/loader/CustomLoader'
import axios from 'axios'
import {apiUrl} from '../../../../../../apiUrl'

import DatePicker from 'react-multi-date-picker'
import persian from 'react-date-object/calendars/persian'
import persian_fa from '../../../../../custom/persian_fa'
import {toast} from 'react-toastify'
import {getProfile} from '../../../../../../redux/slices/authenticationSlices/authenticationSlice'

// const ProfileDetails: React.FC = () => {
const ProfileDetails = ({data}) => {
  const intl = useIntl()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [fileField, setFileField] = useState(null)

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

  // const [data, setData] = useState(initialValues)
  // const [data, setData] = useState < IProfileDetails > initialValues
  // const updateData = (fieldsToUpdate: Partial<IProfileDetails>): void => {
  //   const updatedData = Object.assign(data, fieldsToUpdate)
  //   setData(updatedData)
  // }

  const initialValues = {
    // image: '',
    first_name_en: '',
    last_name_en: '',
    first_name_da: '',
    last_name_da: '',
    father_name: '',
    g_father_name: '',
    gender_id: '',
    birth_date: '',
    birth_place: '',
    birth_district_id: '',
    birth_province_id: '',
    email: '',
    dapertment_id: '',
    identification_number: '',
    profile_image: '',
    old_profile_image: '',
  }
  const validationSchema = Yup.object().shape({
    // first_name_en: Yup.string()
    //   .trim()
    //   .matches(
    //     /^[\u0600-\u06FF\uFB8A\u067E\u0686\u06AFa-zA-Z\s]*[^\d\u06F0-\u06F9\s][\u0600-\u06FF\uFB8A\u067E\u0686\u06AFa-zA-Z\s]*$/,
    //     SetLang('Only letters are allowed')
    //   )
    //   .test(
    //     'no-numbers',
    //     SetLang('Only letters are allowed'),
    //     (value) => !/[0-9\u06F0-\u06F9]/.test(value)
    //   )
    //   .min(3, SetLang('This field can not be less than 3 chracters'))
    //   .required(SetLang('This field can not be empty')),

    // last_name_en: Yup
    // .string()
    // .trim()
    // .matches(/^[\u0600-\u06FF\uFB8A\u067E\u0686\u06AFa-zA-Z\s]*[^\d\u06F0-\u06F9\s][\u0600-\u06FF\uFB8A\u067E\u0686\u06AFa-zA-Z\s]*$/, SetLang('Only letters are allowed'))
    // .test(
    //   'no-numbers',
    //   SetLang('Only letters are allowed'),
    //   (value) => !/[0-9\u06F0-\u06F9]/.test(value)
    // )
    // .min(3, SetLang('This field can not be less than 3 chracters'))
    // .required(SetLang('This field can not be empty')),

    first_name_da: Yup.string()
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

    last_name_da: Yup.string()
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

    father_name: Yup.string()
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

    g_father_name: Yup.string()
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

    gender_id: Yup.string().required(SetLang('This feild is required')),

    birth_date: Yup.string().required(SetLang('This feild is required')),

    birth_place: Yup.string().required(SetLang('This feild is required')),

    birth_province_id: Yup.string().required(SetLang('This feild is required')),

    birth_district_id: Yup.string().required(SetLang('This feild is required')),

    // email: Yup
    //   .string()
    //   .email(SetLang('Invalid email address'))
    //   .required(SetLang('This field can not be empty')),

    // dapertment_id: Yup
    //   .string().required(SetLang('This feild is required')),

    identification_number: Yup.string().required(SetLang('This feild is required')),

    profile_image:
      fileField &&
      Yup.mixed().test('file', SetLang('This feild should be an image'), (value) => {
        if (value) {
          return value.type.includes('image')
        }
        return false
      }),
  })
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true)

      const formData = new FormData()
      // formData.append('first_name_en', values.first_name_en)
      formData.append('last_name_en', values.last_name_en)
      formData.append('first_name_da', values.first_name_da)
      formData.append('last_name_da', values.last_name_da)
      formData.append('father_name', values.father_name)
      formData.append('g_father_name', values.g_father_name)
      formData.append('gender_id', values.gender_id)
      formData.append('birth_date', values.birth_date)
      formData.append('birth_place', values.birth_place)
      formData.append('birth_district_id', values.birth_district_id)
      formData.append('birth_province_id', values.birth_province_id)
      formData.append('email', values.email)
      formData.append('dapertment_id', values.dapertment_id)
      formData.append('identification_number', values.identification_number)
      if (values.profile_image) {
        formData.append('profile_image', values.profile_image)
      }

      axios
        .post(`${apiUrl}/update-profile`, formData)
        .then((res) => {
          setLoading(false)
          toast.success(SetLang('Successfuly Done'))
          dispatch(getProfile())
        })
        .catch((err) => {
          console.log(err)
          setLoading(false)
        })
    },
  })

  useEffect(() => {
    formik.setValues({
      ...formik.values,
      first_name_en: data?.first_name_en,
      last_name_en: data?.last_name_en,
      first_name_da: data?.name_da,
      last_name_da: data?.last_name_da,
      father_name: data?.father_name,
      g_father_name: data?.g_father_name,
      gender_id: data?.gender,
      birth_date: data?.birth_date,
      birth_place: data?.birth_place,
      birth_district_id: data?.district,
      birth_province_id: data?.province,
      email: data?.email,
      identification_number: data?.identification_number,
      old_profile_image: data?.profile_image,
      dapertment_id: data?.department_generals_id,
    })
  }, [data])
  useEffect(() => {
    // Check if formik object is fully initialized
    if (formik.initialValues) {
      formik.setErrors({})
    }
  }, [formik.initialValues])
  if (!data) {
    return <></>
  }

  console.log(formik.touched)
  console.log(formik.errors)
  console.log(formik.values)
  return (
    <div className='card mb-5 mb-xl-10'>
      <div
        className='card-header border-0 cursor-pointer'
        role='button'
        data-bs-toggle='collapse'
        data-bs-target='#kt_account_profile_details'
        aria-expanded='true'
        aria-controls='kt_account_profile_details'
      >
        <div className='card-title m-0'>
          <h3 className='fw-bolder m-0'>{intl.formatMessage({id: 'ACCOUNT.PROFILE.CHANGE'})}</h3>
        </div>
      </div>

      <div id='kt_account_profile_details' className='collapse show'>
        <form onSubmit={formik.handleSubmit} noValidate className='form'>
          <div className='card-body border-top p-9'>
            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label fw-bold fs-6'>
                {intl.formatMessage({id: 'ACCOUNT.PROFILE.IMAGE'})}
              </label>

              <div className='col-sm-12 col-md-3'>
                <input
                  type='file'
                  name='profile_image'
                  className='col-sm'
                  onChange={(event) => {
                    setFileField(URL.createObjectURL(event.target.files[0]))
                    formik.setFieldValue('profile_image', event.currentTarget.files[0])
                  }}
                  onBlur={formik.handleBlur}
                  style={{display: 'none'}}
                  id='profile_image_input'
                />

                <div className=''>
                  <div
                    className='row justify-content-center px-5'
                    onClick={() => document.getElementById('profile_image_input').click()}
                  >
                    <img
                      style={{height: '250px', width: '250px'}}
                      src={
                        fileField
                          ? fileField
                          : formik.values.old_profile_image
                          ? // ? formik.values.old_profile_image
                            `${process.env.REACT_APP_API_PUBLIC_URL}all_images/${data.profile_image}`
                          : toAbsoluteUrl('/media/auth/profile.png')
                      }
                      alt='Selected Image'
                      className='border border-primary rounded shadow'
                    />

                    {formik.errors.profile_image ? (
                      <div className='text-danger text-center'>{formik.errors.profile_image}</div>
                    ) : null}
                  </div>
                </div>
              </div>

              {/* <div className='col-lg-8'>
                <div
                  className='image-input image-input-outline'
                  data-kt-image-input='true'
                  style={{ backgroundImage: `url(${toAbsoluteUrl('/media/avatars/blank.png')})` }}
                >
                  <div
                    className='image-input-wrapper w-125px h-125px'
                  // style={{backgroundImage: `url(${toAbsoluteUrl(data.avatar)})`}}
                  ></div>
                </div>
              </div> */}
            </div>
            {/* 
            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label required fw-bold fs-6'>
                {intl.formatMessage({id: 'ACCOUNT.PROFILE.FULL_NAME_EN'})}
              </label>

              <div className='col-lg-8'>
                <div className='row'>
                  <div className='col-lg-6 fv-row'>
                    <input
                      type='text'
                      className='form-control form-control-lg form-control-solid mb-3 mb-lg-0'
                      placeholder={intl.formatMessage({id: 'ACCOUNT.PROFILE.FIRST_NAME_EN'})}
                      {...formik.getFieldProps('first_name_en')}
                      onChange={formik.handleChange}
                      name='first_name_en'
                      id='first_name_en'
                    />
                    {formik.touched.first_name_en && formik.errors.first_name_en && (
                      <div className='fv-plugins-message-container'>
                        <div className='fv-help-block'>{formik.errors.first_name_en}</div>
                      </div>
                    )}
                  </div>

                  <div className='col-lg-6 fv-row'>
                    <input
                      type='text'
                      className='form-control form-control-lg form-control-solid'
                      placeholder={intl.formatMessage({id: 'ACCOUNT.PROFILE.LAST_NAME_EN'})}
                      {...formik.getFieldProps('last_name_en')}
                    />
                    {formik.touched.last_name_en && formik.errors.last_name_en && (
                      <div className='fv-plugins-message-container'>
                        <div className='fv-help-block'>{formik.errors.last_name_en}</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div> */}

            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label required fw-bold fs-6'>
                {intl.formatMessage({id: 'ACCOUNT.PROFILE.LAST_NAME_EN'})}
              </label>

              <div className='col-lg-8 fv-row'>
                <input
                  type='text'
                  className='form-control form-control-lg form-control-solid'
                  placeholder={intl.formatMessage({id: 'ACCOUNT.PROFILE.LAST_NAME_EN'})}
                  {...formik.getFieldProps('last_name_en')}
                />
                {formik.touched.last_name_en && formik.errors.last_name_en && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>{formik.errors.last_name_en}</div>
                  </div>
                )}
              </div>
            </div>

            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label required fw-bold fs-6'>
                {intl.formatMessage({id: 'ACCOUNT.PROFILE.FULL_NAME_DA'})}
              </label>

              <div className='col-lg-8'>
                <div className='row'>
                  <div className='col-lg-6 fv-row'>
                    <input
                      type='text'
                      className='form-control form-control-lg form-control-solid mb-3 mb-lg-0'
                      placeholder={intl.formatMessage({id: 'ACCOUNT.PROFILE.FIRST_NAME_DA'})}
                      {...formik.getFieldProps('first_name_da')}
                    />
                    {formik.touched.first_name_da && formik.errors.first_name_da && (
                      <div className='fv-plugins-message-container'>
                        <div className='fv-help-block'>{formik.errors.first_name_da}</div>
                      </div>
                    )}
                  </div>

                  <div className='col-lg-6 fv-row'>
                    <input
                      type='text'
                      className='form-control form-control-lg form-control-solid'
                      placeholder={intl.formatMessage({id: 'ACCOUNT.PROFILE.LAST_NAME_DA'})}
                      {...formik.getFieldProps('last_name_da')}
                    />
                    {formik.touched.last_name_da && formik.errors.last_name_da && (
                      <div className='fv-plugins-message-container'>
                        <div className='fv-help-block'>{formik.errors.last_name_da}</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label required fw-bold fs-6'>
                {intl.formatMessage({id: 'ACCOUNT.PROFILE.FATHER_NAME'})}
              </label>

              <div className='col-lg-8 fv-row'>
                <input
                  type='text'
                  className='form-control form-control-lg form-control-solid'
                  placeholder={intl.formatMessage({id: 'ACCOUNT.PROFILE.FATHER_NAME'})}
                  {...formik.getFieldProps('father_name')}
                />
                {formik.touched.father_name && formik.errors.father_name && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>{formik.errors.father_name}</div>
                  </div>
                )}
              </div>
            </div>

            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label fw-bold fs-6'>
                <span className='required'>
                  {intl.formatMessage({id: 'ACCOUNT.PROFILE.G_FATHER_NAME'})}
                </span>
              </label>

              <div className='col-lg-8 fv-row'>
                <input
                  type='text'
                  className='form-control form-control-lg form-control-solid'
                  placeholder={intl.formatMessage({id: 'ACCOUNT.PROFILE.G_FATHER_NAME'})}
                  {...formik.getFieldProps('g_father_name')}
                />
                {formik.touched.g_father_name && formik.errors.g_father_name && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>{formik.errors.g_father_name}</div>
                  </div>
                )}
              </div>
            </div>

            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label fw-bold fs-6'>
                <span className='required'>
                  {intl.formatMessage({id: 'ACCOUNT.PROFILE.GENDER'})}
                </span>
              </label>

              <div className='col-lg-8 fv-row'>
                <select
                  className='form-select form-select-solid form-select-lg fw-bold'
                  {...formik.getFieldProps('gender_id')}
                >
                  <option value=''>---</option>
                  {genders_selector?.map((mapGender) => {
                    return (
                      <option
                        key={mapGender.id}
                        value={
                          mapGender.id == formik.values.gender_id ? mapGender.id : mapGender.id
                        }
                      >
                        {mapGender.name_da}
                      </option>
                    )
                  })}
                </select>

                {formik.touched.gender_id && formik.errors.gender_id && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>{formik.errors.gender_id}</div>
                  </div>
                )}
              </div>
            </div>

            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label fw-bold fs-6'>
                <span className='required'>
                  {intl.formatMessage({id: 'ACCOUNT.PROFILE.BIRTH_DATE'})}
                </span>
              </label>

              <div className='col-lg-8 fv-row'>
                <DatePicker
                  calendar={persian}
                  locale={persian_fa}
                  containerStyle={{width: '100%', direction: 'rtl'}}
                  value={formik.values.birth_date}
                  name='birth_date'
                  placeholder={SetLang('Start Date')}
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
              </div>

              {/* <input
                  type='date'
                  className='form-control form-control-lg form-control-solid'
                  placeholder={intl.formatMessage({ id: 'ACCOUNT.PROFILE.BIRTH_DATE' })}
                  {...formik.getFieldProps('birth_date')}
                />

                
                {formik.touched.birth_date && formik.errors.birth_date && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>{formik.errors.birth_date}</div>
                  </div>
                )}
              </div> */}
            </div>

            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label fw-bold fs-6'>
                <span className='required'>
                  {intl.formatMessage({id: 'ACCOUNT.PROFILE.BIRTH_PLACE'})}
                </span>
              </label>

              <div className='col-lg-8 fv-row'>
                <input
                  type='text'
                  className='form-control form-control-lg form-control-solid'
                  placeholder={intl.formatMessage({id: 'ACCOUNT.PROFILE.BIRTH_PLACE'})}
                  {...formik.getFieldProps('birth_place')}
                />
                {formik.touched.birth_place && formik.errors.birth_place && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>{formik.errors.birth_place}</div>
                  </div>
                )}
              </div>
            </div>

            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label fw-bold fs-6'>
                <span className='required'>
                  {intl.formatMessage({id: 'ACCOUNT.PROFILE.BIRTH_PROVINCE'})}
                </span>
              </label>

              <div className='col-lg-8 fv-row'>
                <select
                  className='form-select form-select-solid form-select-lg fw-bold'
                  {...formik.getFieldProps('birth_province_id')}
                >
                  <option>---</option>

                  {provincecSelector?.map((row) => {
                    return (
                      <option
                        key={row.id}
                        value={row.id == formik.values.birth_province_id ? row.id : row.id}
                      >
                        {row.name_da}
                      </option>
                    )
                  })}
                </select>

                {formik.touched.birth_province_id && formik.errors.birth_province_id && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>{formik.errors.birth_province_id}</div>
                  </div>
                )}
              </div>
            </div>

            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label fw-bold fs-6'>
                <span className='required'>
                  {intl.formatMessage({id: 'ACCOUNT.PROFILE.BIRTH_DISTRICT'})}
                </span>
              </label>

              <div className='col-lg-8 fv-row'>
                <select
                  className='form-select form-select-solid form-select-lg fw-bold'
                  {...formik.getFieldProps('birth_district_id')}
                >
                  <option>---</option>

                  {districtsSelector?.map((mapDistrict) => {
                    if (mapDistrict.province_id == formik.values.birth_province_id) {
                      return (
                        <option key={mapDistrict.id} value={mapDistrict.id}>
                          {mapDistrict.name_da}
                        </option>
                      )
                    }
                  })}
                </select>

                {formik.touched.birth_district_id && formik.errors.birth_district_id && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>{formik.errors.birth_district_id}</div>
                  </div>
                )}
              </div>
            </div>

            {/* <div className='row mb-6'>
              <label className='col-lg-4 col-form-label fw-bold fs-6'>

              </label>

              <div className='col-lg-8 fv-row'>
                <input
                  type='text'
                  className='form-control form-control-lg form-control-solid'
                  placeholder={intl.formatMessage({ id: 'ACCOUNT.PROFILE.EMAIL' })}
                  {...formik.getFieldProps('email')}
                />
                {formik.touched.email && formik.errors.email && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>{formik.errors.email}</div>
                  </div>
                )}
              </div>
            </div> */}

            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label required fw-bold fs-6'>
                {intl.formatMessage({id: 'ACCOUNT.PROFILE.DEPARTMENT'})}
              </label>

              <div className='col-lg-8 fv-row'>
                <select
                  disabled={true}
                  className='form-select form-select-solid form-select-lg'
                  {...formik.getFieldProps('dapertment_id')}
                >
                  <option>---</option>

                  {department_generals_selector?.map((map_general_department) => {
                    return (
                      <option key={map_general_department.id} value={map_general_department.id}>
                        {map_general_department.name_da}
                      </option>
                    )
                  })}
                </select>

                {formik.touched.dapertment_id && formik.errors.dapertment_id && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>{formik.errors.dapertment_id}</div>
                  </div>
                )}
              </div>
            </div>
            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label fw-bold fs-6'>
                <span className='required'>
                  {intl.formatMessage({id: 'ACCOUNT.PROFILE.CARD_NUMBER'})}
                </span>
              </label>

              <div className='col-lg-8 fv-row'>
                <input
                  type='text'
                  className='form-control form-control-lg form-control-solid'
                  placeholder={intl.formatMessage({id: 'ACCOUNT.PROFILE.CARD_NUMBER'})}
                  {...formik.getFieldProps('identification_number')}
                />
                {formik.touched.identification_number && formik.errors.identification_number && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>{formik.errors.identification_number}</div>
                  </div>
                )}
              </div>
            </div>

            {/* <div className='row mb-6'>
              <label className='col-lg-4 col-form-label fw-bold fs-6'>
                {intl.formatMessage({id: 'ACCOUNT.PROFILE.CHANGE'})}
              </label>

              <div className='col-lg-8 fv-row'>
                <div className='d-flex align-items-center mt-3'>
                  <label className='form-check form-check-inline form-check-solid me-5'>
                    <input
                      className='form-check-input'
                      name='communication[]'
                      type='checkbox'
                      defaultChecked={data.communications?.email}
                      onChange={() => {
                        updateData({
                          communications: {
                            email: !data.communications?.email,
                            phone: data.communications?.phone,
                          },
                        })
                      }}
                    />
                    <span className='fw-bold ps-2 fs-6'>Email</span>
                  </label>

                  <label className='form-check form-check-inline form-check-solid'>
                    <input
                      className='form-check-input'
                      name='communication[]'
                      type='checkbox'
                      defaultChecked={data.communications?.phone}
                      onChange={() => {
                        updateData({
                          communications: {
                            email: data.communications?.email,
                            phone: !data.communications?.phone,
                          },
                        })
                      }}
                    />
                    <span className='fw-bold ps-2 fs-6'>Phone</span>
                  </label>
                </div>
              </div>
            </div> */}

            {/* <div className='row mb-0'>
              <label className='col-lg-4 col-form-label fw-bold fs-6'>Allow Marketing</label>

              <div className='col-lg-8 d-flex align-items-center'>
                <div className='form-check form-check-solid form-switch fv-row'>
                  <input
                    className='form-check-input w-45px h-30px'
                    type='checkbox'
                    id='allowmarketing'
                    // defaultChecked={data.allowMarketing}
                    // onChange={() => {
                    //   updateData({allowMarketing: !data.allowMarketing})
                    // }}
                  />
                  <label className='form-check-label'></label>
                </div>
              </div>
            </div> */}
          </div>

          <div className='card-footer d-flex justify-content-end py-6 px-9'>
            <button type='submit' className='btn btn-primary' disabled={loading}>
              {!loading && intl.formatMessage({id: 'SAVE_CHANGES'})}
              {loading && (
                <span className='indicator-progress' style={{display: 'block'}}>
                  {intl.formatMessage({id: 'PLEASE_WAIT'})}

                  {/* Please wait...{' '} */}
                  <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                </span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export {ProfileDetails}
