import {Fragment, useState} from 'react'
import {Link} from 'react-router-dom'
import DataTable from './DataTable'
import {Dropdown, DropdownButton} from 'react-bootstrap'
import {useTranslation} from 'react-i18next'
import CreateDailyFuelSellModal from './CreateDailyFuelSellModal'

const DailyFuelSellList = () => {
  const {t} = useTranslation()
  const [isEditModalOpen, setEditModalOpen] = useState(false)
  const [selectedDailyFuelSell, setSelectedDailyFuelSell] = useState(null)
  const [formMode, setFormMode] = useState<"update" | "send">("send");

  const closeEditModal = () => setEditModalOpen(false)
  const handleEditClick = (selectedDailyFuelSell: any) => {
    setFormMode("update");
    setSelectedDailyFuelSell(selectedDailyFuelSell)
    setEditModalOpen(true);
  };
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
                <i className="fa-solid fa-gas-pump"></i>{' '}
                {t('global.list', {name: t('dailyFuelSell.dailyFuelSell')})}
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
                  headerName: `${t('global.date')}`,
                  sort: 'date',
                },
                {
                  headerName: `${t('fuelStand.fuelStand')}`,
                  sort: 'fuelStand',
                },
                {
                  headerName: `${t('fuelGun.fuelGun')}`,
                  sort: 'fuelGun',
                },
                {
                  headerName: `${t('dailyFuelSell.currentMeterDegree')}`,
                  sort: 'currentMeterDegree',
                },
                {
                  headerName: `${t('dailyFuelSell.oldMeterDegree')}`,
                  sort: 'oldMeterDegree',
                },
                {
                  headerName: `${t('dailyFuelSell.soldFuelAmount')}`,
                  sort: 'soldFuelAmount',
                },
                {
                  headerName: `${t('dailyFuelSell.fuelUnitPrice')}`,
                  sort: 'fuelUnitPrice',
                },
                {
                  headerName: `${t('dailyFuelSell.totalPrice')}`,
                  sort: 'totalPrice',
                },
                {
                  headerName: `${t('dailyFuelSell.collectedMoney')}`,
                  sort: 'collectedMoney',
                },
                // {
                //   headerName: `${t('dailyFuelSell.difference')}`,
                //   sort: 'difference',
                // },
                {
                  headerName: 'عمل',
                  sort: '',
                },
              ]}
              columns={['id', 'fuelType', 'date', 'currentMeterDegree', 'oldMeterDegree', 'soldFuelAmount', 'fuelUnitPrice', 'totalPrice', 'collectedMoney', 'difference']}
              handleEdit={handleEditClick}
            />
          </div>
        </div>
      </Fragment>
      {isEditModalOpen && (
        <CreateDailyFuelSellModal
          isOpen={isEditModalOpen}
          onClose={closeEditModal}
          selectedDailySell={selectedDailyFuelSell}
          handleReloadTable={handleReloadTable}
          mode={formMode}
        />
      )}
    </>
  )
}
export default DailyFuelSellList
