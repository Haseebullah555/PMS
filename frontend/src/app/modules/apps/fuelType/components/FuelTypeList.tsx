import { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import DataTable from './DataTable'
import { Dropdown, DropdownButton } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import FuelTypeModal from './FuelTypeModal'

const FuelTypeList = () => {
  const { t } = useTranslation()
  const [isModalOpen, setModalOpen] = useState(false)
  const [isEditModalOpen, setEditModalOpen] = useState(false)
  const [selectedFuelType, setSelectedFuelType] = useState(null)
  const [formMode, setFormMode] = useState<"update" | "send">("send");

  const closeModal = () => setModalOpen(false)
  const openModal = () => setModalOpen(true)

  const closeEditModal = () => setEditModalOpen(false)
  const openEditModal = (FuelType: any) => {
    setSelectedFuelType(FuelType)
    setEditModalOpen(true)
  }

  const [reloadTable, setReloadTable] = useState(false)

  const handleEditClick = (selectedFuelType: any) => {
    setFormMode("update");
    setSelectedFuelType(selectedFuelType)
    setEditModalOpen(true);
  };
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
                <i className='fas fa-users text-primary fs-4'></i>{' '}
                {t('global.list', { name: t('fuelType.fuelTypes') })}
              </h3>
            </div>
            <div>
              <div className='d-none d-lg-flex mt-5'>
                <div className='d-flex align-items-center'>
                  <button
                    className='btn btn-primary btn-sm align-self-center fw-bold mx-2'
                    onClick={openModal}
                  >
                    <i className='fas fa-plus'></i>
                    {t('global.add', { name: t('fuelType.fuelTypes') })}
                  </button>
                  <Link className='btn btn-sm btn-flex btn-danger fw-bold' to='/dashboard'>
                    <b>
                      <i className='fa-solid fa-reply-all'></i>
                    </b>
                  </Link>
                </div>
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
                  headerName: `${t('fuelType.name')}`,
                  sort: 'name',
                },
                {
                  headerName: `${t('fuelType.unit')}`,
                  sort: 'name',
                },
                {
                  headerName: 'عمل',
                  sort: '',
                },
              ]}
              columns={['id', 'name', 'unit']}
              handleEdit={handleEditClick}
            />
          </div>
        </div>
      </Fragment>

      {isModalOpen && (
        <FuelTypeModal
          isOpen={isModalOpen}
          onClose={closeModal}
          handleReloadTable={handleReloadTable}
          selectedFuelType={selectedFuelType}
          mode={formMode}
        />
      )}
      {isEditModalOpen && (
        <FuelTypeModal
          isOpen={isEditModalOpen}
          onClose={closeEditModal}
          selectedFuelType={selectedFuelType}
          handleReloadTable={handleReloadTable}
          mode={formMode}
        />
      )}
    </>
  )
}
export default FuelTypeList
