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
import { storePartnerTransaction } from '../../../../../redux/slices/partnerTransaction/PartnerTransactionSlice'
import { getPartnersList } from '../../../../../redux/slices/partner/PartnerSlice'

// Define the props for the modal
interface CreatePartnerTransactionModalProps {
  isOpen: boolean
  onClose: () => void
  handleReloadTable: () => void
}

interface Partner {
  id: any,
  fullName: any
}
const CreatePartnerTransactionModal: React.FC<CreatePartnerTransactionModalProps> = ({ isOpen, onClose, handleReloadTable }) => {
  const intl = useIntl()
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState(false)
  const [roles, setRoles] = useState([])
  const [partners, setPartners] = useState<Partner[]>([])
  const [types, setTransactionTypes] = useState([])

  // Form Validation Schema
  const PartnerTransactionSchema = Yup.object().shape({
    partnerId: Yup.string().required(t('validation.required', { partnerId: t('partnerTransaction.partnerTransaction') })),
    amount: Yup.string().required(t('validation.required', { partnerId: t('global.amount') })),
    date: Yup.string().required(t('validation.required', { partnerId: t('global.date') })),
    type: Yup.string().required(t('validation.required', { partnerId: t('partnerTransaction.type') }))
  })

  // Formik Hook
  const formik = useFormik({
    initialValues,
    validationSchema: PartnerTransactionSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const response = await dispatch(storePartnerTransaction(values) as any)
        if (storePartnerTransaction.fulfilled.match(response)) {
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
    console.error('Error creating partnerTransaction:', error.message)
  }

  useEffect(() => {
    const fetchPartners = async () => {
      setLoading(true);
      const res = await dispatch(getPartnersList());
      if (res.meta.requestStatus === 'fulfilled') {
        setPartners(res.payload);
      }
      setLoading(false);
    };
    fetchPartners();
  }, [dispatch]);
  return (
    <Modal show={isOpen} onHide={onClose} backdrop='static' keyboard={false} size='lg'>
      <Modal.Header closeButton>
        <Modal.Title>{t('global.add', { name: t('partnerTransaction.partnerTransactions') })}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={formik.handleSubmit}>
          {/* Name and PartnerTransaction Name Fields */}
          <div className='row'>
            <div className='col-md-12'>
              <div className='row'>
                {/* Name Field */}
                <div className='col-md-6 mb-3'>
                  <label className='form-label'>
                    {t('partnerTransaction.partnerTransaction')} <span className='text-danger'>*</span>
                  </label>
                  <select
                    {...formik.getFieldProps('partnerId')}
                    className={clsx('form-select', {
                      'is-invalid': formik.touched.partnerId && formik.errors.partnerId,
                      'is-valid': formik.touched.partnerId && !formik.errors.partnerId,
                    })}
                  >
                    <option value="">{t('global.select', { name: t('partnerTransaction.partnerTransaction') })}</option>
                    {partners.map((partner) => (
                      <option key={partner.id} value={partner.id}>{partner.fullName}</option>
                    ))}
                  </select>
                  {formik.touched.partnerId && formik.errors.partnerId && (
                    <div className='invalid-feedback'>
                      {t('validation.required', { name: t('partnerTransaction.partnerTransaction') })}
                    </div>
                  )}
                </div>

                <div className='col-md-6 mb-3'>
                  <label className='form-label'>
                    {t('partnerTransaction.type')} <span className='text-danger'>*</span>
                  </label>
                  <select
                    {...formik.getFieldProps('type')}
                    className={clsx('form-select', {
                      'is-invalid': formik.touched.type && Boolean(formik.errors.type),
                      'is-valid': formik.touched.type && !formik.errors.type,
                    })}
                    onBlur={() => formik.setFieldTouched('type', true)}
                  >
                    <option value="">{t('global.select', { name: t('partnerTransaction.type') })}</option>
                    <option value='Deposit' label='Deposit' />
                    <option value='Withdrawal' label='Withdrawal' />
                  </select>
                  {formik.touched.type && formik.errors.type && (
                    <div className='invalid-feedback'>
                      {t('validation.required', { name: t('partnerTransaction.type') })}
                    </div>
                  )}
                </div>

              </div>
              <div className='row'>
                {/* Name Field */}
                <div className='col-md-6 mb-3'>
                  <label className='form-label'>
                    {t('global.amount')} <span className='text-danger'>*</span>
                  </label>
                  <input
                    type='text'
                    {...formik.getFieldProps('amount')}
                    className={clsx('form-control', {
                      'is-invalid': formik.touched.amount && formik.errors.amount,
                      'is-valid': formik.touched.amount && !formik.errors.amount,
                    })}
                  />
                  {formik.touched.amount && formik.errors.amount && (
                    <div className='invalid-feedback'>
                      {t('validation.required', { name: t('global.amount') })}
                    </div>
                  )}
                </div>
                {/* Name Field */}
                <div className='col-md-6 mb-3'>
                  <label className='form-label'>
                    {t('global.date')} <span className='text-danger'>*</span>
                  </label>
                  <input
                    type='date'
                    {...formik.getFieldProps('date')}
                    className={clsx('form-control', {
                      'is-invalid': formik.touched.date && formik.errors.date,
                      'is-valid': formik.touched.date && !formik.errors.date,
                    })}
                  />
                  {formik.touched.date && formik.errors.date && (
                    <div className='invalid-feedback'>
                      {t('validation.required', { name: t('global.date') })}
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
            // classpartnerId='me-2 '
            >
              {t('global.SAVE')}
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  )
}

export default CreatePartnerTransactionModal
