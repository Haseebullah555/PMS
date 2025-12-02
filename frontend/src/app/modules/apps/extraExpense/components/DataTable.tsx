import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { debounce } from 'lodash'
import { ExptraExpenseForm } from "./_module";
import { t } from "i18next";
import { DropdownButton, Dropdown } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import { getExtraExpenses } from "../../../../../redux/slices/extraExpense/ExtraExpenseSlice";
import UnAuthorized from "../../../../customes/UnAuthorized";
const SORT_ASC = 'asc'
const SORT_DESC = 'desc'
const DataTable: React.FC<any> = ({ headers, columns, reload, handleEdit }) => {
    const [isAuthorized, setIsAuthorized] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(true);
    const [search, setSearch] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [perPage, setPerPage] = useState<number>(10);
    const [pagination, setPagination] = useState<any>({});
    const [sortOrder, setSortOrder] = useState<string>(SORT_ASC);
    const [sortColumn, setSortColumn] = useState<string>(columns[0]);
    const [data, setData] = useState<ExptraExpenseForm[]>([]);
    const dispatch = useAppDispatch();

    const extraExpenses = useAppSelector((state) => state.extraExpense.extraExpenses);


    const handleSearch = useRef(
        debounce((query: string) => {
            setLoading(true);
            setSearch(query);
            setCurrentPage(1);
            setSortOrder(SORT_ASC);
            setSortColumn(columns[0]);
        }, 500)
    ).current

    const handlePerPage = useCallback(
        (newPerPage: number) => {
            setLoading(true);
            setCurrentPage(1);
            setPerPage(newPerPage);

        },
        [setCurrentPage, setPerPage]
    )

    const handleSort = (column: string) => {
        if (column === sortColumn) {
            setSortOrder((prevSortOrder) => (prevSortOrder === SORT_ASC ? SORT_DESC : SORT_ASC))
        } else {
            setSortColumn(column)
            setSortOrder(SORT_ASC)
        }
    }
    useEffect(() => {
        const params = {
            search,
            sort_field: sortColumn,
            sort_order: sortOrder,
            per_page: perPage,
            page: currentPage,
        }
        dispatch(getExtraExpenses(params)).then((res) => {
            if (res.meta.requestStatus === 'fulfilled') {
                setLoading(true)
            } else if (res.meta.requestStatus === 'rejected') {
                setIsAuthorized(false)
            }
            setLoading(false)
        })
    }, [dispatch, reload, currentPage, perPage, search, sortColumn, sortOrder])
    useEffect(() => {
        setData(extraExpenses.data)
        setPagination(extraExpenses.meta)
    }, [extraExpenses])


    const memoizedData = useMemo(() => data, [data])
    const memoizedLoading = useMemo(() => loading, [loading])
    return (
        <div>
            {isAuthorized ? (
                <>
                    <div className=" form collapse" id="movementSearch">
                        <div className="row mb-3">
                            <div className="row mb-8 col-lg-12">
                                <div className="col-lg-6 col-md-6 col-sm-12">
                                    <input
                                        type="search"
                                        placeholder="جستجو به اساس نام..."
                                        className="form-control form-control-sm"
                                        onChange={(e) => handleSearch(e.target.value)}
                                    />
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

                    <div className="tableFixHead table-responsive" dir="rtl">
                        <table className="table table-hover table-striped gs-5 gy-4">
                            <thead className="bg-gray-500 text-light">
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
                                            <td className='fw-bolder'>{index + 1}</td>
                                            <td>{item.expenseType}</td>
                                            <td>{item.amount}</td>
                                            <td>{item.expenseDate}</td>
                                            <td>{item.notes}</td>

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
                                                                {/* {t('global.edit', { name: t('global.user') })} */}
                                                            </span>
                                                        </Dropdown.Item>
                                                    </>
                                                </DropdownButton>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </>
            ) : (
                <UnAuthorized />
            )}
        </div>
    )
}
export default DataTable