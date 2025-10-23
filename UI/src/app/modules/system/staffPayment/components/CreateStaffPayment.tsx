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
import { storeStaffPayment } from 'redux/staffPayment/StaffPaymentSlice'
import { getStaffsList } from 'redux/staff/StaffSlice'

// Define the props for the modal
interface CreateStaffPaymentModalProps {
  isOpen: boolean
  onClose: () => void
  handleReloadTable: () => void
}
interface Staff {
  id: any,
  fullName: any
  salary: any,
}
const CreateStaffPaymentModal: React.FC<CreateStaffPaymentModalProps> = ({ isOpen, onClose, handleReloadTable }) => {
  const intl = useIntl()
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const [roles, setRoles] = useState([])
  const [staffs, setStaffs] = useState<Staff[]>([])
  const [loading, setLoading] = useState(false)
  const [unpaid1, setUnpaid1] = useState()
  // Form Validation Schema
  const StaffPaymentSchema = Yup.object().shape({
    staffId: Yup.string().required(t('validation.required', { name: t('staff.staff') })),
    paymentDate: Yup.string().required(t('validation.required', { name: t('global.date') })),
    paidAmount: Yup.string().required(t('validation.required', { name: t('staffPayment.paidAmount') })),
    unpaidAmount: Yup.string().required(t('validation.required', { name: t('staffPayment.unpaidAmount') })),
  })

  // Formik Hook
  const formik = useFormik({
    initialValues,
    validationSchema: StaffPaymentSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      console.log("Submitting values:", values);
      try {
        const response = await dispatch(storeStaffPayment(values) as any)
        if (storeStaffPayment.fulfilled.match(response)) {
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
    console.error('Error creating staffPayment:', error.message)
  }

  const staffChange = (id: number) => {
    // Find the staff member by ID
    const selectedStaff = staffs.find(staff => staff.id === id);

    if (selectedStaff) {
      formik.setFieldValue('unpaidAmount', selectedStaff.salary)
    }
  };

  // Assuming you have access to the initial unpaid amount

  const handlePaidOnChange = (value: string) => {
    console.log('Value changed:', value);

    // Get the current unpaidAmount dynamically
    const currentUnpaidAmount = formik.values.unpaidAmount;

    console.log(currentUnpaidAmount, 'currentUnpaidAmount');

    // Parse the value to a number
    const paidAmount = parseFloat(value) || 0; // Default to 0 if NaN

    if (value === '') {
      console.log('Input cleared');
      // If input is cleared, reset unpaidAmount to the original value
      formik.setFieldValue('unpaidAmount', currentUnpaidAmount);
    } else {
      // Calculate the new unpaidAmount
      formik.setFieldValue('paidAmount', currentUnpaidAmount);
      const result = currentUnpaidAmount + (paidAmount);

      // Update the paidAmount and unpaidAmount in Formik
      formik.setFieldValue('paidAmount', value);
      formik.setFieldValue('unpaidAmount', result);
    }
  };

  // Usage in the input field
  <input
    type='text'
    {...formik.getFieldProps('paidAmount')}
    onChange={(e) => {
      handlePaidOnChange(e.target.value); // Pass the value directly
    }}
    className={clsx('form-control', {
      'is-invalid': formik.touched.paidAmount && Boolean(formik.errors.paidAmount),
      'is-valid': formik.touched.paidAmount && !formik.errors.paidAmount,
    })}
  />
  useEffect(() => {
    const fetchStaffs = async () => {
      setLoading(true); // Set loading to true before fetching
      const res = await dispatch(getStaffsList());
      console.log(res);
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
        <Modal.Title>{t('global.add', { name: t('staffPayment.staffPayment') })}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={formik.handleSubmit}>
          {/* Name and StaffPayment Name Fields */}
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
                    onChange={(e) => {
                      const selectedId = Number(e.target.value);
                      staffChange(selectedId); // Call staffChange with the selected value
                    }}
                    className={clsx('form-select', {
                      'is-invalid': formik.touched.staffId && formik.errors.staffId,
                      'is-valid': formik.touched.staffId && !formik.errors.staffId,
                    })}
                  >
                    <option value=''>{t('global.select', { name: t('staff.staff') })}</option>
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
                    {t('global.date')} <span className='text-danger'>*</span>
                  </label>
                  <input
                    type='date'
                    {...formik.getFieldProps('paymentDate')}
                    className={clsx('form-control', {
                      'is-invalid': formik.touched.paymentDate && formik.errors.paymentDate,
                      'is-valid': formik.touched.paymentDate && !formik.errors.paymentDate,
                    })}
                  />
                  {formik.touched.paymentDate && formik.errors.paymentDate && (
                    <div className='invalid-feedback'>
                      {t('validation.required', { name: t('global.date') })}
                    </div>
                  )}
                </div>
              </div>
              <div className='row'>
                <div className='col-md-6 mb-3'>
                  <label className='form-label'>
                    {t('staffPayment.paidAmount')} <span className='text-danger'>*</span>
                  </label>
                  <input
                    type='text'

                    {...formik.getFieldProps('paidAmount')}
                    onChange={(e) => {
                      handlePaidOnChange(e.target.value); // Pass the value directly
                    }}
                    className={clsx('form-control', {
                      'is-invalid': formik.touched.paidAmount && Boolean(formik.errors.paidAmount),
                      'is-valid': formik.touched.paidAmount && !formik.errors.paidAmount,
                    })}
                  />
                  {formik.touched.paidAmount && formik.errors.paidAmount && (
                    <div className='invalid-feedback'>
                      {t('validation.required', { name: t('staffPayment.paidAmount') })}
                    </div>
                  )}
                </div>
                <div className='col-md-6 mb-3'>
                  <label className='form-label'>
                    {t('staffPayment.unpaidAmount')} <span className='text-danger'>*</span>
                  </label>
                  <input
                    type='text'
                    readOnly
                    {...formik.getFieldProps('unpaidAmount')}
                    className={clsx('form-control', {
                      'is-invalid': formik.touched.unpaidAmount && Boolean(formik.errors.unpaidAmount),
                      'is-valid': formik.touched.unpaidAmount && !formik.errors.unpaidAmount,
                    })}
                  />
                  {formik.touched.unpaidAmount && formik.errors.unpaidAmount && (
                    <div className='invalid-feedback'>
                      {t('validation.required', { name: t('staffPayment.unpaidAmount') })}
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

export default CreateStaffPaymentModal
