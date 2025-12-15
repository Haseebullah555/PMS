import { Fragment } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

const FuelStandWithDetials = () => {

  const { t } = useTranslation()

  return (
    <>
      <Fragment>
        <div className='card mb-5 mb-xl-10' id='kt_profile_details_view'>
          <div className='card-header cursor-pointer'>
            <div className='card-title m-0'>
              <h3 className='fw-bolder m-0'>
                <i className="fa-solid fa-gas-pump"></i>{' '}
                {t('global.list', { name: t('fuelStand.fuelStands') })}
              </h3>
            </div>
            <div>
              <div className='d-none d-lg-flex mt-5'>
                <div className='d-flex align-items-center'>
                  <button
                    className='btn btn-primary btn-sm align-self-center fw-bold'
                  // onClick={openModal}
                  >
                    <i className='fas fa-plus'></i>
                    {t('global.add', { name: t('fuelStand.fuelStands') })}
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

            </div>
          </div>

        </div>
      </Fragment>

    </>
  )
}
export default FuelStandWithDetials
