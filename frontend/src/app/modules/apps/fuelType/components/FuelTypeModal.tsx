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
import { storeFuelType, updateFuelType } from '../../../../../redux/slices/fuelType/FuelTypeSlice'

// Define the props for the modal
interface FuelTypeModalProps {
  isOpen: boolean
  onClose: () => void
  handleReloadTable: () => void
  selectedFuelType: any
  mode: any
}

const fuelData = [
  { id: 0, name: 'لیتر' },
  { id: 1, name: 'تن' },
]
const FuelTypeModal: React.FC<FuelTypeModalProps> = ({ isOpen, onClose, handleReloadTable, selectedFuelType, mode }) => {
  const initialValues = {
    id: mode === "update" ? selectedFuelType?.id : null,
    name: mode === "update" ? selectedFuelType?.name ?? "" : "",
    fuelUnit: mode === "update" ? selectedFuelType?.fuelUnit ?? "" : "",
  };
  const intl = useIntl()
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState(false);

  // Form Validation Schema
  const FuelTypeSchema = Yup.object().shape({
    name: Yup.string().required(t('validation.required', { name: t('fuelType.name') })),
    fuelUnit: Yup.number()
      .required(t('validation.required', { name: t('fuelType.unit') }))
  })

  // Formik Hook
  const formik = useFormik({
    initialValues : initialValues,
    validationSchema: FuelTypeSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const payload = {
          id: formik.values.id,
          name: formik.values.name,
          fuelUnit: Number(formik.values.fuelUnit) // convert to number
        };
        if (mode == "send") {
          const response = await dispatch(storeFuelType(payload) as any)
          if (storeFuelType.fulfilled.match(response)) {
            handleFulfilledResponse(response)
            handleReloadTable()
            onClose()
            resetForm()
          } else {
            handleRejectedResponse(response)
          }
        } else {
          const response = await dispatch(updateFuelType(payload) as any)
          debugger
          if (updateFuelType.fulfilled.match(response)) {
            handleFulfilledResponse(response)
            handleReloadTable()
            onClose()
            resetForm()
          } else {
            handleRejectedResponse(response)
          }
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
    console.error('Error creating fuelType:', error.message)
  }
  return (
    <Modal
      show={isOpen}
      onHide={onClose}
      backdrop="static"
      keyboard={false}
      dialogClassName="modal-md-custom"
    >

      <Modal.Header closeButton>
        <Modal.Title>{t('global.add', { name: t('fuelType.fuelTypes') })}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={formik.handleSubmit}>
          {/* Name and FuelType Name Fields */}
          <div className='row'>
            <div className='col-md-12'>
              <div className='row'>
                {/* Name Field */}
                <div className='col-md-12 mb-3'>
                  <label className='form-label'>
                    {t('fuelType.name')} <span className='text-danger'>*</span>
                  </label>
                  <input
                    type='text'
                    placeholder={t('global.WRITE.HERE')}
                    {...formik.getFieldProps('name')}
                    className={clsx('form-control', {
                      'is-invalid': formik.touched.name && formik.errors.name,
                      'is-valid': formik.touched.name && !formik.errors.name,
                    })}
                  />
                  {formik.touched.name && formik.errors.name && (
                    <div className='invalid-feedback'>
                      {t('validation.required', { name: t('fuelType.name') })}
                    </div>
                  )}
                </div>
                {/* FuelType amount Field */}
                <div className='col-md-12 mb-3'>
                  <label className="form-label">{t('fuelType.unit')}</label>
                  <span className='text-danger'>*</span>
                  <select
                    name="fuelUnit"
                    value={formik.values.fuelUnit}
                    onChange={(e) => formik.setFieldValue('fuelUnit', e.target.value)}
                    className={clsx('form-select', {
                      'is-invalid': formik.touched.fuelUnit && formik.errors.fuelUnit,
                    })}
                  >
                    <option value="" disabled selected>
                      {t('global.SELECT.OPTION')}
                    </option>
                    {fuelData?.map((s: any) => (
                      <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                  </select>

                  {formik.touched.fuelUnit && formik.errors.fuelUnit && (
                    <div className="invalid-feedback">
                      {t('validation.required', { name: t('fuelType.unit') })}
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
            <Button type="submit" disabled={loading}>
              {loading ? "..." : mode === "send" ? (
                t('global.SAVE')
              ) : (
                t('global.Update')
              )}
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  )
}

export default FuelTypeModal
