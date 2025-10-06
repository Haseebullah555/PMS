import { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { initialValues } from './_module'
import { useTranslation } from 'react-i18next'
import clsx from 'clsx'
import { useAppDispatch } from '../../../../../redux/hooks'
import { Button, Modal } from 'react-bootstrap'
import { useIntl } from 'react-intl'

import { toast } from 'react-toastify'
import { storeUser } from 'redux/authentication/user/userManagementSlice'
import { storeCustomer } from 'redux/customer/CustomerSlice'

// Define the props for the modal
interface CreateCustomerModalProps {
  isOpen: boolean
  onClose: () => void
  handleReloadTable: () => void
}

const CreateCustomerModal: React.FC<CreateCustomerModalProps> = ({ isOpen, onClose, handleReloadTable }) => {
  const intl = useIntl()
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const [roles, setRoles] = useState([])

  // Form Validation Schema
  const CustomerSchema = Yup.object().shape({
    name: Yup.string().required(t('validation.required', { name: t('Customer.Customer') })),
    address: Yup.string().required(t('validation.required', { name: t('global.address') })),
    phoneNumber: Yup.string()
      .required(t('validation.required', { name: t('global.phone') })) 
      .matches(/^[0-9+]+$/, t('validation.matches', { name: t('global.phone') }))                       
      .matches(/^(?:\+93|0)?7\d{8}$/, t('validation.invalidPhone', { name: t('global.phone') }))                
  })

  // Formik Hook
  const formik = useFormik({
    initialValues,
    validationSchema: CustomerSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const response = await dispatch(storeCustomer(values) as any)
        if (storeCustomer.fulfilled.match(response)) {
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
    const { meta, payload } = response
    if (meta.requestStatus === 'fulfilled') {
      toast.success(<p className='fs-4 fw-bold'>{payload.message}</p>)
    } else {
      toast.error(<p className='fs-4 fw-bold'>{t('validation.required')}</p>)
    }
  }

  const handleRejectedResponse = (response: any) => {
    const { payload } = response
    toast.error(<p className='fs-4 fw-bold'>{payload}</p>)
  }

  const handleError = (error: any) => {
    console.error('Error creating Customer:', error.message)
  }
  return (
    <Modal show={isOpen} onHide={onClose} backdrop='static' keyboard={false} size='lg'>
      <Modal.Header closeButton>
        <Modal.Title>{t('global.add', { name: t('Customer.Customers') })}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={formik.handleSubmit}>
          {/* Name and Customer Name Fields */}
          <div className='row'>
            <div className='col-md-12'>
              <div className='row'>
                {/* Name Field */}
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
                      {t('validation.required', { name: t('Customer.Customer') })}
                    </div>
                  )}
                </div>

                {/* Customer phoneNumber Field */}
                {/* Customer phoneNumber Field */}
                <div className='col-md-6 mb-3'>
                  <label className='form-label'>
                    {t('global.phone')} <span className='text-danger'>*</span>
                  </label>
                  <input
                    type='text'
                    {...formik.getFieldProps('phoneNumber')}
                    className={clsx('form-control', {
                      'is-invalid': formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber),
                      'is-valid': formik.touched.phoneNumber && !formik.errors.phoneNumber,
                    })}
                  />
                  {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                    <div className='invalid-feedback'>
                      {formik.errors.phoneNumber}
                    </div>
                  )}
                </div>

              </div>
              <div className='row'>
                {/* Name Field */}
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
                      {t('validation.required', { name: t('global.address') })}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className='text-end'>
            <Button variant='danger' onClick={onClose} className='me-2 '>
              {t('global.BACK')}
            </Button>
            <Button
              variant='primary'
              type='submit'
              disabled={formik.isSubmitting}
            // classname='me-2 '
            >
              {t('global.SAVE')}
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  )
}

export default CreateCustomerModal
