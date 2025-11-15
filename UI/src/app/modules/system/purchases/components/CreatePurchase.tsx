import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { storePurchase } from '../../../../../redux/purchases/PurchaseSlice'
import { getSupplier } from '../../../../../redux/supplier/SupplierSlice'
import { getGood } from '../../../../../redux/good/GoodSlice'
import { AppDispatch } from '../../../../../redux/store'
import * as Yup from 'yup'
import { Button, Modal } from 'react-bootstrap'
import { useIntl } from 'react-intl'
import { useTranslation } from 'react-i18next'
import { useAppDispatch } from 'redux/hooks'
import { useFormik } from 'formik'
import { initialValues } from './_module'
import { toast } from 'react-toastify'
// import { Button } from '@mui/material'
type PurchaseDetail = {
  goodId: string
  quantity: number
  unitPrice: number
  totalPrice: number
}
// Define the props for the modal
interface CreatePurchaseModalProps {
  isOpen: boolean
  onClose: () => void
  handleReloadTable: () => void
}
const CreatePurchase: React.FC<CreatePurchaseModalProps> = ({ isOpen, onClose, handleReloadTable }) => {
  const intl = useIntl()
    const { t } = useTranslation()
    const dispatch = useAppDispatch()

  const { goods } = useSelector((state: any) => state.good)
  const { suppliers } = useSelector((state: any) => state.supplier)
    // Form Validation Schema
    const PurchaseSchema = Yup.object().shape({
      name: Yup.string().required(t('validation.required', { name: t('supplier.supplier') })),
      address: Yup.string().required(t('validation.required', { name: t('global.address') })),
      phoneNumber: Yup.string()
        .required(t('validation.required', { name: t('global.phone') })) 
        .matches(/^[0-9+]+$/, t('validation.matches', { name: t('global.phone') }))                       
        .matches(/^(?:\+93|0)?7\d{8}$/, t('validation.invalidPhone', { name: t('global.phone') }))                
    })
  const [purchase, setPurchase] = useState({
    supplierId: '',
    purchaseDate: new Date().toISOString().split('T')[0],
    totalAmount: 0,
    paidAmount: 0,
    unpaidAmount: 0,
    details: [
      { goodId: '', quantity: 1, unitPrice: 0, totalPrice: 0 },
    ],
  })

  useEffect(() => {
    dispatch(getSupplier({}))
    dispatch(getGood({}))
  }, [dispatch])

  const handleAddRow = () => {
    setPurchase({
      ...purchase,
      details: [...purchase.details, { goodId: '', quantity: 1, unitPrice: 0, totalPrice: 0 }],
    })
  }

  const handleRemoveRow = (index: number) => {
    const updated = [...purchase.details]
    updated.splice(index, 1)
    setPurchase({ ...purchase, details: updated })
    recalculateTotals(updated)
  }

  const handleDetailChange = <K extends keyof PurchaseDetail>(
    index: number,
    field: K,
    value: PurchaseDetail[K]
  ) => {
    const updated = [...purchase.details]
    updated[index][field] = value

    if (field === 'quantity' || field === 'unitPrice') {
      const qty = Number(updated[index].quantity)
      const price = Number(updated[index].unitPrice)
      updated[index].totalPrice = qty * price
    }

    setPurchase({ ...purchase, details: updated })
    recalculateTotals(updated)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    const updated = { ...purchase, [name]: value }

    if (name === 'paidAmount') {
      updated.unpaidAmount = updated.totalAmount - Number(value)
    }

    setPurchase(updated)
  }

  const recalculateTotals = (details: any[]) => {
    const total = details.reduce((sum, d) => sum + d.totalPrice, 0)
    setPurchase((prev) => ({
      ...prev,
      totalAmount: total,
      unpaidAmount: total - prev.paidAmount,
    }))
  }

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault()
  //   try {
  //     await dispatch(storePurchase(purchase)).unwrap()
  //     alert('✅ Purchase saved successfully!')
  //     setPurchase({
  //       supplierId: '',
  //       purchaseDate: new Date().toISOString().split('T')[0],
  //       totalAmount: 0,
  //       paidAmount: 0,
  //       unpaidAmount: 0,
  //       details: [{ goodId: '', quantity: 1, unitPrice: 0, totalPrice: 0 }],
  //     })
  //   } catch (err) {
  //     alert('❌ Error saving purchase')
  //     console.error(err)
  //   }
  // }
  const formik = useFormik({
    initialValues,
    validationSchema: PurchaseSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const response = await dispatch(storePurchase(values) as any)
        if (storePurchase.fulfilled.match(response)) {
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
      console.error('Error creating supplier:', error.message)
    }
  return (
    <Modal show={isOpen} onHide={onClose} backdrop='static' keyboard={false} size='lg'>
      <Modal.Header closeButton>
        <Modal.Title>{t('global.add', { name: t('purchase.purchase') })}</Modal.Title>
      </Modal.Header>
      <Modal.Body>

      <form onSubmit={formik.handleSubmit}>
        {/* Supplier & Date */}
        <div className="row mb-4">
          <div className="col-md-6">
            <label className="form-label">Supplier</label>
            <select
              name="supplierId"
              value={purchase.supplierId}
              onChange={handleInputChange}
              className="form-select"
              required
            >
              <option value="">Select Supplier</option>
              {suppliers?.data?.map((s: any) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label">Date</label>
            <input
              type="date"
              name="purchaseDate"
              value={purchase.purchaseDate}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
        </div>

        {/* Purchase Details Table */}
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Good</th>
              <th>Quantity</th>
              <th>Unit Price</th>
              <th>Total</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {purchase.details.map((detail, index) => (
              <tr key={index}>
                <td>
                  <select
                    className="form-select"
                    value={detail.goodId}
                    onChange={(e) => handleDetailChange(index, 'goodId', e.target.value)}
                    required
                  >
                    <option value="">Select Good</option>
                    {goods?.data?.map((g: any) => (
                      <option key={g.id} value={g.id}>
                        {g.name}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <input
                    type="number"
                    className="form-control"
                    min="1"
                    value={detail.quantity}
                    onChange={(e) => handleDetailChange(index, 'quantity', Number(e.target.value))}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    className="form-control"
                    min="0"
                    value={detail.unitPrice}
                    onChange={(e) => handleDetailChange(index, 'unitPrice', Number(e.target.value))}
                  />
                </td>
                <td>{detail.totalPrice.toFixed(2)}</td>
                <td>
                  <Button
                    color="error"
                    variant="contained"
                    size="sm"
                    onClick={() => handleRemoveRow(index)}
                    disabled={purchase.details.length === 1}
                  >
                    🗑️
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Button variant="outlined" color="primary" onClick={handleAddRow}>
          ➕ Add Item
        </Button>

        {/* Totals */}
        <div className="mt-4">
          <div className="row">
            <div className="col-md-4">
              <label>Total Amount</label>
              <input
                type="number"
                name="totalAmount"
                value={purchase.totalAmount}
                className="form-control"
                disabled
              />
            </div>
            <div className="col-md-4">
              <label>Paid Amount</label>
              <input
                type="number"
                name="paidAmount"
                value={purchase.paidAmount}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
            <div className="col-md-4">
              <label>Unpaid Amount</label>
              <input
                type="number"
                name="unpaidAmount"
                value={purchase.unpaidAmount}
                className="form-control"
                disabled
              />
            </div>
          </div>
        </div>

        <div className="mt-4 text-end">
          <Button variant="contained" color="success" type="submit">
            💾 Save Purchase
          </Button>
        </div>
      </form>
    </Modal.Body>
    </Modal>
  )
}

export default CreatePurchase
