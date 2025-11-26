export interface StockForm {
  goodId: number
  goodName: string
  description: string
  quantity: number
  unitPrice: number
}

export const initialValues: StockForm = {
  goodId: 0,
  goodName: '',
  description: '',
  quantity: 0,
  unitPrice: 0,
}
