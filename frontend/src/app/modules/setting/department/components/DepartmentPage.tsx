import {Navigate, Route, Routes, Outlet} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../../../_metronic/layout/core'
import DepartmentList from './../DepartmentList';


const DepartmentBreadCrumbs: Array<PageLink> = [
  {
    title: 'Departments',
    path: '/settings/department/list',
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

const DepartmentPage = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path='list'
          element={
            <>
              <PageTitle breadcrumbs={DepartmentBreadCrumbs}>Attendance List</PageTitle>
              <DepartmentList />
            </>
          }
        />
        <Route index element={<Navigate to='/settings/department/list' />} />
      </Route>
    </Routes>
  )
}

export default DepartmentPage
