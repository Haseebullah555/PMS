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
import { storeStaffSalary } from 'redux/staffSalary/StaffSalarySlice'
import { Console } from 'console'
import { getStaffsList } from 'redux/staff/StaffSlice'

// Define the props for the modal
interface CreateStaffSalaryModalProps {
  isOpen: boolean
  onClose: () => void
  handleReloadTable: () => void
}
interface Staff{
  id: any,
  fullName: any
}
const CreateStaffSalaryModal: React.FC<CreateStaffSalaryModalProps> = ({ isOpen, onClose, handleReloadTable }) => {
  const intl = useIntl()
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const [roles, setRoles] = useState([])
  const [staffs, setStaffs] = useState<Staff[]>([])
  const [loading, setLoading] = useState(false)

  // Form Validation Schema
  const StaffSalarySchema = Yup.object().shape({
    staffId: Yup.string().required(t('validation.required', { name: t('staff.staff') })),
    amount: Yup.string().required(t('validation.required', { name: t('staffSalary.amount') })),
    date: Yup.string().required(t('validation.required', { name: t('global.date') }))        
  })

  // Formik Hook
  const formik = useFormik({
    initialValues,
    validationSchema: StaffSalarySchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      console.log("Submitting values:", values);
      try {
        const response = await dispatch(storeStaffSalary(values) as any)
        if (storeStaffSalary.fulfilled.match(response)) {
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
    console.error('Error creating staffSalary:', error.message)
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
        <Modal.Title>{t('global.add', { name: t('staffSalary.staffSalary') })}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={formik.handleSubmit}>
          {/* Name and StaffSalary Name Fields */}
          <div className='row'>
            <div className='col-md-12'>
              <div className='row'>
                {/* Name Field */}
                <div className='col-md-6 mb-3'>
                  <label className='form-label'>
                    {t('staffSalary.staffSalary')} <span className='text-danger'>*</span>
                  </label>
                  <select
                    {...formik.getFieldProps('staffId')}
                    className={clsx('form-control', {
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

                {/* StaffSalary amountNumber Field */}
                {/* StaffSalary amountNumber Field */}
                <div className='col-md-6 mb-3'>
                  <label className='form-label'>
                    {t('global.amount')} <span className='text-danger'>*</span>
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
                      {t('validation.required', { name: t('global.amount') })}
                    </div>
                  )}
                </div>

              </div>
              <div className='row'>
                {/* Name Field */}
                <div className='col-md-12 mb-3'>
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

export default CreateStaffSalaryModal
