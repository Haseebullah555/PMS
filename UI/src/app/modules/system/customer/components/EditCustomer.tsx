import {useEffect, useState} from 'react'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import clsx from 'clsx'
import {useTranslation} from 'react-i18next'
import {useAppDispatch} from '../../../../../redux/hooks'
import {Button, Modal} from 'react-bootstrap'
import {useIntl} from 'react-intl'
import {toast} from 'react-toastify'
import {updateCustomer} from 'redux/customer/CustomerSlice'

interface EditCustomerModalProps {
  isOpen: boolean
  onClose: () => void
  selectedCustomer: any // Type it as appropriate based on your data structure
  handleReloadTable: () => void
}

const EditCustomerModal: React.FC<EditCustomerModalProps> = ({
  isOpen,
  onClose,
  selectedCustomer,
  handleReloadTable,
}) => {
  const intl = useIntl()
  const {t} = useTranslation()
  const dispatch = useAppDispatch()
  const [roles, setRoles] = useState([])

  // Populate form with user data when `selectedCustomer` changes
  useEffect(() => {
    if (selectedCustomer) {
      formik.setFieldValue('id', selectedCustomer.id || '')
      formik.setFieldValue('name', selectedCustomer.name || '')
      formik.setFieldValue('phoneNumber', selectedCustomer.phoneNumber || '')
      formik.setFieldValue('address', selectedCustomer.address || '')
    }
  }, [selectedCustomer])

  // Validation schema
  const userSchema = Yup.object().shape({
    name: Yup.string().required(t('validation.required', { name: t('global.name') })),
        address: Yup.string().required(t('validation.required', { name: t('global.address') })),
        phoneNumber: Yup.string()
          .required(t('validation.required', { name: t('global.phone') }))
          .matches(
            /^(?:\+93|0)?7\d{8}$/,
            t('validation.invalid', { name: t('global.phone') }) // Custom error message
          )
  })

  // Formik setup
  const formik = useFormik({
    initialValues: {
      id: '',
      name: '',
      address: '',
      phoneNumber: '',
    },
    validationSchema: userSchema,
    onSubmit: async (values, {setSubmitting, resetForm}) => {
      try {
        const response = await dispatch(updateCustomer(values) as any)
        if (updateCustomer.fulfilled.match(response)) {
          handleFulfilledResponse(response)
          handleReloadTable()
          onClose()
          resetForm()
        } else {
          handleRejectedResponse(response)
        }
      } catch (error) {
        handleError(error)
      } finally {
        // setLoading(false)
        setSubmitting(false)
      }
    },
  })

  const handleFulfilledResponse = (response: any) => {
    const {meta, payload} = response
    if (meta.requestStatus === 'fulfilled') {
      toast.success(<p className='fs-4 fw-bold'>{payload.message}</p>)
    } else {
      toast.error(<p className='fs-4 fw-bold'>{t('validation.required')}</p>)
    }
  }

  const handleRejectedResponse = (response: any) => {
    const {payload} = response
    toast.error(<p className='fs-4 fw-bold'>{payload}</p>)
  }

  const handleError = (error: any) => {
    console.error('Error creating department:', error.message)
  }

  return (
    <Modal show={isOpen} onHide={onClose} backdrop='static' keyboard={false} size='lg'>
      <Modal.Header closeButton>
        <Modal.Title>{t('global.edit', {name: t('Customer.Customers')})}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={formik.handleSubmit}>
          {/* Name and Username Fields */}
          <div className='row'>
            <input type="hidden" {...formik.getFieldProps('id')}  />
            <div className='col-md-6 mb-3'>
              <label className='form-label'>
                {t('Customer.Customer')} <span className='text-danger'>*</span>
              </label>
              <input
                type='text'
                {...formik.getFieldProps('name')}
                className={clsx('form-control', {
                  'is-invalid': formik.touched.name && formik.errors.name,
                  'is-valid': formik.touched.name && !formik.errors.name,
                })}
              />
              {formik.touched.name && formik.errors.name && (
                <div className='invalid-feedback'>
                  {t('validation.required', {name: t('Customer.Customer')})}
                </div>
              )}
            </div>

            <div className='col-md-6 mb-3'>
              <label className='form-label'>
                {t('global.phone')} <span className='text-danger'>*</span>
              </label>
              <input
                type='text'
                {...formik.getFieldProps('phoneNumber')}
                className={clsx('form-control', {
                  'is-invalid': formik.touched.phoneNumber && formik.errors.phoneNumber,
                  'is-valid': formik.touched.phoneNumber && !formik.errors.phoneNumber,
                })}
              />
              {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                <div className='invalid-feedback'>
                  {t('validation.required', {name: t('Customer.phoneNumber')})}
                </div>
              )}
            </div>
          </div>
          <div className='row'>
            <div className='col-md-12 mb-3'>
              <label className='form-label'>
                {t('global.address')} <span className='text-danger'>*</span>
              </label>
              <input
                type='text'
                {...formik.getFieldProps('address')}
                className={clsx('form-control', {
                  'is-invalid': formik.touched.address && formik.errors.address,
                  'is-valid': formik.touched.address && !formik.errors.address,
                })}
              />
              {formik.touched.address && formik.errors.address && (
                <div className='invalid-feedback'>
                  {t('validation.required', {name: t('global.address')})}
                </div>
              )}
            </div>
          </div>

          {/* Buttons */}
          <div className='text-end'>
            <Button variant='danger' onClick={onClose} className='me-2'>
              {t('global.BACK')}
            </Button>
            <Button variant='primary' type='submit' disabled={formik.isSubmitting}>
              {t('global.EDIT')}
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  )
}

export default EditCustomerModal
