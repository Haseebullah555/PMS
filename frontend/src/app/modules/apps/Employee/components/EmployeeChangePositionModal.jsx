import * as yup from 'yup'
import { useFormik } from 'formik'
import { Modal } from 'bootstrap'
import { useEffect, useRef } from 'react'
import { forwardRef } from 'react'
import { useImperativeHandle } from 'react'
import SetLang from '../../../../custom/SetLang'
import EnrollInformationForEmployeeChange from './create/EnrollInformationForEmployeeChange'

const EmployeeChangePositionModal = forwardRef(({ selectedObj, isLoading }, ref) => {
  const handleSubmitRef = useRef(null)
  const modalRef = useRef(null)
  useImperativeHandle(ref, () => ({
    dismissModal() {
      closeModal()
      // const modalElement = modalRef.current
      // const modal = Modal.getInstance(modalElement)
      // if (modal) {
      //   modal.hide()
      //   const backdrop = document.getElementsByClassName('modal-backdrop')[0]
      //   if (backdrop) {
      //     backdrop.remove()
      //   }
      // }
    },
  }))

  const closeModal = () => {
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


  const formik = useFormik({
    initialValues: {
      employee_id: '',
      name_da: '',
      father_name: '',
      moi_card_number: '',
      job_title: '',
      employee_type: '',
      grade: '',
      step: '',
      start_date: '',
      end_date: '',
      salary: '',
    },
    validationSchema: yup.object().shape({}),
    onSubmit: async (values) => {
      if (handleSubmitRef && handleSubmitRef.current) {
        handleSubmitRef.current.handleSubmit()
      }
      // formik.resetForm()
    },
  })

  useEffect(() => {
    formik.setValues({
      employee_id: selectedObj?.id,
      name_da: selectedObj?.name_da,
      father_name: selectedObj?.father_name,
      moi_card_number: selectedObj?.moi_card_number,
      job_title:
        selectedObj?.civilian_job_title ||
        selectedObj?.militry_job_title ||
        selectedObj?.nta_job_title ||
        selectedObj?.contractual_job_title,
      employee_type: selectedObj?.e_employee_type,
      grade:
        selectedObj?.civilian_general_category_name ||
        selectedObj?.military_general_category_name ||
        selectedObj?.nta_general_category_name ||
        selectedObj?.e_employee_type,
      step:
        selectedObj?.step ||
        selectedObj?.military_grade_category ||
        selectedObj?.nta_grade ||
        selectedObj?.e_employee_type,
      start_date:
        selectedObj?.fastening_determination ||
        selectedObj?.stabilization_of_rank ||
        selectedObj?.start_contract ||
        selectedObj?.c_start_contract ||
        selectedObj?.e_employee_type,
      end_date: selectedObj?.end_contract || selectedObj?.c_end_contract,
      salary: selectedObj?.c_salary,
    })
  }, [selectedObj?.id])
  // console.log(selectedObj)
  // console.log(formik.values)
  return (
    <div
      ref={modalRef}
      className='modal fade'
      id='changePositionModal'
      tabIndex={-1}
      aria-labelledby='changePositionModal'
      aria-hidden='true'
    >
      <div className='modal-dialog modal-lg modal-dialog-centered'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h1 className='modal-title fs-5' id='changePositionModal'>
              {SetLang('Change Position')}
            </h1>
            <button
              type='button'
              className='btn-close'
              data-bs-dismiss='modal'
              aria-label='Close'
            />
          </div>

          <div className='modal-body border'>
            <table className='table table-responsive table-bordered'>
              <thead className='table-secondary ' style={{ textAlign: 'center' }}>
                <tr>
                  <th width='4%'>{SetLang('id')}</th>
                  <th width='4%'>{SetLang('Name')}</th>
                  <th width='4%'>{SetLang('Father Name')}</th>
                  <th width='4%'>{SetLang('identification_number')}</th>
                </tr>
              </thead>
              <tbody style={{ textAlign: 'center' }}>
                <tr>
                  <td>{formik.values.employee_id}</td>
                  <td>{formik.values.name_da}</td>
                  <td>{formik.values.father_name}</td>
                  <td>{formik.values.moi_card_number}</td>
                </tr>
              </tbody>
            </table>

            <div className='row justify-content-center '>
              <div className='col-sm-12 col-md-6 mt-4'>
                <div className='border border-primary rounded py-5'>
                  <div className='h4 text-center'>{SetLang('Current Position')}</div>
                </div>
                <div className='border border-primary rounded px-5 mt-2'>
                  <div className='h5 bg bg-secondary py-5 mt-5 row '>
                    <div className='col'> {SetLang('Type')}</div>|
                    <div className='col'>{formik.values.employee_type}</div>
                  </div>

                  <div className='h5 bg bg-secondary mt-5 py-5 row '>
                    <div className='col'>{SetLang('Job')}</div>|
                    <div className='col'>{formik.values.job_title}</div>
                  </div>

                  <div className='h5 bg bg-secondary mt-5 py-5 row '>
                    <div className='col'>{SetLang('Bast')}</div>|
                    <div className='col'>{formik.values.grade}</div>
                  </div>
                  <div className='h5 bg bg-secondary mt-5 py-5 row '>
                    <div className='col'>{SetLang('Stip')}</div>|
                    <div className='col'>{formik.values.step}</div>
                  </div>
                  <div className='h5 bg bg-secondary mt-5 py-5 row '>
                    <div className='col'>{SetLang('Start Date')}</div>|
                    <div className='col'>{formik.values.start_date}</div>
                  </div>
                  {formik.values.end_date && (
                    <div className='h5 bg bg-secondary mt-5 py-5 row '>
                      <div className='col'>{SetLang('End Date')}</div>|
                      <div className='col'>{formik.values.end_date}</div>
                    </div>
                  )}
                  {formik.values.salary && (
                    <div className='h5 bg bg-secondary mt-5 py-5 row '>
                      <div className='col'>{SetLang('Salary')}</div>|
                      <div className='col'>{formik.values.salary}</div>
                    </div>
                  )}
                </div>
              </div>
              <div className='col-sm-12 col-md-6 mt-4'>
                <div>
                  <div className='border border-primary rounded p-5'>
                    <div className='h4 text-center'>{SetLang('New Position')}</div>
                  </div>
                  <div className='border border-primary rounded p-5 mt-2'>
                    <EnrollInformationForEmployeeChange
                      ref={handleSubmitRef}
                      selectedObj={selectedObj}
                      closeModal={closeModal}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='modal-footer'>
            <button type='button' className='btn btn-danger' data-bs-dismiss='modal'>
              {SetLang('Close')}
            </button>
            <button
              className='btn btn-primary '
              // type='submit'
              // disabled={
              //   isLoading ||
              //   formik.values.remove_type == '' ||
              //   (formik.values.remove_type == 2 && formik.values.reason == '')
              // }
              onClick={() => {
                if (formik.values.remove_type == 1) {
                } else {
                  formik.handleSubmit()
                }
              }}
            >
              {isLoading ? (
                <span className='indicator-progress' style={{ display: 'block' }}>
                  {/* {intl.formatMessage({id: 'LOGIN_PAGE.PLEASE_WAIT'})} */}
                  <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                </span>
              ) : (
                <span>{SetLang('Save')}</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
})
export default EmployeeChangePositionModal
