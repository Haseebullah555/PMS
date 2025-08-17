import * as yup from 'yup'
import {useFormik} from 'formik'
import {Modal} from 'bootstrap'
import {useRef} from 'react'
import {forwardRef} from 'react'
import {useImperativeHandle} from 'react'
import SetLang from '../../../../custom/SetLang'

const EmployeeRejectModal = forwardRef(
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
        reason: '',
        verification_type: '',
      },
      validationSchema: yup.object().shape({
        reason: yup
          .string()
          .min(4, SetLang('This field can not be less than 4 chracters'))
          .required(SetLang('This field can not be empty')),

        verification_type: yup.string().required(SetLang('This field can not be empty')),
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
        id='rejectModal'
        tabIndex={-1}
        aria-labelledby='rejectModal'
        aria-hidden='true'
      >
        <div className='modal-dialog modal-dialog-centered'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h1 className='modal-title fs-5' id='rejectModal'>
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
                <label className='form-label' htmlFor='verification_type'>
                  {SetLang('Confirm or Reject')}
                  <i className=' mx-2 text-danger fa fa-asterisk' style={{fontSize: '7px'}} />
                </label>

                <select
                  id='verification_type'
                  name='verification_type'
                  className='form-control text-start'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.verification_type}
                >
                  <option value=''>---</option>
                  <option key={1} value={1}>
                    {SetLang('Confirm')}
                  </option>
                  <option key={2} value={2}>
                    {SetLang('Reject')}
                  </option>
                </select>

                {formik.touched.verification_type && formik.errors.verification_type ? (
                  <div className='text-danger text-sm' style={{fontSize: '0.850rem'}}>
                    {formik.errors.verification_type}
                  </div>
                ) : null}
              </div>
              {formik.values.verification_type == 2 && (
                <div className=''>
                  <textarea
                    type='text'
                    rows={5}
                    name='reason'
                    placeholder={SetLang('Reason')}
                    className='form-control text-start'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.reason}
                  />
                  {formik.touched.reason && formik.errors.reason ? (
                    <div className='text-danger'>{formik.errors.reason}</div>
                  ) : null}
                </div>
              )}
            </div>

            <div className='modal-footer'>
              <button type='button' className='btn btn-danger' data-bs-dismiss='modal'>
                {SetLang('Close')}
              </button>
              <button
                className='btn btn-primary '
                // disabled={
                //   isLoading ||
                //   formik.values.verification_type == '' ||
                //   (formik.values.verification_type == 2 && formik.values.reason == '')
                // }
                onClick={() => {
                  if (formik.values.verification_type == 1) {
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
export default EmployeeRejectModal
