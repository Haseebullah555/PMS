export interface GoodForm {
  name: string
  description: string
  unit: string
  costPrice: string
  sellPrice: string
}

export const initialValues: GoodForm = {
  name: '',
  description: '',
  unit: '',
  costPrice: '',
  sellPrice: ''
}
