import React, {useEffect, useState} from 'react'
import {toAbsoluteUrl} from '../../../_metronic/helpers'
import {useFormik} from 'formik'
import {useIntl} from 'react-intl'
import SetLang from '../../custom/SetLang'
import * as yup from 'yup'

import {
  getDistricts,
  getProvinces,
  get_department_generals,
  get_genders,
} from '../../../redux/slices/generalSlices/generalSlice'
import {useDispatch, useSelector} from 'react-redux'
import DatePicker from 'react-multi-date-picker'
import persian from 'react-date-object/calendars/persian'
import persian_fa from '../../custom/persian_fa'
import GetAllPermission from '../setting/role/components/GetAllPermission'
import GetAllRoles from '../setting/role/components/GetAllRoles'
import {getRoles, getPermissions} from '../../../redux/slices/authorizationSlice/authorizationSlice'
import {postUser, getUsers} from './../../../redux/slices/userSlice/userSlice'
import {toast} from 'react-toastify'
import AllPermissionsAndRoles from './components/AllPermissionsAndRoles'

// const ProfileDetails: React.FC = () => {
const UserCreate = () => {
  const intl = useIntl()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [fileField, setFileField] = useState(null)
  const [currentPermissions, setCurrentPermissions] = useState([])
  const [currentRoles, setCurrentRoles] = useState([])

  const permissionSelector = useSelector((state) => {
    return state?.permission?.items
  })

  const roleSelector = useSelector((state) => {
    return state?.role?.items
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
    if (!permissionSelector) {
      dispatch(getPermissions())
        .then((res) => {})
        .catch((err) => {
          console.log(err)
        })
    }

    if (!roleSelector) {
      dispatch(getRoles())
        .then((res) => {})
        .catch((err) => {
          console.log(err)
        })
    }

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

  const handleChange = (value, event, type) => {
    if (type === 'permission') {
      if (event.target.checked) {
        setCurrentPermissions((current) => [...current, value])
        // setPermissions([...permissions, value]);
      } else if (!event.target.checked) {
        setCurrentPermissions(
          currentPermissions.filter((row) => {
            return row !== value
          })
        )
      }
    } else if (type === 'role')
      if (event.target.checked) {
        setCurrentRoles((current) => [...current, value])
      } else if (!event.target.checked) {
        setCurrentRoles(
          currentRoles.filter((row) => {
            return row !== value
          })
        )
      }
  }

  const initialValues = {
    name_da: '',
    last_name_da: '',
    name_en: '',
    last_name_en: '',
    father_name: '',
    g_father_name: '',
    email: '',
    gender_id: '',
    birth_date: '',
    birth_place: '',
    province: '',
    district: '',
    identification_number: '',
    department_generals_id: '',
    profile_image: '',
    old_profile_image: '',
    password: '',
    re_password: '',
  }

  const validationSchema = yup.object().shape({
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

    g_father_name: yup
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
    gender_id: yup.string().required(SetLang('This field can not be empty')),
    email: yup.string().required(SetLang('This field can not be empty')),
    birth_date: yup
      .string()
      .min(4, SetLang('This field can not be less than 4 chracters'))
      .required(SetLang('This field can not be empty')),
    birth_place: yup
      .string()
      .min(4, SetLang('This field can not be less than 4 chracters'))
      .required(SetLang('This field can not be empty')),
    district: yup.string().required(SetLang('This field can not be empty')),
    province: yup.string().required(SetLang('This field can not be empty')),
    department_generals_id: yup.string().required(SetLang('This field can not be empty')),

    password: yup
      .string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
        SetLang(
          'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character'
        )
      )
      .required(SetLang('This field can not be empty')),

    re_password: yup
      .string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
        SetLang(
          'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character'
        )
      )
      .required(SetLang('This field can not be empty'))
      .oneOf([yup.ref('password')], SetLang('Passwords do not match')),

    profile_image:
      fileField &&
      yup.mixed().test('file', SetLang('This feild should be an image'), (value) => {
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
      formData.append('name_da', values.name_da)
      formData.append('last_name_da', values.last_name_da)
      formData.append('name_en', values.name_en)
      formData.append('last_name_en', values.last_name_en)
      formData.append('id', values.id)
      formData.append('father_name', values.father_name)
      formData.append('g_father_name', values.g_father_name)
      formData.append('email', values.email)
      formData.append('gender_id', values.gender_id)
      formData.append('birth_date', values.birth_date)
      formData.append('province', values.province)
      formData.append('district', values.district)
      formData.append('birth_place', values.birth_place)
      formData.append('identification_number', values.identification_number)
      formData.append('password', values.password)
      formData.append('re_password', values.re_password)
      formData.append('department_generals_id', values.department_generals_id)
      formData.append('profile_image', values.profile_image)
      formData.append('permissions', currentPermissions)
      formData.append('roles', currentRoles)

      dispatch(postUser(formData))
        .then((res) => {
          if (res.meta.requestStatus === 'fulfilled') {
            setLoading(false)
            formik.resetForm()
            setFileField(null)
            dispatch(getUsers())
            toast.success(SetLang('Successfuly Done'))
          }
          setLoading(false)
        })
        .catch((err) => {
          setLoading(false)
          console.log(err)
        })
    },
  })

  // console.log(formik.errors)
  // console.log(formik.values)
  // console.log(department_generals_selector)
  return (
    <>
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
            <h3 className='fw-bolder m-0'>{intl.formatMessage({id: 'ACCOUNT.PROFILE.CREATE'})}</h3>
          </div>
        </div>

        <div id='kt_account_profile_details' className='collapse show'>
          <form onSubmit={formik.handleSubmit} noValidate className='form'>
            <div className='card-body border-top p-9'>
              <div className='row mb-6'>
                <label className='col-lg-4 col-form-label fw-bold fs-6'>
                  {intl.formatMessage({id: 'ACCOUNT.PROFILE.IMAGE'})}
                </label>

                <div className='col-lg-12'>
                  <input
                    type='file'
                    name='profile_image'
                    className='col-sm'
                    onChange={(event) => {
                      setFileField(URL.createObjectURL(event.target.files[0]))
                      formik.setFieldValue('profile_image', event.currentTarget.files[0])
                      formik.setTouched({profile_image: true})
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
                            ? formik.values.old_profile_image
                            : toAbsoluteUrl('/media/auth/profile.png')
                        }
                        alt='Selected Image'
                        className='border border-primary rounded shadow'
                      />

                      {formik.touched.profile_image && formik.errors.profile_image ? (
                        <div className='text-danger text-center'>{formik.errors.profile_image}</div>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>

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
                        {...formik.getFieldProps('name_en')}
                        onChange={formik.handleChange}
                        name='name_en'
                        id='name_en'
                      />
                      {formik.touched.name_en && formik.errors.name_en && (
                        <div className='fv-plugins-message-container'>
                          <div className='fv-help-block'>{formik.errors.name_en}</div>
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
                        {...formik.getFieldProps('name_da')}
                      />
                      {formik.touched.name_da && formik.errors.name_da && (
                        <div className='fv-plugins-message-container'>
                          <div className='fv-help-block'>{formik.errors.name_da}</div>
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
                    {intl.formatMessage({id: 'ACCOUNT.PROFILE.EMAIL'})}
                  </span>
                </label>

                <div className='col-lg-8 fv-row'>
                  <input
                    type='text'
                    className='form-control form-control-lg form-control-solid'
                    placeholder={intl.formatMessage({id: 'ACCOUNT.PROFILE.EMAIL'})}
                    {...formik.getFieldProps('email')}
                  />
                  {formik.touched.email && formik.errors.email && (
                    <div className='fv-plugins-message-container'>
                      <div className='fv-help-block'>{formik.errors.email}</div>
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
                    placeholder={intl.formatMessage({id: 'ACCOUNT.PROFILE.BIRTH_DATE'})}
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
                  {formik.touched.birth_date && formik.errors.birth_date && (
                    <div className='fv-plugins-message-container'>
                      <div className='fv-help-block'>{formik.errors.birth_date}</div>
                    </div>
                  )}
                </div>
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
                    {...formik.getFieldProps('province')}
                  >
                    <option>---</option>

                    {provincecSelector?.map((row) => {
                      return (
                        <option
                          key={row.id}
                          value={row.id == formik.values.province ? row.id : row.id}
                        >
                          {row.name_da}
                        </option>
                      )
                    })}
                  </select>

                  {formik.touched.province && formik.errors.province && (
                    <div className='fv-plugins-message-container'>
                      <div className='fv-help-block'>{formik.errors.province}</div>
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
                    {...formik.getFieldProps('district')}
                  >
                    <option>---</option>

                    {districtsSelector?.map((mapDistrict) => {
                      if (mapDistrict.province_id == formik.values.province) {
                        return (
                          <option key={mapDistrict.id} value={mapDistrict.id}>
                            {mapDistrict.name_da}
                          </option>
                        )
                      }
                    })}
                  </select>

                  {formik.touched.district && formik.errors.district && (
                    <div className='fv-plugins-message-container'>
                      <div className='fv-help-block'>{formik.errors.district}</div>
                    </div>
                  )}
                </div>
              </div>

              <div className='row mb-6'>
                <label className='col-lg-4 col-form-label required fw-bold fs-6'>
                  {intl.formatMessage({id: 'ACCOUNT.PROFILE.DEPARTMENT'})}
                </label>

                <div className='col-lg-8 fv-row'>
                  <select
                    className='form-select form-select-solid form-select-lg'
                    {...formik.getFieldProps('department_generals_id')}
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

                  {formik.touched.department_generals_id && formik.errors.department_generals_id && (
                    <div className='fv-plugins-message-container'>
                      <div className='fv-help-block'>{formik.errors.department_generals_id}</div>
                    </div>
                  )}
                </div>
              </div>

              <div className='row mb-6'>
                <label className='col-lg-4 col-form-label fw-bold fs-6'>
                  <span className='required'>
                    {intl.formatMessage({id: 'ACCOUNT.PROFILE.PASSWORD'})}
                  </span>
                </label>

                <div className='col-lg-8 fv-row'>
                  <input
                    type='password'
                    className='form-control form-control-lg form-control-solid'
                    placeholder={intl.formatMessage({id: 'ACCOUNT.PROFILE.PASSWORD'})}
                    {...formik.getFieldProps('password')}
                  />
                  {formik.touched.password && formik.errors.password && (
                    <div className='fv-plugins-message-container'>
                      <div className='fv-help-block'>{formik.errors.password}</div>
                    </div>
                  )}
                </div>
              </div>

              <div className='row mb-6'>
                <label className='col-lg-4 col-form-label fw-bold fs-6'>
                  <span className='required'>
                    {intl.formatMessage({id: 'ACCOUNT.PROFILE.RE_PASSWORD'})}
                  </span>
                </label>

                <div className='col-lg-8 fv-row'>
                  <input
                    type='password'
                    className='form-control form-control-lg form-control-solid'
                    placeholder={intl.formatMessage({id: 'ACCOUNT.PROFILE.RE_PASSWORD'})}
                    {...formik.getFieldProps('re_password')}
                  />
                  {formik.touched.re_password && formik.errors.re_password && (
                    <div className='fv-plugins-message-container'>
                      <div className='fv-help-block'>{formik.errors.re_password}</div>
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

                <div className='col-sm-12 col-md-4 mt-5'>
                  <div className='d-flex justify-content-start gap-4 mt-4'>
                    <span
                      className='btn btn-success'
                      data-bs-toggle='modal'
                      data-bs-target='#roleModal'
                    >
                      <i className='fa fa-plus' />
                      {SetLang('Role')}
                    </span>
                    <span
                      className='btn btn-success'
                      data-bs-toggle='modal'
                      data-bs-target='#permissionModal'
                    >
                      <i className='fa fa-plus' />

                      {SetLang('Permission')}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className='card-footer d-flex justify-content-start py-6 px-9'>
              <button type='submit' className='btn btn-primary' disabled={loading}>
                {!loading && intl.formatMessage({id: 'SAVE'})}
                {loading && (
                  <span className='indicator-progress' style={{display: 'block'}}>
                    {intl.formatMessage({id: 'PLEASE_WAIT'})}
                    {/* Please wait...{' '} */}
                    <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                  </span>
                )}
              </button>
            </div>
            {/* <AllPermissionsAndRoles /> */}
          </form>
          {permissionSelector && (
            <GetAllPermission
              handleChange={handleChange}
              permissionSelector={permissionSelector}
              currentPermissions={currentPermissions}
            />
          )}

          {roleSelector && (
            <GetAllRoles
              handleChange={handleChange}
              roleSelector={roleSelector}
              currentRoles={currentRoles}
            />
          )}
        </div>
      </div>
    </>
  )
}

export default UserCreate
