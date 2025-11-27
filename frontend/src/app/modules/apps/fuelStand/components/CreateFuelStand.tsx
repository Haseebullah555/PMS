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
import { storeFuelStand } from '../../../../../redux/slices/fuelStand/FuelStandSlice'

// Define the props for the modal
interface CreateFuelStandModalProps {
  isOpen: boolean
  onClose: () => void
  handleReloadTable: () => void
}

const CreateFuelStandModal: React.FC<CreateFuelStandModalProps> = ({ isOpen, onClose, handleReloadTable }) => {
  const intl = useIntl()
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const [roles, setRoles] = useState([])

  // Form Validation Schema
  const FuelStandSchema = Yup.object().shape({
    expenseType: Yup.string().required(t('validation.required', { name: t('fuelStand.expenseType') })),
    expenseDate: Yup.date().required(t('validation.required', { name: t('global.date') })),
    amount: Yup.number()
      .required(t('validation.required', { name: t('fuelStand.amount') }))
  })

  // Formik Hook
  const formik = useFormik({
    initialValues,
    validationSchema: FuelStandSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const response = await dispatch(storeFuelStand(values) as any)
        if (storeFuelStand.fulfilled.match(response)) {
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
    console.error('Error creating fuelStand:', error.message)
  }
  return (
    <Modal show={isOpen} onHide={onClose} backdrop='static' keyboard={false} size='lg'>
      <Modal.Header closeButton>
        <Modal.Title>{t('global.add', { name: t('fuelStand.fuelStands') })}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={formik.handleSubmit}>
          {/* Name and FuelStand Name Fields */}
          <div className='row'>
            <div className='col-md-12'>
              <div className='row'>
                {/* Name Field */}
                <div className='col-md-6 mb-3'>
                  <label className='form-label'>
                    {t('fuelStand.expenseType')} <span className='text-danger'>*</span>
                  </label>
                  <input
                    type='text'
                    {...formik.getFieldProps('expenseType')}
                    className={clsx('form-control', {
                      'is-invalid': formik.touched.expenseType && formik.errors.expenseType,
                      'is-valid': formik.touched.expenseType && !formik.errors.expenseType,
                    })}
                  />
                  {formik.touched.expenseType && formik.errors.expenseType && (
                    <div className='invalid-feedback'>
                      {t('validation.required', { name: t('fuelStand.expenseType') })}
                    </div>
                  )}
                </div>

                {/* FuelStand amount Field */}
                {/* FuelStand amount Field */}
                <div className='col-md-6 mb-3'>
                  <label className='form-label'>
                    {t('fuelStand.amount')} <span className='text-danger'>*</span>
                  </label>
                  <input
                    type='text'
                    {...formik.getFieldProps('amount')}
                    className={clsx('form-control', {
                      'is-invalid': formik.touched.amount && Boolean(formik.errors.amount),
                      'is-valid': formik.touched.amount && !formik.errors.amount,
                    })}
                  />
                  {formik.touched.amount && formik.errors.amount && (
                    <div className='invalid-feedback'>
                      {t('validation.required', { name: t('fuelStand.amount') })}
                    </div>
                  )}
                </div>

              </div>
              <div className='row'>
                {/* Name Field */}
                <div className='col-md-6 mb-3'>
                  <label className='form-label'>
                    {t('global.date')} <span className='text-danger'>*</span>
                  </label>
                  <input
                    type='date'
                    {...formik.getFieldProps('expenseDate')}
                    className={clsx('form-control', {
                      'is-invalid': formik.touched.expenseDate && formik.errors.expenseDate,
                      'is-valid': formik.touched.expenseDate && !formik.errors.expenseDate,
                    })}
                  />
                  {formik.touched.expenseDate && formik.errors.expenseDate && (
                    <div className='invalid-feedback'>
                      {t('validation.required', { name: t('global.date') })}
                    </div>
                  )}
                </div>
                <div className='col-md-6 mb-3'>
                  <label className='form-label'>
                    {t('global.remarks')}
                  </label>
                  <input
                    type='text'
                    {...formik.getFieldProps('notes')}
                    className={clsx('form-control', {
                      'is-invalid': formik.touched.notes && formik.errors.notes,
                      'is-valid': formik.touched.notes && !formik.errors.notes,
                    })}
                  />
                  {formik.touched.notes && formik.errors.notes && (
                    <div className='invalid-feedback'>
                      {t('validation.required', { name: t('global.remarks') })}
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

export default CreateFuelStandModal
