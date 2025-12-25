import { Fragment, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../../../redux/hooks'
import { getFuelStandWithDetials } from '../../../../../redux/slices/fuelDistribution/FuelDistributionSlice'
import { table } from 'console'
import AddFuelDistributionModal from './CreateFuelDistributionModal'
import CreateDailyFuelSellModal from './CreateDailyFuelSellModal'

const SORT_ASC = 'asc'
const SORT_DESC = 'desc'

const FuelStandWithDetials = () => {

  const { t } = useTranslation()
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isCreateDailyFuelSellModalOpen, setCreateDailyFuelSellModalOpen] = useState(false);
  const [selectedStand, setSelectedStand] = useState(null);
  const [selectedDailySell, setSelectedDailySell] = useState<any>();
  const closeCreateModal = () => setCreateModalOpen(false)

  const openCreateDailyFuelSellModal = (fuelStandId: number, fuelGunId: number) => {
    setSelectedDailySell({ fuelStandId, fuelGunId });
    setCreateDailyFuelSellModalOpen(true)
  }

  const openCreateModal = (item: any) => {
    console.log(item, "StandStandStand");
    setSelectedStand(item)
    setCreateModalOpen(true)
  }
  // const openCreateDailyFuelSellModal = () => setCreateDailyFuelSellModalOpen(true)
  const closeCreateDailyFuelSellModal = () => setCreateDailyFuelSellModalOpen(false)
  const dispatch = useAppDispatch()

  const fuelStandWithDetials = useAppSelector((state) => state.fuelDistribution.fuelStandWithDetials)


  const [data, setData] = useState<any>([])
  const [perPage, setPerPage] = useState<number>(10)
  const [sortColumn, setSortColumn] = useState<string>()
  const [sortOrder, setSortOrder] = useState<string>(SORT_ASC)
  const [search, setSearch] = useState<string>('')
  const [isAuthorized, setIsAuthorized] = useState<boolean>(true)
  const [pagination, setPagination] = useState<any>({})
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [loading, setLoading] = useState<boolean>(true)
  const [reloadTable, setReloadTable] = useState(false)

  const handleReloadTable = () => {
    console.log('--------------------');

    setReloadTable((prev) => !prev) // Toggle to trigger table reload
  }

  useEffect(() => {
    const params = {
      search,
      sort_field: sortColumn,
      sort_order: sortOrder,
      per_page: perPage,
      page: currentPage,
    }

    dispatch(getFuelStandWithDetials(params)).then((res) => {
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
    setData(fuelStandWithDetials?.data)
    setPagination(fuelStandWithDetials?.meta)
  }, [fuelStandWithDetials])

  const memoizedData = useMemo(() => data, [data])
  const memoizedLoading = useMemo(() => loading, [loading])

  console.log(memoizedData, '===================>>>>>>>>>');
  return (
    <>
      <Fragment>
        <div className='card mb-5 mb-xl-10' id='kt_profile_details_view'>
          <div className='card-header cursor-pointer'>
            <div className='card-title m-0'>
              <h3 className='fw-bolder m-0'>
                <i className="fa-solid fa-gas-pump"></i>{' '}
                {t('fuelDistribution.fuelStandWithDetial')}
              </h3>
            </div>
            <div>
              <div className='d-none d-lg-flex mt-5'>
                <div className='d-flex align-items-center'>
                  <Link className='btn btn-sm btn-flex btn-primary fw-bold me-3' to='/fuelDistribution/list'>
                    <b>
                      <i className='fas fa-list me-1'></i>
                      {t('global.list', { name: t('fuelDistribution.fuelDistribution') })}
                    </b>
                  </Link>
                  <Link className='btn btn-sm btn-flex btn-success fw-bold me-3' to='/dailyFuelSell/list'>
                    <b>
                      <i className='fas fa-list me-1'></i>
                      {t('global.list', { name: t('dailyFuelSell.dailyFuelSell') })}
                    </b>
                  </Link>
                  <Link className='btn btn-sm btn-flex btn-danger fw-bold me-3' to='/dashboard'>
                    <b>
                      <i className='fa-solid fa-reply-all'></i>
                    </b>
                  </Link>
                </div>
              </div>

            </div>
          </div>
          <div className='card-body p-9 table-responsive'>
            <div className="row">
              {
                memoizedData?.map((item) => (
                  <div className="col-md-6">
                    {/* stand dard  */}
                    <div className='card mb-5 mb-xl-10'>
                      <div className='card-header standCard'>
                        <div className='card-title m-0'>
                          <h3 className='fw-bolder m-0'>
                            <i className="text-white fs-4 fa-solid fa-gas-pump"></i>{' '}
                            <span className='text-white mx-3'>
                              {item?.name}
                            </span>
                          </h3>
                        </div>
                        <div>
                        </div>
                      </div>
                      <div className='card-body p-9 table-responsive'>
                        <table className="table table-hover table-striped gs-5 gy-4">
                          <thead className="text-center fs-5 bg-gray-500 text-light">
                            <th>{t('fuelDistribution.fuelGun')}</th>
                            <th>{t('fuelDistribution.balance')}</th>
                            <th>{t('global.ACTION')}</th>
                          </thead>
                          <tbody>
                            {item?.fuelGuns?.map((i: any) => (
                              <tr className='fs-5 text-center'>
                                <td className='fw-bolder' key={i?.id}>
                                  {i?.name}
                                </td>
                                <td className='fw-bolder' key={i?.id}>
                                  {i?.balance}
                                </td>
                                <td className='fw-bolder'>
                                  <button className='btn btn-sm btn-flex btn-primary fw-bold' onClick={() => openCreateModal(i.id)}>
                                    <b>
                                      <i className='fa-solid fa-plus'></i>{' '}
                                      {t('fuelDistribution.fuelDistributionToStand')}
                                    </b>
                                  </button>
                                  <button className='btn btn-sm btn-flex btn-success fw-bold mx-3' onClick={() => openCreateDailyFuelSellModal(item.id, i.id)}>
                                    <b>
                                      <i className='fa-solid fa-arrow-up'></i>{' '}
                                      {t('dailyFuelSell.dailyFuelSells')}

                                    </b>
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    {/* end stand card  */}
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </Fragment>
      {isCreateModalOpen && (
        <AddFuelDistributionModal
          isOpen={isCreateModalOpen}
          onClose={closeCreateModal}
          selectedStand={selectedStand}
          handleReloadTable={handleReloadTable}
        />
      )}
      {isCreateDailyFuelSellModalOpen && (
        <CreateDailyFuelSellModal
          isOpen={isCreateDailyFuelSellModalOpen}
          selectedDailySell={selectedDailySell}
          onClose={() => setCreateDailyFuelSellModalOpen(false)}
        />
      )}
    </>
  )
}
export default FuelStandWithDetials
