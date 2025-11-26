import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import DataTable from 'react-data-table-component'
import {toast} from 'react-toastify'
import {useRef} from 'react'
import Swal from 'sweetalert2'

import {
  assignPermissionsToRole,
  deleteRole,
  getRoles,
  get_role_permissions,
  getPermissions,
} from '../../../../redux/slices/authorizationSlice/authorizationSlice'
import AssignPermissionToRole from './components/AssignPermissionToRole'
import SetLang from '../../../custom/SetLang'
import RoleCreate from './components/RoleCreate'
import RoleUpdate from './components/RoleUpdate'
import CustomLoader from './../../../custom/loader/CustomLoader'

export default function RoleList() {
  const dispatch = useDispatch()

  const [tableData, setTableData] = useState([])
  const [totalRows, setTotalRows] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [rejectLoading, setRejectLoading] = useState(false)

  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [sortBy, setSortBy] = useState('id')
  const [sortDirection, setSortDirection] = useState('asc')
  const [searchText, setSearchText] = useState('')

  const selectorItems = useSelector((state) => {
    return state.authorization
  })

  const theme = useSelector((state) => {
    return state.general.theme
  })

  const [data, setData] = useState([{id: null, name: null}])
  const [rolePermission, setRolePermission] = useState([])
  const [currentPermissions, setCurrentPermissions] = useState([])
  const modalRef = useRef(null)
  const dismissModal = () => {
    if (modalRef.current) {
      modalRef.current.dismissModal()
    }
  }

  const handleSelect = (id) => {
    if (id) {
      setData(selectorItems.roles.filter((row) => row.id == id))
      dispatch(get_role_permissions(id))
        .then((res) => {
          handleSetPermissions(res.payload)
        })
        .catch((err) => {
          toast.warning(SetLang('Error in performing the action'))
        })
    } else {
      setData([{id: null, name: null}])
    }
  }

  const handleSetPermissions = (resPayload) => {
    const temp = []
    resPayload.map((row) => {
      temp.push(row.id)
    })
    setCurrentPermissions(temp)
    setRolePermission(temp)
  }

  const handleChange = (value, event, type) => {
    if (type === 'permission') {
      if (event.target.checked) {
        setRolePermission((current) => [...current, value])
        setCurrentPermissions((current) => [...current, value])
        // setPermissions([...permissions, value]);
      } else if (!event.target.checked) {
        setRolePermission(
          rolePermission.filter((row) => {
            return row !== value
          })
        )
        setCurrentPermissions(
          rolePermission.filter((row) => {
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

  const handleSave = (id = data[0].id, permissions = rolePermission) => {
    setIsLoading(true)
    dispatch(assignPermissionsToRole({id, permissions}))
      .then((res) => {
        setIsLoading(false)
        dismissModal()
      })
      .catch((err) => {
        setIsLoading(false)
      })
  }

  useEffect(() => {
    dispatch(getPermissions())
  }, [])

  // useEffect(() => {
  // 	setRolePermission
  // }, []);

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
        dispatch(deleteRole(id))
          .then((res) => {
            dispatch(getRoles())
          })
          .catch((err) => {
            console.log(err)
          })
      }
    })
  }
  useEffect(() => {
    dispatch(getRoles())
  }, [])

  const columns = [
    {
      name: SetLang('ID'),
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: SetLang('Name'),
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: SetLang('Guard Name'),
      selector: (row) => row.guard_name,
      sortable: true,
    },

    {
      name: SetLang('Assign Permissions'),
      cell: (row) => (
        <button
          onClick={() => {
            handleSelect(row.id)
          }}
          className=' p-2 btn btn-primary'
          data-bs-toggle='modal'
          data-bs-target='#permissionsForRoleModal'
        >
          <i className='mx-1 fa fa-plus' />
          {SetLang('Assign Permissions')}
        </button>
      ),
    },

    {
      name: SetLang('Action'),
      cell: (row) => (
        <>
          <span
            onClick={() => handleSelect(row.id)}
            className='fa fa-edit p-1 m-1 text-primary h5'
            data-bs-toggle='modal'
            data-bs-target='#rolePut'
          ></span>
          |
          <span
            onClick={() => {
              handleDelete(row.id)
            }}
            className='fa fa-trash p-1 m-1 text-danger h5'
          ></span>
        </>
      ),
    },
  ]

  return (
    <div className='card shadow gap-2 p-5'>
      <div className='d-flex justify-content-between mb-1'>
        <div className='btn-group'>
          <span
            className='btn btn-success btn-sm'
            data-bs-toggle='modal'
            data-bs-target='#rolePost'
          >
            {SetLang('New')}
            {/* New */}
          </span>
          <button className='btn btn-primary btn-sm fa fa-filter'></button>
        </div>

        <div>
          <input type='text' className='form-control' name='search' placeholder='Search...' />
        </div>
      </div>
      <RoleCreate />
      <RoleUpdate data={data} handleSelect={handleSelect} />
      <AssignPermissionToRole
        permissionSelector={selectorItems.permissions ? selectorItems.permissions : []}
        handleChange={handleChange}
        handleSave={handleSave}
        currentPermissions={currentPermissions}
        isLoading={isLoading}
        ref={modalRef}
      />

      <DataTable
        theme={theme}
        columns={columns}
        data={selectorItems.roles ? selectorItems.roles : []}
        sortServer
        onSort={(column, direction) => {
          setSortBy(column.sortField)
          setSortDirection(direction)
        }}
        progressPending={!selectorItems || false}
        progressComponent={<CustomLoader />}
        onChangePage={(page) => setCurrentPage(page)}
        onChangeRowsPerPage={(itemsPerPage) => setItemsPerPage(itemsPerPage)}
        pagination
        paginationServer
        paginationServerOptions
        paginationTotalRows={totalRows}
        // expandableRows
        // expandableRowsComponent={ExpandableDetail}
        highlightOnHover
        striped
      />
    </div>
  )
}
