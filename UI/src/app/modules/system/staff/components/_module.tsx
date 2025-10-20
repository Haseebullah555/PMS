export interface StaffForm {
  fullName: string
  position: string
  phone: string
}

export const initialValues: StaffForm = {
  fullName: '',
  phone: '',
  position: '',
}
