import {dari} from './localization/da/da'
import {pashto} from './localization/pa/pa'

export default function SetLang(word) {
  function setLanguage(word) {
    var getLang = localStorage.getItem('lang')
    if (getLang == 'da') {
      return dari[word]
    } else {
      return pashto[word]
    }
  }
  return setLanguage(word)
}
