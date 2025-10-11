import axios from "axios"

const getExtraExpenses = async (params: any) => {
    const response = await axios.get(`/ExtraExpense/list`, {params})
    return response.data
}

const store = async (formData : any) => {
    const response = await axios.post('/ExtraExpense/create', formData)
    return response.data;
}

const update = async (formData : any) => {
    const response = await axios.post('/ExtraExpense/update', formData);
    return response.data
}
const extraExpenseService = {
    getExtraExpenses,
    store,
    update,
}
export default extraExpenseService