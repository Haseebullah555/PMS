export interface FuelGunForm {
  name: string;
}

export interface FuelStandForm {
  name: string;
  staffId: string | number;
  fuelGuns: FuelGunForm[];
}

export const initialValues: FuelStandForm = {
  name: "",
  staffId: "",
  fuelGuns: [
    {
      name: ""
    },
  ],
};
