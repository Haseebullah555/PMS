export interface StockForm {
  fuelTypeId: number
  fuelTypeName: string
  description: string
  quantityInLiter: number
  unitPrice: number
  density: number
}

export const initialValues: StockForm = {
  fuelTypeId: 0,
  fuelTypeName: '',
  description: '',
  quantityInLiter: 0,
  unitPrice: 0,
  density: 0,
}
