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
