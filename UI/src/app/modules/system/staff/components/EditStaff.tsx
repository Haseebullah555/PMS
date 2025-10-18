import {useEffect, useState} from 'react'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import clsx from 'clsx'
import {useTranslation} from 'react-i18next'
import {useAppDispatch} from '../../../../../redux/hooks'
import {Button, Modal} from 'react-bootstrap'
import {useIntl} from 'react-intl'
import {toast} from 'react-toastify'
import {updateStaff} from 'redux/staff/StaffSlice'

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
  const {t} = useTranslation()
  const dispatch = useAppDispatch()
  const [roles, setRoles] = useState([])

  // Populate form with user data when `selectedStaff` changes
  useEffect(() => {
    if (selectedStaff) {
      formik.setFieldValue('id', selectedStaff.id || '')
      formik.setFieldValue('fullName', selectedStaff.fullName || '')
      formik.setFieldValue('phone', selectedStaff.phone || '')
      formik.setFieldValue('position', selectedStaff.position || '')
    }
  }, [selectedStaff])

  // Validation schema
  const userSchema = Yup.object().shape({
    fullName: Yup.string().required(t('validation.required', { name: t('staff.staff') })),
        position: Yup.string().required(t('validation.required', { name: t('staff.position') })),
        phone: Yup.string()
          .required(t('validation.required', { name: t('global.phone') }))
          .matches(
            /^(?:\+93|0)?7\d{8}$/,
            t('validation.invalid', { name: t('global.phone') }) // Custom error message
          )
  })

  // Formik setup
  const formik = useFormik({
    initialValues: {
      id: '',
      fullName: '',
      position: '',
      phone: '',
    },
    validationSchema: userSchema,
    onSubmit: async (values, {setSubmitting, resetForm}) => {
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

  return (
    <Modal show={isOpen} onHide={onClose} backdrop='static' keyboard={false} size='lg'>
      <Modal.Header closeButton>
        <Modal.Title>{t('global.edit', {name: t('staff.staffs')})}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={formik.handleSubmit}>
          {/* Name and Username Fields */}
          <div className='row'>
            <input type="hidden" {...formik.getFieldProps('id')}  />
            <div className='col-md-6 mb-3'>
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
                  {t('validation.required', {name: t('staff.staff')})}
                </div>
              )}
            </div>

            <div className='col-md-6 mb-3'>
              <label className='form-label'>
                {t('global.phone')} <span className='text-danger'>*</span>
              </label>
              <input
                type='text'
                {...formik.getFieldProps('phone')}
                className={clsx('form-control', {
                  'is-invalid': formik.touched.phone && formik.errors.phone,
                  'is-valid': formik.touched.phone && !formik.errors.phone,
                })}
              />
              {formik.touched.phone && formik.errors.phone && (
                <div className='invalid-feedback'>
                  {t('validation.required', {name: t('Staff.phone')})}
                </div>
              )}
            </div>
          </div>
          <div className='row'>
            <div className='col-md-12 mb-3'>
              <label className='form-label'>
                {t('global.position')} <span className='text-danger'>*</span>
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
                  {t('validation.required', {name: t('global.position')})}
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

export default EditStaffModal
