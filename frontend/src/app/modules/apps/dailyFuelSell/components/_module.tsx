export interface DailyFuelSellForm {
  fuelGunId: number | null
  fuelStandId: number | null
  currentMeterDegree: number | null
  oldMeterDegree: number | null
  soldFuelAmount: number | null
  fuelUnitPrice: number | null
  totalPrice:number | null
  // difference: number | null
  collectedMoney: number | null
  date: string
  note: string
}

export const initialValues: DailyFuelSellForm = {
  fuelGunId: null,
  fuelStandId: null,
  currentMeterDegree:  null,
  oldMeterDegree: null,
  soldFuelAmount: null,
  fuelUnitPrice: null,
  totalPrice: null,
  // difference : null,
  collectedMoney: null,
  date: new Date().toISOString().split('T')[0],
  note: ''
}