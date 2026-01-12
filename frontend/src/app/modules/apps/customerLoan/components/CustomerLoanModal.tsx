import { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { createInitialValues } from './_module'
import { useTranslation } from 'react-i18next'
import clsx from 'clsx'
import { useAppDispatch, useAppSelector } from '../../../../../redux/hooks'
import { Button, Modal } from 'react-bootstrap'
import { useIntl } from 'react-intl'
import { toast } from 'react-toastify'
import {  getCustomersList, storeCustomer } from '../../../../../redux/slices/customer/CustomerSlice'
import { getAllFuelType } from '../../../../../redux/slices/fuelType/FuelTypeSlice'
import { storeCustomerLoan } from '../../../../../redux/slices/customerLoan/CustomerLoanSlice'

// Define the props for the modal
interface CustomerLoanModalProps {
  isOpen: boolean
  onClose: () => void
  handleReloadTable: () => void
  selectedCustomerLoan: any
  selectedGun: any
  mode: any
}

const CustomerLoanModal: React.FC<CustomerLoanModalProps> = ({ isOpen, onClose, handleReloadTable, selectedCustomerLoan, mode, selectedGun }) => {

  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState(false);
  const fuelTypes = useAppSelector((state: any) => state.fuelType.fuelTypeAllList)
  const customers = useAppSelector((state: any) => state.customer.allCustomers)

  // Form Validation Schema
  const CustomerLoanSchema = Yup.object().shape({
    customerId: Yup.number().required(t('validation.required', { name: t('customer.customer') })),
    fuelTypeId: Yup.number().required(t('validation.required', { name: t('fuelType.fuelType') })),
    fuelAmount: Yup.number().required(t('validation.required', { name: t('fuelType.fuelAmount') })),
    fuelUnitPrice: Yup.number().required(t('validation.required', { name: t('fuelType.fuelUnitPrice') }))
  })

  // Formik Hook
  const formik = useFormik({
    initialValues: createInitialValues,
    validationSchema: CustomerLoanSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const response = await dispatch(storeCustomerLoan(values) as any)
        if (storeCustomerLoan.fulfilled.match(response)) {
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
    console.error('Error creating Customer:', error.message)
  }

  useEffect(() => {
    if (!customers) {
      dispatch(getCustomersList())
        .then((res) => { })
        .catch((err) => {
          console.log(err)
        })
    }
    if (!fuelTypes) {
      dispatch(getAllFuelType())
        .then((res) => { })
        .catch((err) => {
          console.log(err)
        })
    }
  }, [customers, fuelTypes, dispatch])

  useEffect(() => {
    const fuelAmount = formik.values.fuelAmount || 0;
    const fuelUnitPrice = formik.values.fuelUnitPrice || 0;
    const totalPrice = fuelAmount * fuelUnitPrice;
    formik.setFieldValue('fuelGunId', selectedGun);

    formik.setFieldValue('totalPrice', totalPrice);
  }, [formik.values.fuelAmount, formik.values.fuelUnitPrice, selectedGun])

  // console.log(selected, 'customersssssss');
  // console.log('formik values', formik.values);
  return (
    <Modal show={isOpen} onHide={onClose} backdrop='static' keyboard={false} size='lg'>
      <Modal.Header closeButton>
        <Modal.Title>{t('global.add', { name: t('customer.customer') })}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={formik.handleSubmit}>
          {/* Name and Customer Name Fields */}
          <div className='row'>
            <div className='col-md-12'>
              <div className='row'>
                {/* Customer */}
                <div className="col-md-4 mb-3">
                  <label className='form-label'>{t("customer.customer")} *</label>
                  <select
                    className={clsx('form-select', {
                      'is-invalid': formik.touched.customerId && formik.errors.customerId,
                      'is-valid': formik.touched.customerId && !formik.errors.customerId,
                    })}
                    value={formik.values.customerId ?? ""}
                    onChange={(e) =>
                      formik.setFieldValue("customerId", Number(e.target.value))
                    }
                  >
                    <option value="">{t("global.SELECT.OPTION")}</option>
                    {customers?.map((customer: any) => (
                      <option key={customer.id} value={customer.id}>{customer.name}</option>
                    ))}
                  </select>
                  {formik.touched.customerId &&
                    formik.errors?.customerId && (
                      <div className="invalid-feedback">
                        {t('validation.required', { name: t('customer.customer') })}
                      </div>
                    )}
                </div>
                {/* Fuel Type */}
                <div className="col-md-4 mb-3">
                  <label className='form-label'>{t("fuelType.fuelType")} *</label>
                  <select
                    className={clsx('form-select', {
                      'is-invalid': formik.touched.fuelTypeId && formik.errors.fuelTypeId,
                      'is-valid': formik.touched.fuelTypeId && !formik.errors.fuelTypeId,
                    })}
                    value={formik.values.fuelTypeId ?? ""}
                    onChange={(e) =>
                      formik.setFieldValue("fuelTypeId", Number(e.target.value))
                    }
                  >
                    <option value="">{t("global.SELECT.OPTION")}</option>
                    {fuelTypes?.data?.map((f: any) => (
                      <option key={f.id} value={f.id}>{f.name}</option>
                    ))}
                  </select>
                  {formik.touched.fuelTypeId &&
                    formik.errors?.fuelTypeId && (
                      <div className="invalid-feedback">
                        {t('validation.required', { name: t('fuelType.fuelType') })}
                      </div>
                    )}
                </div>
                {/* Customer phoneNumber Field */}
                <div className='col-md-4 mb-3'>
                  <label className='form-label'>
                    {t('global.date')} <span className='text-danger'>*</span>
                  </label>
                  <input
                    type='date'
                    {...formik.getFieldProps('loanDate')}
                    className={clsx('form-control', {
                      'is-invalid': formik.touched.loanDate && Boolean(formik.errors.loanDate),
                      'is-valid': formik.touched.loanDate && !formik.errors.loanDate,
                    })}
                  />
                  {formik.touched.loanDate && formik.errors.loanDate && (
                    <div className='invalid-feedback'>
                      {t('validation.required', { name: t('global.date') })}
                    </div>
                  )}
                </div>

              </div>
              <div className='row'>
                <div className='col-md-4 mb-3'>
                  <label className='form-label'>
                    {t('customerLoan.fuelAmount')} <span className='text-danger'>*</span>
                  </label>
                  <input
                    type='number'
                    {...formik.getFieldProps('fuelAmount')}
                    className={clsx('form-control', {
                      'is-invalid': formik.touched.fuelAmount && formik.errors.fuelAmount,
                      'is-valid': formik.touched.fuelAmount && !formik.errors.fuelAmount,
                    })}
                  />
                  {formik.touched.fuelAmount && formik.errors.fuelAmount && (
                    <div className='invalid-feedback'>
                      {t('validation.required', { name: t('customerLoan.fuelAmount') })}
                    </div>
                  )}
                </div>
                {/* fuel Unit Price Field */}
                <div className='col-md-4 mb-3'>
                  <label className='form-label'>
                    {t('customerLoan.fuelUnitPrice')} <span className='text-danger'>*</span>
                  </label>
                  <input
                    type='number'
                    {...formik.getFieldProps('fuelUnitPrice')}
                    className={clsx('form-control', {
                      'is-invalid': formik.touched.fuelUnitPrice && formik.errors.fuelUnitPrice,
                      'is-valid': formik.touched.fuelUnitPrice && !formik.errors.fuelUnitPrice,
                    })}
                  />
                  {formik.touched.fuelUnitPrice && formik.errors.fuelUnitPrice && (
                    <div className='invalid-feedback'>
                      {t('validation.required', { name: t('customerLoan.fuelUnitPrice') })}
                    </div>
                  )}
                </div>
                {/* total Price Field */}
                <div className='col-md-4 mb-3'>
                  <label className='form-label'>
                    {t('customerLoan.totalPrice')} <span className='text-danger'>*</span>
                  </label>
                  <input
                    type='number'
                    {...formik.getFieldProps('totalPrice')}
                    className={clsx('form-control', {
                      'is-invalid': formik.touched.totalPrice && formik.errors.totalPrice,
                      'is-valid': formik.touched.totalPrice && !formik.errors.totalPrice,
                    })}
                    readOnly
                  />
                  {formik.touched.totalPrice && formik.errors.totalPrice && (
                    <div className='invalid-feedback'>
                      {t('validation.required', { name: t('customerLoan.totalPrice') })}
                    </div>
                  )}
                </div>

              </div>
              <div className='row'>
                {/* Description Field */}
                <div className='col-md-12 mb-3'>
                  <label className='form-label'>
                    {t('global.description')} <span className='text-danger'>*</span>
                  </label>
                  <textarea
                    {...formik.getFieldProps('description')}
                    className={clsx('form-control', {
                      'is-invalid': formik.touched.description && formik.errors.description,
                      'is-valid': formik.touched.description && !formik.errors.description,
                    })}
                  ></textarea>
                  {formik.touched.description && formik.errors.description && (
                    <div className='invalid-feedback'>
                      {t('validation.required', { name: t('global.description') })}
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
            <Button type="submit" disabled={loading}>
              {loading ? "..." : mode === "send" ? (
                t('global.SAVE')
              ) : (
                t('global.Update')
              )}
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  )
}

export default CustomerLoanModal
