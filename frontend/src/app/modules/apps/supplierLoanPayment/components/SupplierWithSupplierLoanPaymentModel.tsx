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
  selectedSupplierWithSupplierLoanPayment: any // Type it as appropriate based on your data structure
  handleReloadTable: () => void
}

const SupplierWithSupplierLoanPaymentModel: React.FC<EditSupplierLoanPaymentModalProps> = ({ isOpen, onClose, selectedSupplierWithSupplierLoanPayment, handleReloadTable }) => {

  console.log(selectedSupplierWithSupplierLoanPayment, '=============');
  const { t } = useTranslation()
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (selectedSupplierWithSupplierLoanPayment) {
      formik.setFieldValue('purchaseId', selectedSupplierWithSupplierLoanPayment.id)
    }
  }, [selectedSupplierWithSupplierLoanPayment])
  // Validation Schema
  const PurchaseSchema = Yup.object().shape({
    paidLoanAmount: Yup.number()
      .required(t('validation.required', { name: t('supplierLoanPayment.paidLoanAmount') }))
      .max(selectedSupplierWithSupplierLoanPayment?.balance || 0, "Cannot exceed balance"),
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
    if (selectedSupplierWithSupplierLoanPayment) {
      formik.setFieldValue('supplierId', selectedSupplierWithSupplierLoanPayment.id || '')
    }
  }, [selectedSupplierWithSupplierLoanPayment])
  console.log(selectedSupplierWithSupplierLoanPayment,"ssssssssssssssssssssssssss")
  return (
    <Modal show={isOpen} onHide={onClose} backdrop='static' keyboard={false} size='xl'>
      <Modal.Header closeButton>
        <Modal.Title>{t('supplierLoanPayment.payment')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Supplier Header Section */}
        <div className="row mb-4">
          <div className="col-md-2">
            <h5>{t('global.name')}</h5>
          </div>
          <div className="col-md-4">
            <h5>{selectedSupplierWithSupplierLoanPayment?.name}</h5>
          </div>

          <div className="col-md-2">
            <h5>{t('supplier.balance')}</h5>
          </div>
          <div className="col-md-4">
            <h5 className="text-danger fw-bold">
              {selectedSupplierWithSupplierLoanPayment?.balance}
            </h5>
          </div>
        </div>

        <hr />


        <div className="accordion" id="paidLoanAmountAccordion">
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingLoanPayments">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseLoanPayments"
                aria-expanded="false"
                aria-controls="collapseLoanPayments"
              >
                <h6 className="mb-3">{t('supplierLoanPayment.paymentList')}</h6>
              </button>
            </h2>

            <div
              id="collapseLoanPayments"
              className="accordion-collapse collapse"
              aria-labelledby="headingLoanPayments"
              data-bs-parent="#paidLoanAmountAccordion"
            >
              <div className="accordion-body">
                <table className="table table-bordered table-hover fs-6">
                  <thead>
                    <tr>
                      <th>{t('global.amount')}</th>
                      <th>{t('global.date')}</th>
                    </tr>
                  </thead>

                  <tbody>
                    {selectedSupplierWithSupplierLoanPayment?.supplierLoanPayments?.length > 0 ? (
                      selectedSupplierWithSupplierLoanPayment.supplierLoanPayments.map((item, i) => (
                        <tr key={item.id ?? i}>
                          <td>{item.paidLoanAmount.toLocaleString()}</td>
                          <td>{item.paymentDate}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={2} className="text-center text-muted">
                          No loan payments found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        {Number(selectedSupplierWithSupplierLoanPayment.balance) != 0 && (
          <>
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
                    placeholder={`${selectedSupplierWithSupplierLoanPayment?.balance}`}
                    onChange={(e) => {
                      const value = Number(e.target.value)
                      const balance = selectedSupplierWithSupplierLoanPayment?.balance || 0

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
          </>
        )}

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

export default SupplierWithSupplierLoanPaymentModel
