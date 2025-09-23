import {useEffect, useState} from 'react'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import clsx from 'clsx'
import {useTranslation} from 'react-i18next'
import {useAppDispatch} from '../../../../../../redux/hooks'
import {Button, Modal} from 'react-bootstrap'
import {useIntl} from 'react-intl'
import {toast} from 'react-toastify'
import {updateBook} from 'redux/library/book/bookSlice'

interface EditBookModalProps {
  isOpen: boolean
  onClose: () => void
  selectedBook: any // Type it as appropriate based on your data structure
  handleReloadTable: () => void
}

const EditBookModal: React.FC<EditBookModalProps> = ({
  isOpen,
  onClose,
  selectedBook,
  handleReloadTable,
}) => {
  const intl = useIntl()
  const {t} = useTranslation()
  const dispatch = useAppDispatch()
  const [roles, setRoles] = useState([])

  // Populate form with user data when `selectedBook` changes
  useEffect(() => {
    if (selectedBook) {
      formik.setFieldValue('name', selectedBook.name || '')
      formik.setFieldValue('description', selectedBook.description || '')
    }
  }, [selectedBook])

  // Validation schema
  const userSchema = Yup.object().shape({
    name: Yup.string().required(t('validation.required', {name: t('book.book')})),
    description: Yup.string().required(t('validation.required', {name: t('book.description')})),
  })

  // Formik setup
  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
    },
    validationSchema: userSchema,
    onSubmit: async (values, {setSubmitting, resetForm}) => {
      try {
        const formData = createFormData(values)
        const response = await dispatch(updateBook(formData) as any)
        if (updateBook.fulfilled.match(response)) {
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
    const {name, description} = values
    const formData = new FormData()
    formData.append('name', name)
    formData.append('description', description)
    formData.append('id', selectedBook.id)

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
        <Modal.Title>{t('global.edit', {name: t('book.book')})}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={formik.handleSubmit}>
          {/* Name and Username Fields */}
          <div className='row'>
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

export default EditBookModal
