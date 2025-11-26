export interface PartnerTransactionForm {
  partnerId: any
  partner: any
  amount : any
  type: any
  date: any
}

export const initialValues: PartnerTransactionForm = {
  partnerId: '',
  partner: '',
  amount: '',
  type: '',
  date: ''
}
