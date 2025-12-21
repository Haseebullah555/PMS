export interface FuelDistributionForm {
  fuelGunId: number | null
  fuelTypeId: number | null
  quantity: number | null
  distributionDate: string
}
export interface DailyFuelSellForm {
  fuelGunId: number
  fuelStandId: number
  currentMeterDegree: number
  oldMeterDegree: number
  soldFuelAmount: number
  fuelUnitPrice: number
  totalPrice:number
  collectedMoneyAmount: number
  date: string
  note: string
}

export const initialValues: FuelDistributionForm = {
  fuelGunId: null,
  fuelTypeId: null,
  quantity: null,
  distributionDate: ''
}
export const dailyFuelSellInitialValues: DailyFuelSellForm = {
  fuelGunId: 0,
  fuelStandId: 0,
  currentMeterDegree: 0,
  oldMeterDegree: 0,
  soldFuelAmount: 0,
  fuelUnitPrice: 0,
  totalPrice: 0,
  collectedMoneyAmount: 0,
  date: '',
  note: ''
}