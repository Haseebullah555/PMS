import React, {useEffect, useState} from 'react'
import {toAbsoluteUrl} from '../../../_metronic/helpers'
import {useFormik} from 'formik'
import {useIntl} from 'react-intl'
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
import { useTranslation } from 'react-i18next'

// const ProfileDetails: React.FC = () => {
const UserCreate = () => {
  const {t} = useTranslation()
  const intl = useIntl()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [fileField, setFileField] = useState(null)
  const [currentPermissions, setCurrentPermissions] = useState([])
  const [currentRoles, setCurrentRoles] = useState([])

   const [perPage, setPerPage] = useState()
    const [sortColumn, setSortColumn] = useState()
    const [sortOrder, setSortOrder] = useState()
    const [search, setSearch] = useState('')
    const [currentPage, setCurrentPage] = useState(1)

  const permissionSelector = useSelector((state) => {
    return state?.authorization?.permissions
  })

  const roleSelector = useSelector((state) => {
    return state?.authorization?.roles
  })

  useEffect(() => {
    const params = {
      search,
      sort_field: sortColumn,
      sort_order: sortOrder,
      per_page: perPage,
      page: currentPage,
    }
    dispatch(getRoles(params))
    dispatch(getPermissions())
  }, [])

  console.log(roleSelector, '------------');
  console.log(permissionSelector, 'aaaaaaaaaaa');

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
    userName: '',
    password: '',
    email: '',
    profile_image: '',
    old_profile_image: '',
    password: '',
    re_password: '',
  }

  const validationSchema = yup.object().shape({
    userName: yup
      .string()
      .trim()
      .matches(
        /^[\u0600-\u06FF\uFB8A\u067E\u0686\u06AFa-zA-Z\s]*[^\d\u06F0-\u06F9\s][\u0600-\u06FF\uFB8A\u067E\u0686\u06AFa-zA-Z\s]*$/,
        t('Only letters are allowed')
      )
      .test(
        'no-numbers',
        t('Only letters are allowed'),
        (value) => !/[0-9\u06F0-\u06F9]/.test(value)
      )
      .min(3, t('This field can not be less than 3 chracters'))
      .required(t('This field can not be empty')),

    email: yup.string().required(t('This field can not be empty')),
   
    password: yup
      .string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
        t(
          'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character'
        )
      )
      .required(t('This field can not be empty')),

    re_password: yup
      .string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
        t(
          'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character'
        )
      )
      .required(t('This field can not be empty'))
      .oneOf([yup.ref('password')], t('Passwords do not match')),

    profile_image:
      fileField &&
      yup.mixed().test('file', t('This feild should be an image'), (value) => {
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
      formData.append('id', values.id)
      formData.append('userName', values.userName)
      formData.append('email', values.email)
      formData.append('password', values.password)
      formData.append('re_password', values.re_password)
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
            toast.success(t('Successfuly Done'))
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
                  {t('user.userName')}
                </label>

                <div className='col-lg-8'>
                  <div className='row'>
                    <div className='col-lg-12 fv-row'>
                      <input
                        type='text'
                        className='form-control form-control-lg form-control-solid mb-3 mb-lg-0'
                        placeholder={t('user.userName')}
                        {...formik.getFieldProps('userName')}
                        onChange={formik.handleChange}
                        name='userName'
                        id='userName'
                      />
                      {formik.touched.userName && formik.errors.userName && (
                        <div className='fv-plugins-message-container'>
                          <div className='fv-help-block'>{formik.errors.userName}</div>
                        </div>
                      )}
                    </div>
                  </div>
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
                      {t('Role')}
                    </span>
                    <span
                      className='btn btn-success'
                      data-bs-toggle='modal'
                      data-bs-target='#permissionModal'
                    >
                      <i className='fa fa-plus' />

                      {t('Permission')}
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
