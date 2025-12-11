// initialValues.ts

export interface SupplierLoanPaymentForm {
  id: number | null
  name: number
  phoneNumber: string
  address: string
  driverName: number
  carPlate: number | null
}

export const initialValues = {
  supplierId: null,
  purchaseId: null,
  paidLoanAmount:null,
  paymentDate: new Date().toISOString().split('T')[0],
}