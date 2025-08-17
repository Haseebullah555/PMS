import { Navigate, Route, Routes, Outlet } from 'react-router-dom'
import { PageLink, PageTitle } from '../../../../../_metronic/layout/core'
import BranchList from '../BranchList'

const BrachPage = () => {
    return (
        <Routes>
            <Route element={<Outlet />}>
                <Route
                    path='lists'
                    element={ <BranchList /> }
                />
            </Route>
        </Routes>
    )
}
export default BrachPage
