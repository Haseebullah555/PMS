import {useState} from 'react'
import {useDispatch} from 'react-redux'
import * as yup from 'yup'
import {useFormik} from 'formik'

import {getRoles, postRole} from '../../../../../redux/slices/authorizationSlice/authorizationSlice'
import {useIntl} from 'react-intl'
import { useTranslation } from 'react-i18next'

export default function RoleCreate() {
  const intl = useIntl()
  const {t} = useTranslation()

  const dispatch = useDispatch()

  const [isLoading, setIsLoading] = useState(false)

  const formik = useFormik({
    initialValues: {
      name: '',
    },

    validationSchema: yup.object().shape({
      name: yup
        .string()
        .min(4, t('This field can not be less than 4 chracters'))
        .required(t('This field can not be empty')),
    }),

    onSubmit: async ({name}) => {
      setIsLoading(true)
      dispatch(
        postRole({
          name: name,
        })
      )
        .then((res) => {
          setIsLoading(false)
          dispatch(getRoles())
          formik.resetForm()
          // formik.initialValues.name = "";
        })
        .catch((err) => {
          setIsLoading(false)
          console.log(err)
        })
    },
  })
  return (
    <div
      className='modal fade'
      id='rolePost'
      tabIndex={-1}
      aria-labelledby='roleLable'
      aria-hidden='true'
    >
      <div className='modal-dialog'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h1 className='modal-title fs-5' id='roleLable'>
              {intl.formatMessage({id: 'SETTING.ROLE.NEW_ROLE'})}
            </h1>
            <button
              type='button'
              className='btn-close'
              data-bs-dismiss='modal'
              aria-label='Close'
            />
          </div>
          <div className='modal-body border '>
            <form onSubmit={formik.handleSubmit}>
              <h5 className='text-center'>{intl.formatMessage({id: 'SETTING.ROLE.NEW_ROLE'})}</h5>

              <div className=''>
                <label className='form-label' htmlFor='name'>
                  {intl.formatMessage({id: 'SETTING.ROLE.ROLE_NAME'})}
                </label>
                <input
                  type='name'
                  name='name'
                  placeholder={intl.formatMessage({id: 'SETTING.ROLE.ROLE_NAME'})}
                  className='form-control text-start'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                />
                {formik.touched.name && formik.errors.name ? (
                  <div className='text-danger'>{formik.errors.name}</div>
                ) : null}
              </div>
            </form>
          </div>
          <div className='modal-footer'>
            <button type='button' className='btn btn-danger ' data-bs-dismiss='modal'>
              {intl.formatMessage({id: 'CLOSE'})}
            </button>

            <button
              onClick={formik.handleSubmit}
              className='btn btn-primary '
              type='submit'
              disabled={isLoading}
            >
              {isLoading ? (
                <span className='indicator-progress' style={{display: 'block'}}>
                  {/* {intl.formatMessage({id: 'LOGIN_PAGE.PLEASE_WAIT'})} */}
                  <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                </span>
              ) : (
                <span>{intl.formatMessage({id: 'SAVE'})}</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
