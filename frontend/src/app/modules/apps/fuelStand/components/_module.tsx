export interface FuelGunForm {
  name: string;
}

export interface FuelStandForm {
  name: string;
  fuelGuns: FuelGunForm[];
}

export const initialValues: FuelStandForm = {
  name: "",
  fuelGuns: [
    {
      name: ""
    },
  ],
};
