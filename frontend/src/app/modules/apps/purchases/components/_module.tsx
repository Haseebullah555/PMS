// initialValues.ts

import { ids } from "webpack"

export interface PurchaseDetail {
  fuelTypeId: string | null
  quantity: number | null
  unitPrice: number | null
  totalPrice: number | null
}

export interface PurchaseForm {
  id: number | null
  supplierId: number
  purchaseDate: string
  totalAmount: number
  paidAmount: number | null
  unpaidAmount: number
  items: PurchaseDetail[]
}

export const initialValues = {
  id: null,
  supplierId: null,
  purchaseDate: new Date().toISOString().split('T')[0],
  totalAmount: 0,
  paidAmount: null,
  unpaidAmount: 0,
  items: [
    { fuelTypeId: "", quantity: null, unitPrice: null, totalPrice: 0,density:null },
  ],
}

