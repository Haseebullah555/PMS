import React from 'react'
import { Navigate, Route, Routes, Outlet } from 'react-router-dom'
import { PageLink, PageTitle } from '../../../../_metronic/layout/core'
import { UserOverview } from '../UserOverview'
import UserList from '../UserList'
import UserHeader from '../UserHeader'
import UserUpdate from '../UserUpdate'
import UserCreate from '../UserCreate'

const accountBreadCrumbs: Array<PageLink> = [
  {
    title: 'User',
    path: '/user/overview',
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

const UserNewPage: React.FC = () => {
  return (
    <Routes>
      <Route
        element={
          <>
            <UserHeader />
            <Outlet />
          </>
        }
      >

        <Route
          path='list'
          element={
            <>
              <PageTitle breadcrumbs={accountBreadCrumbs}>List Users</PageTitle>
              <UserList />
            </>
          }
        />
        <Route
          path='create'
          element={
            <>
              <PageTitle breadcrumbs={accountBreadCrumbs}>Create User</PageTitle>
              <UserCreate />
            </>
          }
        />
        <Route
          path='update/:id'
          element={
            <>
              <PageTitle breadcrumbs={accountBreadCrumbs}>Update User</PageTitle>
              <UserUpdate />
            </>
          }
        />
        <Route
          path='overview/:id'
          element={
            <>
              <PageTitle breadcrumbs={accountBreadCrumbs}>Overview</PageTitle>
              <UserOverview />
            </>
          }
        />


        <Route index element={<Navigate to='/user/list' />} />
      </Route>


    </Routes>
  )
}

export default UserNewPage
