import {debounce} from 'lodash'
import {useEffect, useRef, useState, useCallback, useMemo} from 'react'
import Paginator from '../../../../customes/Paginator'
import UnAuthorized from '../../../../customes/UnAuthorized'
import {Dropdown, DropdownButton} from 'react-bootstrap'
import Loader from '../../../../pages/loading/Loader'
import {Link} from 'react-router-dom'
import {useTranslation} from 'react-i18next'

import {StaffPaymentForm} from './_module'
import {useAppDispatch, useAppSelector} from '../../../../../redux/hooks'
import '../../../../../_metronic/assets/css/dataTable.css'
import { getStaffSalaries } from 'redux/staffPayment/StaffPaymentSlice'
import { getStaffsList } from 'redux/staff/StaffSlice'

const SORT_ASC = 'asc'
const SORT_DESC = 'desc'
interface Staff{
  id: any,
  fullName: any
}
const DataTable: React.FC<any> = ({headers, columns, reload, handleEdit}) => {
  const [data, setData] = useState<StaffPaymentForm[]>([])
  const [perPage, setPerPage] = useState<number>(10)
  const [sortColumn, setSortColumn] = useState<string>(columns[0])
  const [sortOrder, setSortOrder] = useState<string>(SORT_ASC)
  const [search, setSearch] = useState<string>('')
  const [isAuthorized, setIsAuthorized] = useState<boolean>(true)
  const [pagination, setPagination] = useState<any>({})
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [loading, setLoading] = useState<boolean>(true)
  const {t} = useTranslation()
  const dispatch = useAppDispatch()

  const {staffSalaries} = useAppSelector((state) => state.staffSalaries)
  const [staffs, setStaffs] = useState<Staff[]>([])
  const handleSort = (column: string) => {
    if (column === sortColumn) {
      setSortOrder((prevSortOrder) => (prevSortOrder === SORT_ASC ? SORT_DESC : SORT_ASC))
    } else {
      setSortColumn(column)
      setSortOrder(SORT_ASC)
    }
  }

  const handleSearch = useRef(
    debounce((query: string) => {
      setLoading(true)
      setSearch(query)
      setCurrentPage(1)
      setSortOrder(SORT_ASC)
      setSortColumn(columns[0])
    }, 500)
  ).current

  const handlePerPage = useCallback(
    (newPerPage: number) => {
      setLoading(true)

      setCurrentPage(1)
      setPerPage(newPerPage)
    },
    [setCurrentPage, setPerPage]
  )
  useEffect(() => {
    const params = {
      search,
      sort_field: sortColumn,
      sort_order: sortOrder,
      per_page: perPage,
      page: currentPage,
    }

    dispatch(getStaffSalaries(params)).then((res) => {
      if (res.meta.requestStatus === 'fulfilled') {
        setLoading(true)
      } else if (res.meta.requestStatus === 'rejected') {
        setIsAuthorized(false)
      }
      setLoading(false)
    })
  }, [dispatch, reload, currentPage, perPage, search, sortColumn, sortOrder])

  useEffect(() => {
    setData(staffSalaries.data)
    setPagination(staffSalaries.meta)
  }, [staffSalaries])
 useEffect(() => {
  const fetchStaffs = async () => {
    setLoading(true); // Set loading to true before fetching
    const res = await dispatch(getStaffsList());
    if (res.meta.requestStatus === 'fulfilled') {
      setStaffs(res.payload);
    }
    setLoading(false); // Set loading to false after handling response
  };

  fetchStaffs();
}, [dispatch]);
  const memoizedData = useMemo(() => data, [data])
  const memoizedLoading = useMemo(() => loading, [loading])
  return (
    <div>
      {true ? (
        <>
          <div className='form collapse' id='movementSearch'>
            <div className='row mb-3'>
              <div className='row mb-8 col-lg-12'>
                <div className='col-lg-6 col-md-6 col-sm-12 mt-2'>
                  <select
                    className='form-select form-select-sm'
                    onChange={(e) => handleSearch(e.target.value)}
                  >
                    <option value=''>{t('global.select', {name: t('staff.staff')})}</option>
                    {staffs.map((staff) => (
                      <option key={staff.id} value={staff.id}>
                        {staff.fullName}
                      </option>
                    ))}
                  </select>
                </div>
                <div className='col-lg-6 col-md-6 col-sm-12 mt-2'>
                  <div className='input-group'>
                    <label className='mt-2 me-2'>تعداد ریکارد صفحه</label>
                    <select
                      className='form-select form-select-sm'
                      value={perPage}
                      onChange={(e) => handlePerPage(Number(e.target.value))}
                    >
                      <option value='5'>5</option>
                      <option value='10'>10</option>
                      <option value='20'>20</option>
                      <option value='50'>50</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='tableFixHead  table-responsive' dir='rtl'>
            <table className='table table-hover table-striped gy-4 gs-5'>
              <thead className='bg-gray-500'>
                <tr>
                  {headers.map((header: any) => (
                    <th
                      key={header.headerName}
                      onClick={(e) => handleSort(header.sort)}
                      className={`fs-6 fw-bold ${header.headerName === 'عمل' ? 'text-center' : ''}`}
                    >
                      {header.headerName.toUpperCase().replace('_', ' ')}
                      {header.sort === sortColumn ? (
                        <span>
                          {sortOrder === SORT_ASC ? (
                            <i className='ms-1 fa fa-arrow-up text-white' aria-hidden='true'></i>
                          ) : (
                            <i className='ms-1 fa fa-arrow-down text-white' aria-hidden='true'></i>
                          )}
                        </span>
                      ) : null}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {!memoizedLoading &&
                  memoizedData.map((item, index) => (
                    <tr key={index} className='fs-5'>
                      <td className='fw-bolder'>{index+ 1}</td>
                      <td>{item.staff}</td>
                      <td>{item.paidAmount}</td>
                      <td>{item.unpaidAmount}</td>
                      <td>{item.paymentDate}</td>
                      <td>{item.remarks}</td>

                      <td className='text-center'>
                        <DropdownButton
                          id='dropdown-item-button'
                          size='sm'
                          title={<i className='fas fa-ellipsis-v fw-bold fs-3'></i>}
                        >
                          <>
                            <Dropdown.Item
                              as='button'
                              className='fw-bold text-primary'
                              onClick={() => handleEdit(item)}
                            >
                              <i className='fas fa-edit text-primary'></i>
                              <span className='btn btn-sm btn-flex fw-bolder fw-bold text-primary'>
                                {t('global.edit', {name: t('global.user')})}
                              </span>
                            </Dropdown.Item>
                          </>
                        </DropdownButton>
                      </td>
                    </tr>
                  ))}

                {memoizedData.length === 0 && !memoizedLoading && (
                  <tr>
                    <td colSpan={9}>
                      <p className='fs-2 text-center text-danger fw-bolder'>
                        {t('global.noRecordFound')}
                      </p>
                    </td>
                  </tr>
                )}
                {memoizedLoading && (
                  <tr>
                    <td colSpan={9}>
                      <Loader />
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {!memoizedLoading && memoizedData.length > 0 && (
            <Paginator
              pagination={pagination}
              pageChanged={(page: number) => {
                setLoading(true)
                setCurrentPage(page)
              }}
              totalItems={data.length}
            />
          )}
        </>
      ) : (
        <UnAuthorized />
      )}
    </div>
  )
}

export default DataTable
