import React, { useEffect } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useFormik, FormikProvider, FieldArray } from 'formik'
import { useAppDispatch } from 'redux/hooks'
import { storePurchase } from 'redux/purchases/PurchaseSlice'
import { getSupplier } from 'redux/supplier/SupplierSlice'
import { getGood } from 'redux/good/GoodSlice'
import { useTranslation } from 'react-i18next'
import * as Yup from 'yup'
import { toast } from 'react-toastify'
import { initialValues } from './_module'

interface CreatePurchaseModalProps {
  isOpen: boolean
  onClose: () => void
  handleReloadTable: () => void
}

const CreatePurchase: React.FC<CreatePurchaseModalProps> = ({ isOpen, onClose, handleReloadTable }) => {
  const dispatch = useAppDispatch()
  const { t } = useTranslation()

  const { suppliers } = useSelector((state: any) => state.supplier)
  const { goods } = useSelector((state: any) => state.good)

  useEffect(() => {
    dispatch(getSupplier({}))
    dispatch(getGood({}))
  }, [dispatch])

  // Validation Schema
  const PurchaseSchema = Yup.object().shape({
    supplierId: Yup.string().required('Supplier is required'),

    items: Yup.array().of(
      Yup.object().shape({
        goodId: Yup.string().required('Good is required'),
        quantity: Yup.number().required('Qty required').min(1),
        unitPrice: Yup.number().required('Unit price required').min(0),
      })
    )
  })

  const formik = useFormik({
    initialValues,
    validationSchema: PurchaseSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const response = await dispatch(storePurchase(values) as any)
        if (storePurchase.fulfilled.match(response)) {
          toast.success(<p className="fs-4 fw-bold">{response.payload.message}</p>)
          handleReloadTable()
          onClose()
          resetForm()
        } else {
          toast.error(<p className="fs-4 fw-bold">{response.payload}</p>)
        }
      } catch (error: any) {
        console.error('Error creating supplier:', error.message)
      } finally {
        setSubmitting(false)
      }
    },
  })

  // Recalculate totals when items change
  const recalcTotals = (items: any[]) => {
    const total = items.reduce((sum, d) => sum + d.totalPrice, 0)
    formik.setFieldValue('totalAmount', total)
    formik.setFieldValue('unpaidAmount', total - Number(formik.values.paidAmount))
  }

  return (
    <Modal show={isOpen} onHide={onClose} backdrop="static" size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Add Purchase</Modal.Title>
      </Modal.Header>

      <Modal.Body>
      <FormikProvider value={formik}>
        <form onSubmit={formik.handleSubmit}>

          {/* Supplier & Date */}
          <div className="row mb-4">
            <div className="col-md-6">
              <label className="form-label">Supplier</label>
              <select
                name="supplierId"
                value={formik.values.supplierId}
                 onChange={(e) => {
                            formik.setFieldValue(`supplierId`, Number(e.target.value))
                          }}
                className="form-select"
              >
                <option value="">Select Supplier</option>
                {suppliers?.data?.map((s: any) => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
            </div>

            <div className="col-md-6">
              <label className="form-label">Date</label>
              <input
                type="date"
                name="purchaseDate"
                value={formik.values.purchaseDate}
                onChange={formik.handleChange}
                className="form-control"
              />
            </div>
          </div>

          {/* Purchase items */}
          <FieldArray
            name="items"
            render={(arrayHelpers) => (
              <table className="table table-responsive">
                <thead>
                  <tr>
                    <th>Good</th>
                    <th>Qty</th>
                    <th>Unit Price</th>
                    <th>Total</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {formik.values.items.map((item, index) => (
                    <tr key={index}>
                      <td>
                        <select
                          className="form-select"
                          value={item.goodId}
                          onChange={(e) => {
                            const val = Number(e.target.value)
                            formik.setFieldValue(`items.${index}.goodId`, val)
                          }}
                        >
                          <option value={0}>Select Good</option>
                          {goods?.data?.map((g: any) => (
                            <option key={g.id} value={g.id}>{g.name}</option>
                          ))}
                        </select>
                      </td>

                      <td>
                        <input
                          type="number"
                          className="form-control"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => {
                            const qty = Number(e.target.value)
                            const total = qty * item.unitPrice

                            formik.setFieldValue(`items.${index}.quantity`, qty)
                            formik.setFieldValue(`items.${index}.totalPrice`, total)

                            recalcTotals([
                              ...formik.values.items.map((d, i) =>
                                i === index ? { ...d, totalPrice: total, quantity: qty } : d
                              ),
                            ])
                          }}
                        />
                      </td>

                      <td>
                        <input
                          type="number"
                          className="form-control"
                          min="0"
                          value={item.unitPrice}
                          onChange={(e) => {
                            const price = Number(e.target.value)
                            const total = price * item.quantity

                            formik.setFieldValue(`items.${index}.unitPrice`, price)
                            formik.setFieldValue(`items.${index}.totalPrice`, total)

                            recalcTotals([
                              ...formik.values.items.map((d, i) =>
                                i === index ? { ...d, totalPrice: total, unitPrice: price } : d
                              ),
                            ])
                          }}
                        />
                      </td>

                      <td>{item.totalPrice.toFixed(2)}</td>

                      <td>
                        <Button
                          variant="danger"
                          className='btn btn-sm'
                          disabled={formik.values.items.length === 1}
                          onClick={() => {
                            arrayHelpers.remove(index)
                            recalcTotals(formik.values.items.filter((_, i) => i !== index))
                          }}
                        >
                          <i className="fa-solid fa-trash"></i>
                        </Button>
                      </td>
                    </tr>
                  ))}

                  <tr>
                    <td colSpan={5}>
                      <button type="button" className='btn btn-sm btn-success' onClick={() =>
                        arrayHelpers.push({ goodId: 0, quantity: 1, unitPrice: 0, totalPrice: 0 })
                      }>
                        <span className="fa fa-plus"></span>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            )}
          />

          {/* Totals */}
          <div className="row mt-4">
            <div className="col-md-4">
              <label>Total Amount</label>
              <input type="number" value={formik.values.totalAmount} disabled className="form-control" />
            </div>

            <div className="col-md-4">
              <label>Paid Amount</label>
              <input
                type="number"
                name="paidAmount"
                value={formik.values.paidAmount}
                onChange={(e) => {
                  formik.handleChange(e)
                  formik.setFieldValue(
                    'unpaidAmount',
                    Number(formik.values.totalAmount) - Number(e.target.value)
                  )
                }}
                className="form-control"
              />
            </div>

            <div className="col-md-4">
              <label>Unpaid Amount</label>
              <input type="number" value={formik.values.unpaidAmount} disabled className="form-control" />
            </div>
          </div>

          <div className="mt-4 text-end">
            <Button variant="success" type="submit">Save Purchase</Button>
          </div>
        </form>
        </FormikProvider>
      </Modal.Body>
    </Modal>
  )
}

export default CreatePurchase