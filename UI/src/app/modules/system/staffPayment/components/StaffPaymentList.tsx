import {Fragment, useState} from 'react'
import {Link} from 'react-router-dom'
import DataTable from './DataTable'
import {Dropdown, DropdownButton} from 'react-bootstrap'
import {useTranslation} from 'react-i18next'
import CreateUserModal from './CreateStaffPayment'
import EditStaffModal from './EditStaffPayment'

const StaffPaymentList = () => {
  const {t} = useTranslation()
  const [isModalOpen, setModalOpen] = useState(false)
  const [isEditModalOpen, setEditModalOpen] = useState(false)
  const [selectedStaffPayment, setSelectedStaffPayment] = useState(null)

  const closeModal = () => setModalOpen(false)
  const openModal = () => setModalOpen(true)

  const closeEditModal = () => setEditModalOpen(false)
  const openEditModal = (Staff: any) => {
    setSelectedStaffPayment(Staff)
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
                {t('global.list', {name: t('staffPayment.staffPayments')})}
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
                    {t('global.add', {name: t('staff.staffs')})}
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
                  headerName: `${t('staff.staff')}`,
                  sort: 'name',
                },
                {
                  headerName: `${t('staffPayment.paidAmount')}`,
                  sort: 'paidAmount',
                },
                {
                  headerName: `${t('staffPayment.unpaidAmount')}`,
                  sort: 'unpaidAmount',
                },
                {
                  headerName: `${t('global.date')}`,
                  sort: 'paymentDate',
                },
                {
                  headerName: `${t('global.remarks')}`,
                  sort: 'remarks',
                },
                {
                  headerName: 'عمل',
                  sort: '',
                },
              ]}
              columns={['id', 'name', 'paidAmount', 'unpaidAmount', 'paymentDate', 'remarks', 'position']}
              handleEdit={openEditModal}
            />
          </div>
        </div>
      </Fragment>

      {isModalOpen && (
        <CreateUserModal
          isOpen={isModalOpen}
          onClose={closeModal}
          handleReloadTable={handleReloadTable}
        />
      )}
      {isEditModalOpen && (
        <EditStaffModal
          isOpen={isEditModalOpen}
          onClose={closeEditModal}
          {...({ selectedStaffPayment, handleReloadTable } as any)}
        />
      )}
    </>
  )
}
export default StaffPaymentList
