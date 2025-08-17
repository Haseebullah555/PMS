import React, {useEffect, useState} from 'react'
import PersonalInformation from './components/create/PersonalInformation'
import TazkiraInformation from './components/create/TazkiraInformation'
import LiveInformation from './components/create/LiveInformation'
import EnrollInformation from './components/create/EnrollInformation'
import BankInformation from './components/create/BankInformation'
import {useDispatch, useSelector} from 'react-redux'
import {
  civilian_grade_category,
  civilian_step_category,
  getDistricts,
  getProvinces,
  get_genders,
  get_years,
  military_grade_category,
  nta_grade_category,
  nta_step_category,
} from '../../../../redux/slices/generalSlices/generalSlice'

import SetLang from '../../../custom/SetLang'

export default function EmployeeCreate() {
  const dispatch = useDispatch()

  const [view, setView] = useState({
    personal: true,
    tazkira: false,
    live: false,
    enroll: false,
    bank: false,

    st_personal: true,
    st_tazkira: false,
    st_live: false,
    st_enroll: false,
    st_bank: false,
  })

  const provincesSelector = useSelector((state) => {
    return state.general.provinces
  })

  const districtsSelector = useSelector((state) => {
    return state.general.districts
  })

  const genders_selector = useSelector((state) => {
    return state.general.genders
  })

  const military_grade_category_selector = useSelector((state) => {
    return state.general.military_grade_category
  })

  const civilian_grade_categor_selector = useSelector((state) => {
    return state.general.civilian_grade_category
  })

  const civilian_step_category_selector = useSelector((state) => {
    return state.general.civilian_step_category
  })

  const nta_grade_categor_selector = useSelector((state) => {
    return state.general.nta_grade_category
  })

  const nta_step_category_selector = useSelector((state) => {
    return state.general.nta_step_category
  })

  const employee_selector = useSelector((state) => {
    return state.general.employee
  })

  const handleViewChange = (view, type) => {
    if ((view === 'tazkira') & (type === 'next')) {
      setView({
        st_personal: true,
        st_tazkira: true,
        personal: false,
        tazkira: true,
      })
    } else if ((view === 'live') & (type === 'next')) {
      setView({
        st_personal: true,
        st_tazkira: true,
        st_live: true,
        personal: false,
        tazkira: false,
        live: true,
      })
    } else if ((view === 'enroll') & (type === 'next')) {
      setView({
        st_personal: true,
        st_tazkira: true,
        st_live: true,
        st_enroll: true,
        personal: false,
        tazkira: false,
        live: false,
        enroll: true,
      })
    } else if ((view === 'bank') & (type === 'next')) {
      setView({
        st_personal: true,
        st_tazkira: true,
        st_live: true,
        st_enroll: true,
        st_bank: true,
        personal: false,
        tazkira: false,
        live: false,
        enroll: false,
        bank: true,
      })
    } else if ((view === 'personal') & (type === 'reset')) {
      setView({
        st_personal: true,
        st_tazkira: false,
        st_live: false,
        st_enroll: false,
        st_bank: false,
        personal: true,
        tazkira: false,
        live: false,
        enroll: false,
        bank: false,
      })
    } else if ((view === 'personal') & (type === 'back')) {
      setView({
        st_personal: true,
        st_tazkira: false,
        personal: true,
        tazkira: false,
      })
    } else if ((view === 'tazkira') & (type === 'back')) {
      setView({
        st_personal: true,
        st_tazkira: true,
        personal: false,
        tazkira: true,
      })
    } else if ((view === 'live') & (type === 'back')) {
      setView({
        st_personal: true,
        st_tazkira: true,
        st_live: true,
        personal: false,
        tazkira: false,
        live: true,
      })
    } else if ((view === 'enroll') & (type === 'back')) {
      setView({
        st_personal: true,
        st_tazkira: true,
        st_live: true,
        st_enroll: true,
        personal: false,
        tazkira: false,
        live: false,
        enroll: true,
      })
    } else if ((view === 'bank') & (type === 'back')) {
      setView({
        st_personal: true,
        st_tazkira: true,
        st_live: true,
        st_enroll: true,
        st_bank: true,
        personal: false,
        tazkira: false,
        live: false,
        enroll: false,
        bank: true,
      })
    }
  }

  useEffect(() => {
    if (!provincesSelector) {
      dispatch(getProvinces())
        .then((res) => {})
        .catch((err) => {
          console.log(err)
        })
    }

    if (!districtsSelector) {
      dispatch(getDistricts())
        .then((res) => {})
        .catch((err) => {
          console.log(err)
        })
    }

    if (!genders_selector) {
      dispatch(get_genders())
        .then((res) => {})
        .catch((err) => {
          console.log(err)
        })
    }

    if (!military_grade_category_selector) {
      dispatch(military_grade_category())
        .then((res) => {})
        .catch((err) => {
          console.log(err)
        })
    }

    if (!civilian_grade_categor_selector) {
      dispatch(civilian_grade_category())
        .then((res) => {})
        .catch((err) => {
          console.log(err)
        })
    }
    if (!civilian_step_category_selector) {
      dispatch(civilian_step_category())
        .then((res) => {})
        .catch((err) => {
          console.log(err)
        })
    }

    if (!nta_grade_categor_selector) {
      dispatch(nta_grade_category())
        .then((res) => {})
        .catch((err) => {
          console.log(err)
        })
    }
    if (!nta_step_category_selector) {
      dispatch(nta_step_category())
        .then((res) => {})
        .catch((err) => {
          console.log(err)
        })
    }
  }, [])

  return (
    <div className='card shadow p-5 m-0'>
      <div className='row d-flex text-success justify-content-between m-0 p-0'>
        <div className='col-sm-12 col-md-2 col-lg-2 p-0'>
          <div
            className={` border-bottom border-4 text-start  ${
              view.st_personal && 'border-success'
            } px-2 py-4`}
          >
            <span className={`h5 py-1 px-3 mx-2 bg-success text-white rounded  `}>1</span>
            <span className='h5'>{SetLang('Personel Information')}</span>
          </div>
        </div>
        <div className='col-sm-12 col-md-2 col-lg-2 p-0'>
          <div
            className={`border-bottom border-4 text-start  ${
              view.st_tazkira && 'border-success'
            } px-2 py-4`}
          >
            <span className={`h5 py-1 px-3 mx-2 bg-success text-white rounded  `}>2</span>
            <span className='h5'>{SetLang('Tazkira Information')}</span>
          </div>
        </div>
        <div className='col-sm-12 col-md-2 col-lg-2 p-0'>
          <div
            className={` border-bottom border-4 text-start  ${
              view.st_live && 'border-success'
            } px-2 py-4`}
          >
            <span className={`h5 py-1 px-3 mx-2 bg-success text-white rounded  `}>3</span>
            <span className='h5'>{SetLang('Birth and Currenet Place')}</span>
          </div>
        </div>
        <div className='col-sm-12 col-md-2 col-lg-2 p-0'>
          <div
            className={` border-bottom border-4 text-start  ${
              view.st_enroll && 'border-success'
            } px-2 py-4`}
          >
            <span className={`h5 py-1 px-3 mx-2 bg-success text-white rounded  `}>4</span>
            <span className='h5'>{SetLang('Enroll Information')}</span>
          </div>
        </div>
        <div className='col-sm-12 col-md-2 col-lg-2 p-0'>
          <div
            className={` border-bottom border-4 text-start  ${
              view.st_bank && 'border-success'
            } px-2 py-4`}
          >
            <span className={`h5 py-1 px-3 mx-2 bg-success text-white rounded  `}>5</span>
            <span className='h5'>{SetLang('Bank Account')}</span>
          </div>
        </div>
      </div>

      {view.personal ? (
        <PersonalInformation
          genders_selector={genders_selector}
          handleViewChange={handleViewChange}
          employee_selector={employee_selector}
        />
      ) : view.tazkira ? (
        <TazkiraInformation
          handleViewChange={handleViewChange}
          employee_selector={employee_selector}
        />
      ) : view.live ? (
        <LiveInformation
          handleViewChange={handleViewChange}
          provincesSelector={provincesSelector}
          districtsSelector={districtsSelector}
          employee_selector={employee_selector}
        />
      ) : view.enroll ? (
        <EnrollInformation
          handleViewChange={handleViewChange}
          civilian_grade_categor_selector={civilian_grade_categor_selector}
          civilian_step_category_selector={civilian_step_category_selector}
          military_grade_category_selector={military_grade_category_selector}
          nta_grade_categor_selector={nta_grade_categor_selector}
          nta_step_category_selector={nta_step_category_selector}
          employee_selector={employee_selector}
        />
      ) : view.bank ? (
        <BankInformation
          handleViewChange={handleViewChange}
          employee_selector={employee_selector}
        />
      ) : null}
    </div>
  )
}
