export interface FuelStandForm{
    name: string   
}

export const initialValues = {
  name: "",
  fuelGuns: [
    {
      name: "",
      fuelTypeId: ""
    }
  ]
}
