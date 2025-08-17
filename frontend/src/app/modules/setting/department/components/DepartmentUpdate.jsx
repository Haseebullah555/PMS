import {useEffect, useRef, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import * as yup from 'yup'
import {useFormik} from 'formik'
import Select from 'react-select'
import SetLang from '../../../../custom/SetLang'
import {useIntl} from 'react-intl'
import {get_all_generals} from '../../../../../redux/slices/generalSlices/generalSlice'
import {toast} from 'react-toastify'
import {Modal} from 'bootstrap'
import {
  get_departments,
  put_department,
} from './../../../../../redux/slices/departmentSlice/departmentSlice'

export default function DepartmentUpdate({selectedObj}) {
  const modalRef = useRef(null)
  const dismissModal = () => {
    const modalElement = modalRef.current
    const modal = Modal.getInstance(modalElement)
    if (modal) {
      modal.hide()
      const backdrop = document.getElementsByClassName('modal-backdrop')[0]
      if (backdrop) {
        backdrop.remove()
      }
    }
  }

  const generalSelector = useSelector((state) => {
    return state.general.all
  })

  useEffect(() => {
    if (generalSelector === null) {
      dispatch(get_all_generals())
    }
  }, [])
  const intl = useIntl()
  const dispatch = useDispatch()

  const [loading, setLoading] = useState(false)
  const theme = useSelector((state) => {
    return state.general.theme
  })
  const selectStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: theme, // Set the desired background color for the control container
    }),
    singleValue: (provided) => ({
      ...provided,
      color: theme, // Set the desired text color for the selected value
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? 'green' : 'white', // Set the background color for selected and non-selected options
      color: state.isSelected ? 'white' : 'black', // Set the text color for selected and non-selected options
      '&:hover': {
        backgroundColor: 'lightblue', // Set the background color for option on hover
        color: 'black', // Set the text color for option on hover
      },
    }),
  }
  const formik = useFormik({
    initialValues: {
      name_da: '',
      province: '',
      district: '',
      department_type_id: '',
      UIC: '',
    },

    validationSchema: yup.object().shape({
      name_da: yup.string().required(SetLang('This field can not be empty')),
    }),

    onSubmit: async (values) => {
      setLoading(true)
      dispatch(put_department(values))
        .then((res) => {
          formik.resetForm()
          dispatch(get_departments())
          toast.success(SetLang('Successfuly Done'))
          dismissModal()
        })
        .catch((err) => {
          toast.warning(SetLang('Error in performing the action'))
          console.log(err)
        })
        .finally(() => {
          setLoading(false)
        })
    },
  })

  useEffect(() => {
    if (selectedObj && selectedObj.id) {
      formik.setValues({
        id: selectedObj.id,
        department_type_id: selectedObj.department_type_id,
        name_da: selectedObj.name_da,
        province: selectedObj.province_id,
        district: selectedObj.district_id,
        UIC: selectedObj.UIC,
      })
    }
  }, [selectedObj?.id])
  return (
    <div
      ref={modalRef}
      className='modal fade'
      id='UpdateDepartmentModal'
      tabIndex={-1}
      aria-labelledby='UpdateDepartmentModal'
      aria-hidden='true'
    >
      <div className='modal-dialog'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h1 className='modal-title fs-5' id='UpdateDepartmentModal'>
              {intl.formatMessage({id: 'SETTING.DEPARTMENT.UPDATE_DEPARTMENT'})}
            </h1>
            <button
              type='button'
              className='btn-close'
              data-bs-dismiss='modal'
              aria-label='Close'
            />
          </div>
          <div className='modal-body border '>
            <form onSubmit={formik.handleSubmit} className='row'>
              <div>
                <h5 className='text-center'>
                  {intl.formatMessage({id: 'SETTING.DEPARTMENT.UPDATE_DEPARTMENT'})}
                </h5>

                <div className='col-12'>
                  <label className='form-label' htmlFor='name_da'>
                    {intl.formatMessage({id: 'SETTING.DEPARTMENT.DEPARTMENT_NAME'})}
                    <i className=' mx-2 text-danger fa fa-asterisk' style={{fontSize: '7px'}} />
                  </label>
                  <input
                    type='name_da'
                    name='name_da'
                    placeholder={intl.formatMessage({id: 'SETTING.DEPARTMENT.DEPARTMENT_NAME'})}
                    className='form-control text-start'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name_da}
                  />
                  {formik.touched.name_da && formik.errors.name_da ? (
                    <div className='text-danger'>{formik.errors.name_da}</div>
                  ) : null}
                </div>
              </div>

              <div className='col-12 mt-4'>
                <label className='form-label' htmlFor='UIC'>
                  UIC
                </label>
                <input
                  type='UIC'
                  name='UIC'
                  placeholder='UIC'
                  className='form-control text-start'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.UIC}
                />
                {formik.touched.UIC && formik.errors.UIC ? (
                  <div className='text-danger'>{formik.errors.UIC}</div>
                ) : null}
              </div>

              <div className='col-12 mt-4'>
                <label className='form-label' htmlFor='department_type_id'>
                  {SetLang('Moinyat')}
                  {/* <i className=' mx-2 text-danger fa fa-asterisk' style={{fontSize: '7px'}} /> */}
                </label>

                <Select
                  styles={selectStyles}
                  id='department_type_id'
                  name='department_type_id'
                  placeholder='---'
                  isClearable
                  onBlur={formik.handleBlur}
                  value={generalSelector?.department_type?.find(
                    (option) => option.id.toString() == formik.values.department_type_id
                  )}
                  options={generalSelector?.department_type?.map((mapRow) => ({
                    ...mapRow,
                  }))}
                  getOptionLabel={(option) => option.name_da}
                  getOptionValue={(option) => option.id}
                  onChange={(selectedOption) => {
                    formik.setFieldValue(
                      'department_type_id',
                      selectedOption ? selectedOption.id : ''
                    )
                  }}
                />
                {formik.touched.department_type_id && formik.errors.department_type_id ? (
                  <div className='text-danger'>{formik.errors.department_type_id}</div>
                ) : null}
              </div>

              <div className='col-sm-12 col-md-6 mt-4'>
                <label className='form-label' htmlFor='province'>
                  {SetLang('Province')}
                  <i className=' mx-2 text-danger fa fa-asterisk' style={{fontSize: '7px'}} />
                </label>

                <Select
                  styles={selectStyles}
                  id='province'
                  name='province'
                  placeholder='---'
                  isClearable
                  onBlur={formik.handleBlur}
                  value={generalSelector?.provinces?.find(
                    (option) => option.id.toString() == formik.values.province
                  )}
                  options={generalSelector?.provinces?.map((mapRow) => ({
                    ...mapRow,
                  }))}
                  getOptionLabel={(option) => option.name_da}
                  getOptionValue={(option) => option.id}
                  onChange={(selectedOption) => {
                    formik.setFieldValue('province', selectedOption ? selectedOption.id : '')
                  }}
                />

                {formik.touched.province && formik.errors.province ? (
                  <div className='text-danger'>{formik.errors.province}</div>
                ) : null}
              </div>
              <div className='col-sm-12 col-md-6 mt-4'>
                <label className='form-label' htmlFor='district'>
                  {SetLang('District')}
                  <i className=' mx-2 text-danger fa fa-asterisk' style={{fontSize: '7px'}} />
                </label>

                <Select
                  styles={selectStyles}
                  id='district'
                  name='district'
                  placeholder='---'
                  isClearable
                  onBlur={formik.handleBlur}
                  value={generalSelector?.districts?.find(
                    (option) => option.id == formik.values.district
                  )}
                  options={generalSelector?.districts
                    ?.filter((mapDistrict) => mapDistrict.province_id == formik.values.province)
                    .map((mapDistrict) => ({
                      ...mapDistrict,
                    }))}
                  getOptionLabel={(option) => option.name_da}
                  getOptionValue={(option) => option.id}
                  onChange={(selectedOption) =>
                    formik.setFieldValue('district', selectedOption ? selectedOption.id : '')
                  }
                />

                {formik.touched.district && formik.errors.district ? (
                  <div className='text-danger'>{formik.errors.district}</div>
                ) : null}
              </div>
            </form>
          </div>
          <div className='modal-footer'>
            <button type='button' className='btn btn-danger ' data-bs-dismiss='modal'>
              {intl.formatMessage({id: 'CLOSE'})}
            </button>

            <button
              onClick={formik.handleSubmit}
              className='btn btn-primary '
              type='submit'
              disabled={loading}
            >
              {loading ? (
                <span className='indicator-progress' style={{display: 'block'}}>
                  {/* {intl.formatMessage({id: 'LOGIN_PAGE.PLEASE_WAIT'})} */}
                  <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                </span>
              ) : (
                <span>{intl.formatMessage({id: 'SAVE'})}</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
