/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC } from 'react'
import { useIntl } from 'react-intl'
import { KTCard, KTCardBody, KTSVG, toAbsoluteUrl } from '../../../_metronic/helpers'
import { PageTitle } from '../../../_metronic/layout/core'
import {
  ListsWidget2,
  ListsWidget3,
  ListsWidget4,
  ListsWidget6,
  TablesWidget5,
  TablesWidget10,
  MixedWidget8,
  CardsWidget7,
  CardsWidget17,
  CardsWidget20,
  ListsWidget26,
  EngageWidget10,
  ChartsWidget1,
  ChartsWidget2,
} from '../../../_metronic/partials/widgets'
import { Charts } from '../../modules/widgets/components/Charts'
import { t } from 'i18next'
import { DashboardCard } from './DashboardCards'

const DashboardPage: FC = () => (
  <>
    <div className='row g-5 gx-xxl-8'>
      <div className='row g-5 g-xl-2 mb-5 mb-xl-2'>
        <div className='col-md-3 col-lg-3 col-xl-3 col-xxl-3 mb-md-5 mb-xl-2'>
          <DashboardCard
            className='h-md-100 mb-5 mb-xl-10'
            description='Active Projects'
            color='#f1416cff'
            img={toAbsoluteUrl('/media/patterns/vector-1.png')}
          />
          
        </div>
      </div>
      <div className='col-xl-12'>
        <ChartsWidget1 className='card-xl-stretch mb-xl-8' />
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