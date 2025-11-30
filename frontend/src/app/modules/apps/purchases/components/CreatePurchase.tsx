import React, { useEffect } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { useFormik, FormikProvider, FieldArray } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify'
import { initialValues } from './_module'
import { useAppDispatch, useAppSelector } from '../../../../../redux/hooks'
import { useTranslation } from 'react-i18next'
import { getAllSupplier } from '../../../../../redux/slices/supplier/SupplierSlice'
import { storePurchase } from '../../../../../redux/slices/purchases/PurchaseSlice'
import { getAllFuelType } from '../../../../../redux/slices/fuelType/FuelTypeSlice'

interface CreatePurchaseModalProps {
  isOpen: boolean
  onClose: () => void
  handleReloadTable: () => void
}

const CreatePurchase: React.FC<CreatePurchaseModalProps> = ({ isOpen, onClose, handleReloadTable }) => {

  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const suppliers = useAppSelector((state) => state.supplier.allSuppliers)
  const fuelTypes = useAppSelector((state: any) => state.fuelType.fuelTypeAllList)

  // Validation Schema
  const PurchaseSchema = Yup.object().shape({
    supplierId: Yup.string().required('Supplier is required'),

    items: Yup.array().of(
      Yup.object().shape({
        fuelTypeId: Yup.string().required('FuelType is required'),
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


  useEffect(() => {
    if (!suppliers) {
      dispatch(getAllSupplier())
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
  }, [])


  return (
    <Modal show={isOpen} onHide={onClose} backdrop="static" size="xl">
      <Modal.Header closeButton>
        <Modal.Title>
         <i className='fas fa-plus fs-4 text-primary bg-gray-200 rounded p-2'></i> {" "}
         {" "}{t('fuelType.addPurchase')}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <FormikProvider value={formik}>
          <form onSubmit={formik.handleSubmit}>

            {/* Supplier & Date */}
            <div className="row mb-4">
              <div className="col-md-6">
                <label className="form-label">{t('supplier.suppliers')}</label>
                <select
                  name="supplierId"
                  value={formik.values.supplierId ?? ""}
                  onChange={(e) => {
                    formik.setFieldValue(`supplierId`, Number(e.target.value))
                  }}
                  className="form-select"
                >
                  <option value="" disabled selected>
                    {t('global.SELECT.OPTION')}
                  </option>
                  {
                    suppliers?.map((s: any) => (
                      <option key={s.id} value={s.id}>{s.name}</option>
                    ))
                  }
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label">{t('global.date')}</label>
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
            <div className='card bg-gray-200'>
              <div className='card-body'>
                <FieldArray
                  name="items"
                  render={(arrayHelpers) => (
                    <table className="table table-responsive">
                      <thead className='fw-bold fs-5'>
                        <tr>
                          <th>{t('fuelType.fuelTypes')}</th>
                          <th>{t('fuelType.qtn')}</th>
                          <th>{t('fuelType.unitPrice')}</th>
                          <th className='text-center'>{t('fuelType.total')}</th>
                          <th>{t('global.ACTION')}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {formik.values.items.map((item, index) => (
                          <tr key={index}>
                            <td className="w-25">
                              <select
                                className="form-select"
                                value={item.fuelTypeId}
                                onChange={(e) => {
                                  const val = e.target.value
                                  formik.setFieldValue(`items.${index}.fuelTypeId`, val)
                                }}
                              >
                                <option value="" disabled selected>{t('global.WRITE.HERE')}</option>
                                {fuelTypes?.data?.map((g: any) => (
                                  <option key={g.id} value={g.id}>{g.name}</option>
                                ))}
                              </select>
                            </td>
                            <td className="w-25">
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
                            <td className="w-25">
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
                            <td className='w-25 text-center'>
                              <span className="fw-bold fs-3">
                              {item.totalPrice.toFixed(2)}
                              </span>
                              </td>
                            <td className="w-25">
                              <Button
                                className='btn btn-danger btn-sm'
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
                              arrayHelpers.push({ fuelTypeId: 0, quantity: 1, unitPrice: 0, totalPrice: 0 })
                            }>
                              <span className="fa fa-plus"></span>
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  )}
                />
              </div>
            </div>

            {/* Totals */}
            <div className="row mt-4">
              <div className="col-md-4">
                <label className='fw-bold fs-6 mb-2'>{t('global.TOTAL')}</label>
                <input type="number" value={formik.values.totalAmount} disabled className="form-control" />
              </div>

              <div className="col-md-4">
                 <label className='fw-bold fs-6 mb-2'>{t('fuelType.PaidAmount')}</label>
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
                 <label className='fw-bold fs-6 mb-2'>{t('fuelType.unPaidAmount')}</label>
                <input type="number" value={formik.values.unpaidAmount} disabled className="form-control" />
              </div>
            </div>

            <div className="mt-4 text-end">
              <Button variant="success" type="submit">{t('fuelType.addPurchase')}</Button>
            </div>
          </form>
        </FormikProvider>
      </Modal.Body>
    </Modal>
  )
}

export default CreatePurchase