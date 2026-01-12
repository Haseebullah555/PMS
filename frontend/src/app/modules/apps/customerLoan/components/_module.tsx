// List CustomerLoan 
export interface CustomerLoanForm {
  name: string
  phoneNumber: string
  address: string
  balance: any
}

export const initialValues: CustomerLoanForm = {
  name: '',
  phoneNumber: '',
  address: '',
  balance: null
}

// Create CustomerLoan Form
export interface CreateCustomerLoanForm {
  customerId: number | null
  fuelTypeId: number | null
  fuelAmount: number | null
  fuelUnitPrice: number | null
  totalPrice: number | null
  loanDate: any
  description: string
}
export const createInitialValues: CreateCustomerLoanForm = {
  customerId: null,
  fuelTypeId: null,
  fuelAmount: null,
  fuelUnitPrice: null,
  totalPrice: null,
  loanDate: new Date().toISOString().split('T')[0],
  description: ''
}