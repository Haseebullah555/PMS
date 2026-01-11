import { Fragment, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../../../redux/hooks'
import { getFuelStandWithDetials } from '../../../../../redux/slices/fuelDistribution/FuelDistributionSlice'
import CreateFuelDistributionModal from './CreateFuelDistributionModal'
import CreateDailyFuelSellModal from './CreateDailyFuelSellModal'
import CustomerLoanModal from '../../customerLoan/components/CustomerLoanModal'

const SORT_ASC = 'asc'
const SORT_DESC = 'desc'

const FuelStandWithDetials = () => {

  const { t } = useTranslation()
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isCreateDailyFuelSellModalOpen, setCreateDailyFuelSellModalOpen] = useState(false);
  const [isCustomerLoanModalOpen, setCustomerLoanModalOpen] = useState(false);
  const [selectedStand, setSelectedStand] = useState(null);
  const [selectedFuelDistribution, setSelectedFuelDistribution] = useState(null)
  const [selectedDailySell, setSelectedDailySell] = useState<any>();
  const [selectedCustomerLoan, setSelectedCustomerLoan] = useState(null);
  const [formMode, setFormMode] = useState<"update" | "send">("send");
  const closeCreateModal = () => setCreateModalOpen(false)
  const closeCustomerLoanModal = () => setCustomerLoanModalOpen(false);
  const openCreateDailyFuelSellModal = (fuelStandId: number, fuelGunId: number) => {
    setSelectedDailySell({ fuelStandId, fuelGunId });
    setCreateDailyFuelSellModalOpen(true)
  }

  const openCreateModal = (item: any) => {
    setSelectedStand(item)
    setCreateModalOpen(true)
  }
  const openCustomerLoanModal = (item: any) => {
    setSelectedCustomerLoan(item)
    setCustomerLoanModalOpen(true)
  }
  const closeCreateDailyFuelSellModal = () => setCreateDailyFuelSellModalOpen(false)
  const dispatch = useAppDispatch()

  const fuelStandWithDetials = useAppSelector((state) => state.fuelDistribution.fuelStandWithDetials)


  const [data, setData] = useState<any>([])
  const [perPage, setPerPage] = useState<number>(10)
  const [sortColumn, setSortColumn] = useState<string>()
  const [sortOrder, setSortOrder] = useState<string>(SORT_ASC)
  const [search, setSearch] = useState<string>('')
  const [isAuthorized, setIsAuthorized] = useState<boolean>(true)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [loading, setLoading] = useState<boolean>(true)
  const [reloadTable, setReloadTable] = useState(false)

  const handleReloadTable = () => {
    setReloadTable((prev) => !prev) // Toggle to trigger table reload
  }

  useEffect(() => {
    dispatch(getFuelStandWithDetials()).then((res) => {
      if (res.meta.requestStatus === 'fulfilled') {
        // handleReloadTable()
        setLoading(true)
      } else if (res.meta.requestStatus === 'rejected') {
        setIsAuthorized(false)
      }
      setLoading(false)
    })
  }, [dispatch, reloadTable, currentPage, perPage, search, sortColumn, sortOrder])

  useEffect(() => {
    setData(fuelStandWithDetials)
    // setPagination(fuelStandWithDetials?.meta)
  }, [fuelStandWithDetials])
  const memoizedData = useMemo(() => data, [data])
  const memoizedLoading = useMemo(() => loading, [loading])
  return (
    <>
      <Fragment>
        <div className="card mb-5 mb-xl-10" id="kt_profile_details_view">

          {/* ================= HEADER ================= */}
          <div className="card-header d-flex justify-content-between align-items-center flex-wrap">
            <div className="card-title m-0">
              <h3 className="fw-bolder m-0 fs-5 fs-md-3">
                <i className="fa-solid fa-gas-pump me-2"></i>
                {t('fuelDistribution.fuelStandWithDetial')}
              </h3>
            </div>

            <div className="d-flex flex-wrap gap-2 mt-3 mt-md-0">
              <Link className="btn btn-sm btn-primary fw-bold" to="/fuelDistribution/list">
                <i className="fas fa-list me-1"></i>
                {t('global.list', { name: t('fuelDistribution.fuelDistribution') })}
              </Link>

              <Link className="btn btn-sm btn-success fw-bold" to="/dailyFuelSell/list">
                <i className="fas fa-list me-1"></i>
                {t('global.list', { name: t('dailyFuelSell.dailyFuelSell') })}
              </Link>

              <Link className="btn btn-sm btn-danger fw-bold" to="/dashboard">
                <i className="fa-solid fa-reply-all"></i>
              </Link>
            </div>
          </div>

          {/* ================= BODY ================= */}
          <div className="card-body p-3 p-md-4">

            {/* GRID CONTAINER */}
            <div className="stand-grid">

              {memoizedData?.map((item) => (
                <div key={item.id} className="stand-card">

                  <div className="card shadow-sm">

                    {/* Card Header */}
                    <div className="card-header standCard align-items-center justify-content-center">
                      <h1 className="fw-bolder m-0 text-white fs-6 fs-md-5">
                        <i className="fa-solid fa-gas-pump me-2"></i>
                        {item?.name}
                      </h1>
                    </div>

                    {/* Card Body */}
                    <div className="card-body p-3">

                      <div className="table-responsive">
                        <table className="table table-hover table-striped text-nowrap mb-0">
                          <thead className="text-center bg-gray-600 text-light">
                            <tr>
                              <th>{t('fuelDistribution.fuelGun')}</th>
                              <th>{t('fuelDistribution.balance')}</th>
                              <th>{t('global.ACTION')}</th>
                            </tr>
                          </thead>

                          <tbody>
                            {item?.fuelGuns?.map((i) => (
                              <tr key={i.id} className="text-center">
                                <td className="fw-bold">{i.name}</td>
                                <td className="fw-bold">{i.balance}</td>
                                <td>
                                  <div className="d-flex gap-2 justify-content-center flex-wrap">
                                    <button
                                      className="btn btn-sm btn-primary fw-bold"
                                      onClick={() => openCreateModal(i.id)}
                                    >
                                      <i className="fa-solid fa-plus"></i>
                                      {t('fuelDistribution.fuelDistribution')}
                                    </button>

                                    <button
                                      className="btn btn-sm btn-success fw-bold"
                                      onClick={() =>
                                        openCreateDailyFuelSellModal(item.id, i.id)
                                      }
                                    >
                                      <i className="fa-solid fa-arrow-up"></i>
                                      {t('dailyFuelSell.dailyFuelSell')}
                                    </button>
                                    <button
                                      className="btn btn-sm btn-danger fw-bold"
                                      onClick={() =>
                                        openCustomerLoanModal(item.id)
                                      }
                                    >
                                      <i className="fa-solid fa-arrow-up"></i>
                                      {t('dailyFuelSell.loanSell')}
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>

                        </table>
                      </div>

                    </div>
                  </div>

                </div>
              ))}

            </div>
          </div>
        </div>

      </Fragment>
      {isCreateModalOpen && (
        <CreateFuelDistributionModal
          isOpen={isCreateModalOpen}
          onClose={closeCreateModal}
          selectedStand={selectedStand}
          handleReloadTable={handleReloadTable}
          selectedFuelDistribution={selectedFuelDistribution}
          mode={formMode}
        />
      )}
      {isCreateDailyFuelSellModalOpen && (
        <CreateDailyFuelSellModal
          isOpen={isCreateDailyFuelSellModalOpen}
          selectedDailySell={selectedDailySell}
          onClose={() => setCustomerLoanModalOpen(false)}
          handleReloadTable={handleReloadTable}
          mode={formMode}
        />
      )}
      {isCustomerLoanModalOpen && (
        <CustomerLoanModal
          isOpen={isCustomerLoanModalOpen}
          selectedCustomerLoan={selectedCustomerLoan}
          onClose={closeCustomerLoanModal}
          handleReloadTable={handleReloadTable}
          mode={formMode}
        />
      )}
    </>
  )
}
export default FuelStandWithDetials
