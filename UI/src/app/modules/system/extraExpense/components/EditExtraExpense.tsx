import {useEffect, useState} from 'react'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import clsx from 'clsx'
import {useTranslation} from 'react-i18next'
import {useAppDispatch} from '../../../../../redux/hooks'
import {Button, Modal} from 'react-bootstrap'
import {useIntl} from 'react-intl'
import {toast} from 'react-toastify'
import {updateExtraExpense} from 'redux/extraExpense/ExtraExpenseSlice'

interface EditExtraExpenseModalProps {
  isOpen: boolean
  onClose: () => void
  selectedExtraExpense: any // Type it as appropriate based on your data structure
  handleReloadTable: () => void
}

const EditExtraExpenseModal: React.FC<EditExtraExpenseModalProps> = ({
  isOpen,
  onClose,
  selectedExtraExpense,
  handleReloadTable,
}) => {
  const intl = useIntl()
  const {t} = useTranslation()
  const dispatch = useAppDispatch()
  const [roles, setRoles] = useState([])

  // Populate form with user data when `selectedExtraExpense` changes
  useEffect(() => {
    if (selectedExtraExpense) {
      formik.setFieldValue('id', selectedExtraExpense.id || '')
      formik.setFieldValue('expenseType', selectedExtraExpense.expenseType || '')
      formik.setFieldValue('amount', selectedExtraExpense.amount || '')
      formik.setFieldValue('notes', selectedExtraExpense.notes || '')
    }
  }, [selectedExtraExpense])

  // Validation schema
  const userSchema = Yup.object().shape({
    expenseType: Yup.string().required(t('validation.required', { name: t('expense.expenseType') })),
        notes: Yup.string().required(t('validation.required', { name: t('global.expenseDate') })),
        amount: Yup.string()
          .required(t('validation.required', { name: t('global.phone') }))
  })

  // Formik setup
  const formik = useFormik({
    initialValues: {
      id: '',
      expenseType: '',
      expenseDate: '',
      amount: '',
      notes: '',
    },
    validationSchema: userSchema,
    onSubmit: async (values, {setSubmitting, resetForm}) => {
      try {
        const response = await dispatch(updateExtraExpense(values) as any)
        if (updateExtraExpense.fulfilled.match(response)) {
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
        <Modal.Title>{t('global.edit', {name: t('extraExpense.extraExpenses')})}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={formik.handleSubmit}>
          {/* Name and Username Fields */}
          <div className='row'>
            <input type="hidden" {...formik.getFieldProps('id')}  />
            <div className='col-md-6 mb-3'>
              <label className='form-label'>
                {t('extraExpense.expenseType')} <span className='text-danger'>*</span>
              </label>
              <input
                type='text'
                {...formik.getFieldProps('expenseType')}
                className={clsx('form-control', {
                  'is-invalid': formik.touched.expenseType && formik.errors.expenseType,
                  'is-valid': formik.touched.expenseType && !formik.errors.expenseType,
                })}
              />
              {formik.touched.expenseType && formik.errors.expenseType && (
                <div className='invalid-feedback'>
                  {t('validation.required', {name: t('extraExpense.extraExpense')})}
                </div>
              )}
            </div>

            <div className='col-md-6 mb-3'>
              <label className='form-label'>
                {t('global.phone')} <span className='text-danger'>*</span>
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
                  {t('validation.required', {name: t('ExtraExpense.amount')})}
                </div>
              )}
            </div>
          </div>
          <div className='row'>
            <div className='col-md-6 mb-3'>
              <label className='form-label'>
                {t('global.expenseDate')} <span className='text-danger'>*</span>
              </label>
              <input
                type='text'
                {...formik.getFieldProps('expenseDate')}
                className={clsx('form-control', {
                  'is-invalid': formik.touched.expenseDate && formik.errors.expenseDate,
                  'is-valid': formik.touched.expenseDate && !formik.errors.expenseDate,
                })}
              />
              {formik.touched.expenseDate && formik.errors.expenseDate && (
                <div className='invalid-feedback'>
                  {t('validation.required', {name: t('global.expenseDate')})}
                </div>
              )}
            </div>
            <div className='col-md-6 mb-3'>
              <label className='form-label'>
                {t('global.remarks')} <span className='text-danger'>*</span>
              </label>
              <input
                type='text'
                {...formik.getFieldProps('notes')}
                className={clsx('form-control', {
                  'is-invalid': formik.touched.notes && formik.errors.notes,
                  'is-valid': formik.touched.notes && !formik.errors.notes,
                })}
              />
              {formik.touched.notes && formik.errors.notes && (
                <div className='invalid-feedback'>
                  {t('validation.required', {name: t('global.remarks')})}
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

export default EditExtraExpenseModal
