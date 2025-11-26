export interface StaffPaymentForm {
  staffId: string
  staff: string,
  paidAmount: any
  unpaidAmount: any
  paymentDate: any
  remarks: any
}

export const initialValues: StaffPaymentForm = {
  staffId: '',
  staff: '',
  paidAmount: '',
  unpaidAmount: '',
  paymentDate: '',
  remarks: '',
}
