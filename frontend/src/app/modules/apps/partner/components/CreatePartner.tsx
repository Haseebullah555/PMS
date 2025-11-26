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
import { storePartner } from '../../../../../redux/slices/partner/PartnerSlice'

// Define the props for the modal
interface CreatePartnerModalProps {
  isOpen: boolean
  onClose: () => void
  handleReloadTable: () => void
}

const CreatePartnerModal: React.FC<CreatePartnerModalProps> = ({ isOpen, onClose, handleReloadTable }) => {
  const intl = useIntl()
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const [roles, setRoles] = useState([])

  // Form Validation Schema
  const PartnerSchema = Yup.object().shape({
    fullName: Yup.string().required(t('validation.required', { fullName: t('partner.partner') })),
    ownershipPercentage: Yup.string().required(t('validation.required', { fullName: t('partner.ownershipPercentage') })),
    initialInvestment: Yup.string()
      .required(t('validation.required', { fullName: t('partner.initialInvestment') }))
  })

  // Formik Hook
  const formik = useFormik({
    initialValues,
    validationSchema: PartnerSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const response = await dispatch(storePartner(values) as any)
        if (storePartner.fulfilled.match(response)) {
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
    console.error('Error creating partner:', error.message)
  }
  return (
    <Modal show={isOpen} onHide={onClose} backdrop='static' keyboard={false} size='lg'>
      <Modal.Header closeButton>
        <Modal.Title>{t('global.add', { name: t('partner.partners') })}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={formik.handleSubmit}>
          {/* Name and Partner Name Fields */}
          <div className='row'>
            <div className='col-md-12'>
              <div className='row'>
                {/* Name Field */}
                <div className='col-md-6 mb-3'>
                  <label className='form-label'>
                    {t('partner.partner')} <span className='text-danger'>*</span>
                  </label>
                  <input
                    type='text'
                    {...formik.getFieldProps('fullName')}
                    className={clsx('form-control', {
                      'is-invalid': formik.touched.fullName && formik.errors.fullName,
                      'is-valid': formik.touched.fullName && !formik.errors.fullName,
                    })}
                  />
                  {formik.touched.fullName && formik.errors.fullName && (
                    <div className='invalid-feedback'>
                      {t('validation.required', { name: t('partner.partner') })}
                    </div>
                  )}
                </div>

                {/* Partner initialInvestment Field */}
                {/* Partner initialInvestment Field */}
                <div className='col-md-6 mb-3'>
                  <label className='form-label'>
                    {t('partner.initialInvestment')} <span className='text-danger'>*</span>
                  </label>
                  <input
                    type='text'
                    {...formik.getFieldProps('initialInvestment')}
                    className={clsx('form-control', {
                      'is-invalid': formik.touched.initialInvestment && Boolean(formik.errors.initialInvestment),
                      'is-valid': formik.touched.initialInvestment && !formik.errors.initialInvestment,
                    })}
                  />
                  {formik.touched.initialInvestment && formik.errors.initialInvestment && (
                    <div className='invalid-feedback'>
                      {t('validation.required', { name: t('partner.initialInvestment') })}
                    </div>
                  )}
                </div>

              </div>
              <div className='row'>
                {/* Name Field */}
                <div className='col-md-12 mb-3'>
                  <label className='form-label'>
                    {t('partner.ownershipPercentage')} <span className='text-danger'>*</span>
                  </label>
                  <input
                    type='text'
                    {...formik.getFieldProps('ownershipPercentage')}
                    className={clsx('form-control', {
                      'is-invalid': formik.touched.ownershipPercentage && formik.errors.ownershipPercentage,
                      'is-valid': formik.touched.ownershipPercentage && !formik.errors.ownershipPercentage,
                    })}
                  />
                  {formik.touched.ownershipPercentage && formik.errors.ownershipPercentage && (
                    <div className='invalid-feedback'>
                      {t('validation.required', { name: t('partner.ownershipPercentage') })}
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
            // classfullName='me-2 '
            >
              {t('global.SAVE')}
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  )
}

export default CreatePartnerModal
