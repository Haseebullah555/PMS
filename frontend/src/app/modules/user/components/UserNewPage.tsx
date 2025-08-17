import React from 'react'
import {Navigate, Route, Routes, Outlet} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../../_metronic/layout/core'
import {UserOverview} from '../UserOverview'
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
          path='overview/:id'
          element={
            <>
              <PageTitle breadcrumbs={accountBreadCrumbs}>Overview</PageTitle>
              <UserOverview />
            </>
          }
        />

        <Route
          path='update/:id'
          element={
            <>
              <PageTitle breadcrumbs={accountBreadCrumbs}>Settings</PageTitle>
              <UserUpdate />
            </>
          }
        />
        <Route index element={<Navigate to='/user/list' />} />
      </Route>
      <Route
        path='list'
        element={
          <>
            <PageTitle breadcrumbs={accountBreadCrumbs}>Attendance List</PageTitle>
            <UserList />
          </>
        }
      />
      <Route
        path='create'
        element={
          <>
            <PageTitle breadcrumbs={accountBreadCrumbs}>Settings</PageTitle>
            <UserCreate />
          </>
        }
      />
    </Routes>
  )
}

export default UserNewPage
