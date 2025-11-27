import {useEffect, useState} from 'react'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import clsx from 'clsx'
import {useTranslation} from 'react-i18next'
import {useAppDispatch} from '../../../../../redux/hooks'
import {Button, Modal} from 'react-bootstrap'
import {useIntl} from 'react-intl'
import {toast} from 'react-toastify'
import { updateStaffPayment } from '../../../../../redux/slices/staffPayment/StaffPaymentSlice'
import { getStaffsList } from '../../../../../redux/slices/staff/StaffSlice'

interface EditStaffPaymentModalProps {
  isOpen: boolean
  onClose: () => void
  selectedStaffPayment: any // Type it as appropriate based on your data structure
  handleReloadTable: () => void
}
interface Staff{
  id: any,
  fullName: any
}
const EditStaffPaymentModal: React.FC<EditStaffPaymentModalProps> = ({
  isOpen,
  onClose,
  selectedStaffPayment,
  handleReloadTable,
}) => {
  const intl = useIntl()
  const {t} = useTranslation()
  const dispatch = useAppDispatch()
  const [roles, setRoles] = useState([])
  const [loading, setLoading] = useState(false)
  const [staffs, setStaffs] = useState<Staff[]>([])

  // Populate form with user data when `selectedStaffPayment` changes
  useEffect(() => {
    if (selectedStaffPayment) {
      formik.setFieldValue('id', selectedStaffPayment.id || '')
      formik.setFieldValue('staffId', selectedStaffPayment.staffId || '')
      formik.setFieldValue('amount', selectedStaffPayment.amount || '')
      formik.setFieldValue('date', selectedStaffPayment.date || '')
    }
  }, [selectedStaffPayment])

  // Validation schema
  const userSchema = Yup.object().shape({
    staffId: Yup.string().required(t('validation.required', { name: t('staffPayment.staffPayment') })),
        date: Yup.string().required(t('validation.required', { name: t('staffPayment.date') })),
        amount: Yup.string()
          .required(t('validation.required', { name: t('global.amount') }))
  })

  // Formik setup
  const formik = useFormik({
    initialValues: {
      id: '',
      staffId: '',
      paidAmount: '',
      unpaidAmount: '',
      paymentDate: '',
      remarks: '',
    },
    validationSchema: userSchema,
    onSubmit: async (values, {setSubmitting, resetForm}) => {
      try {
        const response = await dispatch(updateStaffPayment(values) as any)
        if (updateStaffPayment.fulfilled.match(response)) {
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
 useEffect(() => {
  const fetchStaffs = async () => {
    setLoading(true); // Set loading to true before fetching
    const res = await dispatch(getStaffsList());
    if (res.meta.requestStatus === 'fulfilled') {
      setStaffs(res.payload);
    }
    setLoading(false); // Set loading to false after handling response
  };

  fetchStaffs();
}, [dispatch]);
  return (
    <Modal show={isOpen} onHide={onClose} backdrop='static' keyboard={false} size='lg'>
      <Modal.Header closeButton>
        <Modal.Title>{t('global.edit', {name: t('staffPayment.staffPayments')})}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={formik.handleSubmit}>
          {/* Name and Username Fields */}
            <input type="hidden" {...formik.getFieldProps('id')}  />
         <div className='row'>
            <div className='col-md-12'>
              <div className='row'>
                {/* Name Field */}
                <div className='col-md-6 mb-3'>
                  <label className='form-label'>
                    {t('staffPayment.staffPayment')} <span className='text-danger'>*</span>
                  </label>
                  <select
                    {...formik.getFieldProps('staffId')}
                    className={clsx('form-select', {
                      'is-invalid': formik.touched.staffId && formik.errors.staffId,
                      'is-valid': formik.touched.staffId && !formik.errors.staffId,
                    })}
                  >
                    <option value=''>{t('global.select', {name: t('staff.staff')})}</option>
                    {staffs.map((staff) => (
                      <option key={staff.id} value={staff.id}>
                        {staff.fullName}
                      </option>
                    ))}
                  </select>
                  {formik.touched.staffId && formik.errors.staffId && (
                    <div className='invalid-feedback'>
                      {t('validation.required', { name: t('staff.staff') })}
                    </div>
                  )}
                </div>
                <div className='col-md-6 mb-3'>
                  <label className='form-label'>
                    {t('global.paymentDate')} <span className='text-danger'>*</span>
                  </label>
                  <input
                    type='paymentDate'
                    {...formik.getFieldProps('paymentDate')}
                    className={clsx('form-control', {
                      'is-invalid': formik.touched.paymentDate && formik.errors.paymentDate,
                      'is-valid': formik.touched.paymentDate && !formik.errors.paymentDate,
                    })}
                  />
                  {formik.touched.paymentDate && formik.errors.paymentDate && (
                    <div className='invalid-feedback'>
                      {t('validation.required', { name: t('global.paymentDate') })}
                    </div>
                  )}
                </div>
              </div>
              <div className='row'>
                <div className='col-md-6 mb-3'>
                  <label className='form-label'>
                    {t('global.paidAmount')} <span className='text-danger'>*</span>
                  </label>
                  <input
                    type='text'
                    {...formik.getFieldProps('paidAmount')}
                    className={clsx('form-control', {
                      'is-invalid': formik.touched.paidAmount && Boolean(formik.errors.paidAmount),
                      'is-valid': formik.touched.paidAmount && !formik.errors.paidAmount,
                    })}
                  />
                  {formik.touched.paidAmount && formik.errors.paidAmount && (
                    <div className='invalid-feedback'>
                      {t('validation.required', { name: t('global.paidAmount') })}
                    </div>
                  )}
                </div>
                <div className='col-md-6 mb-3'>
                  <label className='form-label'>
                    {t('global.unpaidAmount')} <span className='text-danger'>*</span>
                  </label>
                  <input
                    type='text'
                    {...formik.getFieldProps('unpaidAmount')}
                    className={clsx('form-control', {
                      'is-invalid': formik.touched.unpaidAmount && Boolean(formik.errors.unpaidAmount),
                      'is-valid': formik.touched.unpaidAmount && !formik.errors.unpaidAmount,
                    })}
                  />
                  {formik.touched.unpaidAmount && formik.errors.unpaidAmount && (
                    <div className='invalid-feedback'>
                      {t('validation.required', { name: t('global.unpaidAmount') })}
                    </div>
                  )}
                </div>
              </div>
              <div className='row'>
                {/* Name Field */}
                <div className='col-md-12 mb-3'>
                  <label className='form-label'>
                    {t('global.remarks')} <span className='text-danger'>*</span>
                  </label>
                  <textarea
                    {...formik.getFieldProps('remarks')}
                    className={clsx('form-control', {
                      'is-invalid': formik.touched.remarks && formik.errors.remarks,
                      'is-valid': formik.touched.remarks && !formik.errors.remarks,
                    })}
                  >
                    </textarea>
                  {formik.touched.remarks && formik.errors.remarks && (
                    <div className='invalid-feedback'>
                      {t('validation.required', { name: t('global.remarks') })}
                    </div>
                  )}
                </div>
              </div>
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

export default EditStaffPaymentModal
