import {useEffect, useRef, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import SetLang from '../../../custom/SetLang'
import {getEmployees, verifyEmployee} from '../../../../redux/slices/employeeSlice/employeeSlice'
import EmployeeDetailModal from './components/EmployeeDetailModal'
import EmployeeFilter from './components/EmployeeFilter'
import EmployeeRejectModal from './components/EmployeeRejectModal'
import ExpandableDetail from './components/ExpandableDetail'
import DataTable from 'react-data-table-component'
import CustomLoader from '../../../custom/loader/CustomLoader'
import {toast} from 'react-toastify'
import axios from 'axios'
import {apiUrl} from '../../../../apiUrl'
import UserCan from './../../../custom/UserCan'
import EmployeeRemoveModal from './components/EmployeeRemoveModal'
import EmployeeChangePositionModal from './components/EmployeeChangePositionModal'

const EmployeeList = () => {
  const userPermissions = useSelector((state) => {
    return state?.authentication?.userDetail?.user?.permissions
  })
  const modalRef = useRef(null)
  const dismissModal = () => {
    if (modalRef.current) {
      modalRef.current.dismissModal()
    }
  }

  const theme = useSelector((state) => {
    return state.general.theme
  })
  const selectorItems = useSelector((state) => {
    return state.employee.items
  })
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [showComponent, setShowComponent] = useState(false)
  const [id, setId] = useState()
  const [selectedObj, setSelectedObj] = useState()

  const handleSubmitReason = (id, status, reason) => {
    if (status == 2) setRejectLoading(true)
    else {
      setIsLoading(true)
    }
    dispatch(verifyEmployee({id: id, status: status, reason: reason}))
      .then((res) => {
        if (res.meta.requestStatus === 'fulfilled') {
          toast.success(SetLang('Successfuly Done'))

          handleFetchTableData()
        }
        setIsLoading(false)
        setRejectLoading(false)
        dismissModal()
      })
      .catch((err) => {
        toast.warning(SetLang('Error in performing the action'))

        setIsLoading(false)
        setRejectLoading(false)
        // console.log(err)
      })
  }

  const [tableData, setTableData] = useState([])
  const [totalRows, setTotalRows] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [rejectLoading, setRejectLoading] = useState(false)

  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [sortBy, setSortBy] = useState('id')
  const [sortDirection, setSortDirection] = useState('asc')
  const [searchText, setSearchText] = useState('')

  const fetchData = async () => {
    setIsLoading(true)

    try {
      const response = await axios.get(`${apiUrl}/get-employees`, {
        params: {
          itemsPerPage,
          currentPage,
          sortBy,
          sortDirection,
          searchText,
        },
        headers: {
          Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL2xvZ2luIiwiaWF0IjoxNzA2NjI2NTQ4LCJleHAiOjE3MDY5MTQ1NDgsIm5iZiI6MTcwNjYyNjU0OSwianRpIjoiRjNITmg4Qnd2ektMdjlFUiIsInN1YiI6IjEiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.f6fuRNvnAx-nfDh4VT4rypq7eNMICJNw2RpTN2ZzRqI`,
        },
      })

      setTableData(response.data.data)
      setTotalRows(response.data.total)
    } catch (error) {
      // console.error('Error fetching data:', error)
    }

    setIsLoading(false)
  }

  const handleFetchTableData = () => {
    setIsLoading(true)
    dispatch(
      getEmployees()
      //   {
      //   params: {
      //     itemsPerPage,
      //     currentPage,
      //     sortBy,
      //     sortDirection,
      //     searchText,
      //   },
      // }
    )
      .then((res) => {
        if (res.meta.requestStatus === 'fulfilled') {
          setIsLoading(false)
        }
      })
      .catch((error) => {
        console.log(error)
        setIsLoading(false)
      })
  }

  useEffect(() => {
    // if (!selectorItems) {
    handleFetchTableData()
    // }
  }, [])

  // useEffect(() => {
  //   fetchData()
  //   // handleFetchTableData()
  // }, [currentPage, itemsPerPage, sortBy, sortDirection, searchText])

  const columns = [
    {
      name: SetLang('ID'),
      selector: (row) => row.id,
      sortField: 'id',
      sortable: true,
      width: '60px',
    },
    {
      name: SetLang('Name'),
      sortField: 'name_da',
      selector: (row) => row.name_da,
      sortable: true,
      width: '100px',
    },
    {
      name: SetLang('Father Name'),
      sortField: 'father_name',
      selector: (row) => row.father_name,
      sortable: true,
      width: '100px',
    },

    {
      name: SetLang('Type'),
      sortField: 'employee_type',
      selector: (row) => row.e_employee_type,
      sortable: true,
      width: '80px',
    },
    {
      name: SetLang('Bast'),
      selector: (row) =>
        row.civilian_general_category_name ||
        row.military_general_category_name ||
        row.nta_general_category_name ||
        'بلمقطع',
      // sortable: true,
      width: '130px',
    },

    {
      name: SetLang('Fastening Determination'),
      selector: (row) =>
        row.fastening_determination ||
        row.stabilization_of_rank ||
        row.start_contract ||
        row.contractual_start_contract ||
        '',
      // sortable: true,
      width: '100px',
    },

    {
      name: SetLang('Status'),
      sortField: 'job_status',
      selector: (row) => row.e_job_status,
      sortable: true,
      width: '80px',
    },
    {
      name: SetLang('State'),
      sortField: 'State',
      selector: (row) => (
        <>
          {row.status === 1 ? (
            <div className='bg bg-success rounded text-white px-3 py-2'>
              {SetLang('Approved')}
              {/* <i className=" fa fa-check text-white px-1" /> */}
            </div>
          ) : row.status === 2 ? (
            <div className='bg bg-danger rounded text-white px-3 py-2'>
              {SetLang('Rejected')}
              {/* <i className=" fa fa-close text-white px-1" /> */}
            </div>
          ) : (
            <div className='bg bg-warning rounded text-white p-2'>
              {SetLang('Draft')}
              {/* <i className=" fa fa-verify text-white px-1" /> */}
            </div>
          )}
        </>
      ),
      sortable: true,
      width: '100px',
      center: true,
    },

    {
      name: SetLang('Action'),
      cell: (row) => (
        <>
          {UserCan(['read employee'], userPermissions) && (
            <button
              onClick={() => {
                setId(row.id)
              }}
              data-bs-toggle='modal'
              data-bs-target='#employeeDetailModal'
              className='fa fa-eye p-2 mx-2 text-primary btn border border-primary rounded'
            ></button>
          )}
          |
          {UserCan(['update employee'], userPermissions) && (
            <button
              className='fa fa-edit p-2 mx-2 text-success btn border border-success rounded'
              onClick={() => {
                navigate('/apps/employee/employee-update', {
                  state: {id: row.id},
                })
              }}
            ></button>
          )}
          {UserCan(['verify employee'], userPermissions) && (
            <>
              {row.status != 1 && (
                <button
                  className='btn btn-primary p-2'
                  data-bs-toggle='modal'
                  data-bs-target='#rejectModal'
                  style={{width: '100px', height: '35px'}}
                  onClick={() => setId(row.id)}
                >
                  <span className='text-white h5 mx-1'>{SetLang('Confirm')}</span>
                  <span className='text-white h5 mx-1'>|</span>
                  <span className='text-white h5 mx-1'>{SetLang('Reject')}</span>
                </button>
              )}
            </>
          )}
        </>
      ),
      width: '200px',
      center: true,
    },
    {
      name: SetLang('Change Position'),
      cell: (row) => (
        <>
          {/* {UserCan(['update employee'], userPermissions) && (
            <button
              className=' p-2 mx-2 text-primary btn border border-primary rounded'
              data-bs-toggle='modal'
              data-bs-target='#removeModal'
              onClick={() => setId(row.id)}
            >
              {SetLang('Remove From List')}
            </button>
          )} */}
          {UserCan(['update employee'], userPermissions) && row.e_job_status != 'تبدیل' && (
            <button
              className=' p-1 mx-2 text-primary btn border border-primary rounded'
              data-bs-toggle='modal'
              data-bs-target='#changePositionModal'
              onClick={() => setSelectedObj(row)}
            >
              <i className='fa fa-change' />
              {SetLang('Change Position')}
            </button>
          )}
        </>
      ),
      width: '110px',
      // center: true
    },
  ]
  return (
    <div className='p-5 card shadow'>
      <div className='col-12 mb-5'>
        <div className='row justify-content-between '>
          <div className='col-sm-12 col-md-6'>
            {UserCan(['create employee'], userPermissions) && (
              <button
                className='btn btn-primary'
                onClick={() => navigate('/apps/employee/employee-create')}
              >
                <i className='fa fa-plus mx-2' />
                {SetLang('New')}
              </button>
            )}
            <button
              className='btn btn-success mx-2'
              onClick={() => setShowComponent(!showComponent)}
            >
              <i className='fas fa-arrows-alt-v mx-1' />
              {SetLang('Filter')}
            </button>
          </div>
          {/* <div className='col-sm-12 col-md-2'>
            <input
              type='text'
              id='search'
              value={searchText}
              // onChange={e => onSearch(e.target.value)}
              onChange={(e) => setSearchText(e.target.value)}
              className='form-control col text-start'
              placeholder={SetLang('Search')}
              // autoFocus
            />
          </div> */}
        </div>
      </div>
      <EmployeeDetailModal id={id} />
      <EmployeeFilter showComponent={showComponent} />

      {/* <EmployeeUpdate id={id} /> */}

      <DataTable
        theme={theme}
        columns={columns}
        data={selectorItems}
        // data={tableData}
        sortServer
        onSort={(column, direction) => {
          setSortBy(column.sortField)
          setSortDirection(direction)
        }}
        progressPending={isLoading}
        progressComponent={<CustomLoader />}
        onChangePage={(page) => setCurrentPage(page)}
        onChangeRowsPerPage={(itemsPerPage) => setItemsPerPage(itemsPerPage)}
        pagination
        // paginationServer
        paginationServerOptions
        paginationTotalRows={totalRows}
        expandableRows
        expandableRowsComponent={ExpandableDetail}
        highlightOnHover
        striped

        // title='Employee List'
        // persistTableHead
        // exportToCSV={true}
        // actions={ }
        // subHeader={true}
        // subHeaderWrap={true}
        // subHeaderComponent={EmployeeFilter}
        // noContextMenu={true}
        // contextComponent={EmployeeFilter}
        // contextActions={EmployeeFilter}
        // actions={actionsMemo}

        // expandableRowsComponentProps={{ formik: formik }}
        // subHeaderComponent={
        // 	<CustomSearch searchText={searchText} onSearch={setSearchText} />
        // }
      />
      <EmployeeRejectModal
        handleSubmitReason={handleSubmitReason}
        id={id}
        isLoading={isLoading}
        ref={modalRef}
        rejectLoading={rejectLoading}
      />
      <EmployeeRemoveModal
        handleSubmitReason={handleSubmitReason}
        id={id}
        isLoading={isLoading}
        ref={modalRef}
        rejectLoading={rejectLoading}
      />
      <EmployeeChangePositionModal
        handleSubmitReason={handleSubmitReason}
        selectedObj={selectedObj}
        isLoading={isLoading}
        ref={modalRef}
        rejectLoading={rejectLoading}
      />
    </div>
  )
}
export {EmployeeList}
