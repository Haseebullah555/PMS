export interface FuelTypeForm {
  name: string
  description: string
  unit: string
  costPrice: number
  sellPrice: number
}

export const initialValues: FuelTypeForm = {
  name: '',
  description: '',
  unit: '',
  costPrice: 0,
  sellPrice: 0
}
