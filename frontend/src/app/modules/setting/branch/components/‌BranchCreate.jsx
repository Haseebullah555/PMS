import {useState} from 'react'
import {useIntl} from 'react-intl'
import SetLang from '../../../../custom/SetLang'
import {useFormik} from 'formik'
import * as yup from 'yup'
import {useDispatch} from 'react-redux'
import {get_branchs, post_branch} from '../../../../../redux/slices/branchSlice/branchSlice'
import {toast} from 'react-toastify'

export default function BranchCreate() {
  const intl = useIntl()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)

  const formik = useFormik({
    initialValues: {
      name: '',
      dariName: '',
      pashtoName: '',
    },
    validationSchema: yup.object().shape({
      name: yup.string().required(SetLang('This field can not be empty')),
      dariName: yup.string().required(SetLang('This field can not be empty')),
      pashtoName: yup.string().required(SetLang('This field can not be empty')),
    }),
    onSubmit: async (values) => {
        console.log(formik.values, 'valuesssssssss')
      setLoading(true)
      dispatch(post_branch(values))
        .then((res) => {
            console.log(res, 'resppppppp')
          formik.resetForm()
          toast.success(SetLang('Successfuly Done'))
          //   dismissModal()
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

  return (
    <div
      className='modal fade'
      id='branchModal'
      tabIndex={-1}
      aria-labelledby='branchModal'
      aria-hidden='true'
    >
      <div className='modal-dialog modal-lg'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h1 className='modal-title fs-3' id='branchModal'>
              {SetLang('Create New Branch')}
            </h1>
            <button
              type='button'
              className='btn-close'
              data-bs-dismiss='modal'
              aria-label='Close'
            />
          </div>
          <div className='modal-body border '>
            <form handleSubmit={formik.onSubmit}>
              <div className='row'>
                <div className='col-sm-12 col-md-4 col-lg-4 mt-3'>
                  <label className='form-label fw-bold' htmlFor='name'>
                    {SetLang('Branch Eng Name')}
                    <i className=' mx-2 text-danger fa fa-asterisk' style={{fontSize: '7px'}} />
                  </label>
                  <input
                    name='name'
                    placeholder={SetLang('Branch Eng Name')}
                    className='form-control text-start'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                  />
                  {formik.touched.name && formik.errors.name ? (
                    <div className='text-danger'>{formik.errors.name}</div>
                  ) : null}
                </div>
                <div className='col-sm-12 col-md-4 col-lg-4 mt-3'>
                  <label className='form-label fw-bold' htmlFor='name'>
                    {SetLang('Branch Dari Name')}
                    <i className=' mx-2 text-danger fa fa-asterisk' style={{fontSize: '7px'}} />
                  </label>
                  <input
                    name='dariName'
                    placeholder={SetLang('Branch Dari Name')}
                    className='form-control text-start'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.dariName}
                  />
                  {formik.touched.dariName && formik.errors.dariName ? (
                    <div className='text-danger'>{formik.errors.dariName}</div>
                  ) : null}
                </div>
                <div className='col-sm-12 col-md-4 col-lg-4 mt-3'>
                  <label className='form-label fw-bold' htmlFor='name'>
                    {SetLang('Branch Pashto Name')}
                    <i className=' mx-2 text-danger fa fa-asterisk' style={{fontSize: '7px'}} />
                  </label>
                  <input
                    name='pashtoName'
                    placeholder={SetLang('Branch Pashto Name')}
                    className='form-control text-start'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.pashtoName}
                  />
                  {formik.touched.pashtoName && formik.errors.pashtoName ? (
                    <div className='text-danger'>{formik.errors.pashtoName}</div>
                  ) : null}
                </div>
              </div>
            </form>
          </div>
          <div className='modal-footer'>
            <button
              type='button'
              className='btn btn-danger'
              data-bs-dismiss='modal'
              onClick={() => formik.resetForm()}
            >
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
