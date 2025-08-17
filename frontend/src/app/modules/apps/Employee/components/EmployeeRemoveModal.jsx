import * as yup from 'yup'
import {useFormik} from 'formik'
import {Modal} from 'bootstrap'
import {forwardRef, useRef, useImperativeHandle} from 'react'
import SetLang from '../../../../custom/SetLang'

const EmployeeRemoveModal = forwardRef(
  ({id, isLoading, rejectLoading, handleSubmitReason}, ref) => {
    const modalRef = useRef(null)
    useImperativeHandle(ref, () => ({
      dismissModal() {
        const modalElement = modalRef.current
        const modal = Modal.getInstance(modalElement)
        if (modal) {
          modal.hide()
          const backdrop = document.getElementsByClassName('modal-backdrop')[0]
          if (backdrop) {
            backdrop.remove()
          }
        }
      },
    }))

    const formik = useFormik({
      initialValues: {
        // reason: '',
        remove_type: '',
      },
      validationSchema: yup.object().shape({
        // reason: yup
        //   .string()
        //   .min(4, SetLang('This field can not be less than 4 chracters'))
        //   .required(SetLang('This field can not be empty')),

        remove_type: yup.string().required(SetLang('This field can not be empty')),
      }),
      onSubmit: async (values) => {
        handleSubmitReason(id, 2, values.reason)
        formik.resetForm()
      },
    })
    // console.log(formik.values)
    return (
      <div
        ref={modalRef}
        className='modal fade'
        id='removeModal'
        tabIndex={-1}
        aria-labelledby='removeModal'
        aria-hidden='true'
      >
        <div className='modal-dialog modal-dialog-centered'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h1 className='modal-title fs-5' id='removeModal'>
                {SetLang('Checking')}
              </h1>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'
              />
            </div>

            <div className='modal-body border'>
              <div className=''>
                <label className='form-label' htmlFor='remove_type'>
                  {SetLang('Type')}
                  <i className=' mx-2 text-danger fa fa-asterisk' style={{fontSize: '7px'}} />
                </label>

                <select
                  id='remove_type'
                  name='remove_type'
                  className='form-control text-start'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.remove_type}
                >
                  <option value=''>---</option>
                  <option key={1} value={1}>
                    {SetLang('Conversion')}
                  </option>
                  <option key={2} value={1}>
                    {SetLang('Resign')}
                  </option>
                  <option key={3} value={1}>
                    {SetLang('Drop')}
                  </option>
                  <option key={4} value={2}>
                    {SetLang('Disable')}
                  </option>
                </select>

                {formik.touched.remove_type && formik.errors.remove_type ? (
                  <div className='text-danger text-sm' style={{fontSize: '0.850rem'}}>
                    {formik.errors.remove_type}
                  </div>
                ) : null}
              </div>
            </div>

            <div className='modal-footer'>
              <button type='button' className='btn btn-danger' data-bs-dismiss='modal'>
                {SetLang('Close')}
              </button>
              <button
                className='btn btn-primary '
                // disabled={
                //   isLoading ||
                //   formik.values.remove_type == '' ||
                //   (formik.values.remove_type == 2 && formik.values.reason == '')
                // }
                onClick={() => {
                  if (formik.values.remove_type == 1) {
                    handleSubmitReason(id, 1)
                  } else {
                    formik.handleSubmit()
                  }
                }}
              >
                {isLoading ? (
                  <span className='indicator-progress' style={{display: 'block'}}>
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
  }
)
export default EmployeeRemoveModal
