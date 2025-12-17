import { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { initialValues } from './_module'
import { useTranslation } from 'react-i18next'
import { useAppDispatch } from '../../../../../redux/hooks'
import { Button, Modal } from 'react-bootstrap'
import { toast } from 'react-toastify'
import clsx from 'clsx'
import { storeSupplierLoanPayment } from '../../../../../redux/slices/supplierLoanPayment/SupplierLoanPaymentSlice'

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
        const response = await dispatch(storeSupplierLoanPayment(values) as any)
        if (storeSupplierLoanPayment.fulfilled.match(response)) {
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
  useEffect(() => {
    if (selectedSupplierLoanPayment) {
      formik.setFieldValue('supplierId', selectedSupplierLoanPayment.id || '')
    }
  }, [selectedSupplierLoanPayment])
  return (
    <Modal show={isOpen} onHide={onClose} backdrop='static' keyboard={false} size='xl'>
      <Modal.Header closeButton>
        <Modal.Title>{t('supplierLoanPayment.supplierLoanPayments')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Supplier Header Section */}
        <div className="row mb-4 p-3" style={{ backgroundColor: '#153a81'}}>
          <div className="col-md-2">
            <h5 className='text-white'>{t('global.name')}</h5>
          </div>
          <div className="col-md-4">
            <h5 className='text-white'>{selectedSupplierLoanPayment?.name}</h5>
          </div>

          <div className="col-md-2">
            <h5 className='text-white'>{t('supplier.balance')}</h5>
          </div>
          <div className="col-md-4">
            <h5 className="text-danger fw-bold">
              {selectedSupplierLoanPayment?.balance}
            </h5>
          </div>
        </div>

        {/* <hr /> */}

        <h3 className="mb-3">{t('supplierLoanPayment.purchaseDetial')}</h3>

        <div className="accordion bg-gray-200" id="purchaseAccordion">
          {selectedSupplierLoanPayment?.purchases?.map((purchase: any, index: number) => (
            <div className="accordion-item" key={index}>

              <div className="accordion-header" id={`heading-${index}`}>
                <button
                  className="accordion-button collapsed d-flex justify-content-between"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#collapse-${index}`}
                  aria-expanded="false"
                >
                  <span className='fs-4 fw-bold'>
                    #{purchase.id} :  {'('} {t('purchase.purchaseDate')} : {purchase.purchaseDate} {')'}
                  </span>
                </button>
              </div>


              <div
                id={`collapse-${index}`}
                className="accordion-collapse collapse"
                aria-labelledby={`heading-${index}`}
                data-bs-parent="#purchaseAccordion"
              >
                <hr />
                <div className="accordion-body">

                  <div className="row text-center fs-5 p-2 bg-gray-200">
                    <div className="col-md-4"><strong>{t('purchase.totalAmount')}</strong></div>
                    <div className="col-md-4"><strong>{t('supplierLoanPayment.paidAmount')}</strong></div>
                    <div className="col-md-4"><strong>{t('supplierLoanPayment.unPaidAmound')}</strong></div>
                  </div>
                  <div className="row mb-3 text-center fs-5 bg-gray-200">
                    <div className="col-md-4">{purchase.totalAmount}</div>
                    <div className="col-md-4">{purchase.paidAmount}</div>
                    <div className="col-md-4">{purchase.unpaidAmount}</div>
                  </div>
                  <table className="table table-bordered table-hover fs-6">
                    <thead className='bg-gray-500 text-light'>
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

        <h3 className="mt-4 mb-3">{t('supplierLoanPayment.makeLoanPayment')}</h3>

        <form onSubmit={formik.handleSubmit}>
          <div className="row">

            {/* Amount */}
            <div className="col-md-4">
              <label className="form-label fs-5">
                {t('supplierLoanPayment.paidLoanAmount')} <span className="text-danger">*</span>
              </label>

              <input
                type="number"
                name="paidLoanAmount"
                value={formik.values.paidLoanAmount ?? ""}
                placeholder={`${selectedSupplierLoanPayment?.balance}`}
                onChange={(e) => {
                  const value = Number(e.target.value)
                  const balance = selectedSupplierLoanPayment?.balance || 0

                  if (value <= balance) {
                    formik.setFieldValue("paidLoanAmount", value)
                  } else {
                    // Prevent typing above balance
                    formik.setFieldValue("paidLoanAmount", balance)
                  }
                }}
                className={clsx('form-control', {
                  'is-invalid': formik.touched.paidLoanAmount && formik.errors.paidLoanAmount,
                  'is-valid': formik.touched.paidLoanAmount && !formik.errors.paidLoanAmount,
                })}
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
                {t('supplierLoanPayment.save')}
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
