// initialValues.ts

export interface CustomerLoanPaymentForm {
  id: number | null
  name: string
  customerId: number | null
  paidLoanAmount: number
  paymentDate: string
  balance: number
  phoneNumber: string
  address: string
}

export const initialValues = {
  customerId: null,
  paidLoanAmount:null,
  balance: null,
  phoneNumber: null,
  address: null,
  paymentDate: new Date().toISOString().split('T')[0],
}