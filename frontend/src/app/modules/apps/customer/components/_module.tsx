export interface CustomerForm {
  name: string
  phoneNumber: string
  address: string
}

export const initialValues: CustomerForm = {
  name: '',
  phoneNumber: '',
  address: '',
}
