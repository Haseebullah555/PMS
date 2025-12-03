// initialValues.ts

export interface PurchaseDetail {
  fuelTypeId: string | null
  quantity: number | null
  unitPrice: number | null
  totalPrice: number | null
}

export interface PurchaseForm {
  id: number | null
  supplierId: number
  supplierName: string
  purchaseDate: string
  totalAmount: number
  paidAmount: number | null
  unpaidAmount: number
  items: PurchaseDetail[]
}

export const initialValues = {
  purchaseId: null,
  paidLoanAmount: null,
  paymentDate: new Date().toISOString().split('T')[0],
}