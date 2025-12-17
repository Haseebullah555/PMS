export interface StockForm {
  fuelTypeId: number
  fuelTypeName: string
  description: string
  quantity: number
  unitPrice: number
  density: number
}

export const initialValues: StockForm = {
  fuelTypeId: 0,
  fuelTypeName: '',
  description: '',
  quantity: 0,
  unitPrice: 0,
  density: 0,
}
