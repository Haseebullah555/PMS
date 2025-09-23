import {Routes, Route, Outlet} from 'react-router-dom'
import BookList from './components/book/BookList'

const LibraryManagementRoutes = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        {/* User Routes */}
        <Route path='/book/list' element={<BookList />} />
        {/* Role Routes */}
      </Route>
    </Routes>
  )
}
export default LibraryManagementRoutes
