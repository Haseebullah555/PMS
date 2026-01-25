/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC } from 'react'
import { useIntl } from 'react-intl'
import { toAbsoluteUrl } from '../../../_metronic/helpers'
import { PageTitle } from '../../../_metronic/layout/core'
import { t } from 'i18next'
import { DashboardCard } from './DashboardCards'
import { DashboardChart } from './DashboardChart'

const DashboardPage: FC = () => (
  <>
    <div className='row g-5 gx-xxl-8'>
      <div className='row g-5 g-xl-2 mb-5 mb-xl-2'>

        <div className='col-md-3'>
          <DashboardCard
            className='h-md-100 mb-5 mb-xl-10'
            description='Petrol 95'
            color='#d10029'
            img={toAbsoluteUrl('/media/patterns/vector-1.png')}
            fuelTypeId={4}
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
            fuelTypeId={2}
          />
        </div>

      </div>

      <div className='col-xl-12'>
        <DashboardChart className='card-xl-stretch mb-xl-8' />
      </div>
    </div>
  </>
)


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