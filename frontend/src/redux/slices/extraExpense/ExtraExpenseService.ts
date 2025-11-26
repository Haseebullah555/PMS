import axios from "axios"
const axiosInterceptor = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // ✅ this adds /api automatically
})

const getExtraExpenses = async (params: any) => {
    const response = await axiosInterceptor.get(`/ExtraExpense/list`, {params})
    return response.data
}

const store = async (formData : any) => {
    const response = await axiosInterceptor.post('/ExtraExpense/create', formData)
    return response.data;
}

const update = async (formData : any) => {
    const response = await axiosInterceptor.post('/ExtraExpense/update', formData);
    return response.data
}
const extraExpenseService = {
    getExtraExpenses,
    store,
    update,
}
export default extraExpenseService