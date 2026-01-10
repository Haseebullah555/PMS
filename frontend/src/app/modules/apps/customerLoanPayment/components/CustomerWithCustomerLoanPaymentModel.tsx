import { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { initialValues } from './_module'
import { useTranslation } from 'react-i18next'
import { useAppDispatch } from '../../../../../redux/hooks'
import { Button, Modal } from 'react-bootstrap'
import { toast } from 'react-toastify'
import clsx from 'clsx'
import { storeCustomerLoanPayment } from '../../../../../redux/slices/customerLoanPayment/CustomerLoanPaymentSlice'

interface EditCustomerLoanPaymentModalProps {
  isOpen: boolean
  onClose: () => void
  selectedCustomerWithCustomerLoanPayment: any // Type it as appropriate based on your data structure
  handleReloadTable: () => void
}

const CustomerWithCustomerLoanPaymentModel: React.FC<EditCustomerLoanPaymentModalProps> = ({ isOpen, onClose, selectedCustomerWithCustomerLoanPayment, handleReloadTable }) => {
  
  const { t } = useTranslation()
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (selectedCustomerWithCustomerLoanPayment) {
      formik.setFieldValue('purchaseId', selectedCustomerWithCustomerLoanPayment.id)
    }
  }, [selectedCustomerWithCustomerLoanPayment])
  // Validation Schema
  const PurchaseSchema = Yup.object().shape({
    paidLoanAmount: Yup.number()
      .required(t('validation.required', { name: t('customerLoanPayment.paidLoanAmount') }))
      .max(selectedCustomerWithCustomerLoanPayment?.balance || 0, "Cannot exceed balance"),
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
        const response = await dispatch(storeCustomerLoanPayment(values) as any)
        if (storeCustomerLoanPayment.fulfilled.match(response)) {
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
    if (selectedCustomerWithCustomerLoanPayment) {
      formik.setFieldValue('customerId', selectedCustomerWithCustomerLoanPayment.id || '')
    }
  }, [selectedCustomerWithCustomerLoanPayment])
  console.log(selectedCustomerWithCustomerLoanPayment,"ssssssssssssssssssssssssss")
  return (
    <Modal show={isOpen} onHide={onClose} backdrop='static' keyboard={false} size='xl'>
      <Modal.Header closeButton>
        <Modal.Title>{t('customerLoanPayment.payment')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Customer Header Section */}
        <div className="row mb-4">
          <div className="col-md-2">
            <h5>{t('global.name')}</h5>
          </div>
          <div className="col-md-4">
            <h5>{selectedCustomerWithCustomerLoanPayment?.name}</h5>
          </div>

          <div className="col-md-2">
            <h5>{t('customer.balance')}</h5>
          </div>
          <div className="col-md-4">
            <h5 className="text-danger fw-bold">
              {selectedCustomerWithCustomerLoanPayment?.balance}
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
                <h6 className="mb-3">{t('customerLoanPayment.paymentList')}</h6>
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
                    {selectedCustomerWithCustomerLoanPayment?.customerLoanPayments?.length > 0 ? (
                      selectedCustomerWithCustomerLoanPayment.customerLoanPayments.map((item, i) => (
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
        {Number(selectedCustomerWithCustomerLoanPayment.balance) != 0 && (
          <>
            <hr />

            <h3 className="mt-4 mb-3">{t('customerLoanPayment.makeLoanPayment')}</h3>

            <form onSubmit={formik.handleSubmit}>
              <div className="row">

                {/* Amount */}
                <div className="col-md-4">
                  <label className="form-label fs-5">
                    {t('customerLoanPayment.paidLoanAmount')} <span className="text-danger">*</span>
                  </label>

                  <input
                    type="number"
                    name="paidLoanAmount"
                    value={formik.values.paidLoanAmount ?? ""}
                    placeholder={`${selectedCustomerWithCustomerLoanPayment?.balance}`}
                    onChange={(e) => {
                      const value = Number(e.target.value)
                      const balance = selectedCustomerWithCustomerLoanPayment?.balance || 0

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
                    {t('customerLoanPayment.paymentDate')} <span className="text-danger">*</span>
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
                    {t('customerLoanPayment.save')}
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

export default CustomerWithCustomerLoanPaymentModel
