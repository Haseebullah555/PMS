export interface UserForm {
  id: string
  name: string
  description: string
  file: string
}

export const initialValues: UserForm = {
  id: '',
  name: '',
  description: '',
  file: '',
}
