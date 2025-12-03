import { useEffect, useState } from 'react'
import { FormikProvider, useFormik } from 'formik'
import * as Yup from 'yup'
import { initialValues } from './_module'
import { useTranslation } from 'react-i18next'
import { useAppDispatch, useAppSelector } from '../../../../../redux/hooks'
import { Button, Modal } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { updatePurchase } from '../../../../../redux/slices/purchases/PurchaseSlice'
import { getAllSupplier } from '../../../../../redux/slices/supplier/SupplierSlice'
import { getAllFuelType } from '../../../../../redux/slices/fuelType/FuelTypeSlice'
import clsx from 'clsx'

interface EditSupplierLoanPaymentModalProps {
  isOpen: boolean
  onClose: () => void
  selectedSupplierLoanPayment: any // Type it as appropriate based on your data structure
  handleReloadTable: () => void
}

const SupplierLoanPaymentModel: React.FC<EditSupplierLoanPaymentModalProps> = ({ isOpen, onClose, selectedSupplierLoanPayment, handleReloadTable }) => {

  console.log(selectedSupplierLoanPayment, '=============');
  const { t } = useTranslation()
  const dispatch = useAppDispatch()

  // Validation Schema
  const PurchaseSchema = Yup.object().shape({
    supplierId: Yup.string().required('Supplier is required'),
    paidAmount: Yup.number()
      .nullable()
      .test(
        "paid-less-than-total",
        "paidAmount must be less than totalAmount",
        function (value) {
          const { totalAmount } = this.parent;
          if (value == null) return true;   // allow nullable before user types
          return value <= totalAmount;
        }
      ),
    items: Yup.array().of(
      Yup.object().shape({
        fuelTypeId: Yup.string().required('FuelType is required'),

        quantity: Yup.number()
          .nullable()                    // allow null for Formik initialValues
          .typeError('Qty required')     // catch string inputs
          .required('Qty required')
          .min(1, 'Qty must be at least 1'),

        unitPrice: Yup.number()
          .nullable()
          .typeError('Unit price required')
          .required('Unit price required')
          .min(0, 'Unit price must be >= 0'),
      })
    ),
  });

  // Formik setup
  const formik = useFormik({
    initialValues,
    validationSchema: PurchaseSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const response = await dispatch(updatePurchase(values) as any)
        if (updatePurchase.fulfilled.match(response)) {
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




  console.log(formik.values, 'valuessssssss');

  return (
    <Modal show={isOpen} onHide={onClose} backdrop='static' keyboard={false} size='xl'>
      <Modal.Header closeButton>
        <Modal.Title>{t('supplierLoanPayment.supplierLoanPayments')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row">
          <div className="col-md-2"><h5>{t('global.name')}</h5></div>
          <div className="col-md-2"><h5>{selectedSupplierLoanPayment?.supplierName}</h5></div>
          <div className="col-md-4"></div>
          <div className="col-md-2"><h5>{t('purchase.totalAmount')}</h5></div>
          <div className="col-md-2"><h5>{selectedSupplierLoanPayment?.totalAmount}</h5></div>
          <hr />
        </div>
        <div className="row">
          <div className="col-md-2"><h5>{t('purchase.purchaseDate')}</h5></div>
          <div className="col-md-2"><h5>{selectedSupplierLoanPayment?.purchaseDate}</h5></div>
          <div className="col-md-4"></div>
          <div className="col-md-2"><h5>{t('supplierLoanPayment.paidAmount')}</h5></div>
          <div className="col-md-2"><h5>{selectedSupplierLoanPayment?.paidAmount}</h5></div>
          <hr />
        </div>
        <div className="row">
          <div className="col-md-8"></div>
          <div className="col-md-2"><h5>{t('supplierLoanPayment.unPaidAmound')}</h5></div>
          <div className="col-md-2"><h5>{selectedSupplierLoanPayment?.paidAmount}</h5></div>
          <hr />
        </div>
        <h2 className='mb-3'>{t('supplierLoanPayment.purchaseDetial')}</h2>
        <table className='table table-bordered fs-6 table-hover'>
          <thead>
            <tr>
              <th>{t('fuelType.name')}</th>
              <th>{t('fuelType.qtn')}</th>
              <th>{t('fuelType.unitPrice')}</th>
              <th>{t('fuelType.total')}</th>
            </tr>
          </thead>
          <tbody>
            {selectedSupplierLoanPayment?.purchaseDetails?.map((item: any, index: number) => (
              <tr key={index}>
                <td>{item.fuelTypeId}</td>
                <td>{item.quantity}</td>
                <td>{item.unitPrice}</td>
                <td>{item.totalPrice}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <hr />
        <form onSubmit={formik.handleSubmit}>
          <div className="row">
            <div className='col-md-4'>
              <label className='form-label fs-4'>
                {t('supplierLoanPayment.paidLoanAmount')} <span className='text-danger'>*</span>
              </label>
              <input
                type='number'
                {...formik.getFieldProps('address')}
                className={clsx('form-control', {
                  'is-invalid': formik.touched.paidLoanAmount && formik.errors.paidLoanAmount,
                  'is-valid': formik.touched.paidLoanAmount && !formik.errors.paidLoanAmount,
                })}
                placeholder={t('global.WRITE.HERE')}
              />
              {formik.touched.paidLoanAmount && formik.errors.paidLoanAmount && (
                <div className='invalid-feedback'>
                  {t('validation.required', { name: t('global.paidLoanAmount') })}
                </div>
              )}
            </div>
            <div className="col-md-4">

              <label className="form-label fs-5">{t('supplierLoanPayment.paymentDate')}</label>
              <input
                type="date"
                name="paymentDate"
                value={formik.values.paymentDate}
                onChange={formik.handleChange}
                className="form-control"
              />
              {formik.touched.paymentDate && formik.errors.paymentDate && (
                <div className='invalid-feedback'>
                  {t('validation.required', { name: t('global.paymentDate') })}
                </div>
              )}
            </div>
            <div className="col-md-4 mt-8">
              <Button variant="success" type="submit">
                {t('global.save')}
              </Button>
            </div>
          </div>
        </form>
        <div className="mt-4 text-end">
          <Button variant='danger' onClick={onClose} className='me-2 '>
            {t('global.BACK')}
          </Button>
        </div>
      </Modal.Body>
    </Modal >
  )
}

export default SupplierLoanPaymentModel
