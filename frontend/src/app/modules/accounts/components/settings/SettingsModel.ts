export interface IProfileDetails {
  avatar: string
  // fName: string
  // lName: string
  // company: string
  // contactPhone: string
  // companySite: string
  // country: string
  // language: string
  // timeZone: string
  // currency: string
  // communications: {
  //   email: boolean
  //   phone: boolean
  // }
  // allowMarketing: boolean


first_name_en: string,
last_name_en: string,
first_name_da: string,
last_name_da: string,
father_name: string,
g_father_name: string,
gender_id: number,
birth_date: string,
birth_place: string,
birth_district_id: number,
birth_province_id: number,
email: string,
dapertment_id: number,
moi_card_number: number,
}

export interface IUpdateEmail {
  newEmail: string
  confirmPassword: string
}

export interface IUpdatePassword {
  currentPassword: string
  newPassword: string
  passwordConfirmation: string
}

export interface IConnectedAccounts {
  google: boolean
  github: boolean
  stack: boolean
}

export interface IEmailPreferences {
  successfulPayments: boolean
  payouts: boolean
  freeCollections: boolean
  customerPaymentDispute: boolean
  refundAlert: boolean
  invoicePayments: boolean
  webhookAPIEndpoints: boolean
}

export interface INotifications {
  notifications: {
    email: boolean
    phone: boolean
  }
  billingUpdates: {
    email: boolean
    phone: boolean
  }
  newTeamMembers: {
    email: boolean
    phone: boolean
  }
  completeProjects: {
    email: boolean
    phone: boolean
  }
  newsletters: {
    email: boolean
    phone: boolean
  }
}

export interface IDeactivateAccount {
  confirm: boolean
}

export const profileDetailsInitValues: IProfileDetails = {
  avatar: '/media/avatars/300-1.jpg',
  // fName: 'Max',
  // lName: 'Smith',
  // company: 'Keenthemes',
  // contactPhone: '044 3276 454 935',
  // companySite: 'keenthemes.com',
  // country: '',
  // language: '',
  // timeZone: '',
  // currency: '',
  // communications: {
  //   email: false,
  //   phone: false,
  // },
  // allowMarketing: false,

  first_name_en : "",
last_name_en : "",
first_name_da : "",
last_name_da : "",
father_name : "",
g_father_name : "",
gender_id : 0,
birth_date : "",
birth_place : "",
birth_district_id :0,
birth_province_id : 0,
email : "",
dapertment_id : 0,
moi_card_number : 0,
}

export const updateEmail: IUpdateEmail = {
  newEmail: '',
  confirmPassword: '',
}

export const updatePassword: IUpdatePassword = {
  currentPassword: '',
  newPassword: '',
  passwordConfirmation: '',
}

export const connectedAccounts: IConnectedAccounts = {
  google: true,
  github: true,
  stack: false,
}

export const emailPreferences: IEmailPreferences = {
  successfulPayments: false,
  payouts: true,
  freeCollections: false,
  customerPaymentDispute: true,
  refundAlert: false,
  invoicePayments: true,
  webhookAPIEndpoints: false,
}

export const notifications: INotifications = {
  notifications: {
    email: true,
    phone: true,
  },
  billingUpdates: {
    email: true,
    phone: true,
  },
  newTeamMembers: {
    email: true,
    phone: false,
  },
  completeProjects: {
    email: false,
    phone: true,
  },
  newsletters: {
    email: false,
    phone: false,
  },
}

export const deactivateAccount: IDeactivateAccount = {
  confirm: false,
}
