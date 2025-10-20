import {useEffect, useState} from 'react'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import clsx from 'clsx'
import {useTranslation} from 'react-i18next'
import {useAppDispatch} from '../../../../../redux/hooks'
import {Button, Modal} from 'react-bootstrap'
import {useIntl} from 'react-intl'
import {toast} from 'react-toastify'
import {updateStaffSalary} from 'redux/staffSalary/StaffSalarySlice'
import { getStaffsList } from 'redux/staff/StaffSlice'

interface EditStaffSalaryModalProps {
  isOpen: boolean
  onClose: () => void
  selectedStaffSalary: any // Type it as appropriate based on your data structure
  handleReloadTable: () => void
}
interface Staff{
  id: any,
  fullName: any
}
const EditStaffSalaryModal: React.FC<EditStaffSalaryModalProps> = ({
  isOpen,
  onClose,
  selectedStaffSalary,
  handleReloadTable,
}) => {
  const intl = useIntl()
  const {t} = useTranslation()
  const dispatch = useAppDispatch()
  const [roles, setRoles] = useState([])
  const [loading, setLoading] = useState(false)
  const [staffs, setStaffs] = useState<Staff[]>([])

  // Populate form with user data when `selectedStaffSalary` changes
  useEffect(() => {
    if (selectedStaffSalary) {
      formik.setFieldValue('id', selectedStaffSalary.id || '')
      formik.setFieldValue('staffId', selectedStaffSalary.staffId || '')
      formik.setFieldValue('amount', selectedStaffSalary.amount || '')
      formik.setFieldValue('date', selectedStaffSalary.date || '')
    }
  }, [selectedStaffSalary])

  // Validation schema
  const userSchema = Yup.object().shape({
    staffId: Yup.string().required(t('validation.required', { name: t('staffSalary.staffSalary') })),
        date: Yup.string().required(t('validation.required', { name: t('staffSalary.date') })),
        amount: Yup.string()
          .required(t('validation.required', { name: t('global.amount') }))
  })

  // Formik setup
  const formik = useFormik({
    initialValues: {
      id: '',
      staffId: '',
      amount: '',
      date: '',
    },
    validationSchema: userSchema,
    onSubmit: async (values, {setSubmitting, resetForm}) => {
      try {
        const response = await dispatch(updateStaffSalary(values) as any)
        if (updateStaffSalary.fulfilled.match(response)) {
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
        <Modal.Title>{t('global.edit', {name: t('staffSalary.staffSalarys')})}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={formik.handleSubmit}>
          {/* Name and Username Fields */}
          <div className='row'>
            <input type="hidden" {...formik.getFieldProps('id')}  />
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
                  {t('validation.required', {name: t('staffSalary.staffSalary')})}
                </div>
              )}
            </div>

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
                  {t('validation.required', {name: t('staffSalary.salaryAmount')})}
                </div>
              )}
            </div>
          </div>
          <div className='row'>
            <div className='col-md-12 mb-3'>
              <label className='form-label'>
                {t('global.date')} <span className='text-danger'>*</span>
              </label>
              <input
                type='text'
                {...formik.getFieldProps('date')}
                className={clsx('form-control', {
                  'is-invalid': formik.touched.date && formik.errors.date,
                  'is-valid': formik.touched.date && !formik.errors.date,
                })}
              />
              {formik.touched.date && formik.errors.date && (
                <div className='invalid-feedback'>
                  {t('validation.required', {name: t('global.date')})}
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

export default EditStaffSalaryModal
