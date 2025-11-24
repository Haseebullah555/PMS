import {useEffect, useState} from 'react'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import clsx from 'clsx'
import {useTranslation} from 'react-i18next'
import {useAppDispatch} from '../../../../../redux/hooks'
import {Button, Modal} from 'react-bootstrap'
import {useIntl} from 'react-intl'
import {toast} from 'react-toastify'
import {updateFuelType} from 'redux/good/FuelTypeSlice'

interface EditFuelTypeModalProps {
  isOpen: boolean
  onClose: () => void
  selectedFuelType: any // Type it as appropriate based on your data structure
  handleReloadTable: () => void
}

const EditFuelTypeModal: React.FC<EditFuelTypeModalProps> = ({
  isOpen,
  onClose,
  selectedFuelType,
  handleReloadTable,
}) => {
  const intl = useIntl()
  const {t} = useTranslation()
  const dispatch = useAppDispatch()
  const [roles, setRoles] = useState([])

  // Populate form with user data when `selectedFuelType` changes
  useEffect(() => {
    if (selectedFuelType) {
      formik.setFieldValue('id', selectedFuelType.id || '')
      formik.setFieldValue('name', selectedFuelType.name || '')
      formik.setFieldValue('unit', selectedFuelType.unit || '')
      formik.setFieldValue('description', selectedFuelType.description || '')
      formik.setFieldValue('costPrice', selectedFuelType.costPrice || '')
      formik.setFieldValue('sellPrice', selectedFuelType.sellPrice || '')
    }
  }, [selectedFuelType])

  // Validation schema
  const FuelTypeSchema = Yup.object().shape({
      name: Yup.string().required(t('validation.required', { name: t('good.goodName') })),
      description: Yup.string().required(t('validation.required', { name: t('global.remarks') })),
      unit: Yup.string()
        .required(t('validation.required', { name: t('good.unit') }))             
    })

  // Formik setup
  const formik = useFormik({
    initialValues: {
      id: '',
      name: '',
      unit: '',
      description: '',
      costPrice: '',
      sellPrice: '',
    },
    validationSchema: FuelTypeSchema,
    onSubmit: async (values, {setSubmitting, resetForm}) => {
      try {
        const response = await dispatch(updateFuelType(values) as any)
        if (updateFuelType.fulfilled.match(response)) {
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
console.log(formik.values)
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
        <Modal.Title>{t('global.edit', {name: t('good.goods')})}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={formik.handleSubmit}>
          {/* Name and FuelType Name Fields */}
          <div className='row'>
            <input type="hidden" {...formik.getFieldProps('id')}  />
            <div className='col-md-12'>
              <div className='row'>
                {/* Name Field */}
                <div className='col-md-6 mb-3'>
                  <label className='form-label'>
                    {t('good.goodName')} <span className='text-danger'>*</span>
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
                      {t('validation.required', { name: t('good.goodName') })}
                    </div>
                  )}
                </div>

                <div className='col-md-6 mb-3'>
                  <label className='form-label'>
                    {t('good.unit')} <span className='text-danger'>*</span>
                  </label>
                  <input
                    type='text'
                    {...formik.getFieldProps('unit')}
                    className={clsx('form-control', {
                      'is-invalid': formik.touched.unit && Boolean(formik.errors.unit),
                      'is-valid': formik.touched.unit && !formik.errors.unit,
                    })}
                  />
                  {formik.touched.unit && formik.errors.unit && (
                    <div className='invalid-feedback'>
                      {formik.errors.unit}
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
                      {t('validation.required', { name: t('global.remarks') })}
                    </div>
                  )}
                </div>
              </div>
              <div className='row'>
                {/* Name Field */}
                <div className='col-md-6 mb-3'>
                  <label className='form-label'>
                    {t('good.purchasePrice')} <span className='text-danger'>*</span>
                  </label>
                  <input
                    type='text'
                    {...formik.getFieldProps('costPrice')}
                    className={clsx('form-control', {
                      'is-invalid': formik.touched.costPrice && formik.errors.costPrice,
                      'is-valid': formik.touched.costPrice && !formik.errors.costPrice,
                    })}
                  />
                  {formik.touched.costPrice && formik.errors.costPrice && (
                    <div className='invalid-feedback'>
                      {t('validation.required', { name: t('good.purchasePrice') })}
                    </div>
                  )}
                </div>
                <div className='col-md-6 mb-3'>
                  <label className='form-label'>
                    {t('good.sellPrice')} <span className='text-danger'>*</span>
                  </label>
                  <input
                    type='text'
                    {...formik.getFieldProps('sellPrice')}
                    className={clsx('form-control', {
                      'is-invalid': formik.touched.sellPrice && formik.errors.sellPrice,
                      'is-valid': formik.touched.sellPrice && !formik.errors.sellPrice,
                    })}
                  />
                  {formik.touched.sellPrice && formik.errors.sellPrice && (
                    <div className='invalid-feedback'>
                      {t('validation.required', { name: t('good.sellPrice') })}
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

export default EditFuelTypeModal
