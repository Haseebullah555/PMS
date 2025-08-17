import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Swal from 'sweetalert2'
import { toast } from 'react-toastify'
import {
  assign_points_to_department,
  delete_department,
  get_department_points,
  get_departments,
  get_points,
} from '../../../../redux/slices/departmentSlice/departmentSlice'
import DepartmentUpdate from './components/DepartmentUpdate'
import DepartmentCreate from './components/DepartmentCreate'
import SetLang from '../../../custom/SetLang'
import CustomLoader from './../../../custom/loader/CustomLoader'
import DataTable from 'react-data-table-component'
import { get_all_generals } from '../../../../redux/slices/generalSlices/generalSlice'
import '../../../custom/customStyle.css'
export default function DepartmentList() {
  const dispatch = useDispatch()
  const department_selector = useSelector((state) => {
    return state.department.items
  })

  const [tableData, setTableData] = useState([])
  const [totalRows, setTotalRows] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [rejectLoading, setRejectLoading] = useState(false)

  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [sortBy, setSortBy] = useState('id')
  const [sortDirection, setSortDirection] = useState('asc')
  const [searchText, setSearchText] = useState('')
  const [selectedObj, setSelectedObj] = useState({})


  const [data, setData] = useState([{ id: null, name: null }])
  const [departmentPoint, setDepartmentPoint] = useState([])
  const [currentPoints, setCurrentPoints] = useState([])

  const handleSelect = (id) => {
    if (id) {
      setData(department_selector.filter((row) => row.id == id))
      dispatch(get_department_points(id))
        .then((res) => {
          handleSetPoints(res.payload)
        })
        .catch((err) => {
          toast.warning(SetLang('Error in performing the action'))
        })
    } else {
      setData([{ id: null, name: null }])
    }
  }

  const handleSetPoints = (resPayload) => {
    const temp = []
    resPayload.map((row) => {
      temp.push(row.id)
    })
    setCurrentPoints(temp)
    setDepartmentPoint(temp)
  }

  const handleChange = (value, event, type) => {
    if (type === 'point') {
      if (event.target.checked) {
        setDepartmentPoint((current) => [...current, value])
        setCurrentPoints((current) => [...current, value])
        // setpoints([...points, value]);
      } else if (!event.target.checked) {
        setDepartmentPoint(
          departmentPoint.filter((row) => {
            return row !== value
          })
        )
        setCurrentPoints(
          departmentPoint.filter((row) => {
            return row !== value
          })
        )
      }
    }

    // else if (type === "role")
    // 	if (event.target.checked) {
    // 		setCurrentRoles((current) => [...current, value]);
    // 	} else if (!event.target.checked) {
    // 		setCurrentRoles(
    // 			currentRoles.filter((row) => {
    // 				return row !== value;
    // 			})
    // 		);
    // 	}
  }

  const handleSave = (id = data[0].id, points = departmentPoint) => {
    setIsLoading(true)
    dispatch(assign_points_to_department({ id, points }))
      .then((res) => {
        if (res.meta.requestStatus === 'fulfilled') {
          toast.success(SetLang('Successfuly Done'))
        }
        setIsLoading(false)
      })
      .catch((err) => {
        setIsLoading(false)
        toast.warning(SetLang('Error in performing the action'))
      })
  }

  const handleDelete = (id) => {
    Swal.fire({
      title: SetLang('Are you sure?'),
      text: SetLang("You won't be able to revert this!"),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: SetLang('Cancel'),
      confirmButtonText: SetLang('Yes, delete it!'),
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(delete_department(id))
          .then((res) => {
            dispatch(get_departments())
          })
          .catch((err) => {
            console.log(err)
          })
      }
    })
  }

  const generals_selector = useSelector((state) => {
    return state.general.all
  })
  useEffect(() => {
    if (generals_selector === null) {
      dispatch(get_all_generals())
    }
  }, [])
  useEffect(() => {
    dispatch(get_departments())
  }, [])
  const theme = useSelector((state) => {
    return state.general.theme
  })
  const columns = [
    {
      name: SetLang('ID'),
      selector: (row) => row.id,
      sortable: true,
      width: '80px',
      center: true,
    },
    {
      name: SetLang('Department'),
      selector: (row) => row.name_da,
      sortable: true,
      width: '400px',
      center: true,
    },
    {
      name: 'UIC',
      selector: (row) => row.UIC,
      sortable: true,
      width: '100px',
      center: true,
    },

    {
      name: SetLang('Action'),
      cell: (row) => (
        <>
          <div>

            <button
              onClick={() => setSelectedObj(row)}
              className='btn btn-primary btn-sm p-1 mx-2'
              data-bs-toggle='modal'
              data-bs-target='#UpdateDepartmentModal'
            >
              {SetLang("Update")}
              <i className='fa fa-edit p-1 m-1 h5' />

            </button>
          </div>

          |
          <button
            onClick={() => {
              handleDelete(row.id)
            }}
            className='btn btn-danger btn-sm p-1 mx-2'

          >
            {SetLang("Delete")}
            <i className='fa fa-trash p-1 m-1 h5' />


          </button>
        </>
      ),
      // omit: true,
      center: "true",
    },
  ]

  const filteredData = department_selector?.filter((item) =>
    Object.values(item).some(
      (value) => value && value.toString().toLowerCase().includes(searchText.toLowerCase())
    )
  )

  return (
    <div className='p-5 card shadow'>
      <>
        <div className='row d-flex justify-content-between'>
          <div className='col-sm-12 col-md-2'>
            <span
              className='btn btn-success'
              data-bs-toggle='modal'
              data-bs-target='#departmentModal'
            >
              {SetLang('New')}
            </span>
            {/* <button className="btn btn-primary p-2 fa fa-filter"></button> */}
          </div>
          <div className='col-sm-12 col-md-3'>
            <label className='form-label' htmlFor='report_date'>
              {/* {SetLang("Search")} */}
            </label>
            <input
              type='text'
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className='form-control col text-start'
              placeholder={SetLang('Search')}
            />
          </div>
        </div>
        <DataTable
          className='custom-data-table'
          theme={theme}
          columns={columns}
          data={filteredData}
          onSort={(column, direction) => {
            setSortBy(column.sortField)
            setSortDirection(direction)
          }}
          progressPending={!filteredData || false}
          progressComponent={<CustomLoader />}
          onChangePage={(page) => setCurrentPage(page)}
          onChangeRowsPerPage={(itemsPerPage) => setItemsPerPage(itemsPerPage)}
          pagination
          // paginationServer
          // paginationServerOptions
          paginationTotalRows={totalRows}
          // expandableRows
          // expandableRowsComponent={ExpandableDetail}
          highlightOnHover
          striped
        />
      </>
      <DepartmentCreate />
      <DepartmentUpdate selectedObj={selectedObj} />
    </div>
  )
}
