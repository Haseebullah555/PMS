import moment from 'jalali-moment'
export const to_jalali = (date: string, condition: boolean) => {
  if (condition === true) {
    return moment(date, 'YYYY-MM-DD HH:mm:ss').format('jYYYY/jMM/jDD HH:mm:ss')
  } else {
    if (date !== null) return moment(date, 'YYYY/MM/DD').locale('fa').format('YYYY/M/D')
    else return null
  }
}
