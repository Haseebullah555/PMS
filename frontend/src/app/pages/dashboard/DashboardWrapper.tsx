/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC } from 'react'
import { useIntl } from 'react-intl'
import { toAbsoluteUrl } from '../../../_metronic/helpers'
import { PageTitle } from '../../../_metronic/layout/core'
import { DashboardCard } from './DashboardCards'
import { DashboardChart } from './DashboardChart'
import { useTranslation } from 'react-i18next'
import { AviliableStockCard } from './AviliableStockCards'

const DashboardPage: FC = () => {
  const { t } = useTranslation()
  return (
    <>
      <div className='row g-5 gx-xxl-8'>
        <div className='row g-5 g-xl-2 mb-5 mb-xl-2'>
          <div className="section-header">
            {/* <div className="section-icon">
              <i className="fa fa-gas-pump"></i>
            </div> */}

            <h2 className="section-title">
              {t("dashboard.dailyFuelSell")}
            </h2>

            <div className="section-underline"></div>
          </div>



          <div className='col-md-3'>
            <DashboardCard
              className='h-md-100 mb-5 mb-xl-10'
              description='Petrol 95'
              color='#d10029'
              img={toAbsoluteUrl('/media/patterns/vector-1.png')}
              fuelTypeId={2}
            />
          </div>

          <div className='col-md-3'>
            <DashboardCard
              className='h-md-100 mb-5 mb-xl-10'
              description='Petrol 92'
              color='#153a81'
              img=''
              fuelTypeId={3}
            />
          </div>

          <div className='col-md-3'>
            <DashboardCard
              className='h-md-100 mb-5 mb-xl-10'
              description='LPG'
              color='#64748B'
              img=''
              fuelTypeId={1}
            />
          </div>

          <div className='col-md-3'>
            <DashboardCard
              className='h-md-100 mb-5 mb-xl-10'
              description='Diesel'
              color='#109f51'
              img=''
              fuelTypeId={4}
            />
          </div>
        </div>
        <div className='row g-5 g-xl-2 mb-5 mb-xl-2'>
          <div className="section-header">
            {/* <div className="section-icon">
              <i className="fa fa-gas-pump"></i>
            </div> */}

            <h2 className="section-title">
              {t("dashboard.aviliableStock")}
            </h2>

            <div className="section-underline"></div>
          </div>
          <div className='col-md-3'>
            <AviliableStockCard
              className='h-md-100 mb-5 mb-xl-10'
              description='Petrol 95'
              color='#d10029'
              img={toAbsoluteUrl('/media/patterns/vector-1.png')}
              fuelTypeId={2}
            />
          </div>

          <div className='col-md-3'>
            <AviliableStockCard
              className='h-md-100 mb-5 mb-xl-10'
              description='Petrol 92'
              color='#153a81'
              img=''
              fuelTypeId={3}
            />
          </div>

          <div className='col-md-3'>
            <AviliableStockCard
              className='h-md-100 mb-5 mb-xl-10'
              description='LPG'
              color='#64748B'
              img=''
              fuelTypeId={1}
            />
          </div>

          <div className='col-md-3'>
            <AviliableStockCard
              className='h-md-100 mb-5 mb-xl-10'
              description='Diesel'
              color='#109f51'
              img=''
              fuelTypeId={4}
            />
          </div>
        </div>

        <div className='col-xl-12'>
          <DashboardChart className='card-xl-stretch mb-xl-8' />
        </div>
      </div>
    </>
  )
}


const DashboardWrapper: FC = () => {
  const intl = useIntl()
  return (
    <>
      <PageTitle breadcrumbs={[]}>{intl.formatMessage({ id: 'MENU.DASHBOARD' })}</PageTitle>
      <DashboardPage />
    </>
  )
}




export { DashboardWrapper }