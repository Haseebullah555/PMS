export interface PurchaseForm {
    supplierId: any
    supplierName: string
    purchaseDate: any
    totalAmount: any
    paidAmount: any
    unpaidAmount: any
}

export const initialValues: PurchaseForm = {
    supplierId: '',
    supplierName: '',
    purchaseDate: '',
    totalAmount: '',
    paidAmount: '',
    unpaidAmount: '',
}