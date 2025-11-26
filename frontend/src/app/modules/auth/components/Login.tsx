/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from 'react'
import * as Yup from 'yup'
import clsx from 'clsx'
import { Link } from 'react-router-dom'
import { useFormik } from 'formik'
import { getUserByToken, login } from '../core/_requests'
import { toAbsoluteUrl } from '../../../../_metronic/helpers'
import { useAuth } from '../core/Auth'
import { useDispatch } from 'react-redux'
import { setAuthUser } from '../../../../redux/slices/authenticationSlices/authenticationSlice'
import { useIntl } from 'react-intl'
import { useTranslation } from 'react-i18next'

/*
  Formik+YUP+Typescript:
  https://jaredpalmer.com/formik/docs/tutorial#getfieldprops
  https://medium.com/@maurice.de.beijer/yup-validation-and-typescript-and-formik-6c342578a20e
*/

export function Login() {
  const intl = useIntl()
  const { t } = useTranslation()

  const [loading, setLoading] = useState(false)
  const { saveAuth, setCurrentUser } = useAuth()
  const dispatch = useDispatch()

  const loginSchema = Yup.object().shape({
    email: Yup.string()
      // .email('Wrong email format')
      // .min(3, 'Minimum 3 symbols')
      // .max(50, 'Maximum 50 symbols')
      // .required('Email is required'),
      .email(t('global.LOGIN_PAGE.WRONG_EMAIL_FORMAT'))
      .min(3, t('global.LOGIN_PAGE.MINIMUM_CHARACTERS', { count: 3 }))
      .max(50, t('global.LOGIN_PAGE.MAXIMUM_CHARACTERS', { count: 50 }))
      .required(t('global.LOGIN_PAGE.EMAIL_IS_REQUIRED')),
    password: Yup.string()
      .min(3, t('global.LOGIN_PAGE.MINIMUM_CHARACTERS', { count: 3 }))
      .max(50, t('global.LOGIN_PAGE.MAXIMUM_CHARACTERS', { count: 50 }))
      .required(t('global.LOGIN_PAGE.PASSWORD_IS_REQUIRED')),
  })

  const initialValues = {
    email: '',
    password: '',
  }
  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      setLoading(true)
      try {
        const { data: auth } = await login(values.email, values.password)
        saveAuth(auth)
        const { data: user } = await getUserByToken(auth.accessToken)
        setCurrentUser(user)
        dispatch(setAuthUser(user))
      } catch (error) {
        console.error(error)
        saveAuth(undefined)
        setStatus(t('global.LOGIN_PAGE.THE_LOGIN_DETAIL_ARE_INCORRECT'))
        setSubmitting(false)
        setLoading(false)
      }
    },
  })

  return (
    <div className='col-12'>
      <div className='card p-5 col-sm-12 col-md-12'>
        <form
          className='form w-100 '
          // style={{width: '500px'}}
          onSubmit={formik.handleSubmit}
          noValidate
          id='kt_login_signin_form'
        >
          <div className='m-5'>
            {/* begin::Heading */}
            <div className='row'>
              <img
                className='mx-auto w-50 h-50 justify-content-center '
                src={toAbsoluteUrl('/media/misc/MOI-Logo.png')}
                alt=''
              />
              <h1 className='fw-bolder mb-3 text-center text-primary h1'>
                {/* {intl.formatMessage({id: 'LOGIN_PAGE.SING_UP'})} */}
                {t('global.MINISTYRYOFINTROIRAFFARIS')}
                {/* وزارت امور داخله */}
              </h1>
            </div>
            <div className='text-center mb-11'>
              <h1 className='text-dark fw-bolder mb-3'>
                {t('global.LOGINPAGESINGUP')}
              </h1>
              {/* <div className='text-gray-500 fw-semibold fs-6'>Your Social Campaigns</div> */}
            </div>
            {/* begin::Heading */}

            {/* <div className='row g-3 mb-9'>
        <div className='col-md-6'>
          <a
            href='#'
            className='btn btn-flex btn-outline btn-text-gray-700 btn-active-color-primary bg-state-light flex-center text-nowrap w-100'
          >
            <img
              alt='Logo'
              src={toAbsoluteUrl('/media/svg/brand-logos/google-icon.svg')}
              className='h-15px me-3'
            />
            Sign in with Google
          </a>
        </div>
        <div className='col-md-6'>
          <a
            href='#'
            className='btn btn-flex btn-outline btn-text-gray-700 btn-active-color-primary bg-state-light flex-center text-nowrap w-100'
          >
            <img
              alt='Logo'
              src={toAbsoluteUrl('/media/svg/brand-logos/apple-black.svg')}
              className='theme-light-show h-15px me-3'
            />
            <img
              alt='Logo'
              src={toAbsoluteUrl('/media/svg/brand-logos/apple-black-dark.svg')}
              className='theme-dark-show h-15px me-3'
            />
            Sign in with Apple
          </a>
        </div>
      </div> */}

            {/* begin::Separator */}
            <div className='separator separator-content my-14'>
              <span className='w-125px text-gray-500 fw-semibold fs-7'>
                {t('global.LOGINPAGESINGUP')}
              </span>
            </div>
            {/* end::Separator */}

            {formik.status && (
              <div className='mb-lg-15 alert alert-danger'>
                <div className='alert-text font-weight-bold'>{formik.status}</div>
              </div>
            )}
            {/* : (
        <div className='mb-10 bg-light-info p-8 rounded'>
          <div className='text-info'>
            Use account <strong>admin@demo.com</strong> and password <strong>demo</strong> to
            continue.
          </div>
        </div>
      )} */}

            {/* begin::Form group */}
            <div className='fv-row mb-8'>
              <label className='form-label fs-6 fw-bolder text-dark'>
                {t('global.email')}
              </label>
              <input
                placeholder={intl.formatMessage({ id: 'LOGIN_PAGE.EMAIL' })}
                {...formik.getFieldProps('email')}
                className={clsx(
                  'form-control bg-transparent text-start',
                  { 'is-invalid': formik.touched.email && formik.errors.email },
                  {
                    'is-valid': formik.touched.email && !formik.errors.email,
                  }
                )}
                type='email'
                name='email'
                autoComplete='off'
              />
              {formik.touched.email && formik.errors.email && (
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>
                    <span role='alert'>{formik.errors.email}</span>
                  </div>
                </div>

                // <div className='fv-plugins-message-container'>
                //   <span role='alert'>{formik.errors.email}</span>
                // </div>
              )}
            </div>
            {/* end::Form group */}

            {/* begin::Form group */}
            <div className='fv-row mb-3'>
              <label className='form-label fw-bolder text-dark fs-6 mb-0'>
                {t('global.password')}
              </label>
              <input
                type='password'
                placeholder={intl.formatMessage({ id: 'LOGIN_PAGE.PASSWORD' })}
                autoComplete='off'
                {...formik.getFieldProps('password')}
                className={clsx(
                  'form-control bg-transparent',
                  {
                    'is-invalid': formik.touched.password && formik.errors.password,
                  },
                  {
                    'is-valid': formik.touched.password && !formik.errors.password,
                  }
                )}
              />
              {formik.touched.password && formik.errors.password && (
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>
                    <span role='alert'>{formik.errors.password}</span>
                  </div>
                </div>
              )}
            </div>
            {/* end::Form group */}

            {/* begin::Wrapper */}
            <div className='d-flex flex-stack flex-wrap gap-3 fs-base fw-semibold mb-8'>
              <div />

              {/* begin::Link */}
              {/* <Link to='/auth/forgot-password' className='link-primary'> */}
              <Link to='' className='link-primary'>
                {t('global.LOGIN_PAGE.FORGOT_PASSWORD')}
              </Link>
              {/* end::Link */}
            </div>
            {/* end::Wrapper */}

            {/* begin::Action */}
            <div className='d-grid mb-10'>
              <button
                type='submit'
                id='kt_sign_in_submit'
                className='btn btn-primary'
                disabled={formik.isSubmitting || !formik.isValid}
              >
                {!loading && (
                  <span className='indicator-label'>
                    {t('global.LOGIN_PAGE.LOGIN')}
                  </span>
                )}
                {loading && (
                  <span className='indicator-progress' style={{ display: 'block' }}>
                    {t('global.LOGIN_PAGE.PLEASE_WAIT')}
                    <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                  </span>
                )}
              </button>
            </div>
            {/* end::Action */}

            {/* <div className='text-gray-500 text-center fw-semibold fs-6'>
        Not a Member yet?{' '}
        <Link to='/auth/registration' className='link-primary'>
          Sign up
        </Link>
      </div> */}
          </div>
        </form>
      </div>
    </div>
  )
}
