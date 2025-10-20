export interface StaffSalaryForm {
  staffId: string
  staff: string,
  amount: any
  date: any
}

export const initialValues: StaffSalaryForm = {
  staffId: '',
  staff: '',
  amount: '',
  date: '',
}
