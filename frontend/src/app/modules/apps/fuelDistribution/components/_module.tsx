import { string } from "yup"

export interface FuelDistributionForm {
  fuelGunId: number | null
  quantity: number | null
  fuelType: {
    id: number | null
    name: string | null
  }
  fuelGun:{
    id: number | null
    name: string | null
  }
  distributionDate: string
}
export interface DailyFuelSellForm {
  fuelGunId: number | null
  fuelStandId: number | null
  currentMeterDegree: number | null
  oldMeterDegree: number | null
  soldFuelAmount: number | null
  fuelUnitPrice: number | null
  totalPrice:number | null
  collectedMoney: number | null
  date: string
  note: string
}

export const initialValues: FuelDistributionForm = {
  fuelGunId: null,
  fuelType: {
    id: null,
    name: null
  },
  fuelGun:{
    id: null,
    name: null
  },
  quantity: null,
  distributionDate: new Date().toISOString().split('T')[0]
}
export const dailyFuelSellInitialValues: DailyFuelSellForm = {
  fuelGunId: null,
  fuelStandId: null,
  currentMeterDegree:  null,
  oldMeterDegree: null,
  soldFuelAmount: null,
  fuelUnitPrice: null,
  totalPrice: null,
  collectedMoney: null,
  date: new Date().toISOString().split('T')[0],
  note: ''
}