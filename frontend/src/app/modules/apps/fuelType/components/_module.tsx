export interface FuelTypeForm{
    expenseType: string
    amount: any
    expenseDate: any
    notes: string
}

export const initialValues: FuelTypeForm = {
    expenseType: '',
    amount: null,
    expenseDate: null,
    notes: ""
}