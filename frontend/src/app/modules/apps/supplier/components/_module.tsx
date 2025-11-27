export interface SupplierForm {
  name: string
  phoneNumber: string
  address: string
  driverName: string
  carPlate : string
}

export const initialValues: SupplierForm = {
  name: '',
  phoneNumber: '',
  address: '',
  driverName :'',
  carPlate :''
}
