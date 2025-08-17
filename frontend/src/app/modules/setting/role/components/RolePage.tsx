import {Navigate, Route, Routes, Outlet} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../../../_metronic/layout/core'
import RoleList from './../RoleList'

const RoleBreadCrumbs: Array<PageLink> = [
  {
    title: 'Roles',
    path: '/settings/role/list',
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

const RolePage = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path='list'
          element={
            <>
              <PageTitle breadcrumbs={RoleBreadCrumbs}>Attendance List</PageTitle>
              <RoleList />
            </>
          }
        />
        <Route index element={<Navigate to='/settings/role/list' />} />
      </Route>
    </Routes>
  )
}

export default RolePage
