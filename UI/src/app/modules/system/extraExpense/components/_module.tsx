export interface ExptraExpenseForm{
    expenseType: string
    amount: number
    expenseDate: Date
    notes: string
}

export const initialValues: ExptraExpenseForm = {
    expenseType: '',
    amount: 0,
    expenseDate: new Date(),
    notes: ""
}