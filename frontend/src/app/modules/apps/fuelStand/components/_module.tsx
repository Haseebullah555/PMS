export interface FuelStandForm{
    name: string
    staffId : number
    staffName : string    
}

export const initialValues = {
  name: "",
  staffId: "",
  fuelGuns: [
    {
      name: "",
      fuelTypeId: "",
      quantity: ""
    }
  ]
}
