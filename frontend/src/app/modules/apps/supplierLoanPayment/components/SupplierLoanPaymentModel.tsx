import { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { initialValues } from './_module'
import { useTranslation } from 'react-i18next'
import { useAppDispatch } from '../../../../../redux/hooks'
import { Button, Modal } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { storePuchasePayment, updatePurchase } from '../../../../../redux/slices/purchases/PurchaseSlice'
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

  useEffect(() => {
    if (selectedSupplierLoanPayment) {
      formik.setFieldValue('purchaseId', selectedSupplierLoanPayment.id)
    }
  }, [selectedSupplierLoanPayment])
  // Validation Schema
  const PurchaseSchema = Yup.object().shape({
    paidLoanAmount: Yup.number()
      .required(t('validation.required', { name: t('supplierLoanPayment.paidLoanAmount') }))
      .max(selectedSupplierLoanPayment?.balance || 0, "Cannot exceed balance"),
    paymentDate: Yup.date().required("Payment date is required"),
  });



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

  // Formik setup
  const formik = useFormik({
    initialValues,
    validationSchema: PurchaseSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const response = await dispatch(storePuchasePayment(values) as any)
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
  console.log(formik.values, 'valuessssssssss');

  return (
    <Modal show={isOpen} onHide={onClose} backdrop='static' keyboard={false} size='xl'>
      <Modal.Header closeButton>
        <Modal.Title>{t('supplierLoanPayment.supplierLoanPayments')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Supplier Header Section */}
        <div className="row mb-4">
          <div className="col-md-2">
            <h5>{t('global.name')}</h5>
          </div>
          <div className="col-md-4">
            <h5>{selectedSupplierLoanPayment?.name}</h5>
          </div>

          <div className="col-md-2">
            <h5>{t('supplier.balance')}</h5>
          </div>
          <div className="col-md-4">
            <h5 className="text-danger fw-bold">
              {selectedSupplierLoanPayment?.balance}
            </h5>
          </div>
        </div>

        <hr />

        <h3 className="mb-3">{t('supplierLoanPayment.purchaseDetial')}</h3>

        <div className="accordion" id="purchaseAccordion">
          {selectedSupplierLoanPayment?.purchases?.map((purchase: any, index: number) => (
            <div className="accordion-item" key={index}>

              <h2 className="accordion-header" id={`heading-${index}`}>
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#collapse-${index}`}
                  aria-expanded="false"
                >
                  {t('purchase.purchase')} #{purchase.id} —
                  {t('purchase.totalAmount')}: {purchase.totalAmount} —
                  {t('purchase.purchaseDate')}: {purchase.purchaseDate}
                </button>
              </h2>

              <div
                id={`collapse-${index}`}
                className="accordion-collapse collapse"
                aria-labelledby={`heading-${index}`}
                data-bs-parent="#purchaseAccordion"
              >
                <div className="accordion-body">

                  <div className="row mb-3">
                    <div className="col-md-3"><strong>{t('purchase.totalAmount')}:</strong></div>
                    <div className="col-md-3">{purchase.totalAmount}</div>

                    <div className="col-md-3"><strong>{t('supplierLoanPayment.paidAmount')}:</strong></div>
                    <div className="col-md-3">{purchase.paidAmount}</div>

                    <div className="col-md-3"><strong>{t('supplierLoanPayment.unPaidAmound')}:</strong></div>
                    <div className="col-md-3">{purchase.unpaidAmount}</div>
                  </div>

                  <table className="table table-bordered table-hover fs-6">
                    <thead>
                      <tr>
                        <th>{t('fuelType.name')}</th>
                        <th>{t('fuelType.qtn')}</th>
                        <th>{t('fuelType.unitPrice')}</th>
                        <th>{t('fuelType.total')}</th>
                      </tr>
                    </thead>

                    <tbody>
                      {purchase.purchaseDetails?.map((item: any, i: number) => (
                        <tr key={i}>
                          <td>{item.fuelTypeId}</td>
                          <td>{item.quantity}</td>
                          <td>{item.unitPrice}</td>
                          <td>{item.totalPrice}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                </div>
              </div>

            </div>
          ))}
        </div>
        <hr />

        <h3 className="mt-4 mb-3">{t('supplierLoanPayment.makePayment')}</h3>

        <form onSubmit={formik.handleSubmit}>
          <div className="row">

            {/* Amount */}
            <div className="col-md-4">
              <label className="form-label fs-5">
                {t('supplierLoanPayment.paidLoanAmount')} <span className="text-danger">*</span>
              </label>

              <input
                type="number"
                {...formik.getFieldProps('paidLoanAmount')}
                className={clsx('form-control', {
                  'is-invalid': formik.touched.paidLoanAmount && formik.errors.paidLoanAmount,
                  'is-valid': formik.touched.paidLoanAmount && !formik.errors.paidLoanAmount,
                })}
                min="1"
                max={selectedSupplierLoanPayment?.balance || 0}
                placeholder={t('global.WRITE.HERE')}
              />

              {formik.touched.paidLoanAmount && formik.errors.paidLoanAmount && (
                <div className='invalid-feedback'>
                  {formik.errors.paidLoanAmount}
                </div>
              )}
            </div>

            {/* Payment Date */}
            <div className="col-md-4">
              <label className="form-label fs-5">
                {t('supplierLoanPayment.paymentDate')} <span className="text-danger">*</span>
              </label>

              <input
                type="date"
                name="paymentDate"
                value={formik.values.paymentDate}
                onChange={formik.handleChange}
                className={clsx("form-control", {
                  "is-invalid": formik.touched.paymentDate && formik.errors.paymentDate,
                })}
              />

              {formik.touched.paymentDate && formik.errors.paymentDate && (
                <div className='invalid-feedback'>
                  {formik.errors.paymentDate}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="col-md-4 d-flex align-items-end mt-3">
              <Button variant="success" type="submit" className="w-100 fs-5">
                {t('global.save')}
              </Button>
            </div>
          </div>
        </form>

        {/* Back Button */}
        <div className="mt-4 text-end">
          <Button variant='danger' onClick={onClose} className='me-2'>
            {t('global.BACK')}
          </Button>
        </div>


      </Modal.Body>
    </Modal >
  )
}

export default SupplierLoanPaymentModel
