import { useCallback, useRef, useState } from "react";
import { debounce } from 'lodash'
import UnAuthorized from "app/customes/UnAuthorized";
const SORT_ASC = 'asc'
const SORT_DESC = 'desc'
const DataTable: React.FC<any> = ({ headers, columns, reload, handleEdit }) => {
    const [isAuthorized, setIsAuthorized] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(true);
    const [search, setSearch] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [perPage, setPerPage] = useState<number>(10);
    const [sortOrder, setSortOrder] = useState<string>(SORT_ASC);
    const [sortColumn, setSortColumn] = useState<string>(columns[0]);




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
        (newPerPage: number) =>{
            setLoading(true);
            setCurrentPage(1);
            setPerPage(newPerPage);
            
        },
        [setCurrentPage, setPerPage]
    )
    const handleSort = 
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
                            <tr>
                                {headers.map((header: any) =>(
                                    <th
                                        key={header.headerName}
                                        onClick={(e) => handleSort(header.sort)}
                                        className={`fs-6 fw-bold ${header.headerName === 'عمل' ? 'text-center': ''}`}
                                    >

                                    </th>
                                ))}
                            </tr>
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