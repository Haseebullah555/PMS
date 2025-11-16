// initialValues.ts

export interface PurchaseDetail {
  goodId: string
  quantity: number
  unitPrice: number
  totalPrice: number
}

export interface PurchaseForm {
  supplierId: string
  supplierName: string
  purchaseDate: string
  totalAmount: number
  paidAmount: number
  unpaidAmount: number
  details: PurchaseDetail[]
}

export const initialValues = {
  supplierId: '',
  purchaseDate: new Date().toISOString().split('T')[0],
  totalAmount: 0,
  paidAmount: 0,
  unpaidAmount: 0,
  details: [
    { goodId: '', quantity: 1, unitPrice: 0, totalPrice: 0 },
  ],
}

