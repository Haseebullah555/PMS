export interface DailyFuelSellForm {
  fuelGunId: number | null
  fuelGun: string | null
  fuelStandId: number | null
  fuelStand: any | null
  currentMeterDegree: number | null
  oldMeterDegree: number | null
  soldFuelAmount: number | null
  fuelUnitPrice: number | null
  totalPrice:number | null
  // difference: number | null
  collectedMoney: number | null
  date: string | null
  note: string | null
}

export const initialValues: DailyFuelSellForm = {
  fuelGunId: null,
  fuelGun: null,
  fuelStandId: null,
  fuelStand: null,
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