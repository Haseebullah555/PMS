// export default CustomerLoanPaymentList
import { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import DataTable from './Datatable'
import { Dropdown, DropdownButton } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import CustomerWithCustomerLoanPaymentModel from './CustomerWithCustomerLoanPaymentModel'
import CustomerLoanPaymentModel from './CustomerLoanPaymentModal'

const CustomerLoanPaymentList = () => {

  const { t } = useTranslation()
  const [isCustomerLoanPaymentModalOpen, setIsCustomerLoanPaymentModalOpen] = useState(false)
  const [selectedCustomerLoanPayment, setSelectedCustomerLoanPayment] = useState(null)
  const closeEditModal = () => setIsCustomerLoanPaymentModalOpen(false)

  const openLoanPaymentModal = (Purchase: any) => {
    setSelectedCustomerLoanPayment(Purchase)
    setIsCustomerLoanPaymentModalOpen(true)
  }
  const [isCustomerWithCustomerLoanPaymentModalOpen, setIsCustomerWithCustomerLoanPaymentModalOpen] = useState(false)
  const [selectedCustomerWithCustomerLoanPayment, setSelectedCustomerWithCustomerLoanPayment] = useState(null)
  const closeCustomerWithCustomerLoanPaymentEditModal = () => setIsCustomerWithCustomerLoanPaymentModalOpen(false)

  const openCustomerWithCustomerLoanPaymentModal = (Purchase: any) => {
    setSelectedCustomerWithCustomerLoanPayment(Purchase)
    setIsCustomerWithCustomerLoanPaymentModalOpen(true)
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
                <i className="fas fa-shopping-cart fs-4 text-primary"></i>
                {' '}
                {t('global.list', { name: t('customerLoanPayment.customerLoans') })}
              </h3>
            </div>
            <div>
              <div className='d-none d-lg-flex mt-5'>
                <div className='d-flex align-items-center'>
                  
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

                        {t('global.add', { name: t('global.user') })}
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
                  headerName: `${t('customer.customers')}`,
                  sort: 'name',
                },
                {
                  headerName: `${t('customer.balance')}`,
                  sort: 'balance',
                },
                {
                  headerName: `${t('global.phone')}`,
                  sort: 'phoneNumber',
                },
                {
                  headerName: `${t('global.address')}`,
                  sort: 'address',
                },
                {
                  headerName: 'عمل',
                  sort: '',
                },
              ]}
              columns={['id', 'name', 'phoneNumber','address','balance']}
              openLoanPaymentModal={openLoanPaymentModal}
              openCustomerWithCustomerLoanPaymentModal={openCustomerWithCustomerLoanPaymentModal}
            />
          </div>
        </div>
      </Fragment>

      {isCustomerLoanPaymentModalOpen && (
        <CustomerLoanPaymentModel
          isOpen={isCustomerLoanPaymentModalOpen}
          onClose={closeEditModal}
          selectedCustomerLoanPayment={selectedCustomerLoanPayment}
          handleReloadTable={handleReloadTable}
        />
      )}
      {isCustomerWithCustomerLoanPaymentModalOpen && (
        <CustomerWithCustomerLoanPaymentModel
          isOpen={isCustomerWithCustomerLoanPaymentModalOpen}
          onClose={closeCustomerWithCustomerLoanPaymentEditModal}
          selectedCustomerWithCustomerLoanPayment={selectedCustomerWithCustomerLoanPayment}
          handleReloadTable={handleReloadTable}
        />
      )}
    </>
  )
}
export default CustomerLoanPaymentList
