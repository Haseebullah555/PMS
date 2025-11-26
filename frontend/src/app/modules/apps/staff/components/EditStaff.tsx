import { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import clsx from 'clsx'
import { useTranslation } from 'react-i18next'
import { useAppDispatch } from '../../../../../redux/hooks'
import { Button, Modal } from 'react-bootstrap'
import { useIntl } from 'react-intl'
import { toast } from 'react-toastify'
import { updateStaff } from '../../../../../redux/slices/staff/StaffSlice'

interface EditStaffModalProps {
  isOpen: boolean
  onClose: () => void
  selectedStaff: any // Type it as appropriate based on your data structure
  handleReloadTable: () => void
}

const EditStaffModal: React.FC<EditStaffModalProps> = ({
  isOpen,
  onClose,
  selectedStaff,
  handleReloadTable,
}) => {
  const intl = useIntl()
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const [roles, setRoles] = useState([])

  // Validation schema
  const StaffSchema = Yup.object().shape({
    fullName: Yup.string().required(t('validation.required', { name: t('staff.staff') })),
    position: Yup.string().required(t('validation.required', { name: t('staff.position') })),
    salary: Yup.string().required(t('validation.required', { name: t('staff.salary') })),
    hireDate: Yup.string().required(t('validation.required', { name: t('staff.hireDate') })),
    phone: Yup.string()
      .required(t('validation.required', { name: t('global.phone') }))
      .matches(/^[0-9+]+$/, t('validation.matches', { name: t('global.phone') }))
      .matches(/^(?:\+93|0)?7\d{8}$/, t('validation.invalidPhone', { name: t('global.phone') }))
  })
  // Formik setup
  const formik = useFormik({
    initialValues: {
      id: '',
      fullName: '',
      position: '',
      phone: '',
      hireDate: '',
      salary: '',
      status: false,
    },
    validationSchema: StaffSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const response = await dispatch(updateStaff(values) as any)
        if (updateStaff.fulfilled.match(response)) {
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
    console.error('Error creating department:', error.message)
  }
  // Populate form with user data when `selectedStaff` changes
  useEffect(() => {
    if (selectedStaff) {
      formik.setFieldValue('id', selectedStaff.id || '')
      formik.setFieldValue('fullName', selectedStaff.fullName || '')
      formik.setFieldValue('phone', selectedStaff.phone || '')
      formik.setFieldValue('position', selectedStaff.position || '')
      formik.setFieldValue('hireDate', selectedStaff.hireDate || '')
      formik.setFieldValue('salary', selectedStaff.salary || '')
      formik.setFieldValue('status', Boolean(selectedStaff.status))
    }
    console.log(selectedStaff, "sleeeeeeeeeeeee")
  }, [selectedStaff])
  return (
    <Modal show={isOpen} onHide={onClose} backdrop='static' keyboard={false} size='lg'>
      <Modal.Header closeButton>
        <Modal.Title>{t('global.edit', { name: t('staff.staffs') })}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={formik.handleSubmit}>
          {/* Name and Username Fields */}
          <input type="hidden" {...formik.getFieldProps('id')} />
          <div className='row'>
            {/* Name Field */}
            <div className='col-md-4 mb-3'>
              <label className='form-label'>
                {t('staff.staff')} <span className='text-danger'>*</span>
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
                  {t('validation.required', { name: t('staff.staff') })}
                </div>
              )}
            </div>
            {/* position Field */}
            <div className='col-md-4 mb-3'>
              <label className='form-label'>
                {t('staff.position')} <span className='text-danger'>*</span>
              </label>
              <input
                type='text'
                {...formik.getFieldProps('position')}
                className={clsx('form-control', {
                  'is-invalid': formik.touched.position && formik.errors.position,
                  'is-valid': formik.touched.position && !formik.errors.position,
                })}
              />
              {formik.touched.position && formik.errors.position && (
                <div className='invalid-feedback'>
                  {t('validation.required', { name: t('staff.position') })}
                </div>
              )}
            </div>
            <div className='col-md-4 mb-3'>
              <label className='form-label'>
                {t('staff.salary')} <span className='text-danger'>*</span>
              </label>
              <input
                type='text'
                {...formik.getFieldProps('salary')}
                className={clsx('form-control', {
                  'is-invalid': formik.touched.salary && Boolean(formik.errors.salary),
                  'is-valid': formik.touched.salary && !formik.errors.salary,
                })}
              />
              {formik.touched.salary && formik.errors.salary && (
                <div className='invalid-feedback'>
                  {t('validation.required', { name: t('staff.salary') })}
                </div>
              )}
            </div>

          </div>
          <div className='row'>
            <div className='col-md-4 mb-3'>
              <label className='form-label'>
                {t('staff.hireDate')} <span className='text-danger'>*</span>
              </label>
              <input
                type='date'
                {...formik.getFieldProps('hireDate')}
                className={clsx('form-control', {
                  'is-invalid': formik.touched.hireDate && Boolean(formik.errors.hireDate),
                  'is-valid': formik.touched.hireDate && !formik.errors.hireDate,
                })}
              />
              {formik.touched.hireDate && formik.errors.hireDate && (
                <div className='invalid-feedback'>
                  {formik.errors.hireDate}
                </div>
              )}
            </div>
            <div className='col-md-4 mb-3'>
              <label className='form-label'>
                {t('global.phone')} <span className='text-danger'>*</span>
              </label>
              <input
                type='text'
                {...formik.getFieldProps('phone')}
                className={clsx('form-control', {
                  'is-invalid': formik.touched.phone && Boolean(formik.errors.phone),
                  'is-valid': formik.touched.phone && !formik.errors.phone,
                })}
              />
              {formik.touched.phone && formik.errors.phone && (
                <div className='invalid-feedback'>
                  {formik.errors.phone}
                </div>
              )}
            </div>
            <div className='col-md-4 mb-3'>
                    <label className='form-label'>
                    {t('global.status')} <span className='text-danger'>*</span>
                  </label>
                  <div className='form-check'>
                  <input
                    type='checkbox'
                    {...formik.getFieldProps('status')}
                    checked={formik.values.status}
                    className={clsx('form-check-input mt-3', {
                      'is-invalid': formik.touched.status && Boolean(formik.errors.status),
                      'is-valid': formik.touched.status && !formik.errors.status,
                    })}
                  />
                  </div>
                </div>
            {/* <div className='col-md-4 mb-3'>
              <label className='form-label'>
                {t('global.status')} <span className='text-danger'>*</span>
              </label>
              <div className='form-check'>
                <input
                  type='checkbox'
                  {...formik.getFieldProps('status')}
                  checked={formik.values.status} // Explicitly set checked
                  className={clsx('form-check-input mt-3', {
                    'is-invalid': formik.touched.status && Boolean(formik.errors.status),
                    'is-valid': formik.touched.status && !formik.errors.status,
                  })}
                />
                <label className='form-check-label'>
                  Active
                </label>
              </div>
            </div> */}
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

export default EditStaffModal
