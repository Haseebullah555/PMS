import SetLang from '../../../custom/SetLang'
import BranchCreate from './components/‌BranchCreate'

export default function BranchList() {
  return (
    <div className='p-5 card shadow'>
      <div className='row d-flex justify-content-between'>
        <div className='col-sm-12 col-md-2'>
          <span className='btn btn-success' data-bs-toggle='modal' data-bs-target='#branchModal'>
            {SetLang('Create Branch')}
          </span>
          {/* <button className="btn btn-primary p-2 fa fa-filter"></button> */}
        </div>
        <div className='col-sm-12 col-md-3'>
          {/* <label className='form-label' htmlFor='report_date'> */}
          {/* {SetLang("Search")} */}
          {/* </label> */}
          {/* <input
                      type='text'
                      value={searchText}
                      onChange={(e) => setSearchText(e.target.value)}
                      className='form-control col text-start'
                      placeholder={SetLang('Search')}
                    /> */}
        </div>
      </div>
      {/* <DataTable
        className='custom-data-table'
        theme={theme}
        columns={columns}
        data={filteredData}
        onSort={(column, direction) => {
          setSortBy(column.sortField)
          setSortDirection(direction)
        }}
        progressPending={!filteredData || false}
        progressComponent={<CustomLoader />}
        onChangePage={(page) => setCurrentPage(page)}
        onChangeRowsPerPage={(itemsPerPage) => setItemsPerPage(itemsPerPage)}
        pagination
        // paginationServer
        // paginationServerOptions
        paginationTotalRows={totalRows}
        // expandableRows
        // expandableRowsComponent={ExpandableDetail}
        highlightOnHover
        striped
      /> */}

      <BranchCreate />
    </div>
  )
}
