export interface CustomerLoanForm {
  customerId: number | null
  fuelTypeId: number | null
  fuelAmount: number | null
  fuelUnitPrice: number |null
  totalPrice: number |null
  loanDate: any
  description: string
  name: string
  phoneNumber: string
  address: string
  balance: any
}

export const initialValues: CustomerLoanForm = {
  customerId: null,
  fuelTypeId: null,
  fuelAmount: null,
  fuelUnitPrice: null,
  totalPrice: null,
  loanDate: null,
  description: '',
  name: '',
  phoneNumber: '',
  address: '',
  balance: null
}
