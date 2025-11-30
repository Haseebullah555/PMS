// initialValues.ts

export interface PurchaseDetail {
  fuelTypeId: string | null
  quantity: number
  unitPrice: number
  totalPrice: number
}

export interface PurchaseForm {
  supplierId: number
  supplierName: string
  purchaseDate: string
  totalAmount: number
  paidAmount: number
  unpaidAmount: number
  items: PurchaseDetail[]
}

export const initialValues = {
  supplierId: null,
  purchaseDate: new Date().toISOString().split('T')[0],
  totalAmount: 0,
  paidAmount: 0,
  unpaidAmount: 0,
  items: [
    { fuelTypeId: "", quantity: 1, unitPrice: 0, totalPrice: 0 },
  ],
}

