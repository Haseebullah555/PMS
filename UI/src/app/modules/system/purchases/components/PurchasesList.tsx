// import React, { useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { AppDispatch, RootState } from '../../../../../redux/store'
// import { getPurchases } from '../../../../../redux/purchases/PurchaseSlice'
// import { Button } from 'react-bootstrap' // or your Metronic Button
// import { useNavigate } from 'react-router-dom'

// const PurchasesList: React.FC = () => {
//   const dispatch = useDispatch<AppDispatch>()
//   const navigate = useNavigate()
//   const { purchases } = useSelector((state: RootState) => state.purchases)

//   const [search, setSearch] = useState('')
//   const [filtered, setFiltered] = useState<any[]>([])

//   useEffect(() => {
//     dispatch(getPurchases({}))
//   }, [dispatch])

//   useEffect(() => {
//     if (search.trim()) {
//       const s = search.toLowerCase()
//       setFiltered(
//         purchases.data?.filter(
//           (p: any) =>
//             p.supplierName?.toLowerCase().includes(s) ||
//             p.invoiceNumber?.toLowerCase().includes(s)
//         )
//       )
//     } else {
//       setFiltered(purchases.data || [])
//     }
//   }, [search, purchases])

//   return (
//     <div className="card shadow-sm p-4">
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <h3 className="fw-bold">Purchase List</h3>
//         <Button variant="primary" onClick={() => navigate('/purchases/create')}>
//           + New Purchase
//         </Button>
//       </div>

//       <div className="mb-3">
//         <input
//           type="text"
//           className="form-control"
//           placeholder="Search by supplier or invoice number..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />
//       </div>

//       <div className="table-responsive">
//         <table className="table table-striped align-middle">
//           <thead>
//             <tr>
//               <th>#</th>
//               <th>Date</th>
//               <th>Invoice No.</th>
//               <th>Purchase</th>
//               <th>Total Amount</th>
//               <th>Paid</th>
//               <th>Unpaid</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filtered && filtered.length > 0 ? (
//               filtered.map((p: any, index: number) => (
//                 <tr key={p.id}>
//                   <td>{index + 1}</td>
//                   <td>{new Date(p.date).toLocaleDateString()}</td>
//                   <td>{p.invoiceNumber}</td>
//                   <td>{p.supplierName}</td>
//                   <td>{p.totalAmount.toFixed(2)}</td>
//                   <td>{p.paidAmount.toFixed(2)}</td>
//                   <td>{p.unpaidAmount.toFixed(2)}</td>
//                   <td>
//                     <Button
//                       size="sm"
//                       variant="outline-primary"
//                       onClick={() => navigate(`/purchases/view/${p.id}`)}
//                     >
//                       View
//                     </Button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan={8} className="text-center text-muted py-3">
//                   No purchases found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   )
// }

// export default PurchasesList
import {Fragment, useState} from 'react'
import {Link} from 'react-router-dom'
import DataTable from './Datatable'
import {Dropdown, DropdownButton} from 'react-bootstrap'
import {useTranslation} from 'react-i18next'
import CreatePurchaseModal from './CreatePurchase'
import EditPurchaseModal from './EditPurchase'

const PurchasesList = () => {
  const {t} = useTranslation()
  const [isModalOpen, setModalOpen] = useState(false)
  const [isEditModalOpen, setEditModalOpen] = useState(false)
  const [selectedPurchase, setSelectedPurchase] = useState(null)

  const closeModal = () => setModalOpen(false)
  const openModal = () => setModalOpen(true)

  const closeEditModal = () => setEditModalOpen(false)
  const openEditModal = (Purchase: any) => {
    setSelectedPurchase(Purchase)
    setEditModalOpen(true)
  }

  const [reloadTable, setReloadTable] = useState(false)

  const handleReloadTable = () => {
    setReloadTable((prev) => !prev) // Toggle to trigger table reload
  }

  return (
    <>
      <Fragment>
        <div className='card mb-5 mb-xl-10' id='kt_profile_details_view'>
          <div className='card-header cursor-pointer'>
            <div className='card-title m-0'>
              <h3 className='fw-bolder m-0'>
                <i className='fas fa-users fs-4 text-primary'></i>{' '}
                {t('global.list', {name: t('supplier.suppliers')})}
              </h3>
            </div>
            <div>
              <div className='d-none d-lg-flex mt-5'>
                <div className='d-flex align-items-center'>
                  <button
                    className='btn btn-primary btn-sm align-self-center fw-bold'
                    onClick={openModal}
                  >
                    <i className='fas fa-plus'></i>
                    {t('global.add', {name: t('supplier.suppliers')})}
                  </button>

                  <div className='me-2 ms-2'>
                    <button
                      className='btn btn-sm btn-flex btn-primary fw-bolder'
                      data-bs-toggle='collapse'
                      data-bs-target='#movementSearch'
                      aria-expanded='true'
                      aria-controls='movementSearch'
                    >
                      <span className='svg-icon svg-icon-5 svg-icon-gray-500 me-1'>
                        <i className='fa-solid fa-arrow-down-short-wide'></i>
                      </span>
                      {t('global.search')}
                    </button>
                  </div>

                  <Link className='btn btn-sm btn-flex btn-danger fw-bold' to='/dashboard'>
                    <b>
                      <i className='fa-solid fa-reply-all'></i>
                    </b>
                  </Link>
                </div>
              </div>

              <div className='dropdown d-lg-none mt-5'>
                <DropdownButton
                  id='dropdown-item-button'
                  size='sm'
                  title={<i className='fas fa-ellipsis-v fw-bold fs-3'></i>}
                >
                  <>
                    <Dropdown.Item as='button'>
                      <Link className='fw-bolder text-primary' to={'/authentication/create-user'}>
                        <i className='fa-solid fa-plus  text-primary me-2'></i>

                        {t('global.add', {name: t('global.user')})}
                      </Link>
                    </Dropdown.Item>
                    <Dropdown.Item as='button'>
                      <span
                        className='fw-bolder text-primary'
                        data-bs-toggle='collapse'
                        data-bs-target='#movementSearch'
                        aria-expanded='true'
                        aria-controls='movementSearch'
                      >
                        <span className='svg-icon svg-icon-5 svg-icon-gray-500 me-1'>
                          <i className='fa-solid fa-arrow-down-short-wide text-primary'></i>
                        </span>
                        {t('global.search')}
                      </span>
                    </Dropdown.Item>

                    <Dropdown.Item as='button'>
                      <Link className='fw-bold' to='/dashboard'>
                        <b>
                          <i className='fa-solid fa-reply-all text-danger'></i>
                        </b>
                      </Link>
                    </Dropdown.Item>
                  </>
                </DropdownButton>
              </div>
            </div>
          </div>
          <div className='card-body p-9 table-responsive'>
            <DataTable
              reload={reloadTable}
              headers={[
                {
                  headerName: `${t('global.URN')}`,
                  sort: 'id',
                },
                {
                  headerName: `${t('supplier.suppliers')}`,
                  sort: 'name',
                },
                {
                  headerName: `${t('global.purchaseDate')}`,
                  sort: 'purchaseDate',
                },
                {
                  headerName: `${t('global.totalAmount')}`,
                  sort: 'totalAmount',
                },
                {
                  headerName: `${t('global.paidAmount')}`,
                  sort: 'paidAmount',
                },
                {
                  headerName: `${t('global.unpaidAmount')}`,
                  sort: 'unpaidAmount',
                },
                {
                  headerName: 'عمل',
                  sort: '',
                },
              ]}
              columns={['id', 'name', 'phoneNumber']}
              handleEdit={openEditModal}
            />
          </div>
        </div>
      </Fragment>

      {isModalOpen && (
        <CreatePurchaseModal
          isOpen={isModalOpen}
          onClose={closeModal}
          handleReloadTable={handleReloadTable}
        />
      )}
      {isEditModalOpen && (
        <EditPurchaseModal
          isOpen={isEditModalOpen}
          onClose={closeEditModal}
          selectedPurchase={selectedPurchase}
          handleReloadTable={handleReloadTable}
        />
      )}
    </>
  )
}
export default PurchasesList
