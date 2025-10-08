export interface GoodForm {
  name: string
  description: string
  unit: string
  costPrice: number
  sellPrice: number
}

export const initialValues: GoodForm = {
  name: '',
  description: '',
  unit: '',
  costPrice: 0,
  sellPrice: 0
}
