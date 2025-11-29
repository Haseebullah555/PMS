export interface FuelStandForm{
    name: string
    staffId : number
    staffName : string    
}

export const initialValues: FuelStandForm = {
    name : '',
    staffId : 0,
    staffName: ''
}