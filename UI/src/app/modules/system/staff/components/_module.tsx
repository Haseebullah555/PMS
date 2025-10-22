export interface StaffForm {
  fullName: string
  position: string
  phone: string
  salary: any
  hireDate: string
  status: boolean
}

export const initialValues: StaffForm = {
  fullName: '',
  phone: '',
  position: '',
  salary: '',
  hireDate: '',
  status: false,

}
