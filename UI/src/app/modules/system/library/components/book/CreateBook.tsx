import {useEffect, useState} from 'react'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import {initialValues} from './_module'
import {useTranslation} from 'react-i18next'
import clsx from 'clsx'
import {useAppDispatch} from '../../../../../../redux/hooks'
import {Button, Modal} from 'react-bootstrap'
import {useIntl} from 'react-intl'

import {toast} from 'react-toastify'
import {storeUser} from 'redux/authentication/user/userManagementSlice'
import {storeBook} from 'redux/library/book/bookSlice'

// Define the props for the modal
interface CreateUserModalProps {
  isOpen: boolean
  onClose: () => void
  handleReloadTable: () => void
}

const CreateUserModal: React.FC<CreateUserModalProps> = ({isOpen, onClose, handleReloadTable}) => {
  const intl = useIntl()
  const {t} = useTranslation()
  const dispatch = useAppDispatch()
  const [roles, setRoles] = useState([])

  // Form Validation Schema
  const userSchema = Yup.object().shape({
    name: Yup.string().required(t('validation.required', {name: t('book.book')})),
    description: Yup.string().required(
      t('validation.required', {name: t('LABELS.NAME', {name: t('book.description')})})
    ),
  })

  // Formik Hook
  const formik = useFormik({
    initialValues,
    validationSchema: userSchema,
    onSubmit: async (values, {setSubmitting, resetForm}) => {
      try {
        const formData = createFormData(values)
        const response = await dispatch(storeBook(formData) as any)
        if (storeBook.fulfilled.match(response)) {
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

  const createFormData = (values: any) => {
    const {name, description, file} = values
    const formData = new FormData()
    formData.append('name', name)
    formData.append('description', description)

    return formData
  }

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
        <Modal.Title>{t('global.add', {name: t('book.book')})}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={formik.handleSubmit}>
          {/* Name and User Name Fields */}
          <div className='row'>
            <div className='col-md-12'>
              <div className='row'>
                {/* Name Field */}
                <div className='col-md-6 mb-3'>
                  <label className='form-label'>
                    {t('book.book')} <span className='text-danger'>*</span>
                  </label>
                  <input
                    type='text'
                    {...formik.getFieldProps('name')}
                    className={clsx('form-control', {
                      'is-invalid': formik.touched.name && formik.errors.name,
                      'is-valid': formik.touched.name && !formik.errors.name,
                    })}
                  />
                  {formik.touched.name && formik.errors.name && (
                    <div className='invalid-feedback'>
                      {t('validation.required', {name: t('book.book')})}
                    </div>
                  )}
                </div>

                {/* User Description Field */}
                <div className='col-md-6 mb-3'>
                  <label className='form-label'>
                    {t('book.description')} <span className='text-danger'>*</span>
                  </label>
                  <input
                    type='text'
                    {...formik.getFieldProps('description')}
                    className={clsx('form-control', {
                      'is-invalid': formik.touched.description && formik.errors.description,
                      'is-valid': formik.touched.description && !formik.errors.description,
                    })}
                  />
                  {formik.touched.description && formik.errors.description && (
                    <div className='invalid-feedback'>
                      {t('validation.required', {name: t('book.description')})}
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

export default CreateUserModal
