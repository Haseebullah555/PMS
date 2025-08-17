import {Navigate, Route, Routes, Outlet} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../../../_metronic/layout/core'
import {EmployeeList} from '../EmployeeList'
import EmployeeUpdate from '../EmployeeUpdate'
import EmployeeCreate from '../EmployeeCreate'
import UserCan from './../../../../custom/UserCan'
import UnAuthorized from '../../../../custom/UnAuthorized'
import {useSelector} from 'react-redux'

const employeeBreadCrumbs: Array<PageLink> = [
  {
    title: 'Employee',
    path: '/apps/employee/employee-list',
    isSeparator: false,
    isActive: false,
  },
  {
    title: '',
    path: '',
    isSeparator: true,
    isActive: false,
  },
]

const EmployeePage = () => {
  const userPermissions = useSelector((state: any) => {
    return state?.authentication?.userDetail?.user?.permissions
  })
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path='employee-list'
          element={
            <>
              <PageTitle breadcrumbs={employeeBreadCrumbs}>Employee List</PageTitle>
              {UserCan(['list employee'], userPermissions) ? <EmployeeList /> : <UnAuthorized />}
            </>
          }
        />
        <Route
          path='employee-create'
          element={
            <>
              <PageTitle breadcrumbs={employeeBreadCrumbs}>Employee Create</PageTitle>
              {UserCan(['create employee'], userPermissions) ? (
                <EmployeeCreate />
              ) : (
                <UnAuthorized />
              )}
            </>
          }
        />
        <Route
          path='employee-update'
          element={
            <>
              <PageTitle breadcrumbs={employeeBreadCrumbs}>Employee Update</PageTitle>
              {UserCan(['update employee'], userPermissions) ? (
                <EmployeeUpdate />
              ) : (
                <UnAuthorized />
              )}
            </>
          }
        />

        <Route index element={<Navigate to='/apps/employee/employee-list' />} />
      </Route>
    </Routes>
  )
}

export default EmployeePage
