import { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { initialValues } from './_module'
import { useTranslation } from 'react-i18next'
import clsx from 'clsx'
import { useAppDispatch, useAppSelector } from '../../../../../redux/hooks'
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
  const staffs = useAppSelector((state) => state.staffs.staffs)
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
                    {t('fuelStand.name')} <span className='text-danger'>*</span>
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
                      {t('validation.required', { name: t('fuelStand.name') })}
                    </div>
                  )}
                </div>

              </div>
              <div className='row'>
                {/* Name Field */}

                <div className='col-md-6 mb-3'>
                  <label className='form-label'>
                    {t('staff.staff')}
                  </label>
                  <select
                    name="staffId"
                    value={formik.values.staffId}
                    onChange={(e) => {
                      formik.setFieldValue(`supplierId`, Number(e.target.value))
                    }}
                    className="form-select"
                  >
                    <option value="">Select Supplier</option>
                    {staffs?.data?.map((s: any) => (
                      <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                  </select>
                  {formik.touched.staffId && formik.errors.staffId && (
                    <div className='invalid-feedback'>
                      {t('validation.required', { name: t('staff.staff') })}
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
