export interface DailyFuelSellForm {
  fuelStandId: number | null
  fuelGunId: number | null
  fuelTypeId: number | null
  staffId: number | null

  currentMeterDegree: number | null
  oldMeterDegree: number | null
  soldFuelAmount: number | null
  fuelUnitPrice: number | null
  totalPrice: number | null
  collectedMoney: number | null

  date: string
  note: string | null
}

export interface DailyFuelSellRow {
  id: number
  date: string

  fuelStand: {
    id: number
    name: string
  }

  fuelGun: {
    id: number
    name: string
  }

  fuelType: {
    id: number
    name: string
  }

  staff: {
    id: number
    fullName: string
  }

  currentMeterDegree: number
  oldMeterDegree: number
  soldFuelAmount: number
  fuelUnitPrice: number
  totalPrice: number
  collectedMoney: number
  note?: string
}

export const initialValues: DailyFuelSellForm = {
  fuelStandId: null,
  fuelGunId: null,
  fuelTypeId: null,
  staffId: null,

  currentMeterDegree: null,
  oldMeterDegree: null,
  soldFuelAmount: null,
  fuelUnitPrice: null,
  totalPrice: null,
  collectedMoney: null,

  date: new Date().toISOString().split('T')[0],
  note: ''
}
