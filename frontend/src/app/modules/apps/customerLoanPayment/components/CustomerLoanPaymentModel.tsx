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
  selectedCustomerLoanPayment: any // Type it as appropriate based on your data structure
  handleReloadTable: () => void
}

const CustomerLoanPaymentModel: React.FC<EditCustomerLoanPaymentModalProps> = ({ isOpen, onClose, selectedCustomerLoanPayment, handleReloadTable }) => {

  const { t } = useTranslation()
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (selectedCustomerLoanPayment) {
      formik.setFieldValue('purchaseId', selectedCustomerLoanPayment.id)
    }
  }, [selectedCustomerLoanPayment])
  // Validation Schema
  const PurchaseSchema = Yup.object().shape({
    paidLoanAmount: Yup.number()
      .required(t('validation.required', { name: t('customerLoanPayment.paidLoanAmount') }))
      .max(selectedCustomerLoanPayment?.balance || 0, "Cannot exceed balance"),
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
    if (selectedCustomerLoanPayment) {
      formik.setFieldValue('customerId', selectedCustomerLoanPayment.id || '')
    }
  }, [selectedCustomerLoanPayment])
  return (
    <Modal show={isOpen} onHide={onClose} backdrop='static' keyboard={false} size='xl'>
      <Modal.Header closeButton>
        <Modal.Title>{t('purchase.details')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Customer Header Section */}
        <div className="row mb-4 p-3" style={{ backgroundColor: '#153a81'}}>
          <div className="col-md-2">
            <h5 className='text-white'>{t('global.name')}</h5>
          </div>
          <div className="col-md-4">
            <h5 className='text-white'>{selectedCustomerLoanPayment?.name}</h5>
          </div>

          <div className="col-md-2">
            <h5 className='text-white'>{t('customer.balance')}</h5>
          </div>
          <div className="col-md-4">
            <h5 className="text-danger fw-bold">
              {selectedCustomerLoanPayment?.balance}
            </h5>
          </div>
        </div>

        {/* <hr /> */}

        <h3 className="mb-3">{t('customerLoanPayment.purchaseDetial')}</h3>

        <div className="accordion bg-gray-200" id="purchaseAccordion">
          {selectedCustomerLoanPayment?.purchases?.map((purchase: any, index: number) => (
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
                    <div className="col-md-4"><strong>{t('customerLoanPayment.paidAmount')}</strong></div>
                    <div className="col-md-4"><strong>{t('customerLoanPayment.unPaidAmound')}</strong></div>
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

export default CustomerLoanPaymentModel
