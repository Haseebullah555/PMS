import {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import moment from 'moment'
import {useDispatch, useSelector} from 'react-redux'
import {getEmployees} from '../../../../../redux/slices/employeeSlice/employeeSlice'
import SetLang from '../../../../custom/SetLang'
import UserCan from '../../../../custom/UserCan'

export default function EmployeeDetailModal({id}) {
  const selectorItems = useSelector((state) => {
    return state?.employee?.items
  })

  const userPermissions = useSelector((state) => {
    return state?.authentication?.userDetail?.user?.permissions
  })

  const dispatch = useDispatch()
  const navigate = useNavigate()
  // const { state } = useLocation();
  const [data, setData] = useState()

  useEffect(() => {
    if (!selectorItems) {
      dispatch(getEmployees())
    }
    if (id) {
      if (selectorItems) {
        const temp = selectorItems?.filter((row) => row.id == id)
        setData(temp[0])
      }
    }
  }, [selectorItems, id])
  return (
    <div
      // ref={modalRef}
      className='modal fade'
      id='employeeDetailModal'
      tabIndex={-1}
      aria-labelledby='employeeDetailModal'
      aria-hidden='true'
    >
      <div className='modal-dialog modal-xl modal-dialog-centered'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h1 className='modal-title fs-5' id='employeeDetailModal'>
              {SetLang('Employee Information')}
            </h1>
            <button
              type='button'
              className='btn-close'
              data-bs-dismiss='modal'
              aria-label='Close'
            />
          </div>

          {data && (
            <div>
              <div className='card shadow p-5'>
                <div className='row'>
                  <div className='col-sm-12 col-md-3 mt-3'>
                    <h5 className='text-center mb-4' style={{fontWeight: 'bold'}}>
                      معلومات انگلیسی
                    </h5>
                    <table className='table table-responsive mb-4 table-bordered'>
                      <thead className='table-secondary ' style={{textAlign: 'center'}}>
                        <tr>
                          <th width='4%'>{SetLang('id')}</th>
                          <th width='4%'>First Name</th>
                          <th width='4%'>Last Name</th>
                        </tr>
                      </thead>
                      <tbody style={{textAlign: 'center'}}>
                        <tr>
                          <td>{data.id}</td>
                          <td>{data.name_en}</td>
                          <td>{data.last_name_en}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className='col-sm-12 col-md-9 mt-3'>
                    <h5 className='text-center mb-4' style={{fontWeight: 'bold'}}>
                      معلومات شخصی
                    </h5>
                    <table className='table table-responsive table-bordered mb-4'>
                      <thead className='table-secondary' style={{textAlign: 'center'}}>
                        <tr>
                          <th width='2%'>{SetLang('Name')}</th>
                          <th width='2%'>{SetLang('Last Name')}</th>
                          <th width='2%'>{SetLang('father_name')}</th>
                          <th width='2%'>{SetLang('g_father_name')}</th>
                          <th width='2%'>{SetLang('gender')}</th>
                          <th width='2%'>{SetLang('birth_date')}</th>
                          <th width='2%'>{SetLang('Phone')}</th>
                        </tr>
                      </thead>
                      <tbody style={{textAlign: 'center'}}>
                        <tr>
                          <td>{data.name_da}</td>
                          <td>{data.last_name_da}</td>
                          <td>{data.father_name}</td>
                          <td>{data.grand_father_name}</td>
                          <td>{data.e_gender}</td>
                          <td>{data.birth_date}</td>
                          <td>{data.phone}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className='col-sm-12 col-md-3 mt-3'>
                    <h5 className='text-center mb-4' style={{fontWeight: 'bold'}}>
                      تاریخ ثبت
                    </h5>
                    <table className='table table-responsive table-bordered'>
                      <thead className='table-secondary' style={{textAlign: 'center'}}>
                        <tr>
                          <th width='6%'>{SetLang('created_at')}</th>
                          <th width='6%'>{SetLang('updated_at')}</th>
                        </tr>
                      </thead>
                      <tbody style={{textAlign: 'center'}}>
                        <tr>
                          <td>{moment(data.created_at).format('y-m-d')}</td>
                          <td>{moment(data.updated_at).format('y-m-d')}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className='col-sm-12 col-md-3 mt-3'>
                    <h5 className='text-center mb-4' style={{fontWeight: 'bold'}}>
                      سکونت اصلی
                    </h5>
                    <table className='table table-responsive table-bordered'>
                      <thead className='table-secondary' style={{textAlign: 'center'}}>
                        <tr>
                          <th width='2%'>{SetLang('zone')}</th>
                          <th width='2%'>{SetLang('district')}</th>
                          <th width='2%'>{SetLang('province')}</th>
                        </tr>
                      </thead>
                      <tbody style={{textAlign: 'center'}}>
                        <tr>
                          <td>{data.parmanent_village}</td>
                          <td>{data.pdistrict}</td>
                          <td>{data.pprovince}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className='col-sm-12 col-md-3 mt-3'>
                    <h5 className='text-center mb-4' style={{fontWeight: 'bold'}}>
                      سکونت فعلی
                    </h5>
                    <table className='table table-responsive table-bordered'>
                      <thead className='table-secondary' style={{textAlign: 'center'}}>
                        <tr>
                          <th width='2%'>{SetLang('zone')}</th>
                          <th width='2%'>{SetLang('district')}</th>
                          <th width='2%'>{SetLang('province')}</th>
                        </tr>
                      </thead>
                      <tbody style={{textAlign: 'center'}}>
                        <tr>
                          <td>{data.current_village}</td>
                          <td>{data.current_district}</td>
                          <td>{data.currentProvince}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className='col-sm-12 col-md-3 mt-3'>
                    <h5 className='text-center mb-4' style={{fontWeight: 'bold'}}>
                      معلومات تذکره
                    </h5>
                    <table className='table table-responsive table-bordered mb-4'>
                      <thead className='table-secondary' style={{textAlign: 'center'}}>
                        <tr>
                          <th width='2%'>{SetLang('Tazkira Type')}</th>
                          <th width='2%'>{SetLang('Tazkira Number')}</th>
                        </tr>
                      </thead>
                      <tbody style={{textAlign: 'center'}}>
                        <tr>
                          <td>{data.e_tazkira_type}</td>
                          <td>{data.tazkira_number}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-sm-12 col-md-3  mt-3'>
                    <h5 className='text-center mb-4' style={{fontWeight: 'bold'}}>
                      معلومات بست
                    </h5>
                    {data.civilian_general_category_name && (
                      <>
                        <table className='table table-responsive table-bordered'>
                          <thead className='table-secondary' style={{textAlign: 'center'}}>
                            <tr>
                              <th width='3%'>{SetLang('Bast')}</th>
                              <th width='3%'>{SetLang('Stip')}</th>
                            </tr>
                          </thead>
                          <tbody style={{textAlign: 'center'}}>
                            <tr>
                              <td>{data.civilian_general_category_name}</td>
                              <td>{data.step}</td>
                            </tr>
                          </tbody>
                        </table>
                        <table className='table table-responsive table-bordered mt-3'>
                          <thead className='table-secondary' style={{textAlign: 'center'}}>
                            <tr>
                              <th width='3%'>{SetLang('Job Title')}</th>
                            </tr>
                          </thead>
                          <tbody style={{textAlign: 'center'}}>
                            <tr>
                              <td>{data.civilian_job_title}</td>
                            </tr>
                          </tbody>
                        </table>
                      </>
                    )}
                    {data.military_general_category_id && (
                      <>
                        <table className='table table-responsive table-bordered'>
                          <thead className='table-secondary' style={{textAlign: 'center'}}>
                            <tr>
                              <th width='3%'>{SetLang('Bast')}</th>
                              <th width='3%'>{SetLang('Rotba')}</th>
                              <th width='3%'>{SetLang('Stablization of Rank Date')}</th>
                            </tr>
                          </thead>
                          <tbody style={{textAlign: 'center'}}>
                            <tr>
                              <td>{data.military_general_category_name}</td>
                              <td>{data.military_grade_category}</td>
                              <td>{data.stabilization_of_rank}</td>
                            </tr>
                          </tbody>
                        </table>
                        <table className='table table-responsive table-bordered mt-4'>
                          <thead className='table-secondary' style={{textAlign: 'center'}}>
                            <tr>
                              <th width='3%'>{SetLang('Job Title')}</th>
                            </tr>
                          </thead>
                          <tbody style={{textAlign: 'center'}}>
                            <tr>
                              <td>{data.militry_job_title}</td>
                            </tr>
                          </tbody>
                        </table>
                      </>
                    )}
                    {data.nta_general_category_id && (
                      <>
                        <table className='table table-responsive table-bordered'>
                          <thead className='table-secondary' style={{textAlign: 'center'}}>
                            <tr>
                              <th width='2%'>{SetLang('Grade')}</th>
                              <th width='2%'>{SetLang('Stip')}</th>
                              <th width='2%'>{SetLang('Start Date')}</th>
                              <th width='2%'>{SetLang('End Date')}</th>
                            </tr>
                          </thead>
                          <tbody style={{textAlign: 'center'}}>
                            <tr>
                              <td>{data.nta_general_category_name}</td>
                              <td>{data.nta_grade}</td>
                              <td>{data.start_contract}</td>
                              <td>{data.end_contract}</td>
                            </tr>
                          </tbody>
                        </table>
                        <table className='table table-responsive table-bordered'>
                          <thead className='table-secondary' style={{textAlign: 'center'}}>
                            <tr>
                              <th width='2%'>{SetLang('Job Title')}</th>
                            </tr>
                          </thead>
                          <tbody style={{textAlign: 'center'}}>
                            <tr>
                              <td>{data.nta_job_title}</td>
                            </tr>
                          </tbody>
                        </table>
                      </>
                    )}
                    {data.c_salary && (
                      <>
                        <table className='table table-responsive table-bordered'>
                          <thead className='table-secondary' style={{textAlign: 'center'}}>
                            <tr>
                              <th width='3%'>{SetLang('Salary')}</th>
                              <th width='3%'>{SetLang('Start Date')}</th>
                              <th width='3%'>{SetLang('End Date')}</th>
                            </tr>
                          </thead>
                          <tbody style={{textAlign: 'center'}}>
                            <tr>
                              <td>{data.contractual_salary}</td>
                              <td>{data.c_end_contract}</td>
                              <td>{data.c_start_contract}</td>
                            </tr>
                          </tbody>
                        </table>
                        <table className='table table-responsive table-bordered'>
                          <thead className='table-secondary' style={{textAlign: 'center'}}>
                            <tr>
                              <th width='3%'>{SetLang('Job Title')}</th>
                            </tr>
                          </thead>
                          <tbody style={{textAlign: 'center'}}>
                            <tr>
                              <td>{data.contractual_job_title}</td>
                            </tr>
                          </tbody>
                        </table>
                      </>
                    )}
                  </div>
                  <div className='col-sm-12 col-md-9 mt-3'>
                    <h5 className='text-center mb-4' style={{fontWeight: 'bold'}}>
                      معلومات استخدام
                    </h5>

                    <table className='table table-responsive table-bordered'>
                      <thead className='table-secondary' style={{textAlign: 'center'}}>
                        <tr>
                          <th width='2%'>{SetLang('Type')}</th>
                          <th width='2%'>{SetLang('Account Name')}</th>
                          <th width='2%'>{SetLang('Account Number')}</th>
                          <th width='2%'>{SetLang('Card ID#')}</th>
                          <th width='2%'>{SetLang('Initail Date')}</th>
                        </tr>
                      </thead>
                      <tbody style={{textAlign: 'center'}}>
                        <tr>
                          <td>{data.e_employee_type}</td>
                          <td>{data.account_name}</td>
                          <td>{data.account_number}</td>
                          <td>{data.moi_card_number}</td>
                          <td>{data.fastening_determination}</td>
                        </tr>
                      </tbody>
                    </table>
                    <table className='table table-responsive table-bordered mt-4'>
                      <thead className='table-secondary' style={{textAlign: 'center'}}>
                        <tr>
                          <th width='4%'>{SetLang('Department')}</th>
                          <th width='4%'>{SetLang('Status')}</th>
                        </tr>
                      </thead>
                      <tbody style={{textAlign: 'center'}}>
                        <tr>
                          <td>{data.e_department}</td>
                          <td
                            className={` ${
                              data.e_job_status === 'برحال'
                                ? 'bg-success text-white'
                                : data.e_job_status === 2
                                ? 'bg-success text-white'
                                : data.e_job_status === 2
                                ? 'bg-success text-white'
                                : data.e_job_status === 2
                                ? 'bg-success text-white'
                                : ''
                            }   `}
                          >
                            {data.e_job_status}
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    {data.rejected_reason && (
                      <table className='table table-responsive table-bordered mt-4'>
                        <thead className='table-secondary' style={{textAlign: 'center'}}>
                          <tr>
                            <th width='4%'>{SetLang('Reason')}</th>
                          </tr>
                        </thead>
                        <tbody style={{textAlign: 'center'}}>
                          <tr>
                            <td>{data.rejected_reason}</td>
                          </tr>
                        </tbody>
                      </table>
                    )}
                  </div>

                  <div>
                    {UserCan(['update employee'], userPermissions) && (
                      <button
                        className='btn border border-primary  p-2 rounded'
                        data-bs-dismiss='modal'
                        onClick={() =>
                          navigate('/apps/employee/employee-update', {
                            state: {id: id},
                          })
                        }
                      >
                        <i className='fa fa-edit' />
                        <span className='px-2'>{SetLang('Update')}</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
