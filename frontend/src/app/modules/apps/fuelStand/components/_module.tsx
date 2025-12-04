export interface FuelStandForm{
    id: number | null
    name: string   
}

export const initialValues = {
  id : null,
  name: "",
  fuelGuns: [
    {
      name: "",
      fuelTypeId: ""
    }
  ]
}
