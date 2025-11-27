export interface FuelStandForm{
    expenseType: string
    amount: any
    expenseDate: any
    notes: string
}

export const initialValues: FuelStandForm = {
    expenseType: '',
    amount: null,
    expenseDate: null,
    notes: ""
}