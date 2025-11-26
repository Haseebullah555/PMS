export interface ExptraExpenseForm{
    expenseType: string
    amount: any
    expenseDate: any
    notes: string
}

export const initialValues: ExptraExpenseForm = {
    expenseType: '',
    amount: null,
    expenseDate: null,
    notes: ""
}