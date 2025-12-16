export interface FuelDistributionForm {
  fuelGunId: number
  fuelTypeId: number
  quantity: number
  distributionDate: string
}

export const initialValues: FuelDistributionForm = {
  fuelGunId: 0,
  fuelTypeId: 0,
  quantity: 0,
  distributionDate: ''
}
