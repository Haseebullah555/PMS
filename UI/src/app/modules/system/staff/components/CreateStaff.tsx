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
import { storeStaff } from 'redux/staff/StaffSlice'
import { Console } from 'console'

// Define the props for the modal
interface CreateStaffModalProps {
  isOpen: boolean
  onClose: () => void
  handleReloadTable: () => void
}

const CreateStaffModal: React.FC<CreateStaffModalProps> = ({ isOpen, onClose, handleReloadTable }) => {
  const intl = useIntl()
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const [roles, setRoles] = useState([])

  // Form Validation Schema
  const StaffSchema = Yup.object().shape({
    fullName: Yup.string().required(t('validation.required', { name: t('staff.staff') })),
    position: Yup.string().required(t('validation.required', { name: t('staff.position') })),
    phone: Yup.string()
      .required(t('validation.required', { name: t('global.phone') })) 
      .matches(/^[0-9+]+$/, t('validation.matches', { name: t('global.phone') }))                       
      .matches(/^(?:\+93|0)?7\d{8}$/, t('validation.invalidPhone', { name: t('global.phone') }))                
  })




  // Formik Hook
  const formik = useFormik({
    initialValues,
    validationSchema: StaffSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      console.log("Submitting values:", values);
      try {
        const response = await dispatch(storeStaff(values) as any)
        if (storeStaff.fulfilled.match(response)) {
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
    console.log(response, "fslkjfdlksdfslkdfsjsdljflksdjf");
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
    console.error('Error creating staff:', error.message)
  }
  return (
    <Modal show={isOpen} onHide={onClose} backdrop='static' keyboard={false} size='lg'>
      <Modal.Header closeButton>
        <Modal.Title>{t('global.add', { name: t('staff.staffs') })}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={formik.handleSubmit}>
          {/* Name and Staff Name Fields */}
          <div className='row'>
            <div className='col-md-12'>
              <div className='row'>
                {/* Name Field */}
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
                      {t('validation.required', { name: t('staff.staff') })}
                    </div>
                  )}
                </div>

                {/* Staff phoneNumber Field */}
                {/* Staff phoneNumber Field */}
                <div className='col-md-6 mb-3'>
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

              </div>
              <div className='row'>
                {/* Name Field */}
                <div className='col-md-12 mb-3'>
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

export default CreateStaffModal
